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

<ComponentApi component="icon" />
