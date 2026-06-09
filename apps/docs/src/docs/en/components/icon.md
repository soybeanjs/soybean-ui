# Icon

## Overview

`SIcon` is a unified icon component built on top of [Iconify](https://iconify.design/). It supports rendering icons from the Iconify dataset or custom components/VNodes. It integrates with `SConfigProvider` for consistent sizing across the application.

## Features

- 📦 **Iconify Support**: Render any icon from the massive Iconify library.
- 🔧 **Custom Icons**: Support for Vue components, VNodes, or raw strings.
- 📏 **Global Sizing**: Inherits default size from `SConfigProvider`.
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

### Custom Size

```vue
<template>
  <SIcon icon="lucide:settings" width="24" height="24" />
</template>
```

## API

<ComponentApi component="icon" />
