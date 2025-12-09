# Button

## Demos

```playground
color
variant
size
shape
shadow
slot
disabled
loading
icon
link
group
```

## API

### Props

| Name           | Type                                                                                                  | Default   | Description         |
| -------------- | ----------------------------------------------------------------------------------------------------- | --------- | ------------------- |
| **color**      | "primary" \| "destructive" \| "success" \| "warning" \| "info" \| "carbon" \| "secondary" \| "accent" | "primary" | Button color        |
| **size**       | "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl"                                                         | "md"      | Button size         |
| **variant**    | "solid" \| "outline" \| "dashed" \| "soft" \| "ghost" \| "link" \| "plain" \| "pure"                  | "solid"   | Button variant      |
| **shape**      | "auto" \| "rounded" \| "square" \| "circle"                                                           | "auto"    | Button shape        |
| **shadow**     | "none" \| "sm" \| "md" \| "lg"                                                                        | "none"    | Shadow effect       |
| **fitContent** | boolean                                                                                               | false     | Fit content to size |
| **disabled**   | boolean                                                                                               | false     | Disabled            |

### Emits

| Event Name | Parameters              | Description  |
| ---------- | ----------------------- | ------------ |
| **click**  | **(event: MouseEvent)** | Click button |

### Slots

| Slot Name | Parameters | Description    |
| --------- | ---------- | -------------- |
| default   | -          | Button content |

## Component Types

The Button component family includes the following components:

- **SButton** - Basic button component
- **SButtonLink** - Link button, supports route navigation
- **SButtonIcon** - Icon button, compact design
- **SButtonLoading** - Loading state button
- **SButtonGroup** - Button group component

## Main Features

- 🎨 8 variants: solid, outline, dashed, soft, ghost, link, plain, pure
- 🌈 8 colors: primary, destructive, success, warning, info, carbon, secondary, accent
- 📏 6 sizes: xs, sm, md, lg, xl, 2xl
- 🔲 4 shapes: auto, rounded, square, circle
- ⚡ Loading state support
- 🌐 Link function support (SButtonLink)
- ♿ Full accessibility support
- 🎯 TypeScript type safety

## Basic Usage

```vue
<script setup lang="ts">
import { SButton } from '@soybeanjs/ui';
</script>

<template>
  <SButton>Default Button</SButton>
</template>
```
