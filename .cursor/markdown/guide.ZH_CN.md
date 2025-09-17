# SoybeanHeadless 组件开发手册

本手册详细介绍 SoybeanHeadless 项目中无头组件和 UI 组件的开发流程，最大程度还原原始内部文档的结构、代码、顺序和注意事项。

---

## 1. 无头组件（Headless Components）

### 项目结构

```
src/
├── components/
├── composables/
├── constants/
├── shared/
├── types/
└── index.ts
```

### 示例：Accordion 组件结构

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

### 各文件开发要点

#### types.ts

1. 导入顺序：
   - 第三方类型（如 `vue`）
   - 公共类型（`../../types`）
   - 基础组件类型

   ```ts
   import type { CollapsibleRootProps } from '../collapsible/types';
   import type { PrimitiveProps } from '../primitive/types';
   ```

2. 定义 props、emits、context、theme context、slot 类型：

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

3. 使用 `PropsToContext` 定义 context 类型：

   ```ts
   PropsToContext<AccordionRootProps, 'collapsible' | 'disabled' | 'orientation' | 'unmountOnHide'>;
   ```

4. 如有需要，导出别名类型：
   ```ts
   import type {
     CollapsibleContentProps as AccordionContentProps,
     CollapsibleTriggerProps as AccordionTriggerProps
   } from '../collapsible/types';
   export type { AccordionContentProps, AccordionTriggerProps };
   ```

#### shared.ts

- 存放组件常量、纯函数：

  ```ts
  export const accordionContentCssVars = {
    width: '--soybean-accordion-content-width',
    height: '--soybean-accordion-content-height'
  };
  ```

#### context.ts

- 使用 `useContext` 定义 context 和 theme context：

  ```ts
  import { useContext } from '../../composables';
  import type { AccordionRootContextParams } from './types';
  export const [provideAccordionRootContext, useAccordionRootContext] = useContext(
    'AccordionRoot',
    (params: AccordionRootContextParams) => params
  );
  ```

#### 组件文件（如 accordion-content.vue）

- 使用 script setup，必要时加泛型：

  ```vue
  <script
    setup
    lang="ts"
    generic="T extends AcceptableValue | NonNullable<AcceptableValue>[], S extends SingleOrMultipleType"
  >
  ```

- 导入顺序：
  1. 第三方（vue）
  2. 组合式函数（`../../composables`）
  3. 类型（`../../types`）
  4. 共享工具（`../../shared`）
  5. 本地 context/types

- 使用 `defineOptions`：

  ```ts
  defineOptions({ name: 'AccordionContent' });
  ```

- 定义 props、emits、context、theme context、provide context、hooks：

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
  const cls = computed(() => themeContext?.ui?.value?.content);
  const forwardedProps = useOmitProps(props, ['class', ...]);
  ```

- 模板示例：

  ```vue
  <div v-bind="forwardedProps" ref="rootElement" :class="cls">
    <slot :model-value="modelValue" />
  </div>
  ```

- **注意：**
  - 模板中不写 `<style>` 标签。
  - 如需，将 props 转 context 用 `transformPropsToContext`。
  - v-model 用 `useControllableState`。
  - 元素引用用 `useForwardElement`。

#### index.ts

- 导入并导出所有部分：

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

- 在 `src/index.ts`：
  ```ts
  export * from './components/accordion';
  ```

---

## 2. UI 组件

### 项目结构

```
ui/
├── components/
├── theme/
├── variants/
├── index.ts
```

### 示例：Accordion UI 组件

```
ui/components/accordion/
├── accordion.vue
├── index.ts
├── types.ts
```

#### types.ts

1. 导入顺序：
   - 第三方（vue）
   - `@headless`
   - `@theme`
   - `@variants`
   - 基础组件类型

2. 定义 UI 类型、组合 props、emits：
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

- 使用 script setup，必要时加泛型：

  ```vue
  <script
    setup
    lang="ts"
    generic="T extends AccordionItemData = AccordionItemData, V extends AcceptableValue | NonNullable<AcceptableValue>[] = AcceptableValue | NonNullable<AcceptableValue>[], S extends SingleOrMultipleType = SingleOrMultipleType"
  >
  ```

- 导入顺序：
  1. 第三方（vue）
  2. `@headless`
  3. `@headless/composables`
  4. `@headless/shared`
  5. `@theme`
  6. `@variants`
  7. 基础组件
  8. 本地类型

- 使用 `defineOptions`：

  ```ts
  defineOptions({ name: 'SAccordion' });
  ```

- 定义 props、emits、hooks、主题 context：

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

- 模板示例：
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

- 在 `ui/index.ts`：
  ```ts
  export * from './components/accordion';
  ```

---

## 3. 示例开发

### 项目结构

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

### 示例：Accordion

```
playground/src/examples/accordion/
├── custom-icon.vue
├── custom-styling.vue
├── index.vue
├── multiple.vue
├── single.vue
├── size.vue
```

#### 示例 index.vue

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

## 最佳实践与开发检查清单

- 所有代码使用 TypeScript
- 优先使用函数式组件和组合式 API
- 命名规范：
  - 目录用小写加中划线
  - 组件名用 PascalCase
  - UI 组件以 'S' 为前缀
- 类型安全
- 逻辑复用用组合式函数
- 支持主题
- 文档和示例要清晰

### 组件开发检查清单

- [ ] 创建组件目录结构
- [ ] 定义类型和接口
- [ ] 必要时实现上下文
- [ ] 创建组件文件
- [ ] 添加文档
- [ ] 创建示例
- [ ] 测试功能
- [ ] 代码质量审查
