# Backtop

## 概述

Backtop 会在滚动目标超过阈值后显示一个浮动按钮，并在触发时将目标容器滚动回起始位置。

> 注意：除了 SBacktop，headless 层还导出了 Backtop，可用于自定义组合。

## 用法

```vue
<script setup lang="ts">
import { SBacktop } from '@soybeanjs/ui';
</script>

<template>
  <SBacktop />
</template>
```

## 演示

```playground
basic
target
disabled
custom-styling
```

## Backtop API

### 属性

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: 'Backtop 按钮的自定义类名' },
  { name: 'visibilityHeight', type: 'number', default: '400', description: '滚动距离达到该阈值后按钮才会显示' },
  { name: 'target', type: 'BacktopTarget', default: 'window', description: '需要监听并控制的滚动目标，可以是选择器、元素、window 或返回元素的函数' },
  { name: 'duration', type: 'number', default: '300', description: '回到顶部动画的持续时间（毫秒）' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用 Backtop 按钮' },
  { name: 'color', type: 'ThemeColor', default: 'primary', description: '复用按钮样式的颜色预设' },
  { name: 'size', type: 'ThemeSize', default: 'lg', description: '复用按钮样式的尺寸预设' },
  { name: 'variant', type: 'ButtonVariant', default: 'solid', description: '复用按钮样式的视觉变体' },
  { name: 'shape', type: 'ButtonShape', default: 'circle', description: '复用按钮样式的形状预设' },
  { name: 'shadow', type: 'ButtonShadow', default: 'lg', description: '复用按钮样式的阴影预设' },
  { name: 'fitContent', type: 'boolean', default: 'true', description: '按钮是否按内容收缩尺寸' },
  { name: 'icon', type: 'string', default: 'lucide:arrow-up', description: '未提供自定义插槽内容时使用的默认图标' },
  { name: 'iconClass', type: 'ClassValue', default: '-', description: '默认图标的自定义类名' },
  { name: 'iconProps', type: 'Partial<IconProps>', default: '-', description: '透传给默认图标的额外属性' },
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'change', parameters: '(visible: boolean) => void', description: '可见状态变化时触发' },
  { name: 'click', parameters: '(event: MouseEvent) => void', description: '触发 Backtop 按钮时触发' },
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '{ visible: boolean }', description: '自定义 Backtop 内容' },
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'BacktopTarget',
    description: '用于解析滚动容器的目标类型',
    fields: [
      { name: 'value', type: 'string | Window | HTMLElement | (() => HTMLElement)', description: '选择器、window、元素实例或返回元素的函数' },
    ],
  }
]"/>
