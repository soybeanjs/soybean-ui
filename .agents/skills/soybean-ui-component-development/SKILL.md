---
name: soybean-ui-component-development
description: 'SoybeanUI 组件开发工作流。**在以下情况下使用**：新建组件（headless + UI 两层）、为现有组件添加功能、修复 bug、理解双层架构、添加 playground 示例、编写组件文档、实现无障碍（a11y）、适配 RTL 方向、编写单元测试。适用关键词：新建组件、添加 variant、headless、tailwind-variants、tv()、UiSlot、UiClass、provideXUi、useUiContext、useOmitProps、mergeSlotVariants、cn、playground、DataTable、TypeTable、组件文档、aria、role、a11y、无障碍、rtl、dir、Direction、useDirection、单元测试、vitest、vue-test-utils、axe-core、getA11yViolations、spec.ts。DO NOT USE FOR：纯路由/配置修改、样式主题调整。'
argument-hint: '可选：组件名，例如 button、dialog、select'
---

# SoybeanUI 组件开发

## 架构概览

| 层       | 包                                      | 职责                                         |
| -------- | --------------------------------------- | -------------------------------------------- |
| Headless | `@soybeanjs/headless` (`headless/src/`) | 逻辑、状态、a11y，零样式                     |
| UI       | `@soybeanjs/ui` (`src/`)                | 样式包装，UnoCSS + `tv()`，组件名加 `S` 前缀 |

**数据流**：`headless` → `src`（严禁反向）。样式通过 `provideXUi(ui)` 注入，headless 通过 `useUiContext` 读取。

两种组件模式：

- **多 slot 组件**（accordion、badge 等）：有 `UiSlot` + `UiClass`，使用 `mergeSlotVariants`
- **单类名组件**（button 等）：无 UiContext，直接用 `cn(variants, props.class)`

> **本地开发准备**：首次开发前运行 `pnpm stub`，将包源码链接到 `dist/`，使 `@soybeanjs/headless` 和 `@soybeanjs/ui` 的别名指向本地源码而非构建产物。

> **导入顺序**：所有 `.ts`/`.vue` 文件的 import 顺序由 [import-order.instructions.md](../../../../../../.github/instructions/import-order.instructions.md) 约束：`builtin → external → internal (@/) → parent (../) → sibling (./)→ index`，value import 在前、`import type` 紧随其后。`pnpm lint --fix` 会自动修正。

---

## Phase 1：Headless 层

目录：`headless/src/components/{component}/`

### 1. types.ts

```typescript
import type { HTMLAttributes, ShallowRef } from 'vue';
import type { UiClass } from '../../types';  // ← 用 UiClass，非 Record

// Props 必须 extend HTMLAttributes（加 @vue-ignore 抑制 IDE 类型噪音）
export interface {Name}RootProps extends /** @vue-ignore */ HTMLAttributes {
  disabled?: boolean;
  open?: boolean;
}

export type {Name}RootEmits = {
  'update:open': [open: boolean];
};

export interface {Name}RootContext {
  open: ShallowRef<boolean | undefined>;  // 受控状态用 ShallowRef
  disabled: ShallowRef<boolean>;
}

// UiSlot 必须与 variants.ts slots 完全一致
export type {Name}UiSlot = 'root' | 'trigger' | 'content';

export type {Name}Ui = UiClass<{Name}UiSlot>;
```

**关键类型速查**（来自 `headless/src/types/`）：

- `UiClass<S extends string>` = `Record<S, ClassValue>` — UI 样式映射
- `PropsToContext<T, K>` = `{ [P in K]: ComputedRef<T[P]> }` — props 转响应式 context
- `PrimitiveProps` — 多态 `as` prop（`as?: AsTag | Component`）
- `SelectionProps<M>` / `SelectionEmits<M>` — 通用单/多选 props（accordion 等用）
- `DataOrientation`, `Direction`, `DisclosureState` — 常用枚举类型

**复用全局类型（优先查 `headless/src/types/common.ts`）**

定义组件 props 或内部类型时，**先查 `common.ts` 是否已存在**，避免重复定义：

```typescript
// ✅ 直接复用 common.ts 中的 Side
import type { Side } from '../../types';

export interface SliderThumbProps extends /** @vue-ignore */ HTMLAttributes {
  side?: Side; // 'top' | 'right' | 'bottom' | 'left'
}

// ❌ 不要在 types.ts 中重新定义已有的通用类型
export type SliderSide = 'top' | 'right' | 'bottom' | 'left'; // ← 禁止
```

`common.ts` 常用类型一览：

| 类型              | 值                                            |
| ----------------- | --------------------------------------------- |
| `Side`            | `'top' \| 'right' \| 'bottom' \| 'left'`      |
| `Align`           | `'start' \| 'center' \| 'end'`                |
| `Placement`       | `Side` + 带方向修饰（`'top-start'` 等 12 个） |
| `DataOrientation` | `'vertical' \| 'horizontal'`                  |
| `Direction`       | `'ltr' \| 'rtl'`                              |
| `DisclosureState` | `'open' \| 'closed'`                          |
| `CheckedState`    | `boolean \| 'indeterminate'`                  |
| `AcceptableValue` | `string \| number \| null \| undefined`       |
| `MaybeArray<T>`   | `T \| T[]`                                    |
| `HorizontalSide`  | `'left' \| 'right'`                           |

**用 `PropsToContext` 定义 context 类型**

当 context 字段直接来自 props（通过 `transformPropsToContext` 传入），使用 `PropsToContext` 自动推导，而不是手写每个 `ComputedRef`：

```typescript
import type { ComputedRef, ShallowRef } from 'vue';
import type { PropsToContext } from '../../types';
import type { {Name}RootProps } from './types';

// ✅ 用 PropsToContext 推导来自 props 的 context 字段
export interface {Name}RootContext extends PropsToContext<{Name}RootProps, 'disabled' | 'orientation'> {
  // PropsToContext 自动生成：
  //   disabled: ComputedRef<boolean>
  //   orientation: ComputedRef<DataOrientation>
  open: ShallowRef<boolean>;   // 受控状态：用 ShallowRef（非 props 派生）
}

// ❌ 不要逐字段手写 ComputedRef
export interface {Name}RootContext {
  disabled: ComputedRef<boolean>;       // ← 重复劳动
  orientation: ComputedRef<DataOrientation>;
  open: ShallowRef<boolean>;
}
```

### 2. context.ts

```typescript
import { useContext, useUiContext } from '../../composables';
import type { {Name}RootContext, {Name}UiSlot } from './types';

// 基础 context
export const [provide{Name}RootContext, use{Name}RootContext] =
  useContext<{Name}RootContext>('{Name}Root');

// 样式 context（多 slot 组件必须）
export const [provide{Name}Ui, use{Name}Ui] =
  useUiContext<{Name}UiSlot>('{Name}Ui');
```

> `useContext` 第二个参数可传入 composable 函数，用于派生额外状态（见 accordion context.ts）。

### 3. \*.vue（SFC）

**获取 UI 类名的两种写法**：

```vue
<!-- 写法 A：直接获取单个 slot（简单场景） -->
<script setup lang="ts">
const cls = use{Name}Ui('root');  // 返回 ComputedRef<ClassValue>
</script>
<template><div :class="cls" /></template>

<!-- 写法 B：获取整个 UI map（需要向子组件传递子 slot 时） -->
<script setup lang="ts">
const ui = use{Name}Ui();         // 返回 ComputedRef<Partial<UiClass<UiSlot>>>
const cls = computed(() => ui?.value?.root);
</script>
<template><div :class="cls" /></template>
```

**完整 Root 示例**：

```vue
<script setup lang="ts">
import { useControllableState } from '../../composables';
import { transformPropsToContext } from '../../shared';
import { provide{Name}RootContext, use{Name}Ui } from './context';
import type { {Name}RootEmits, {Name}RootProps } from './types';

defineOptions({ name: '{Name}Root' });

const props = withDefaults(defineProps<{Name}RootProps>(), {
  open: undefined,
  disabled: false
});

const emit = defineEmits<{Name}RootEmits>();

const cls = use{Name}Ui('root');

const open = useControllableState(
  () => props.open,              // getter
  value => emit('update:open', value ?? false),  // setter
  true                           // defaultValue
);

provide{Name}RootContext({
  open,
  ...transformPropsToContext(props, ['disabled'])
});
</script>

<template>
  <div :class="cls">
    <slot />
  </div>
</template>
```

### 4. index.ts

```typescript
export { default as {Name}Root } from './{component}-root.vue';
export { default as {Name}Trigger } from './{component}-trigger.vue';

// 只导出 provideXUi（不导出 useXUi，后者仅供内部子组件使用）
export { provide{Name}Ui } from './context';

export type { {Name}RootProps, {Name}RootEmits, {Name}UiSlot, {Name}Ui } from './types';
```

然后在 `headless/src/index.ts` 中 re-export：

```typescript
export * from './components/{component}';
```

---

## Phase 2：UI 层

目录：`src/components/{component}/`

### 1. variants.ts

```typescript
// @unocss-include   ← 必须！UnoCSS 扫描标记（文件第一行）
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const {component}Variants = tv({
  slots: {
    root: 'relative inline-block',
    content: 'absolute flex items-center'   // ← key 必须与 {Name}UiSlot 一致
  },
  variants: {
    color: {
      primary: { content: 'bg-primary text-primary-foreground' },
      destructive: { content: 'bg-destructive text-destructive-foreground' }
      // 8 颜色：primary | destructive | success | warning | info | carbon | secondary | accent
    },
    size: {
      xs: { content: 'min-h-2 text-4xs' },
      sm: { content: 'min-h-2.5 text-3xs' },
      md: { content: 'min-h-3 text-2xs' },
      lg: { content: 'min-h-3.5 text-xs' },
      xl: { content: 'min-h-4 text-sm' },
      '2xl': { content: 'min-h-5 text-base' }
    }
  },
  defaultVariants: { size: 'md', color: 'primary' }
});

// 导出 VariantProps 供 types.ts 使用
export type {Name}VariantProps = VariantProps<typeof {component}Variants>;
```

### 2. types.ts

```typescript
import type { {Name}RootProps, {Name}RootEmits, {Name}Ui, ClassValue } from '@soybeanjs/headless';
import type { ThemeColor, ThemeSize } from '@/theme';

// 用 interface 而非 type；class?: ClassValue 是标准 prop
export interface {Name}Props extends {Name}RootProps {
  class?: ClassValue;          // 直接透传到 root slot
  color?: ThemeColor;
  size?: ThemeSize;
  ui?: Partial<{Name}Ui>;      // 用户自定义各 slot 样式
}

export type {Name}Emits = {Name}RootEmits;
```

> **扩展 UI slot**（如需在 UI 层添加 headless 没有的 slot）：
>
> ```typescript
> import type { UiClass } from '@soybeanjs/headless';
> export type {Name}ExtraSlot = 'leadingIcon' | 'trailingIcon';
> export type {Name}ExtendedUi = UiClass<{Name}UiSlot | {Name}ExtraSlot>;
> ```

### 3. {component}.vue

**多 slot 组件（有 UiContext）**：

```vue
<script setup lang="ts">
import { computed } from 'vue';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { {Name}Root, provide{Name}Ui } from '@soybeanjs/headless';
import { mergeSlotVariants } from '@/theme';
import { {component}Variants } from './variants';
import type { {Name}Emits, {Name}Props } from './types';

defineOptions({ name: 'S{Name}' });  // S 前缀必须

const props = defineProps<{Name}Props>();
const emit = defineEmits<{Name}Emits>();

// 从转发 props 中剔除 UI 专属 prop（含 class）
const forwardedProps = useOmitProps(props, ['class', 'color', 'size', 'ui']);
const listeners = useForwardListeners(emit);

const ui = computed(() => {
  const variants = {component}Variants({ color: props.color, size: props.size });
  // 第三个参数将 class prop 合并到 root slot
  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provide{Name}Ui(ui);
</script>

<template>
  <{Name}Root v-bind="forwardedProps" v-on="listeners">
    <slot />
  </{Name}Root>
</template>
```

**单类名组件（无 UiContext，如 Button）**：

```vue
<script setup lang="ts">
import { computed } from 'vue';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { Button } from '@soybeanjs/headless';
import { cn } from '@/theme';
import { buttonVariants } from './variants';

defineOptions({ name: 'SButton' });

const props = defineProps<ButtonProps>();
const emit = defineEmits<ButtonEmits>();

const forwardedProps = useOmitProps(props, ['class', 'color', 'size', 'variant']);

const cls = computed(() => cn(buttonVariants({ color: props.color, size: props.size }), props.class));
</script>

<template>
  <Button v-bind="forwardedProps" :class="cls" @click="emit('click', $event)">
    <slot />
  </Button>
</template>
```

### 4. index.ts

```typescript
export { default as S{Name} } from './{component}.vue';

// 从 headless 子路径 re-export headless 类型（不用从根路径）
export type {
  {Name}RootProps,
  {Name}RootEmits,
  {Name}UiSlot,
  {Name}Ui
} from '@soybeanjs/headless/{component}';

// 同时导出 UI 层自身的类型
export type * from './types';
```

然后在 `src/index.ts` 中 re-export：

```typescript
export * from './components/{component}';
```

---

## 无障碍（a11y）

**原则**：所有 ARIA 属性、role、tabindex、键盘交互均属于 headless 层职责。UI 层只负责视觉样式，严禁在 `src/` 中添加任何 ARIA 逻辑。

### 1. ARIA roles 与属性

在 headless SFC 的 `<template>` 中直接绑定，按照 [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/) 对应模式设置：

```vue
<template>
  <!-- 触发器：展开/折叠控件 -->
  <button :aria-expanded="open" :aria-disabled="disabled || undefined" :aria-controls="contentId">
    <slot />
  </button>

  <!-- 内容区：关联触发器 -->
  <div role="region" :aria-labelledby="triggerId" :data-state="open ? 'open' : 'closed'">
    <slot />
  </div>
</template>
```

**常用 ARIA 模式速查**：

| 组件类型  | role                 | 关键 ARIA 属性                                                      |
| --------- | -------------------- | ------------------------------------------------------------------- |
| 展开/折叠 | `region`             | `aria-expanded`, `aria-controls`, `aria-labelledby`                 |
| 选项卡    | `tab`/`tabpanel`     | `aria-selected`, `aria-controls`, `aria-labelledby`                 |
| 复选框    | `checkbox`           | `aria-checked`, `aria-required`, `aria-invalid`                     |
| 单选框组  | `radiogroup`/`radio` | `aria-checked`                                                      |
| 对话框    | `dialog`             | `aria-modal="true"`, `aria-labelledby`, `aria-describedby`          |
| 进度条    | `progressbar`        | `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-valuetext` |
| 列表框    | `listbox`/`option`   | `aria-selected`, `aria-activedescendant`                            |
| 菜单      | `menu`/`menuitem`    | `aria-haspopup`, `aria-expanded`                                    |

### 2. data-state 状态反射

组件状态通过 `data-state` 属性暴露，供 CSS 选择器和测试工具使用（**不要用 class 传状态**）：

```typescript
// shared/get-disclosure-state.ts 中的工具函数
const dataState = computed(() => (open.value ? 'open' : 'closed'));
// → 动画 CSS: [data-state="open"] { ... }  [data-state="closed"] { ... }
```

常见值：`'open' | 'closed'`、`'checked' | 'unchecked' | 'indeterminate'`、`'active' | 'inactive'`、`'disabled'`。

### 3. useId() 关联 ID

需要 `aria-labelledby` / `aria-controls` 关联时，用 Vue 内置 `useId()` 生成唯一 ID：

```typescript
import { useId } from 'vue';

// 在 context.ts 的工厂函数中
const triggerId = shallowRef('');
const contentId = shallowRef('');

const initTriggerId = () => {
  if (triggerId.value) return;
  triggerId.value = `soybean-{component}-trigger-${useId()}`;
};
```

### 4. 隐藏装饰性元素

纯装饰性图标或重复内容，标记 `aria-hidden="true"` 让屏幕阅读器跳过：

```vue
<Icon aria-hidden="true" />
<span class="sr-only">无障碍描述文字</span>
<!-- UnoCSS sr-only 等价 -->
```

### 5. 键盘导航

- 使用 `useArrowNavigation` composable 处理方向键导航（已内置 RTL 支持）
- 使用 RovingFocus 组组件管理焦点漫游（Tab/Arrow 键）
- 对话框/弹层需要焦点陷阱（FocusTrap），参考 dialog 组件实现
- 所有可交互元素必须在 Tab 键序中可达，或通过 `tabindex="-1"` 显式管理

---

## RTL 方向适配

RTL 适配跨越两层：headless 层提供 `dir` 状态与 `:dir` 属性绑定，UI 层在 variants.ts 中使用 UnoCSS `rtl:` 修饰符。

> **何时需要 RTL 支持**：包含水平方向布局、方向图标（箭头、chevron）、定位（left/right）、动画（translateX）的组件。

### Headless 层

**types.ts** — 添加 `dir` prop：

```typescript
import type { Direction } from '../../types';  // 'ltr' | 'rtl'

export interface {Name}RootProps extends /** @vue-ignore */ HTMLAttributes {
  dir?: Direction;
}
```

**context.ts** — 用 `useDirection()` 解析方向，自动继承全局 `ConfigProvider.dir`：

```typescript
import { useDirection } from '../config-provider/context';

export const [provide{Name}RootContext, use{Name}RootContext] = useContext(
  '{Name}Root',
  (params: {Name}RootContextParams) => {
    const dir = useDirection(params.dir);  // ComputedRef<'ltr' | 'rtl'>
    // ...
    return { dir, ... };
  }
);
```

**{component}-root.vue** — 绑定 `:dir` 属性到根元素（浏览器据此自动调整文本方向）：

```vue
<template>
  <div :class="cls" :dir="dir" :data-direction="dir">
    <slot />
  </div>
</template>
```

> `dir` 通过 `transformPropsToContext(props, ['dir', ...])` 传入 context，或直接传入 `useDirection(params.dir)` 的响应式 getter。

### UI 层

**variants.ts** — 使用 UnoCSS `rtl:` 修饰符翻转方向相关的类：

```typescript
// @unocss-include
export const {component}Variants = tv({
  slots: {
    root: [
      'flex items-center gap-2',
      'rtl:flex-row-reverse',   // 翻转水平 flex 方向
    ],
    icon: [
      'ml-1',
      'rtl:ml-0 rtl:mr-1',      // 翻转 margin 方向
    ],
    arrow: [
      'rotate-0',
      'rtl:rotate-180',          // 翻转箭头图标
    ]
  }
});
```

**常用 RTL 类替换规则**：

| LTR 类            | RTL 对应写法                  | 说明            |
| ----------------- | ----------------------------- | --------------- |
| `ml-{n}`          | `rtl:ml-0 rtl:mr-{n}`         | 左侧外距 → 右侧 |
| `pl-{n}`          | `rtl:pl-0 rtl:pr-{n}`         | 左侧内距 → 右侧 |
| `left-{n}`        | `rtl:left-auto rtl:right-{n}` | 定位方向翻转    |
| `flex-row`        | `rtl:flex-row-reverse`        | flex 行方向翻转 |
| `text-left`       | `rtl:text-right`              | 文字对齐翻转    |
| `translate-x-{n}` | `rtl:-translate-x-{n}`        | 水平平移翻转    |
| `border-l`        | `rtl:border-l-0 rtl:border-r` | 边框方向翻转    |

> **推荐**：优先使用 UnoCSS 逻辑属性（`ms-{n}`/`me-{n}` = margin-inline-start/end，`ps-{n}` = padding-inline-start），写一次即自动适配 LTR/RTL：
>
> ```
> ms-2      → LTR: ml-2 | RTL: mr-2（自动适配，无需 rtl: 前缀）
> ps-4      → LTR: pl-4 | RTL: pr-4
> start-0   → LTR: left-0 | RTL: right-0
> ```

---

## 核心工具速查

| 工具                      | 来源                   | 用途                                           |
| ------------------------- | ---------------------- | ---------------------------------------------- |
| `useContext`              | `headless/composables` | 创建 provide/inject 对，支持派生状态           |
| `useUiContext`            | `headless/composables` | UI↔headless 样式桥，返回 `[provideUi, useUi]`  |
| `useOmitProps`            | `headless/composables` | 过滤 props（含 `class`）后转发                 |
| `useForwardListeners`     | `headless/composables` | 转发 emit 事件给 headless 组件                 |
| `useControllableState`    | `headless/composables` | 受控/非受控 prop 模式                          |
| `useForwardElement`       | `headless/composables` | 暴露内部 DOM ref 给父组件                      |
| `transformPropsToContext` | `headless/shared`      | 将 props 转为 `ComputedRef` 形式的 context     |
| `mergeSlotVariants`       | `@/theme/shared`       | 合并 tv() slots + ui prop + class prop         |
| `cn`                      | `@/theme/merge`        | 单类名合并（twMerge + clsx），用于无 slot 组件 |

---

## Phase 3：注册到 barrel 文件与 constants

### 1. Barrel 文件

```typescript
// headless/src/index.ts
export * from './components/{component}';

// src/index.ts
export * from './components/{component}';
```

### 2. Components 常量注册

两个独立文件，**按字母顺序**插入新条目。

```typescript
// headless/src/constants/components.ts
// key = camelCase，值 = headless 导出的 PascalCase 组件名（无 S 前缀）
export const components = {
  // ...existing...
  {componentCamelCase}: ['{Name}Root', '{Name}Item', '{Name}Content'],
  // ...existing...
};

// src/constants/components.ts
// key = camelCase（与 headless 保持一致），值 = S 前缀的 UI 组件名
export const components = {
  // ...existing...
  {componentCamelCase}: ['S{Name}'],
  // ...existing...
};
```

**Key 命名规则**：camelCase，多词组合驼峰（`alertDialog`、`inputNumber`）。

**Headless 值**：该组件所有对外导出的 headless 子组件名，例如：

- `accordion` → `['AccordionRoot', 'AccordionItem', 'AccordionTrigger', 'AccordionHeader', 'AccordionContent']`
- `button` → `['Button']`（单组件时只有一个）

**UI 值**：`S{Name}` 以及所有变体组件（`SButtonLoading`、`SButtonIcon` 等）。

### 3. Namespaced 导出（`headless/src/namespaced/index.ts`）

该文件允许用户通过 `Headless.Accordion.Root` 形式使用组件。需要两处修改，**均按字母顺序插入**。

**① 在顶部 import 块中添加所有子组件**：

```typescript
// headless/src/namespaced/index.ts — 顶部大 import 块（按字母顺序）
import {
  // ...existing...
  {Name}Content,
  {Name}Item,
  {Name}Root,
  {Name}Trigger,
  // ...existing...
} from '../index';
```

**② 在文件底部导出 Namespace 对象**：

```typescript
// 按字母顺序，每个组件对应一个 const 导出
export const {Name} = {
  Root: {Name}Root,
  Item: {Name}Item,
  Trigger: {Name}Trigger,
  Content: {Name}Content
} as {
  Root: typeof {Name}Root;
  Item: typeof {Name}Item;
  Trigger: typeof {Name}Trigger;
  Content: typeof {Name}Content;
};
```

> 字段与 headless `index.ts` 导出的子组件一一对应；单组件（如 Button）只有一个 `Root` 字段。

---

## Phase 4：Playground 示例

目录：`playground/examples/{component}/`

### 目录规范

每个演示场景对应一个 `.vue` 文件，`index.vue` 作为入口汇总所有场景：

```
playground/examples/{component}/
├── index.vue        ← 入口：用 SCard 包裹所有子示例
├── basic.vue        ← 基础用法（必须有）
├── color.vue        ← 颜色变体（有 color prop 时）
├── size.vue         ← 尺寸变体（有 size prop 时）
├── disabled.vue     ← 禁用状态
└── custom-styling.vue  ← 自定义样式（ui prop）
```

> Playground 的路由**自动发现** `examples/**/index.vue`（排除 `_` 前缀目录）。新建目录后无需手动注册路由。

### index.vue 模板

```vue
<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import Demo{Name}Basic from './basic.vue';
import Demo{Name}Color from './color.vue';
import Demo{Name}Size from './size.vue';
import Demo{Name}Disabled from './disabled.vue';
</script>

<template>
  <SCard title="{Name}" split :ui="{ content: 'flex-c gap-4' }">
    <Demo{Name}Basic />
    <Demo{Name}Color />
    <Demo{Name}Size />
    <Demo{Name}Disabled />
  </SCard>
</template>
```

### 子示例模板

```vue
<script setup lang="ts">
import { S{Name} } from '@soybeanjs/ui';
import type { ThemeColor } from '@soybeanjs/ui';

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];
</script>

<template>
  <div>
    <h3 class="playground-title">Color</h3>
    <!-- ← 固定 class，文档系统会用 -->
    <div class="flex flex-wrap gap-3">
      <S{Name} v-for="color in colors" :key="color" :color="color">{{ color }}</S{Name}>
    </div>
  </div>
</template>
```

**规则**：

- 每个文件只演示**一个特性**，文件名即特性名（kebab-case）
- `<h3 class="playground-title">` 是固定写法，文档系统用于生成 Demo 标题
- 从 `@soybeanjs/ui` 导入，而非直接从源码路径
- 受控状态用 `ref`/`shallowRef`，数据用 `const`（不可变）

---

## Phase 5：组件文档

目录（中英文各一份）：

- `docs/src/docs/zh-CN/components/{component}.md`
- `docs/src/docs/en/components/{component}.md`

### 文档结构模板（中文）

````markdown
# {中文组件名}

## 概述

一句话描述组件的用途。

## 用法

```vue
<script setup lang="ts">
import { S{Name} } from '@soybeanjs/ui';
</script>

<template>
  <S{Name}>内容</S{Name}>
</template>
```

## 演示

```playground
basic
color
size
disabled
custom-styling
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: '根元素自定义类名' },
  { name: 'color', type: 'ThemeColor', default: `'primary'`, description: '颜色' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: '尺寸' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用' },
  { name: 'ui', type: 'Ui', default: '{}', description: '为内部元素自定义类名' },
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: string) => void', description: '值变更时触发' },
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '-', description: '默认内容', required: true },
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'Ui',
    description: '自定义类名映射',
    fields: [
      { name: 'root', type: 'string', description: '根容器类名' },
      { name: 'trigger', type: 'string', description: '触发器类名' },
      { name: 'content', type: 'string', description: '内容区域类名' },
    ],
  }
]"/>
````

### 关键规则

| 规则                       | 说明                                                   |
| -------------------------- | ------------------------------------------------------ |
| `playground` 代码块        | 内容为文件名（无扩展名），每行一个；顺序即文档展示顺序 |
| `DataTable preset="props"` | 固定写法，文档系统内置渲染器                           |
| `DataTable preset="emits"` | 事件表格                                               |
| `DataTable preset="slots"` | 插槽表格                                               |
| `TypeTable`                | 自定义类型说明表格                                     |
| `Ui` 类型字段              | 必须与 `{Name}UiSlot` 完全对应                         |
| 中英文同步                 | 两份 `.md` 内容结构相同，仅文字语言不同                |

### 侧边栏菜单注册（`docs/src/constants/menus.ts`）

组件文档写完后，**必须**将组件 key 加入 `docs/src/constants/menus.ts`，否则侧边导航中看不到该组件页面。

```typescript
// docs/src/constants/menus.ts
export const menuData: MenuData[] = [
  {
    value: 'general', // 分组 key
    i18n: 'sidebar.general', // i18n 键，对应 locales/zh-CN.yml 和 locales/en.yml
    items: ['configProvider', 'button', 'icon', 'link']
    //       ↑ camelCase，与文档文件名（kebab-case）一一对应
    //         e.g. 'alertDialog' → docs/zh-CN/components/alert-dialog.md
  }
  // ...
];
```

**分组归属速查**：

| 分组 key      | `i18n` 键              | 典型组件                        |
| ------------- | ---------------------- | ------------------------------- |
| `general`     | `sidebar.general`      | Button, Icon, Link              |
| `groupLayout` | `sidebar.layout`       | AspectRatio, Layout, Separator  |
| `navigation`  | `sidebar.navigation`   | Tabs, Breadcrumb, Pagination    |
| `forms`       | `sidebar.forms`        | Input, Checkbox, Select, Switch |
| `dataDisplay` | `sidebar.data_display` | Accordion, Card, Badge, Table   |
| `feedback`    | `sidebar.feedback`     | Alert, Toast                    |
| `overlay`     | `sidebar.overlay`      | Dialog, Popover, Tooltip        |
| `utilities`   | `sidebar.utilities`    | Arrow, VisuallyHidden           |

**操作步骤**：

1. 确定组件所属分组（见上表）
2. 将 camelCase 的组件 key **按字母顺序**插入对应分组的 `items` 数组
3. 无需修改 i18n 文件——文档标题直接从 `.md` 文件的一级标题读取

---

## Phase 6：单元测试

文件位置：`test/specs/components/{component}.spec.ts`

测试栈：**vitest** + **@vue/test-utils** + **axe-core**，运行环境 `happy-dom`。

### 测试结构模板

```typescript
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import S{Name} from '../../../src/components/{component}/{component}.vue';
import { getA11yViolations } from '../../shared/a11y';

describe('S{Name}', () => {
  describe('rendering', () => {
    it('renders default slot content', () => {
      const wrapper = mount(S{Name}, { slots: { default: 'Content' }, attachTo: document.body });
      expect(wrapper.text()).toContain('Content');
      wrapper.unmount();
    });

    it('applies custom class', () => {
      const wrapper = mount(S{Name}, { props: { class: 'my-class' }, attachTo: document.body });
      expect(wrapper.html()).toContain('my-class');
      wrapper.unmount();
    });
  });

  describe('{state name}', () => {
    it('reflects modelValue via aria-* attribute', () => {
      const wrapper = mount(S{Name}, { props: { modelValue: true }, attachTo: document.body });
      expect(wrapper.find('[role="{role}"]').attributes('aria-checked')).toBe('true');
      wrapper.unmount();
    });

    it('emits update:modelValue on interaction', async () => {
      const wrapper = mount(S{Name}, { props: { modelValue: false }, attachTo: document.body });
      await wrapper.find('[role="{role}"]').trigger('click');
      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      wrapper.unmount();
    });
  });

  describe('disabled state', () => {
    it('prevents interaction when disabled', async () => {
      const wrapper = mount(S{Name}, { props: { disabled: true }, attachTo: document.body });
      await wrapper.find('[role="{role}"]').trigger('click');
      expect(wrapper.emitted('update:modelValue')).toBeFalsy();
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mount(S{Name}, {
        // 为 role="switch"/"tab" 等无可见文字的控件传入 aria-label
        props: { /* aria-label or label prop */ },
        attachTo: document.body
      });
      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);
      wrapper.unmount();
    });
  });
});
```

### 必须遵守的规则

**1. 始终使用 `attachTo: document.body`**

ARIA 查询和 axe-core 检测都依赖真实 DOM 上下文。不挂载到 body 时，`aria-*` 关联（`aria-controls`、`aria-labelledby`）可能无法解析。

**2. 每个 `it` 结束前调用 `wrapper.unmount()`**

happy-dom 不自动清理 DOM；遗留节点会干扰后续测试的 axe-core 检测。

**3. 每个 `it` 内部独立挂载，不跨 `it` 共享 wrapper**

```typescript
// ✅ 正确：每个 it 自己挂载、自己卸载
it('test A', () => {
  const wrapper = mount(...);
  // ...
  wrapper.unmount();
});

// ✗ 错误：使用 beforeEach 共享 wrapper（a11y 测试会互相污染）
```

### 交互触发方式速查

不同 headless 组件对用户操作的实现方式不同：

| 组件 / 元素                     | 触发方式                              | 说明                                   |
| ------------------------------- | ------------------------------------- | -------------------------------------- |
| `Button`（headless）            | `trigger('click')`                    | stopPropagation 在禁用时拦截           |
| `CheckboxControl`               | `trigger('click')`                    | 原生 click 切换 checked                |
| `SwitchControl`                 | `trigger('click')`                    | 内部 click handler                     |
| `TabsTrigger`                   | `trigger('mousedown', { button: 0 })` | **mousedown.left**，非 click           |
| `AccordionTrigger`              | `trigger('click')`                    | CollapsibleTrigger → 原生 button click |
| 弹层触发器（Popover / Tooltip） | `trigger('click')` 或 `mouseenter`    | 按组件实现查阅 headless SFC            |

### 禁用状态实现方式速查

不同组件的禁用渲染方式不同，对应不同的断言写法：

| 组件                 | 渲染方式                   | 断言写法                                           |
| -------------------- | -------------------------- | -------------------------------------------------- |
| `Button`（headless） | `aria-disabled="true"`     | `attributes('aria-disabled')` toBe `'true'`        |
| `CheckboxControl`    | 原生 `:disabled`           | `element.disabled` toBe `true`                     |
| `AccordionTrigger`   | 原生 `:disabled`（button） | `element.disabled` toBe `true`                     |
| `TabsTrigger`        | `data-disabled=""`         | `attributes('data-disabled')` toBe `''`            |
| `SwitchControl`      | `data-disabled` + 逻辑拦截 | 触发 click 后检查 `emitted()` 为 `undefined`/falsy |

### a11y 测试注意事项

```typescript
// test/shared/a11y.ts 已禁用以下规则（happy-dom 限制）：
// - color-contrast：没有计算样式，无法判断对比度
// - svg-img-alt：@iconify/vue 在测试环境渲染 SVG 时不带 aria-hidden
// - image-alt：同上

import { getA11yViolations } from '../../shared/a11y';
```

**需要 accessible name 的控件**（否则 a11y 测试会报 violation）：

| 情形                         | 解决方案                                            |
| ---------------------------- | --------------------------------------------------- |
| `role="switch"` 没有可见文字 | 传 `controlProps: { 'aria-label': 'xxx' }`          |
| 独立 `<input>` 缺少 label    | 用父组件包裹：`<label for="id">` + `<SInput id="">` |
| icon-only button             | 传 `aria-label` 或 `title`                          |

**多组件组合的 a11y 测试**（例如带 label 的 input）：

```typescript
// 用匿名 Options API 对象包裹，模拟真实使用场景
const wrapper = mount(
  {
    template: `<div><label for="x">Name</label><SInput id="x" /></div>`,
    components: { SInput }
  },
  { attachTo: document.body }
);
```

### describe 分组规范

| describe 名      | 测试内容                                            |
| ---------------- | --------------------------------------------------- |
| `rendering`      | 默认渲染、slot 内容、自定义 class、关键子元素存在性 |
| `{state} state`  | modelValue 反映到 aria-\* / data-state，emit 时机   |
| `disabled state` | 禁用渲染方式（见上表）、禁用时不触发 emit           |
| `accessibility`  | `getA11yViolations` 返回空数组，覆盖主要使用场景    |

---

## 校验清单

详见 [→ checklist.md](./references/checklist.md)

## 禁止反模式

详见 [→ anti-patterns.md](./references/anti-patterns.md)

## 进阶模式

详见 [→ patterns.md](./references/patterns.md)（受控状态、多选、继承 UI slot、多态组件、data-\* ARIA 状态）

## 参考示例（真实代码）

| 场景                       | 路径                                                                                                                   |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| 多 slot 简单组件           | [headless/badge](../../../headless/src/components/badge/) · [ui/badge](../../../src/components/badge/)                 |
| 单类名组件（无 UiContext） | [headless/button](../../../headless/src/components/button/) · [ui/button](../../../src/components/button/)             |
| 复杂多层级组件             | [headless/accordion](../../../headless/src/components/accordion/) · [ui/accordion](../../../src/components/accordion/) |
| 浮层/Teleport 组件         | [headless/dialog](../../../headless/src/components/dialog/)                                                            |
| 单元测试（单类名）         | [test/specs/components/button.spec.ts](../../../test/specs/components/button.spec.ts)                                  |
| 单元测试（多 slot）        | [test/specs/components/accordion.spec.ts](../../../test/specs/components/accordion.spec.ts)                            |
| 单元测试（选择型）         | [test/specs/components/tabs.spec.ts](../../../test/specs/components/tabs.spec.ts)                                      |
| a11y 辅助工具              | [test/shared/a11y.ts](../../../test/shared/a11y.ts)                                                                    |
| Namespaced 导出            | [headless/src/namespaced/index.ts](../../../headless/src/namespaced/index.ts)                                          |
