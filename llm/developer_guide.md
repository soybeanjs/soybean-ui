# SoybeanUI 组件开发深度指南 (AI 专用版)

本指南专为 AI 模型设计，旨在提供标准化的代码模板和明确的步骤，以生成符合 SoybeanUI 架构规范的高质量组件代码。

## 1. 项目架构概览

SoybeanUI 采用 **Headless UI (逻辑层)** 与 **Styled UI (表现层)** 分离的架构模式。

### 1.1 核心分层

- **Headless 层 (`headless/`)**:
  - **职责**: 负责组件的状态管理、交互逻辑、无障碍访问 (A11y) 和 DOM 结构。
  - **原则**: **严禁包含任何 CSS 样式**。只关注功能，不关注长相。
  - **技术**: Vue 3 (Composition API), TypeScript.
- **UI 层 (`src/`)**:
  - **职责**: 负责组件的视觉样式、主题变体、动画效果。
  - **原则**: 依赖 Headless 层提供的逻辑组件，通过 `tailwind-variants` 注入样式。
  - **技术**: Vue 3, Tailwind CSS (UnoCSS), Tailwind Variants.

### 1.2 依赖关系

`UI 层` -> `Headless 层` (单向依赖)

---

## 2. 目录结构详解

```
soybean-ui/
├── headless/                 # [逻辑层] Headless 组件库 workspace
│   └── src/
│       ├── components/       # Headless 组件源码
│       │   └── {component}/  # 单个组件目录
│       │       ├── {component}-root.vue  # 根组件
│       │       ├── {component}-item.vue  # 子组件
│       │       ├── context.ts            # 依赖注入上下文
│       │       ├── types.ts              # 类型定义
│       │       └── index.ts              # 导出文件
│       ├── composables/      # 共享组合式函数 (useContext, useId 等)
│       └── primitive/        # 基础图元组件
├── src/                      # [表现层] UI 组件库 workspace
│   ├── components/           # UI 组件源码
│   │   └── {component}/      # 单个组件目录
│   │       ├── {component}.vue # UI 组件实现
│   │       ├── types.ts        # UI 组件类型定义
│   │       ├── context.ts      # (可选) UI 层上下文
│   │       └── index.ts        # 导出文件
│   ├── variants/             # [关键] 样式变体定义
│   │   └── {component}.ts    # 使用 tailwind-variants 定义样式
│   └── theme/                # 主题配置与工具函数
├── package.json              # 项目根配置
└── uno.config.ts             # UnoCSS 配置
```

---

## 3. 开发流程与代码规范

开发一个新组件通常分为两个阶段：首先实现 Headless 逻辑，然后实现 UI 样式。

---

### 第一阶段：Headless 层开发 (`headless/src/components/{component}/`)

#### 1. 定义类型 (`types.ts`)

**目标**: 定义组件的 Props, Emits, Context 参数以及样式槽 (Theme Slots)。

```typescript
import type { ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type {
  ClassValue,
  PropsToContext,
  // 如果需要 v-model 支持
  // SelectionEmits,
  // SelectionProps
} from '../../types';

// 1. Root Props
// 通常继承 HTMLAttributes
// 如果支持 v-model，继承 SelectionProps<M>
export interface {ComponentName}RootProps extends /** @vue-ignore */ HTMLAttributes {
  disabled?: boolean;
  // 其他逻辑属性...
}

// 2. Emits
// 如果支持 v-model，使用 SelectionEmits<M>
export type {ComponentName}RootEmits = {
  // 自定义事件
};

// 3. Context Params
// 使用 PropsToContext 提取需要注入给子组件的 Props
export interface {ComponentName}RootContextParams
  extends PropsToContext<{ComponentName}RootProps, 'disabled'> {
  rootElement: ShallowRef<HTMLElement | undefined>;
  // 其他共享状态...
}

// 子组件 Context Params (如果有)
export interface {ComponentName}ItemContextParams {
  // ...
}

// 4. Ui Slots (关键)
// 定义组件中所有需要样式的部分
export type {ComponentName}UiSlot = 'root' | 'trigger' | 'content' | 'item';

// 5. UI 类型
export type {ComponentName}Ui = Record<{ComponentName}UiSlot, ClassValue>;
```

#### 2. 定义上下文 (`context.ts`)

**目标**: 创建类型安全的 Provide/Inject 对。

```typescript
import { computed, shallowRef, useId } from 'vue';
import { useContext, useUiContext, useForwardElement } from '../../composables';
import type {
  {ComponentName}RootContextParams,
  {ComponentName}UiSlot
} from './types';

// Root Context
export const [provide{ComponentName}RootContext, use{ComponentName}RootContext] = useContext(
  '{ComponentName}Root',
  (params: {ComponentName}RootContextParams) => {
    // 在这里处理派生状态，例如 disabled 状态传递
    return params;
  }
);

// Ui Context (必须)
export const [provide{ComponentName}Ui, use{ComponentName}Ui] = useUiContext<{ComponentName}UiSlot>('{ComponentName}Ui');
```

#### 3: 实现组件 (`{component}-root.vue`, `{component}-item.vue`)

**目标**: 初始化状态，提供 Context，渲染根元素。

**规则**:

- 使用 `defineOptions({ name: '{ComponentName}Root' })`。
- **不要**写 `<style>`。
- 使用 `use{ComponentName}Ui` 获取样式并应用。
- 使用 `transformPropsToContext` 传递 Props。

**Root 组件示例**:

```vue
<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { transformPropsToContext } from '../../shared';
import { provide{ComponentName}RootContext, use{ComponentName}Ui } from './context';
import type { {ComponentName}RootProps, {ComponentName}RootEmits } from './types';

defineOptions({
  name: '{ComponentName}Root'
});

const props = withDefaults(defineProps<{ComponentName}RootProps>(), {
  disabled: false
});

const emit = defineEmits<{ComponentName}RootEmits>();

// 1. 获取样式
const cls = use{ComponentName}Ui('root');

// 2. 元素引用
const rootElement = shallowRef<HTMLElement>();

// 3. 提供 Context
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

**Item 组件示例**:

**目标**: 消费 Context，渲染子元素。

```vue
<script setup lang="ts">
import { computed } from 'vue';
import { use{ComponentName}RootContext, use{ComponentName}Ui } from './context';

defineOptions({
  name: '{ComponentName}Item'
});

const rootContext = use{ComponentName}RootContext();

// 获取对应 Slot 的样式
const cls = use{ComponentName}Ui('item');
</script>

<template>
  <div :class="cls">
    <slot />
  </div>
</template>
```

#### 5. 导出 Headless 组件 (`index.ts`)

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

---

### 第二阶段：UI 层开发 (`src/components/{component}/`)

#### 1. 定义样式变体 (`src/variants/{component}.ts`)

**目标**: 使用 Tailwind CSS 定义组件样式。

```typescript
// @unocss-include
import { tv } from 'tailwind-variants';

export const {componentName}Variants = tv({
  // 这里的 key 必须与 Headless types.ts 中的 UiSlot 一致
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
    },
    // 其他变体...
  },
  defaultVariants: {
    size: 'md'
  }
});
```

#### 2. 定义 UI 类型 (`src/components/{component}/types.ts`)

**目标**: 扩展 Headless Props，添加 UI 属性。

```typescript
import type {
  {ComponentName}RootProps,
  {ComponentName}RootEmits,
  {ComponentName}Ui
} from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

// 扩展 UI 类型 (如果 UI 层有额外的 slot)
// export type {ComponentName}ExtendedUi = {ComponentName}Ui & { extraSlot: ClassValue };

export type {ComponentName}Props = {ComponentName}RootProps & {
  size?: ThemeSize;
  // 允许用户覆盖样式
  ui?: Partial<{ComponentName}Ui>;
};

export type {ComponentName}Emits = {ComponentName}RootEmits;
```

#### 3. 实现 UI 组件 (`src/components/{component}/{component}.vue`)

**目标**: 组合 Headless 组件，注入样式 Context。

**规则**:

- 组件名以 `S` 开头 (e.g., `SButton`)。
- 使用 `useOmitProps` 分离 UI Props 和 Headless Props。
- 使用 `useForwardListeners` 转发事件。
- 使用 `provide{ComponentName}Ui` 注入计算好的样式。

```vue
<script setup lang="ts">
import { computed } from 'vue';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import {
  {ComponentName}Root,
  provide{ComponentName}Ui
} from '@soybeanjs/headless';
import { {componentName}Variants } from '@/variants/{component}';
import { mergeSlotVariants } from '@/theme';
import type { {ComponentName}Props, {ComponentName}Emits } from './types';

defineOptions({
  name: 'S{ComponentName}'
});

const props = defineProps<{ComponentName}Props>();
const emit = defineEmits<{ComponentName}Emits>();

// 1. 分离 Props
// 剔除 size, ui 等 UI 专属属性，剩下的传给 Headless Root
const forwardedProps = useOmitProps(props, ['size', 'ui']);

// 2. 转发事件
const listeners = useForwardListeners(emit);

// 3. 计算样式
const ui = computed(() => {
  const variants = {componentName}Variants({
    size: props.size
  });
  // 合并用户自定义的 ui prop
  return mergeSlotVariants(variants, props.ui);
});

// 4. 提供样式 Context
provide{ComponentName}Ui(ui);
</script>

<template>
  <{ComponentName}Root v-bind="forwardedProps" v-on="listeners">
    <slot />
  </{ComponentName}Root>
</template>
```

#### 4. 导出 UI 组件 (`index.ts`)

```typescript
export { default as S{ComponentName} } from './{component}.vue';
export * from './types';
```

---

## 常用工具函数参考

在 `headless/src/composables` 中可用：

| 函数名                 | 用途                                      |
| :--------------------- | :---------------------------------------- |
| `useContext`           | 创建 Provide/Inject 对。                  |
| `useForwardElement`    | 在组件间传递 DOM 元素引用。               |
| `useForwardListeners`  | 转发事件监听器。                          |
| `useOmitProps`         | 剔除 Props 中的特定属性，返回响应式对象。 |
| `useSelection`         | 处理 v-model 选择逻辑 (单选/多选)。       |
| `useControllableState` | 处理受控/非受控状态。                     |

## 关键注意事项

1.  **Headless**: `types.ts` 定义了 `UiSlot` 和 `Ui` 类型？
2.  **Headless**: `context.ts` 导出了 `UiContext`？
3.  **Props 透传**: 使用 `useOmitProps` 确保 UI 特有的 Props (如 `size`, `variant`) 不会被透传到 DOM 节点上导致 HTML 属性污染。
4.  **事件转发**: 使用 `useForwardListeners` 确保组件上的事件监听器能正确绑定到 Headless 组件内部的元素上。
5.  **Slot 一致性**: `headless/**/types.ts` 中的 `UiSlot` 定义必须与 `src/variants/**.ts` 中的 `slots` 键名完全一致。
6.  **Headless**: 组件内部使用了 `use{ComponentName}Ui` 获取样式？
7.  **UI**: `variants` 定义了所有 `UiSlot`？
8.  **UI**: 组件使用了 `useOmitProps` 过滤 UI 属性？
9.  **UI**: 组件提供了 `UiContext`？
10. **命名规范**:
    - Headless 组件: `{ComponentName}Root`, `{ComponentName}Item`
    - UI 组件: `S{ComponentName}` (S 前缀)
    - Context: `provide{ComponentName}Context`, `use{ComponentName}Context`
