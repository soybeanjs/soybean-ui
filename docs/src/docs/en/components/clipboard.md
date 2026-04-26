# Clipboard

## Overview

A clipboard action component for copying text values with accessible button semantics and copied-state feedback.

## Usage

```vue
<script setup lang="ts">
import { SClipboard } from '@soybeanjs/ui';

const value = 'pnpm add @soybeanjs/ui';
</script>

<template>
  <SClipboard :value="value" color="accent" variant="soft" copy-text="Copy command" copied-text="Copied" />
</template>
```

## Features

- 📋 Copies a required text value on click
- 🧩 Ships with built-in icon/text content that can still be overridden by slots
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

<ComponentApi component="clipboard" />
