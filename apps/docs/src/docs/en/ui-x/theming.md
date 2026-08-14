# Theming

## Theme Tokens

UI-X inherits the theme system from `@soybeanjs/ui`. All theme tokens (colors, sizes, radii) are shared between UI and UI-X components.

## Dark Mode

UI-X components fully support dark mode through the same theme system:

```vue
<script setup lang="ts">
import { SxBubble, SxMarkdown } from '@soybeanjs/ui-x';
</script>

<template>
  <SxBubble role="ai" placement="start">
    <SxMarkdown content="**Markdown** renders in both light and dark mode." />
  </SxBubble>
</template>
```

## Customizing Styles

Each UI-X component accepts a `class` prop and supports the `ui` prop pattern for per-slot customization:

```vue
<SxBubble content="Custom styled bubble" class="rounded-2xl" :ui="{ root: 'bg-primary/10 border-primary/20' }" />
```

## Color Variants

Components like `SxNotification` and `SxActionsFeedback` use semantic colors that align with the theme palette:

- `primary` — default accent
- `success` — positive feedback / success notifications
- `warning` — cautionary notifications
- `error` / `danger` — error states
- `info` — informational notifications
