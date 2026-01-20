# 按钮

## 概述

一个可用于触发动作的按钮组件。

## 用法

```vue
<script setup lang="ts">
import { SButton } from '@soybeanjs/ui';
</script>

<template>
  <SButton>默认按钮</SButton>
</template>
```

## 特性

- 🎨 8 种变体：solid、outline、dashed、soft、ghost、link、plain、pure
- 🌈 8 种颜色：primary、destructive、success、warning、info、carbon、secondary、accent
- 📏 6 种尺寸：xs、sm、md、lg、xl、2xl
- 🔲 4 种形状：auto、rounded、square、circle
- ⚡ 支持加载状态
- 🌐 支持链接功能 (SButtonLink)
- ♿ 完全支持无障碍访问
- 🎯 TypeScript 类型安全

## 按钮组件系列

- **SButton** - 基础按钮组件
- **SButtonLink** - 链接按钮，支持路由导航
- **SButtonIcon** - 图标按钮，紧凑设计
- **SButtonLoading** - 加载状态按钮
- **SButtonGroup** - 按钮组组件

## 演示

```playground
color
variant
size
shape
shadow
slot
disabled
loading
icon
link
group
```

## SButton API

### 属性

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: '自定义类名' },
  { name: 'color', type: 'ThemeColor', default: `'primary'`, description: '按钮颜色' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: '按钮尺寸' },
  { name: 'variant', type: 'ButtonVariant', default: `'solid'`, description: '按钮变体' },
  { name: 'shape', type: 'ButtonShape', default: `'auto'`, description: '按钮形状' },
  { name: 'shadow', type: 'ButtonShadow', default: `'sm'`, description: '阴影效果' },
  { name: 'fitContent', type: 'boolean', default: 'false', description: '适应内容尺寸' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '禁用' },
  { name: 'as', type: 'string | Component', default: `'button'`, description: '渲染的元素/组件' },
  { name: 'asChild', type: 'boolean', default: 'false', description: '将属性/行为合并到子元素中' },
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'click', parameters: 'MouseEvent', description: '点击按钮时触发（禁用时不会触发）' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'leading', parameters: '-', description: '前导内容（默认插槽之前）' },
  { name: 'default', parameters: '-', description: '按钮内容' },
  { name: 'trailing', parameters: '-', description: '尾随内容（默认插槽之后）' },
]"/>

## SButtonIcon API

### 属性

<DataTable preset="props" :data="[
  { name: 'icon', type: 'string', default: '-', description: 'Iconify 图标名称', required: true },
  { name: 'iconProps', type: 'Partial<IconProps>', default: '-', description: '传递给 `SIcon` 的属性' },
]"/>

> 继承了 `SButton` 的所有属性、事件和插槽。

## SButtonLoading API

### 属性

<DataTable preset="props" :data="[
  { name: 'loading', type: 'boolean', default: 'false', description: '控制的加载状态' },
  { name: 'autoLoading', type: 'boolean', default: 'false', description: '在点击处理程序执行期间自动切换加载状态' },
  { name: 'loadingText', type: 'string', default: '-', description: '当加载且 `loadingPosition` 为 `center` 时显示的文本' },
  { name: 'loadingDuration', type: 'number', default: '-', description: '离开自动加载状态前的延迟（毫秒）' },
  { name: 'loadingIcon', type: 'string', default: `'svg-spinners:270-ring'`, description: '加载图标名称 (Iconify)' },
  { name: 'loadingIconProps', type: 'Partial<IconProps>', default: '-', description: '传递给加载图标的属性' },
  { name: 'loadingPosition', type: `'start' \| 'center' \| 'end'`, default: `'start'`, description: '加载图标位置' },
]"/>

> 继承了 `SButton` 的所有属性、事件和插槽。

### 事件

<DataTable preset="emits" :data="[
  { name: 'click', parameters: 'MouseEvent', description: '点击处理程序（支持 `autoLoading`）' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'leading', parameters: '-', description: '前导内容（当 `loadingPosition` 为 `start` 时被加载图标隐藏）' },
  { name: 'default', parameters: '{ loading: boolean }', description: '按钮内容；接收当前加载状态' },
  { name: 'trailing', parameters: '-', description: '尾随内容（当 `loadingPosition` 为 `end` 时被加载图标隐藏）' },
]"/>

## SButtonLink API

### 属性

<DataTable preset="props" :data="[
  { name: 'to', type: 'RouteLocationRaw', default: '-', description: '要导航到的路由位置' },
  { name: 'href', type: 'RouteLocationRaw', default: '-', description: ' `to` 的别名（当两者都提供时，`href` 被忽略）' },
  { name: 'external', type: 'boolean', default: '-', description: '强制链接为外部/内部' },
  { name: 'target', type: 'string', default: '-', description: '外部链接的目标属性' },
  { name: 'rel', type: 'string', default: `'noopener noreferrer'`, description: 'Rel 属性（外部链接的默认值）' },
  { name: 'noRel', type: 'boolean', default: 'false', description: '禁用自动 rel 处理' },
  { name: 'prefetch', type: 'boolean', default: '-', description: '启用预取行为（框架依赖）' },
  { name: 'noPrefetch', type: 'boolean', default: '-', description: '禁用预取行为' }
]"/>

> 继承了 `SButton` 的所有属性、事件和插槽。

### 插槽

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '{ isHref: boolean }', description: '链接内容；接收当前链接是否渲染为 href' },
]"/>

## SButtonGroup API

### 属性

<DataTable preset="props" :data="[
  { name: 'orientation', type: `'horizontal' \| 'vertical'`, default: `'horizontal'`, description: '组方向' },
  { name: 'dir', type: `'ltr' \| 'rtl'`, default: `'ltr'`, description: '文本方向' }
]"/>

> 继承了 `SButton` 的所有属性, 会传递给每个子按钮。

### 插槽

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '-', description: '组内容（通常是多个按钮）' },
]"/>

## 类型

<TypeTable :data="[
  {
    name: 'ButtonProps',
    description: '`SButton` 的属性。',
    fields: [
      { name: 'class', type: 'ClassValue', description: '自定义类名。' },
      { name: 'color', type: 'ThemeColor', description: '按钮颜色。' },
      { name: 'size', type: 'ThemeSize', description: '按钮尺寸。' },
      { name: 'variant', type: 'ButtonVariant', description: '按钮变体。' },
      { name: 'shape', type: 'ButtonShape', description: '按钮形状。' },
      { name: 'shadow', type: 'ButtonShadow', description: '阴影效果。' },
      { name: 'fitContent', type: 'boolean', description: '适应内容尺寸。' },
      { name: 'disabled', type: 'boolean', description: '禁用。' },
      { name: 'as', type: 'string | Component', description: '渲染的元素/组件。' },
      { name: 'asChild', type: 'boolean', description: '合并到子元素。' },
    ]
  },
  {
    name: 'ButtonIconProps',
    description: '`SButtonIcon` 的属性。',
    fields: [
      { name: 'icon', type: 'string', required: true, description: 'Iconify 图标名称。' },
      { name: 'iconProps', type: 'Partial<IconProps>', description: '传递给图标组件的属性。' },
    ]
  },
  {
    name: 'ButtonLoadingProps',
    description: '`SButtonLoading` 的属性。',
    fields: [
      { name: 'loading', type: 'boolean', description: '控制的加载状态。' },
      { name: 'autoLoading', type: 'boolean', description: '在点击处理程序期间自动加载。' },
      { name: 'loadingText', type: 'string', description: '加载文本（仅中心位置）。' },
      { name: 'loadingDuration', type: 'number', description: '离开自动加载状态前的延迟（毫秒）。' },
      { name: 'loadingIcon', type: 'string', description: '加载图标名称。' },
      { name: 'loadingIconProps', type: 'Partial<IconProps>', description: '加载图标的属性。' },
      { name: 'loadingPosition', type: `'start' \| 'center' \| 'end'`, description: '加载图标位置。' },
    ]
  },
  {
    name: 'ButtonGroupProps',
    description: '`SButtonGroup` 的属性。',
    fields: [
      { name: 'orientation', type: `'horizontal' \| 'vertical'`, description: '组方向。' },
      { name: 'dir', type: `'ltr' \| 'rtl'`, description: '文本方向。' },
    ]
  }
]"/>

<UnionType name="ClassValue" description="类名类型" type="string | null | undefined | Record<string, boolean> | ClassValue[]" />

<UnionType name="ThemeColor" description="按钮颜色" type="'primary' | 'destructive' | 'success' | 'warning' | 'info' | 'carbon' | 'secondary' | 'accent'" />

<UnionType name="ThemeSize" description="按钮尺寸" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />

<UnionType name="ButtonVariant" description="按钮变体" type="'solid' | 'outline' | 'dashed' | 'soft' | 'ghost' | 'link' | 'plain' | 'pure'" />

<UnionType name="ButtonShape" description="按钮形状" type="'auto' | 'rounded' | 'square' | 'circle'" />

<UnionType name="ButtonShadow" description="按钮阴影效果" type="'none' | 'sm' | 'md' | 'lg'" />

<TypeTable :data="[
  {
    name: 'IconProps',
    description: 'Icon 组件的属性。',
    fields: [
      { name: 'icon', type: 'string', description: 'Iconify 图标名称。' },
      { name: 'width', type: 'number | string', description: '图标宽度。' },
      { name: 'height', type: 'number | string', description: '图标高度。' },
      { name: 'color', type: 'string', description: '图标颜色。' },
      { name: 'inline', type: 'boolean', description: '是否以内联方式显示图标。' },
    ]
  }
]"/>
