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
  >
    <App />
  </SConfigProvider>
</template>
```

## Advanced Theme Configuration

You can fully customize the theme using the `theme` prop, which accepts a `ThemeOptions` object.

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

### Props

<DataTable preset="props" :data="[
  { name: 'theme', type: 'ThemeOptions', default: '{}', description: 'Global theme configuration (colors, radius)' },
  { name: 'size', type: `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`, default: `'md'`, description: 'Global component size' },
  { name: 'iconify', type: '{ width?: string; height?: string }', default: '-', description: 'Default configuration for SIcon' },
  { name: 'toast', type: 'ToastProviderProps', default: '-', description: 'Global toast configuration' },
  { name: 'dir', type: `'ltr' \| 'rtl'`, default: `'ltr'`, description: 'Text direction' }
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
