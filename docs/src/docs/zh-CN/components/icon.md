# 图标

## 概述

用于渲染图标的组件，通常基于 Iconify 图标集。

## Features

- 📦 **Iconify 支持**：渲染来自 Iconify 图标库的任意图标。
- 🔧 **自定义图标**：支持 Vue 组件、VNodes 或纯字符串。
- 📏 **全局尺寸**：从 `SConfigProvider` 继承默认尺寸。
- 🎨 **Styling**: Easy customization via props or CSS classes.

## Basic Usage

### Using Iconify Name

```vue
<script setup lang="ts">
import { SIcon } from '@soybeanjs/ui';
</script>

<template>
  <SIcon icon="lucide:home" />
  <SIcon icon="mdi:account" class="text-primary" />
</template>
```

### 自定义尺寸

```vue
<template>
  <SIcon icon="lucide:settings" width="24" height="24" />
</template>
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'icon', type: 'IconValue', required: true, description: 'Icon name (Iconify) or component' },
  { name: 'width', type: 'string | number', default: `'1.25em'`, description: '图标宽度' },
  { name: 'height', type: 'string | number', default: `'1.25em'`, description: '图标高度' },
  { name: 'flip', type: 'string', default: '-', description: '翻转图标（水平、垂直）' },
  { name: 'rotate', type: 'number | string', default: '-', description: '旋转图标（角度）' },
  { name: 'color', type: 'string', default: '-', description: '图标颜色' }
]"/>

> Note: `SIcon` forwards all other props to the underlying [Iconify Icon](https://docs.iconify.design/icon-components/vue/props.html) component.

## Types

<UnionType name="IconValue" type="string | Component | VNode | IconifyIcon" />
