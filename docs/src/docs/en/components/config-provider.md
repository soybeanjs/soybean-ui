# ConfigProvider

## Overview

The `SConfigProvider` component is the root configuration provider for the SoybeanUI library. It manages global themes, localization, icon settings, and other context-aware features. It should wrap your entire application or specific sections that require isolated configuration.

## Features

- 🎨 **Theme System**: Configure global colors and radius via `theme` prop.
- 📏 **Size Control**: Manage global component sizing (`xs`, `sm`, `md`, `lg`, `xl`, `2xl`).
- 🖼️ **Icon Configuration**: Set default width and height for all `SIcon` components.
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

### Props

<DataTable preset="props" :data="[
  { name: 'theme', type: 'ThemeOptions', default: '{}', description: 'Global theme configuration (colors, radius)' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'Global component size' },
  { name: 'iconify', type: '{ width?: string; height?: string }', default: '-', description: 'Default configuration for SIcon' },
  { name: 'toast', type: 'ToastProviderProps', default: '-', description: 'Global toast configuration' },
  { name: 'dir', type: `'ltr' \| 'rtl'`, default: `'ltr'`, description: 'Text direction' },
  { name: 'locale', type: 'string', default: `'en'`, description: 'Locale identifier' },
  { name: 'nonce', type: 'string', default: 'false', description: 'Nonce for inline styles' },
  { name: 'tooltip', type: 'TooltipProviderProps', default: '-', description: 'Global tooltip configuration' },
  { name: 'nuxt', type: 'boolean', default: 'false', description: 'Nuxt.js integration flag' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '-', description: 'Content to be wrapped (usually the App component)' }
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
      { name: 'preset', type: 'CustomPreset', description: 'Object to inject custom color presets.' },
    ]
  }
]"/>

<UnionType name="ThemeSize" description="Theme size type" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
