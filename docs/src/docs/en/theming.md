# Theming

## Overview

Soybean UI provides a flexible theming system that allows you to customize the appearance of components to match your application's design requirements. You can easily adjust colors, radius and global size settings.

## Implementation Principle

Use [shadcn-theme](https://github.com/soybeanjs/shadcn-theme) to create rich theme.

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
      feedback: 'modern',
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
  base: 'demoBase',
  primary: 'demoPrimary',
  feedback: 'demoFeedback',
  preset: {
    base: {
      demoBase: {
        light: {
          background: 'oklch(100% 0 0)',
          foreground: 'stone.950',
          card: 'oklch(100% 0 0)',
          cardForeground: 'stone.950',
          popover: 'oklch(100% 0 0)',
          popoverForeground: 'stone.950',
          primaryForeground: 'stone.50',
          secondary: 'stone.100',
          secondaryForeground: 'stone.900',
          muted: 'stone.100',
          mutedForeground: 'stone.500',
          accent: 'stone.100',
          accentForeground: 'stone.900',
          destructiveForeground: 'stone.50',
          successForeground: 'stone.50',
          warningForeground: 'stone.50',
          infoForeground: 'stone.50',
          carbon: 'stone.800',
          carbonForeground: 'stone.50',
          border: 'stone.200',
          input: 'stone.200'
        },
        dark: {
          background: 'stone.950',
          foreground: 'stone.50',
          card: 'stone.900',
          cardForeground: 'stone.50',
          popover: 'stone.900',
          popoverForeground: 'stone.50',
          primaryForeground: 'stone.900',
          secondary: 'stone.800',
          secondaryForeground: 'stone.50',
          muted: 'stone.800',
          mutedForeground: 'stone.400',
          accent: 'stone.800',
          accentForeground: 'stone.50',
          destructiveForeground: 'stone.900',
          successForeground: 'stone.900',
          warningForeground: 'stone.900',
          infoForeground: 'stone.900',
          carbon: 'stone.100',
          carbonForeground: 'stone.900',
          border: 'oklch(100% 0 0 / 0.1)',
          input: 'oklch(100% 0 0 / 0.15)'
        }
      }
    },
    primary: {
      demoPrimary: {
        light: {
          primary: 'stone.800',
          ring: 'stone.400',
          chart1: 'orange.600',
          chart2: 'teal.600',
          chart3: 'cyan.900',
          chart4: 'amber.400',
          chart5: 'amber.500'
        },
        dark: {
          primary: 'stone.200',
          ring: 'stone.500',
          chart1: 'blue.700',
          chart2: 'emerald.500',
          chart3: 'amber.500',
          chart4: 'purple.500',
          chart5: 'rose.500'
        }
      }
    },
    feedback: {
      demoFeedback: {
        light: {
          destructive: 'red.500',
          success: 'green.500',
          warning: 'yellow.500',
          info: 'blue.500'
        },
        dark: {
          destructive: 'red.400',
          success: 'green.400',
          warning: 'yellow.400',
          info: 'blue.400'
        }
      }
    }
  }
};
```

### Colors

The theme system uses tailwindcss color presets.

<TailwindPalette />
