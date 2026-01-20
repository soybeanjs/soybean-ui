# 按钮 Button

## 概述

Button 组件族包含以下组件：

- **SButton** - 基础按钮组件
- **SButtonLink** - 链接按钮，支持路由导航
- **SButtonIcon** - 图标按钮，紧凑设计
- **SButtonLoading** - 加载状态按钮
- **SButtonGroup** - 按钮组组件

## 主要特性

- 🎨 8 种样式变体：solid、outline、dashed、soft、ghost、link、plain、pure
- 🌈 8 种颜色主题：primary、destructive、success、warning、info、carbon、secondary、accent
- 📏 6 种尺寸：xs、sm、md、lg、xl、2xl
- 🔲 4 种形状：auto、rounded、square、circle
- ⚡ 加载状态支持（SButtonLoading）
- 🌐 链接功能支持（SButtonLink）
- ♿ 完全可访问性支持
- 🎯 TypeScript 类型安全

## 基础用法

```vue
<script setup lang="ts">
import { SButton } from '@soybeanjs/ui';
</script>

<template>
  <SButton>Default Button</SButton>
</template>
```

## 示例

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

## API

## SButton API

### 属性

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: '自定义 class 名' },
  { name: 'color', type: `'primary' \| 'destructive' \| 'success' \| 'warning' \| 'info' \| 'carbon' \| 'secondary' \| 'accent'`, default: `'primary'`, description: '按钮颜色' },
  { name: 'size', type: `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`, default: `'md'`, description: '按钮尺寸' },
  { name: 'variant', type: `'solid' \| 'outline' \| 'dashed' \| 'soft' \| 'ghost' \| 'link' \| 'plain' \| 'pure'`, default: `'solid'`, description: '样式变体' },
  { name: 'shape', type: `'auto' \| 'rounded' \| 'square' \| 'circle'`, default: `'auto'`, description: '按钮形状' },
  { name: 'shadow', type: `'none' \| 'sm' \| 'md' \| 'lg'`, default: `'sm'`, description: '阴影效果' },
  { name: 'fitContent', type: 'boolean', default: 'false', description: '根据内容自适应尺寸' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用' },
  { name: 'as', type: 'string | Component', default: `'button'`, description: '渲染为指定元素/组件' },
  { name: 'asChild', type: 'boolean', default: 'false', description: '将 props/行为合并到子元素上' },
]"/>

> 说明：`SButton` 同时支持原生 button 属性（例如 `type`、`name`、`value`、`form*` 等）。

### 事件

<DataTable preset="emits" :data="[
  { name: 'click', parameters: '(event: MouseEvent) => void', description: '点击按钮时触发（禁用时不会触发）' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'leading', parameters: '-', description: '前置内容（位于默认插槽之前）' },
  { name: 'default', parameters: '-', description: '按钮内容' },
  { name: 'trailing', parameters: '-', description: '后置内容（位于默认插槽之后）' },
]"/>

## SButtonIcon API

### 属性

<DataTable preset="props" :data="[
  { name: 'icon', type: 'string', default: '-', description: 'Iconify 图标名称', required: true },
  { name: 'iconProps', type: 'Partial<IconProps>', default: '-', description: '透传给图标组件的 props' },
  { name: 'color', type: `'primary' \| 'destructive' \| 'success' \| 'warning' \| 'info' \| 'carbon' \| 'secondary' \| 'accent'`, default: `'accent'`, description: '按钮颜色' },
  { name: 'variant', type: `'solid' \| 'outline' \| 'dashed' \| 'soft' \| 'ghost' \| 'link' \| 'plain' \| 'pure'`, default: `'ghost'`, description: '样式变体' },
  { name: 'shape', type: `'auto' \| 'rounded' \| 'square' \| 'circle'`, default: `'square'`, description: '按钮形状' },
  { name: 'fitContent', type: 'boolean', default: 'true', description: '根据内容自适应尺寸' },
]"/>

## SButtonLoading API

### 属性

<DataTable preset="props" :data="[
  { name: 'loading', type: 'boolean', default: 'false', description: '受控加载状态' },
  { name: 'autoLoading', type: 'boolean', default: 'false', description: '点击事件执行期间自动显示 loading（需配合 @click）' },
  { name: 'loadingText', type: 'string', default: '-', description: '加载文案（仅当 loadingPosition 为 center 时展示）' },
  { name: 'loadingDuration', type: 'number', default: '-', description: '自动 loading 结束前的延迟（毫秒）' },
  { name: 'loadingIcon', type: 'string', default: `'svg-spinners:270-ring'`, description: '加载图标（Iconify）' },
  { name: 'loadingIconProps', type: 'Partial<IconProps>', default: '-', description: '透传给加载图标的 props' },
  { name: 'loadingPosition', type: `'start' \| 'center' \| 'end'`, default: `'start'`, description: '加载图标位置' },
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'click', parameters: '(event: MouseEvent) => void', description: '点击事件（支持 autoLoading）' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'leading', parameters: '-', description: '前置内容（当 loadingPosition 为 start 时会被 loading 图标替换）' },
  { name: 'default', parameters: '{ loading: boolean }', description: '按钮内容，可获取当前 loading 状态' },
  { name: 'trailing', parameters: '-', description: '后置内容（当 loadingPosition 为 end 时会被 loading 图标替换）' },
]"/>

## SButtonLink API

### 属性

<DataTable preset="props" :data="[
  { name: 'to', type: 'RouteLocationRaw', default: '-', description: '点击后导航到的路由地址' },
  { name: 'href', type: 'RouteLocationRaw', default: '-', description: '`to` 的别名（同时存在时以 `to` 为准）' },
  { name: 'external', type: 'boolean', default: '-', description: '强制作为外链/内链处理' },
  { name: 'target', type: 'string', default: '-', description: '外链打开方式（target）' },
  { name: 'rel', type: 'string', default: `'noopener noreferrer'`, description: 'rel 属性（外链默认值）' },
  { name: 'noRel', type: 'boolean', default: 'false', description: '禁用自动 rel 处理' },
  { name: 'prefetch', type: 'boolean', default: '-', description: '是否预取（与框架相关）' },
  { name: 'noPrefetch', type: 'boolean', default: '-', description: '禁用预取' },
  { name: 'variant', type: `'solid' \| 'outline' \| 'dashed' \| 'soft' \| 'ghost' \| 'link' \| 'plain' \| 'pure'`, default: `'link'`, description: '样式变体' },
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '{ isHref: boolean }', description: '链接内容，可获取当前是否以 href 形式渲染' },
]"/>

## SButtonGroup API

### 属性

<DataTable preset="props" :data="[
  { name: 'orientation', type: `'horizontal' \| 'vertical'`, default: `'horizontal'`, description: '按钮组方向' },
  { name: 'dir', type: `'ltr' \| 'rtl'`, default: `'ltr'`, description: '文字方向' },
  { name: 'color', type: `'primary' \| 'destructive' \| 'success' \| 'warning' \| 'info' \| 'carbon' \| 'secondary' \| 'accent'`, default: '-', description: '为子按钮提供默认 color' },
  { name: 'size', type: `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`, default: '-', description: '为子按钮提供默认 size' },
  { name: 'variant', type: `'solid' \| 'outline' \| 'dashed' \| 'soft' \| 'ghost' \| 'link' \| 'plain' \| 'pure'`, default: '-', description: '为子按钮提供默认 variant' },
  { name: 'shape', type: `'auto' \| 'rounded' \| 'square' \| 'circle'`, default: '-', description: '为子按钮提供默认 shape' },
  { name: 'shadow', type: `'none' \| 'sm' \| 'md' \| 'lg'`, default: '-', description: '为子按钮提供默认 shadow' },
  { name: 'fitContent', type: 'boolean', default: '-', description: '为子按钮提供默认 fitContent' },
  { name: 'disabled', type: 'boolean', default: '-', description: '为子按钮提供默认 disabled' },
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '-', description: '按钮组内容（通常放多个按钮）' },
]"/>

## 类型

<TypeTable :data="[
  {
    name: 'ButtonProps',
    description: '`SButton` 的 props。',
    fields: [
      { name: 'class', type: 'ClassValue', description: '自定义 class 名。' },
      { name: 'color', type: `'primary' \| 'destructive' \| 'success' \| 'warning' \| 'info' \| 'carbon' \| 'secondary' \| 'accent'`, description: '按钮颜色。' },
      { name: 'size', type: `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`, description: '按钮尺寸。' },
      { name: 'variant', type: `'solid' \| 'outline' \| 'dashed' \| 'soft' \| 'ghost' \| 'link' \| 'plain' \| 'pure'`, description: '样式变体。' },
      { name: 'shape', type: `'auto' \| 'rounded' \| 'square' \| 'circle'`, description: '按钮形状。' },
      { name: 'shadow', type: `'none' \| 'sm' \| 'md' \| 'lg'`, description: '阴影效果。' },
      { name: 'fitContent', type: 'boolean', description: '根据内容自适应尺寸。' },
      { name: 'disabled', type: 'boolean', description: '是否禁用。' },
      { name: 'as', type: 'string | Component', description: '渲染为指定元素/组件。' },
      { name: 'asChild', type: 'boolean', description: '将 props/行为合并到子元素上。' },
    ]
  },
  {
    name: 'ButtonIconProps',
    description: '`SButtonIcon` 的 props。',
    fields: [
      { name: 'icon', type: 'string', required: true, description: 'Iconify 图标名称。' },
      { name: 'iconProps', type: 'Partial<IconProps>', description: '透传给图标组件的 props。' },
    ]
  },
  {
    name: 'ButtonLoadingProps',
    description: '`SButtonLoading` 的 props。',
    fields: [
      { name: 'loading', type: 'boolean', description: '受控加载状态。' },
      { name: 'autoLoading', type: 'boolean', description: '点击事件执行期间自动 loading。' },
      { name: 'loadingText', type: 'string', description: '加载文案（center 时展示）。' },
      { name: 'loadingDuration', type: 'number', description: '自动 loading 结束前的延迟（毫秒）。' },
      { name: 'loadingIcon', type: 'string', description: '加载图标名称。' },
      { name: 'loadingIconProps', type: 'Partial<IconProps>', description: '透传给加载图标的 props。' },
      { name: 'loadingPosition', type: `'start' \| 'center' \| 'end'`, description: '加载图标位置。' },
    ]
  },
  {
    name: 'ButtonGroupProps',
    description: '`SButtonGroup` 的 props。',
    fields: [
      { name: 'orientation', type: `'horizontal' \| 'vertical'`, description: '按钮组方向。' },
      { name: 'dir', type: `'ltr' \| 'rtl'`, description: '文字方向。' },
    ]
  }
]"/>
