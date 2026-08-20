# Theming

## Overview

Soybean UI provides a flexible theming system that allows you to customize the appearance of components to match your application's design requirements. You can easily adjust colors, radius and global size settings.

## Implementation Principle

Use [@soybeanjs/theme](https://github.com/soybeanjs/soybean-ui) — the standalone theme engine — to create rich themes. Its `createTheme(options)` pure function returns a CSS string that `SConfigProvider` inlines into the page at runtime based on the `theme` prop.

## Theme Configuration

You can configure the theme by passing a theme object to the `SConfigProvider` at the root of your application.

```vue
<script setup lang="ts">
import { SConfigProvider } from '@soybeanjs/ui';
</script>

<template>
  <SConfigProvider
    :theme="{
      base: 'gray',
      primary: 'violet',
      radius: '0.625rem'
    }"
  >
    <App />
  </SConfigProvider>
</template>
```

### Customizable Theme

```ts
{
  base: 'gray',
  primary: 'violet',
  radius: '0.625rem',
  // override any shadcn color key for light / dark
  preset: {
    light: {
      background: 'oklch(100% 0 0)',
      foreground: 'stone.950',
      card: 'oklch(100% 0 0)',
      cardForeground: 'stone.950',
      primary: 'violet.700',
      ring: 'violet.500',
      border: 'stone.200',
      input: 'stone.200'
    },
    dark: {
      background: 'stone.950',
      foreground: 'stone.50',
      card: 'stone.900',
      cardForeground: 'stone.50',
      primary: 'violet.400',
      ring: 'violet.600',
      border: 'oklch(100% 0 0 / 0.1)',
      input: 'oklch(100% 0 0 / 0.15)'
    }
  }
}
```

### Custom color token overrides

To override specific color tokens per mode, use the `overrides` option. Tokens in `overrides` have the highest priority and are applied on top of the derived base / primary / feedback / chart / sidebar tokens.

```ts
createTheme({
  base: 'gray',
  primary: 'violet',
  radius: '0.625rem',
  // override any color token for light / dark
  overrides: {
    light: {
      background: 'oklch(100% 0 0)',
      foreground: 'stone.950',
      primary: 'violet.700',
      ring: 'violet.500',
      border: 'stone.200',
      input: 'stone.200'
    },
    dark: {
      background: 'stone.950',
      foreground: 'stone.50',
      primary: 'violet.400',
      ring: 'violet.600',
      border: 'oklch(100% 0 0 / 0.1)',
      input: 'oklch(100% 0 0 / 0.15)'
    }
  }
});
```

**Notes and caveats:**

- **Dark is auto-derived**: any key missing from `dark` is derived from its light value via `deriveDarkFromLight`, so you only need to fill the differences.
- **`SConfigProvider` `theme.preset`**: the provider accepts the same light / dark token object (or a `{ name }` reference to a stored preset) through the `theme.preset` prop, and resolves it into `overrides` before calling `createTheme`.

```vue
<template>
  <SConfigProvider
    :theme="{
      base: 'gray',
      primary: 'violet',
      preset: {
        light: {
          background: 'oklch(100% 0 0)',
          foreground: 'stone.950'
        },
        dark: {
          background: 'stone.950',
          foreground: 'stone.50'
        }
      }
    }"
  >
    <App />
  </SConfigProvider>
</template>
```

### Colors

The theme system uses tailwindcss color presets.

<TailwindPalette />

## Component-level Style Customization

In addition to global theme configuration, you can fine-tune individual component styles using the `ui` prop.

### Using the ui prop

Multi-slot components support overriding each slot's style classes via the `ui` prop:

```vue
<script setup lang="ts">
import { SAccordion } from '@soybeanjs/ui';

const items = [
  { title: 'Title 1', value: 'item-1', description: 'Content 1' },
  { title: 'Title 2', value: 'item-2', description: 'Content 2' }
];
</script>

<template>
  <SAccordion
    :items="items"
    :ui="{
      root: 'border-2 border-primary',
      item: 'bg-card hover:bg-accent',
      trigger: 'text-lg font-bold',
      content: 'text-sm text-muted-foreground'
    }"
  />
</template>
```

### class prop merging

All components support the `class` prop, which intelligently merges with default styles:

```vue
<template>
  <SButton class="w-full rounded-full">Custom Button</SButton>
</template>
```
