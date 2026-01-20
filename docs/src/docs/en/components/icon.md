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

### Props

<DataTable preset="props" :data="[
  { name: 'icon', type: 'string | Component | VNode', required: true, description: 'Icon name (Iconify) or component' },
  { name: 'width', type: 'string | number', default: `'1.25em'`, description: 'Icon width' },
  { name: 'height', type: 'string | number', default: `'1.25em'`, description: 'Icon height' },
  { name: 'flip', type: 'string', default: '-', description: 'Flip icon (horizontal, vertical)' },
  { name: 'rotate', type: 'number | string', default: '-', description: 'Rotate icon (degrees)' },
  { name: 'color', type: 'string', default: '-', description: 'Icon color' }
]"/>

> Note: `SIcon` forwards all other props to the underlying [Iconify Icon](https://docs.iconify.design/icon-components/vue/props.html) component.

## Types

<TypeTable :data="[
  {
    name: 'IconValue',
    description: 'Type definition for the icon prop',
    type: 'string | Component | VNode | IconifyIcon'
  }
]"/>
