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

### Complete preset

When `preset.light` provides **every** color token (each key of `ColorTokens`), the preset is considered a "complete preset". You can then enable the `complete` option to skip the built-in base style derivation (base / primary / sidebar) and apply the provided tokens as the final theme directly.

```ts
createTheme({
  preset: {
    light: {/* all 40 color tokens */},
    dark: {/* optional; missing keys are derived from light */}
  },
  complete: true
});
```

**Notes and caveats:**

- **Detection**: `complete` only takes effect when `preset` is mode-split (has `light` / `dark` layers) and `light` defines every color token. A flat `ThemeTokens` or a partial `light` never triggers the skip.
- **Optimization only**: for a complete `light`, the resolved tokens are identical whether or not the derivation is skipped — `complete` just avoids redundant computation.
- **`lightLevel` / `darkLevel` are ignored**: once the base derivation is skipped, these offsets no longer affect the result.
- **Dark is still derived**: keys missing from `dark` are still derived from `light` via `deriveDarkFromLight`, so you don't have to fill them manually.
- The `isCompleteThemePreset` helper reports whether a preset is complete.

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
