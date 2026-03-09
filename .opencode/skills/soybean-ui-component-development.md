# SoybeanUI Component Development

**When to Use**:
- Developing a new component from scratch
- Adding features to existing components
- Fixing bugs in headless or UI layer
- Understanding component architecture

**Architecture**:
- **@soybeanjs/headless**: Logic, state, a11y. Zero styles.
- **@soybeanjs/ui**: Styled wrappers. UnoCSS + `tv()`. `S` prefix.
- **Data flow**: `headless` → `src` (never reverse). UI injects styles via `provideXUi(ui)` → headless reads via `useUiContext`.

---

## Workflow

### Phase 1: Headless Layer (`headless/src/components/{component}/`)

**Step 1: Define Types (`types.ts`)**

```typescript
import type { ClassValue } from '../../types';

// 1. Root Props — extend HTMLAttributes or SelectionProps as needed
export interface {ComponentName}RootProps {
  disabled?: boolean;
}

// 2. Emits
export type {ComponentName}RootEmits = {
  'update:modelValue': [value: boolean];
};

// 3. Context — use PropsToContext to extract injectable props
export interface {ComponentName}RootContext {
  disabled: boolean;
  rootElement: ShallowRef<HTMLElement | undefined>;
}

// 4. Ui Slots — MUST match variants.ts slots
export type {ComponentName}UiSlot = 'root' | 'trigger' | 'content';

// 5. UI Type — style injection interface
export type {ComponentName}Ui = Record<{ComponentName}UiSlot, ClassValue>;
```

**Step 2: Create Context (`context.ts`)**

```typescript
import { useContext, useUiContext } from '../../composables';

// State sharing
export const [provide{ComponentName}RootContext, use{ComponentName}RootContext] =
  useContext<{ComponentName}RootContext>('{ComponentName}Root');

// Style injection (REQUIRED)
export const [provide{ComponentName}Ui, use{ComponentName}Ui] =
  useUiContext<{ComponentName}UiSlot>('{ComponentName}Ui');
```

**Step 3: Implement Component SFCs (`{component}-root.vue`, `{component}-trigger.vue`)**

```vue
<script setup lang="ts">
import { transformPropsToContext } from '../../shared';
import { provide{ComponentName}RootContext, use{ComponentName}Ui } from './context';
import type { {ComponentName}RootProps } from './types';

defineOptions({ name: '{ComponentName}Root' });

const props = withDefaults(defineProps<{ComponentName}RootProps>(), {
  disabled: false
});

// Get style for current slot
const cls = use{ComponentName}Ui('root');

// Provide context to children
provide{ComponentName}RootContext({
  ...transformPropsToContext(props, ['disabled']),
  rootElement: shallowRef<HTMLElement>()
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
export { default as {ComponentName}Trigger } from './{component}-trigger.vue';
export {
  provide{ComponentName}RootContext,
  use{ComponentName}RootContext,
  provide{ComponentName}Ui,
  use{ComponentName}Ui
} from './context';
export * from './types';
```

---

### Phase 2: UI Layer (`src/components/{component}/`)

**Step 1: Define Variants (`variants.ts`)**

```typescript
// @unocss-include  // REQUIRED! UnoCSS marker

import { tv } from 'tailwind-variants';
import type { ThemeSize } from '@/theme';

export const {componentName}Variants = tv({
  // slots MUST match headless types.ts UiSlot
  slots: {
    root: 'flex items-center',
    trigger: 'cursor-pointer',
    content: 'mt-2'
  },
  variants: {
    size: {
      xs: { root: 'h-6 px-2 text-xs' },
      sm: { root: 'h-8 px-3 text-sm' },
      md: { root: 'h-10 px-4 text-base' },
      lg: { root: 'h-12 px-5 text-lg' },
      xl: { root: 'h-14 px-6 text-xl' },
      '2xl': { root: 'h-16 px-7 text-2xl' }
    }
  },
  defaultVariants: { size: 'md' }
});

export type {ComponentName}VariantProps = typeof {componentName}Variants extends tv<infer T>
  ? T
  : never;
```

**Step 2: Define UI Types (`types.ts`)**

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

**Step 3: Implement UI Component (`{component}.vue`)**

```vue
<script setup lang="ts">
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { {ComponentName}Root, provide{ComponentName}Ui } from '@soybeanjs/headless';
import { {componentName}Variants } from './variants';
import { mergeSlotVariants } from '@/theme';

defineOptions({ name: 'S{ComponentName}' }); // S prefix required

const props = defineProps<{ComponentName}Props>();
const emit = defineEmits<{ComponentName}Emits>();

// Separate UI props from headless props
const forwardedProps = useOmitProps(props, ['size', 'ui']);
const listeners = useForwardListeners(emit);

// Calculate styles
const ui = computed(() => {
  const variants = {componentName}Variants({ size: props.size });
  return mergeSlotVariants(variants, props.ui);
});

// Inject styles to headless
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

---

## Critical Checklist

**Headless Layer**:
- [ ] `types.ts` defines `UiSlot` and `Ui` types
- [ ] `context.ts` exports `provide{ComponentName}Ui` and `use{ComponentName}Ui`
- [ ] Component SFCs use `use{ComponentName}Ui(slot)` to get styles
- [ ] No `<style>` blocks, no UnoCSS classes, no inline styles
- [ ] No `@soybeanjs/ui` imports (circular dependency)

**UI Layer**:
- [ ] `variants.ts` has `// @unocss-include` at top
- [ ] `variants` slots match headless `UiSlot` exactly
- [ ] Use `useOmitProps` to filter UI-only props
- [ ] Use `provide{ComponentName}Ui` to inject styles
- [ ] Component name has `S` prefix
- [ ] No business logic/ARIA state (belongs to headless)

---

## Core Utilities

| Function | Source | Purpose |
|---|---|---|
| `useContext` | `headless/composables` | Create `[provide, inject]` pairs |
| `useUiContext` | `headless/composables` | UI↔headless style bridge |
| `useOmitProps` | `headless/composables` | Filter props before forwarding |
| `useForwardListeners` | `headless/composables` | Forward event listeners |
| `useControllableState` | `headless/composables` | Controlled/uncontrolled state |
| `useForwardElement` | `headless/composables` | DOM ref forwarding |
| `cn` | `@/theme/merge` | Class merge (`twMerge + clsx`) |
| `mergeSlotVariants` | `@/theme/shared` | Merge tv() output with UI context |

---

## Anti-Patterns (Forbidden)

| Layer | Forbidden |
|---|---|
| **Headless** | Add styles/classes (including `hidden`) |
| **Headless** | Import from `@soybeanjs/ui` |
| **Headless** | Direct DOM manipulation (use `useForwardElement`) |
| **UI** | Business logic/ARIA state |
| **UI** | Redefine headless props (extend them) |
| **All** | Use `as any` / `@ts-ignore` / `@ts-expect-error` |
| **All** | Raw CSS/SCSS (use UnoCSS classes) |

---

## File Order Template

```
headless/src/components/{component}/
├── types.ts       # Define types first
├── context.ts     # Create context
├── *.vue          # Implement SFCs
└── index.ts       # Export last

src/components/{component}/
├── variants.ts    # Define variants first
├── types.ts       # Define UI types
├── {component}.vue # Implement wrapper
└── index.ts       # Export last
```
