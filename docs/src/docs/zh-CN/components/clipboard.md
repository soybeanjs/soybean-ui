# Clipboard

## 概述

一个用于复制文本值的剪贴板动作组件，提供无障碍按钮语义和已复制状态反馈。

## 用法

```vue
<script setup lang="ts">
import { SClipboard } from '@soybeanjs/ui';

const value = 'pnpm add @soybeanjs/ui';
</script>

<template>
  <SClipboard :value="value" color="accent" variant="soft" copy-text="复制命令" copied-text="已复制" />
</template>
```

## 特性

- 📋 点击即可复制必填文本值
- 🧩 内置默认图标和文本展示，同时仍然可以通过插槽覆盖
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

<ComponentApi component="clipboard" />
