# SoybeanUI Component Development

Specialized workflow for creating new components in the SoybeanUI headless + styled architecture.

## When to Use

Use this skill when:

- Developing a new component from scratch
- Adding features to existing components
- Fixing bugs in headless or UI layer components
- Understanding component architecture

## Workflow

### Phase 1: Headless Layer (`headless/src/components/{component}/`)

**Step 1: Define Types (`types.ts`)**

```typescript
// 1. Root Props - extend HTMLAttributes or SelectionProps for v-model
export interface {ComponentName}RootProps extends /** @vue-ignore */ HTMLAttributes {
  disabled?: boolean;
}

// 2. Emits - use SelectionEmits<M> for v-model support
export type {ComponentName}RootEmits = {};

// 3. Context Params - use PropsToContext to extract injectable props
export interface {ComponentName}RootContextParams
  extends PropsToContext<{ComponentName}RootProps, 'disabled'> {
  rootElement: ShallowRef<HTMLElement | undefined>;
}

// 4. Ui Slots - define all styleable parts (MUST match variants.ts slots)
export type {ComponentName}UiSlot = 'root' | 'trigger' | 'content' | 'item';

// 5. UI Type
export type {ComponentName}Ui = Record<{ComponentName}UiSlot, ClassValue>;
```

**Step 2: Create Context (`context.ts`)**

```typescript
// Root Context for state sharing
export const [provide{ComponentName}RootContext, use{ComponentName}RootContext] = useContext(
  '{ComponentName}Root',
  (params: {ComponentName}RootContextParams) => params
);

// Ui Context for style injection (REQUIRED)
export const [provide{ComponentName}Ui, use{ComponentName}Ui] = useUiContext<{ComponentName}UiSlot>('{ComponentName}Ui');
```

**Step 3: Implement Components (`{component}-root.vue`, `{component}-item.vue`)**

```vue
<script setup lang="ts">
import { transformPropsToContext } from '../../shared';

defineOptions({ name: '{ComponentName}Root' });

const props = withDefaults(defineProps<{ComponentName}RootProps>(), {
  disabled: false
});

// Get style for this slot
const cls = use{ComponentName}Ui('root');

// Element reference for context
const rootElement = shallowRef<HTMLElement>();

// Provide context to children
provide{ComponentName}RootContext({
  rootElement,
  ...transformPropsToContext(props, ['disabled'])
});
</script>

<template>
  <div ref="rootElement" :class="cls">
    <slot />
  </div>
</template>
```

**Step 4: Export (`index.ts`)**

```typescript
export { default as {ComponentName}Root } from './{component}-root.vue';
export { default as {ComponentName}Item } from './{component}-item.vue';
export {
  provide{ComponentName}RootContext,
  use{ComponentName}RootContext,
  provide{ComponentName}Ui,
  use{ComponentName}Ui
} from './context';
export * from './types';
```

### Phase 2: UI Layer (`src/components/{component}/`)

**Step 1: Define Variants (`src/components/{component}/variants.ts`)**

```typescript
import { tv } from 'tailwind-variants';

export const {componentName}Variants = tv({
  // Slots MUST match UiSlot from headless types.ts
  slots: {
    root: 'base-styles...',
    item: '...',
    trigger: '...',
    content: '...'
  },
  variants: {
    size: {
      sm: { root: 'text-sm' },
      md: { root: 'text-base' }
    }
  },
  defaultVariants: { size: 'md' }
});
```

**Step 2: Define UI Types (`src/components/{component}/types.ts`)**

```typescript
import type {
  {ComponentName}RootProps,
  {ComponentName}RootEmits,
  {ComponentName}Ui
} from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

export type {ComponentName}Props = {ComponentName}RootProps & {
  size?: ThemeSize;
  ui?: Partial<{ComponentName}Ui>;
};

export type {ComponentName}Emits = {ComponentName}RootEmits;
```

**Step 3: Implement UI Component (`src/components/{component}/{component}.vue`)**

```vue
<script setup lang="ts">
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { {ComponentName}Root, provide{ComponentName}Ui } from '@soybeanjs/headless';
import { {componentName}Variants } from '@/variants/{component}';
import { mergeSlotVariants } from '@/theme';

defineOptions({ name: 'S{ComponentName}' }); // S prefix required

const props = defineProps<{ComponentName}Props>();
const emit = defineEmits<{ComponentName}Emits>();

// Separate UI props from headless props
const forwardedProps = useOmitProps(props, ['size', 'ui']);

// Forward events
const listeners = useForwardListeners(emit);

// Calculate styles
const ui = computed(() => {
  const variants = {componentName}Variants({ size: props.size });
  return mergeSlotVariants(variants, props.ui);
});

// Provide styles to headless components
provide{ComponentName}Ui(ui);
</script>

<template>
  <{ComponentName}Root v-bind="forwardedProps" v-on="listeners">
    <slot />
  </{ComponentName}Root>
</template>
```

**Step 4: Export (`index.ts`)**

```typescript
export { default as S{ComponentName} } from './{component}.vue';
export * from './types';
```

## Critical Checklist

Before finishing, verify:

- [ ] Headless `types.ts` defines `UiSlot` and `Ui` types
- [ ] Headless `context.ts` exports `provide{ComponentName}Ui` and `use{ComponentName}Ui`
- [ ] Headless components use `use{ComponentName}Ui(slot)` to get styles
- [ ] `headless/types.ts` UiSlot names match `src/variants/*.ts` slots exactly
- [ ] UI component uses `useOmitProps` to filter UI-only props
- [ ] UI component provides styles via `provide{ComponentName}Ui`
- [ ] UI component name has `S` prefix (`S{ComponentName}`)
- [ ] No `<style>` blocks in headless components
- [ ] No business logic in UI components

## Common Utilities

| Function               | Purpose                              |
| ---------------------- | ------------------------------------ |
| `useContext`           | Create Provide/Inject pairs          |
| `useForwardElement`    | Pass DOM refs between components     |
| `useForwardListeners`  | Forward event listeners              |
| `useOmitProps`         | Filter props before passing to child |
| `useSelection`         | Handle v-model selection logic       |
| `useControllableState` | Handle controlled/uncontrolled state |

## Anti-Patterns

- **DO NOT** add styles to headless components
- **DO NOT** import from `@soybeanjs/ui` in headless
- **DO NOT** use raw CSS (use UnoCSS utilities)
- **DO NOT** duplicate headless props in UI types (extend them)
- **DO NOT** mix business logic with styling concerns
