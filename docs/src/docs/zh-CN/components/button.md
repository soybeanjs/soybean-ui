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

## API

<ComponentApi component="button" />
