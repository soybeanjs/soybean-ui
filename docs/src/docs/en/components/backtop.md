# Backtop

## Overview

Backtop reveals a floating button after the scroll target passes a threshold and scrolls that target back to the start when activated.

> Note: In addition to SBacktop, the headless layer also exports Backtop for custom composition.

## Usage

```vue
<script setup lang="ts">
import { SBacktop } from '@soybeanjs/ui';
</script>

<template>
  <SBacktop />
</template>
```

## Demos

```playground
basic
target
disabled
custom-styling
```

## Backtop API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: 'Custom classes for the Backtop button' },
  { name: 'visibilityHeight', type: 'number', default: '400', description: 'Scroll distance required before the button becomes visible' },
  { name: 'target', type: 'BacktopTarget', default: 'window', description: 'Scroll target to observe and control. Accepts a selector, element, window, or a function returning an element' },
  { name: 'duration', type: 'number', default: '300', description: 'Duration of the scroll-to-top animation in milliseconds' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the Backtop button is disabled' },
  { name: 'color', type: 'ThemeColor', default: 'primary', description: 'Color preset reused from the button styles' },
  { name: 'size', type: 'ThemeSize', default: 'lg', description: 'Size preset reused from the button styles' },
  { name: 'variant', type: 'ButtonVariant', default: 'solid', description: 'Visual variant reused from the button styles' },
  { name: 'shape', type: 'ButtonShape', default: 'circle', description: 'Shape preset reused from the button styles' },
  { name: 'shadow', type: 'ButtonShadow', default: 'lg', description: 'Shadow preset reused from the button styles' },
  { name: 'fitContent', type: 'boolean', default: 'true', description: 'Whether the button shrinks to fit its content' },
  { name: 'icon', type: 'string', default: 'lucide:arrow-up', description: 'Default icon used when no custom slot content is provided' },
  { name: 'iconClass', type: 'ClassValue', default: '-', description: 'Custom classes for the default icon' },
  { name: 'iconProps', type: 'Partial<IconProps>', default: '-', description: 'Additional props forwarded to the default icon' },
]"/>

### Events

<DataTable preset="emits" :data="[
  { name: 'change', parameters: '(visible: boolean) => void', description: 'Triggered when the visible state changes' },
  { name: 'click', parameters: '(event: MouseEvent) => void', description: 'Triggered when the Backtop button is activated' },
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '{ visible: boolean }', description: 'Custom Backtop content' },
]"/>

### Types

<TypeTable :data="[
  {
    name: 'BacktopTarget',
    description: 'Target type used to resolve the scroll container',
    fields: [
      { name: 'value', type: 'string | Window | HTMLElement | (() => HTMLElement)', description: 'Selector, window, element instance, or a function returning an element' },
    ],
  }
]"/>
