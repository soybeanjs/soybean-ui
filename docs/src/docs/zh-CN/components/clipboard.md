# Clipboard

## 概述

一个用于复制文本值的剪贴板动作组件，提供无障碍按钮语义和已复制状态反馈。

## 用法

```vue
<script setup lang="ts">
import { SClipboard, SIcon } from '@soybeanjs/ui';

const value = 'pnpm add @soybeanjs/ui';
</script>

<template>
  <SClipboard :value="value" color="accent" variant="soft">
    <template #leading="{ copied }">
      <SIcon :icon="copied ? 'lucide:check' : 'lucide:copy'" />
    </template>
    <template #default="{ copied }">
      {{ copied ? '已复制' : '复制命令' }}
    </template>
  </SClipboard>
</template>
```

## 特性

- 📋 点击即可复制必填文本值
- ✅ 暴露 ready、copied、unsupported 三种状态
- 🎨 支持与按钮一致的 color、size、variant、shape 主题能力
- ♿ 在 headless 层保留按钮语义和禁用行为
- 🎯 通过插槽参数自定义复制后的界面反馈

## 演示

```playground
basic
color
variant
size
disabled
custom-styling
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: '自定义类名' },
  { name: 'color', type: 'ThemeColor', default: `'primary'`, description: '剪贴板颜色' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: '剪贴板尺寸' },
  { name: 'variant', type: 'ClipboardVariant', default: `'solid'`, description: '剪贴板变体' },
  { name: 'shape', type: 'ClipboardShape', default: `'auto'`, description: '剪贴板形状' },
  { name: 'fitContent', type: 'boolean', default: 'false', description: '适应内容尺寸' },
  { name: 'value', type: 'string', default: '-', required: true, description: '要复制的文本值' },
  { name: 'copiedDuration', type: 'number', default: '2000', description: '已复制状态持续时间（毫秒）' },
  { name: 'legacy', type: 'boolean', default: 'true', description: '可用时启用 `execCommand` 旧版回退' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '禁用交互' },
  { name: 'as', type: 'string | Component', default: `'button'`, description: '渲染的元素/组件' },
  { name: 'asChild', type: 'boolean', default: 'false', description: '将属性/行为合并到子元素中' },
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'click', parameters: 'MouseEvent', description: '点击剪贴板动作时触发' },
  { name: 'copied', parameters: 'string', description: '复制成功后触发' },
  { name: 'copyError', parameters: 'unknown', description: '复制失败时触发' },
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'leading', parameters: 'ClipboardSlotProps', description: '主内容前的前导内容' },
  { name: 'default', parameters: 'ClipboardSlotProps', description: '主剪贴板内容' },
  { name: 'trailing', parameters: 'ClipboardSlotProps', description: '主内容后的尾随内容' },
]"/>

## 类型

<TypeTable :data="[
  {
    name: 'ClipboardProps',
    description: '`SClipboard` 的属性。',
    fields: [
      { name: 'class', type: 'ClassValue', description: '自定义类名。' },
      { name: 'color', type: 'ThemeColor', description: '剪贴板颜色。' },
      { name: 'size', type: 'ThemeSize', description: '剪贴板尺寸。' },
      { name: 'variant', type: 'ClipboardVariant', description: '剪贴板变体。' },
      { name: 'shape', type: 'ClipboardShape', description: '剪贴板形状。' },
      { name: 'fitContent', type: 'boolean', description: '适应内容尺寸。' },
      { name: 'value', type: 'string', required: true, description: '要复制的文本值。' },
      { name: 'copiedDuration', type: 'number', description: '已复制状态持续时间（毫秒）。' },
      { name: 'legacy', type: 'boolean', description: '启用旧版复制回退。' },
      { name: 'disabled', type: 'boolean', description: '禁用交互。' },
      { name: 'as', type: 'string | Component', description: '渲染的元素/组件。' },
      { name: 'asChild', type: 'boolean', description: '合并到子元素。' },
    ]
  },
  {
    name: 'ClipboardSlotProps',
    description: '`SClipboard` 暴露的插槽参数。',
    fields: [
      { name: 'copied', type: 'boolean', description: '最近一次复制是否仍处于已复制状态时长内。' },
      { name: 'disabled', type: 'boolean', description: '剪贴板动作是否被禁用。' },
      { name: 'supported', type: 'boolean', description: '当前环境是否支持写入剪贴板。' },
      { name: 'state', type: 'ClipboardState', description: '当前剪贴板状态。' },
      { name: 'copy', type: '() => Promise<void>', description: '手动触发复制动作。' },
    ]
  }
]"/>

<UnionType name="ClassValue" description="类名类型" type="string | null | undefined | Record<string, boolean> | ClassValue[]" />

<UnionType name="ThemeColor" description="剪贴板颜色" type="'primary' | 'destructive' | 'success' | 'warning' | 'info' | 'carbon' | 'secondary' | 'accent'" />

<UnionType name="ThemeSize" description="剪贴板尺寸" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />

<UnionType name="ClipboardVariant" description="剪贴板变体" type="'solid' | 'outline' | 'dashed' | 'soft' | 'ghost' | 'link' | 'plain' | 'pure'" />

<UnionType name="ClipboardShape" description="剪贴板形状" type="'auto' | 'rounded' | 'square' | 'circle'" />

<UnionType name="ClipboardState" description="剪贴板状态" type="'ready' | 'copied' | 'unsupported'" />
