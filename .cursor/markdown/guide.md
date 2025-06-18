# SoybeanHeadless Component Development Handbook

This handbook provides a comprehensive, step-by-step guide for developing both headless and UI components in the SoybeanHeadless project. It preserves the original structure, code, and best practices from the project's internal documentation.

---

## 1. Headless Components

### Project Structure

```
src/
├── components/
├── composables/
├── constants/
├── shared/
├── types/
└── index.ts
```

### Example: Accordion Component Structure

```
src/components/accordion/
├── accordion-content.vue
├── accordion-header.vue
├── accordion-item.vue
├── accordion-root.vue
├── accordion-trigger.vue
├── context.ts
├── index.ts
├── shared.ts
├── types.ts
```

### File-by-File Guide

#### types.ts

1. Import order:

   - Third-party types (e.g. `vue`)
   - Common types from `../../types`
   - Base component types

   ```ts
   import type { CollapsibleRootProps } from '../collapsible/types';
   import type { PrimitiveProps } from '../primitive/types';
   ```

2. Define props and emits types, context params, theme context, slot types:

   ```ts
   export interface AccordionHeaderProps extends /** @vue-ignore */ HTMLAttributes {}
   export interface AccordionRootContextParams
     extends PropsToContext<AccordionRootProps, 'collapsible' | 'disabled' | 'orientation' | 'unmountOnHide'> {
     rootElement: Ref<HTMLElement | null | undefined>;
     modelValue: Ref<AcceptableValue | NonNullable<AcceptableValue>[]>;
     isSingle: ComputedRef<boolean>;
     toggleModelValue: (value: NonNullable<AcceptableValue>) => void;
     direction: ComputedRef<Direction>;
   }
   export type AccordionSlot = 'root' | 'item' | 'header' | 'trigger' | 'content';
   export interface AccordionThemeContextParams {
     ui: ComputedRef<Record<AccordionSlot, ClassValue>>;
   }
   ```

3. Use `PropsToContext` for context types:

   ```ts
   PropsToContext<AccordionRootProps, 'collapsible' | 'disabled' | 'orientation' | 'unmountOnHide'>;
   ```

4. Export alias types if needed:
   ```ts
   import type {
     CollapsibleContentProps as AccordionContentProps,
     CollapsibleTriggerProps as AccordionTriggerProps
   } from '../collapsible/types';
   export type { AccordionContentProps, AccordionTriggerProps };
   ```

#### shared.ts

- Store constants and pure functions for the component:

  ```ts
  export const accordionContentCssVars = {
    width: '--soybean-accordion-content-width',
    height: '--soybean-accordion-content-height'
  };
  ```

#### context.ts

- Define context and theme context using `useContext`:

  ```ts
  import { useContext } from '../../composables';
  import type { AccordionRootContextParams } from './types';
  export const [provideAccordionRootContext, useAccordionRootContext] = useContext(
    'AccordionRoot',
    (params: AccordionRootContextParams) => params
  );
  ```

#### Component Files (e.g. accordion-content.vue)

- Use script setup, generics if needed:

  ```vue
  <script
    setup
    lang="ts"
    generic="T extends AcceptableValue | NonNullable<AcceptableValue>[], S extends SingleOrMultipleType"
  >
  ```

- Import order:

  1. Third-party (vue)
  2. Composables from `../../composables`
  3. Types from `../../types`
  4. Shared utils from `../../shared`
  5. Local context/types

- Use `defineOptions`:

  ```ts
  defineOptions({ name: 'AccordionContent' });
  ```

- Define props, emits, context, theme context, provide context, use hooks:

  ```ts
  const props = withDefaults(defineProps<AccordionRootProps<T, S>>(), {
    disabled: false,
    orientation: 'vertical',
    collapsible: false,
    unmountOnHide: true
  });
  const emit = defineEmits<AccordionRootEmits<T, S>>();
  const { orientation } = useAccordionRootContext('AccordionContent');
  const themeContext = useAccordionThemeContext();
  const cls = computed(() => [themeContext?.ui?.value?.content, props.class]);
  const forwardedProps = useOmitProps(props, ['class', ...]);
  ```

- Template example:

  ```vue
  <div v-bind="forwardedProps" ref="rootElement" :class="cls">
    <slot :model-value="modelValue" />
  </div>
  ```

- **Notes:**
  - No `<style>` tag in the template.
  - Use `transformPropsToContext` to map props to context if needed.
  - Use `useControllableState` for v-model props.
  - Use `useForwardElement` for element refs.

#### index.ts

- Import and export all parts:

  ```ts
  import AccordionRoot from './accordion-root.vue';
  import AccordionItem from './accordion-item.vue';
  import AccordionTrigger from './accordion-trigger.vue';
  import AccordionHeader from './accordion-header.vue';
  import AccordionContent from './accordion-content.vue';
  export { AccordionRoot, AccordionItem, AccordionTrigger, AccordionHeader, AccordionContent };
  export { provideAccordionThemeContext } from './context';
  export type {
    AccordionRootProps,
    AccordionRootEmits,
    AccordionItemProps,
    AccordionTriggerProps,
    AccordionHeaderProps,
    AccordionContentProps,
    AccordionSlot
  } from './types';
  ```

- In `src/index.ts`:
  ```ts
  export * from './components/accordion';
  ```

---

## 2. UI Components

### Project Structure

```
ui/
├── components/
├── theme/
├── variants/
├── index.ts
```

### Example: Accordion UI Component

```
ui/components/accordion/
├── accordion.vue
├── index.ts
├── types.ts
```

#### types.ts

1. Import order:

   - Third-party (vue)
   - From `@headless`
   - From `@theme`
   - From `@variants`
   - Base component types

2. Define UI types, combined props, emits:
   ```ts
   export type AccordionUi = Partial<Record<AccordionSlot | 'triggerLeadingIcon' | 'triggerIcon', ClassValue>>;
   export interface AccordionItemData extends Pick<AccordionItemProps, 'value' | 'disabled'> {
     title?: string;
     description?: string;
     icon?: VNode | Component | string;
   }
   export type AccordionProps<
     T = AccordionItemData,
     V = AcceptableValue | NonNullable<AcceptableValue>[],
     S = SingleOrMultipleType
   > = AccordionRootProps<V, S> & {
     size?: ThemeSize;
     ui?: AccordionUi;
     items: T[];
     itemProps?: AccordionItemProps;
     headerProps?: AccordionHeaderProps;
     triggerProps?: AccordionTriggerProps;
     contentProps?: AccordionContentProps;
   };
   export type AccordionEmits<T = AcceptableValue | NonNullable<AcceptableValue>[]> = AccordionRootEmits<T>;
   ```

#### accordion.vue

- Use script setup, generics if needed:

  ```vue
  <script
    setup
    lang="ts"
    generic="T extends AccordionItemData = AccordionItemData, V extends AcceptableValue | NonNullable<AcceptableValue>[] = AcceptableValue | NonNullable<AcceptableValue>[], S extends SingleOrMultipleType = SingleOrMultipleType"
  >
  ```

- Import order:

  1. Third-party (vue)
  2. From `@headless`
  3. From `@headless/composables`
  4. From `@headless/shared`
  5. From `@theme`
  6. From `@variants`
  7. Base components
  8. Local types

- Use `defineOptions`:

  ```ts
  defineOptions({ name: 'SAccordion' });
  ```

- Define props, emits, use hooks, provide theme context:

  ```ts
  const props = withDefaults(defineProps<CollapsibleProps>(), {
    open: undefined,
    defaultOpen: false,
    unmountOnHide: true
  });
  const emit = defineEmits<CollapsibleEmits>();
  const forwardedProps = useOmitProps(props, ['class', 'size', 'ui']);
  const listeners = useForwardListeners(emit);
  const ui = computed(() => {
    const variants = accordionVariants({ size: props.size });
    return mergeSlotVariants(variants, props.ui);
  });
  provideAccordionThemeContext({ ui });
  ```

- Template example:
  ```vue
  <AccordionRoot v-bind="forwardedProps" v-on="listeners">
    <template v-for="item in props.items" :key="item.value">
      <slot name="item" :item="item" :model-value="modelValue">
        <AccordionItem v-slot="{ open }" v-bind="props.itemProps" :value="item.value" :disabled="item.disabled">
          <AccordionHeader v-bind="props.headerProps">
            <AccordionTrigger v-bind="props.triggerProps">
              <slot name="leading" :item="item" :model-value="modelValue" :open="open">
                <slot :class="ui.triggerLeadingIcon">
                  <Icon v-if="typeof item.icon === 'string'" :icon="item.icon" />
                  <component :is="item.icon" v-else />
                </slot>
              </slot>
              <slot name="title" :item="item" :model-value="modelValue" :open="open">{{ item.title }}</slot>
              <slot :class="ui.triggerIcon">
                <slot name="trigger-icon" :item="item" :model-value="modelValue" :open="open">
                  <Icon icon="lucide:chevron-down" />
                </slot>
              </slot>
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent v-bind="props.contentProps">
            <slot name="content" :item="item" :model-value="modelValue" :open="open">
              <p :class="ui.description">{{ item.description }}</p>
            </slot>
          </AccordionContent>
        </AccordionItem>
      </slot>
    </template>
  </AccordionRoot>
  ```

#### index.ts

```ts
export * from '@headless/components/accordion';
export { default as SAccordion } from './accordion.vue';
export type * from './types';
```

- In `ui/index.ts`:
  ```ts
  export * from './components/accordion';
  ```

---

## 3. Example Development

### Project Structure

```
playground/src/examples/
├── accordion/
├── button/
├── checkbox/
├── dropdown/
├── input/
├── radio/
├── select/
```

### Example: Accordion

```
playground/src/examples/accordion/
├── custom-icon.vue
├── custom-styling.vue
├── index.vue
├── multiple.vue
├── single.vue
├── size.vue
```

#### Example index.vue

```vue
<script setup lang="ts">
import { SCard } from '@ui';
import DemoAccordionSingle from './single.vue';
import DemoAccordionMultiple from './multiple.vue';
import DemoAccordionSize from './size.vue';
import DemoAccordionCustomIcon from './custom-icon.vue';
import DemoAccordionCustomStyling from './custom-styling.vue';
</script>

<template>
  <SCard title="Accordion" :ui="{ content: 'flex-c gap-3' }">
    <DemoAccordionSingle />
    <DemoAccordionMultiple />
    <DemoAccordionSize />
    <DemoAccordionCustomIcon />
    <DemoAccordionCustomStyling />
  </SCard>
</template>
```

---

## Best Practices & Checklist

- Use TypeScript for all code
- Favor functional components and composition API
- Use proper naming conventions:
  - Lowercase with dashes for directories
  - PascalCase for component names
  - Prefix UI components with 'S'
- Implement type safety
- Use composables for shared logic
- Implement theme support
- Write clear documentation and examples

### Component Development Checklist

- [ ] Create component directory structure
- [ ] Define types and interfaces
- [ ] Implement context if needed
- [ ] Create component files
- [ ] Add documentation
- [ ] Create examples
- [ ] Test functionality
- [ ] Review code quality
