# 全局配置

## 概述

`SConfigProvider` 组件是 SoybeanUI 库的根配置提供者。它管理全局主题、本地化、图标设置以及其他上下文感知功能。它应包裹整个应用程序或需要隔离配置的特定部分。

## 功能

- 🎨 **主题系统**：通过 `theme` 属性配置全局颜色和圆角。
- 📏 **尺寸控制**：管理全局组件尺寸（`xs`、`sm`、`md`、`lg`、`xl`、`2xl`）。
- 🖼️ **图标配置**：为所有 `SIcon` 组件设置默认宽高。
- 🍞 **通知集成**：配置全局通知设置。
- 🌐 **方向**：支持 LTR/RTL 布局。

## 基本用法

将应用程序根组件包裹在 `SConfigProvider` 中。

```vue
<script setup lang="ts">
import { SConfigProvider } from '@soybeanjs/ui';
</script>

<template>
  <SConfigProvider
    size="md"
    :theme="{
      base: 'gray',
      primary: 'violet',
      feedback: 'modern',
      radius: '0.625rem'
    }"
  >
    <App />
  </SConfigProvider>
</template>
```

## 高级主题配置

你可以使用 `theme` 属性完全自定义主题。更多细节请参见[主题文档](/overview/theming)。

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'theme', type: 'ThemeOptions', default: '{}', description: '全局主题配置（颜色、圆角）' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: '全局组件尺寸' },
  { name: 'iconify', type: '{ width?: string; height?: string }', default: '-', description: 'SIcon 的默认配置' },
  { name: 'toast', type: 'ToastProviderProps', default: '-', description: '全局通知配置' },
  { name: 'dir', type: `'ltr' \| 'rtl'`, default: `'ltr'`, description: '文本方向' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '-', description: '需要包裹的内容（通常是 App 组件）' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'ThemeOptions',
    description: '主题系统配置对象。',
    fields: [
      { name: 'base', type: 'string', description: '基础颜色预设（例如 slate、gray、zinc）' },
      { name: 'primary', type: 'string', description: '主颜色预设（例如 indigo、blue）' },
      { name: 'feedback', type: 'string', description: '反馈颜色预设（例如 classic、modern）' },
      { name: 'radius', type: 'string', description: '全局圆角（例如 0.625rem）' },
      { name: 'darkSelector', type: `'class' | 'media' | string`, description: '暗黑模式切换策略。' },
      { name: 'format', type: `'hsl' | 'oklch'`, description: 'CSS 变量输出格式。' },
      { name: 'preset', type: 'CustomPreset', description: '用于注入自定义颜色预设的对象。' },
    ]
  }
]"/>

<UnionType name="ThemeSize" description="主题尺寸类型" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
