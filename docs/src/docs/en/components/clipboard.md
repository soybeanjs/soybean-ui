# Clipboard

## Overview

A clipboard action component for copying text values with accessible button semantics and copied-state feedback.

## Usage

```vue
<script setup lang="ts">
import { SClipboard, SIcon } from '@soybeanjs/ui';

const value = 'pnpm add @soybeanjs/ui';
</script>

<template>
  <SClipboard :value="value" color="accent" variant="soft">
    <template #leading="{ copied }">
      <SIcon :icon="copied ? 'lucide:check' : 'lucide:copy'" />
    </template>
    <template #default="{ copied }">
      {{ copied ? 'Copied' : 'Copy command' }}
    </template>
  </SClipboard>
</template>
```

## Features

- 📋 Copies a required text value on click
- ✅ Exposes ready, copied, and unsupported states
- 🎨 Supports the same color, size, variant, and shape tokens as button
- ♿ Keeps button semantics and disabled behavior in the headless layer
- 🎯 Provides slot props for custom copied-state UI

## Demos

```playground
basic
color
variant
size
disabled
custom-styling
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: 'Custom class name' },
  { name: 'color', type: 'ThemeColor', default: `'primary'`, description: 'Clipboard color' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'Clipboard size' },
  { name: 'variant', type: 'ClipboardVariant', default: `'solid'`, description: 'Clipboard variant' },
  { name: 'shape', type: 'ClipboardShape', default: `'auto'`, description: 'Clipboard shape' },
  { name: 'fitContent', type: 'boolean', default: 'false', description: 'Fit content to size' },
  { name: 'value', type: 'string', default: '-', required: true, description: 'Text value to copy' },
  { name: 'copiedDuration', type: 'number', default: '2000', description: 'Copied-state duration in milliseconds' },
  { name: 'legacy', type: 'boolean', default: 'true', description: 'Enable legacy `execCommand` fallback when available' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interaction' },
  { name: 'as', type: 'string | Component', default: `'button'`, description: 'Rendered element/component' },
  { name: 'asChild', type: 'boolean', default: 'false', description: 'Merge props/behavior into the child element' },
]"/>

### Events

<DataTable preset="emits" :data="[
  { name: 'click', parameters: 'MouseEvent', description: 'Triggered when the clipboard action is clicked' },
  { name: 'copied', parameters: 'string', description: 'Triggered after the value is copied successfully' },
  { name: 'copyError', parameters: 'unknown', description: 'Triggered when copying fails' },
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'leading', parameters: 'ClipboardSlotProps', description: 'Leading content before the main slot' },
  { name: 'default', parameters: 'ClipboardSlotProps', description: 'Main clipboard content' },
  { name: 'trailing', parameters: 'ClipboardSlotProps', description: 'Trailing content after the main slot' },
]"/>

## Types

<TypeTable :data="[
  {
    name: 'ClipboardProps',
    description: 'Props for `SClipboard`.',
    fields: [
      { name: 'class', type: 'ClassValue', description: 'Custom class name.' },
      { name: 'color', type: 'ThemeColor', description: 'Clipboard color.' },
      { name: 'size', type: 'ThemeSize', description: 'Clipboard size.' },
      { name: 'variant', type: 'ClipboardVariant', description: 'Clipboard variant.' },
      { name: 'shape', type: 'ClipboardShape', description: 'Clipboard shape.' },
      { name: 'fitContent', type: 'boolean', description: 'Fit content to size.' },
      { name: 'value', type: 'string', required: true, description: 'Text value to copy.' },
      { name: 'copiedDuration', type: 'number', description: 'Copied-state duration in milliseconds.' },
      { name: 'legacy', type: 'boolean', description: 'Enable legacy copy fallback.' },
      { name: 'disabled', type: 'boolean', description: 'Disable interaction.' },
      { name: 'as', type: 'string | Component', description: 'Rendered element/component.' },
      { name: 'asChild', type: 'boolean', description: 'Merge into child element.' },
    ]
  },
  {
    name: 'ClipboardSlotProps',
    description: 'Slot props exposed by `SClipboard`.',
    fields: [
      { name: 'copied', type: 'boolean', description: 'Whether the latest copy action is within the copied state duration.' },
      { name: 'disabled', type: 'boolean', description: 'Whether the clipboard action is disabled.' },
      { name: 'supported', type: 'boolean', description: 'Whether the current environment supports clipboard writing.' },
      { name: 'state', type: 'ClipboardState', description: 'Current clipboard state.' },
      { name: 'copy', type: '() => Promise<void>', description: 'Manually trigger the copy action.' },
    ]
  }
]"/>

<UnionType name="ClassValue" description="Class value type" type="string | null | undefined | Record<string, boolean> | ClassValue[]" />

<UnionType name="ThemeColor" description="Clipboard color" type="'primary' | 'destructive' | 'success' | 'warning' | 'info' | 'carbon' | 'secondary' | 'accent'" />

<UnionType name="ThemeSize" description="Clipboard size" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />

<UnionType name="ClipboardVariant" description="Clipboard variant" type="'solid' | 'outline' | 'dashed' | 'soft' | 'ghost' | 'link' | 'plain' | 'pure'" />

<UnionType name="ClipboardShape" description="Clipboard shape" type="'auto' | 'rounded' | 'square' | 'circle'" />

<UnionType name="ClipboardState" description="Clipboard state" type="'ready' | 'copied' | 'unsupported'" />
