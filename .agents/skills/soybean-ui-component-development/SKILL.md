---
name: soybean-ui-component-development
description: 'SoybeanUI 组件开发工作流。**在以下情况下使用**：新建组件（headless + UI 两层）、为现有组件添加功能、修复 bug、理解双层架构、添加 playground 示例、编写组件文档、实现无障碍（a11y）、适配 RTL 方向。适用关键词：新建组件、添加 variant、headless、tailwind-variants、tv()、UiSlot、UiClass、provideXUi、useUiContext、useOmitProps、mergeSlotVariants、cn、playground、DataTable、TypeTable、组件文档、aria、role、a11y、无障碍、rtl、dir、Direction、useDirection。DO NOT USE FOR：纯路由/配置修改、样式主题调整。'
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
