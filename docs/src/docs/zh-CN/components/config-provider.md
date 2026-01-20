# 全局配置

## 概述

用于为组件库提供全局配置与默认值的配置提供者。

## Features

- 🎨 **Theme System**: Configure global colors and radius via `theme` prop.
- 📏 **Size Control**: Manage global component sizing (`xs`, `sm`, `md`, `lg`, `xl`, `2xl`).
- 🖼️ **图标配置**：为所有 `SIcon` 组件设置默认宽高。
- 🍞 **Toast Integration**: Configure global toast settings.
- 🌐 **Direction**: Support for LTR/RTL layouts.

## Basic Usage

Wrap your application root with `SConfigProvider`.

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

## Advanced Theme Configuration

你可以通过 `theme` 属性完全自定义主题，它接收一个 `ThemeOptions` 对象。

```vue
<template>
  <SConfigProvider
    :theme="{
      // Built-in presets
      base: 'gray',
      primary: 'violet',
      feedback: 'modern',

      // Global radius
      radius: '0.625rem',

      // Output format (hsl or oklch)
      format: 'oklch',

      // Dark mode strategy
      darkSelector: 'class',

      // Custom presets
      preset: {
        primary: {
          brandPrimary: {
            light: {
              primary: 'blue.600',
              ring: 'blue.400',
              chart1: 'orange.600',
              chart2: 'teal.600',
              chart3: 'cyan.900',
              chart4: 'amber.400',
              chart5: 'amber.500'
            },
            dark: {
              primary: 'blue.400',
              ring: 'blue.500',
              chart1: 'orange.500',
              chart2: 'teal.500',
              chart3: 'cyan.400',
              chart4: 'amber.500',
              chart5: 'amber.600'
            }
          }
        }
      }
    }"
  >
    <App />
  </SConfigProvider>
</template>
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'theme', type: 'ThemeOptions', default: '{}', description: '全局主题配置（颜色、圆角）' },
  { name: 'size', type: `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`, default: `'md'`, description: '全局组件尺寸' },
  { name: 'iconify', type: '{ width?: string; height?: string }', default: '-', description: 'SIcon 的默认配置' },
  { name: 'toast', type: 'ToastProviderProps', default: '-', description: '全局通知配置' },
  { name: 'dir', type: `'ltr' \| 'rtl'`, default: `'ltr'`, description: '文本方向' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '-', description: '需要包裹的内容（通常是 App 组件）' }
]"/>

## Types

### ThemeOptions

<TypeTable :data="[
  {
    name: 'ThemeOptions',
    description: 'Theme system configuration object.',
    fields: [
      { name: 'base', type: 'string', description: 'Base color preset (e.g. slate, gray, zinc)' },
      { name: 'primary', type: 'string', description: 'Primary color preset (e.g. indigo, blue)' },
      { name: 'feedback', type: 'string', description: 'Feedback color preset (e.g. classic, modern)' },
      { name: 'radius', type: 'string', description: 'Global radius (e.g. 0.5rem)' },
      { name: 'darkSelector', type: `'class' | 'media' | string`, description: 'Dark mode switching strategy.' },
      { name: 'format', type: `'hsl' | 'oklch'`, description: 'CSS variable output format.' },
      { name: 'preset', type: 'CustomPreset', description: '用于注入自定义颜色预设的对象。' },
    ]
  }
]"/>
