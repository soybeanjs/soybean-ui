# ConfigProvider

## Overview

The `SConfigProvider` component is the root configuration provider for the SoybeanUI library. It manages global themes, localization, icon settings, and other context-aware features. It should wrap your entire application or specific sections that require isolated configuration.

## Features

- 🎨 **Theme System**: Configure global colors and radius via `theme` prop.
- 📏 **Size Control**: Manage global component sizing (`xs`, `sm`, `md`, `lg`, `xl`, `2xl`).
- 🖼️ **Icon Configuration**: Set default width and height for all `SIcon` components.
- ⏳ **Loading Bar Integration**: Configure the global top loading bar.
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
    :iconify="{ width: '1.25em', height: '1.25em' }"
    dir="ltr"
  >
    <App />
  </SConfigProvider>
</template>
```

## Advanced Theme Configuration

You can fully customize the theme using the `theme` prop. more details can be found in the [theming documentation](/overview/theming).

## API

<ComponentApi component="config-provider" />
