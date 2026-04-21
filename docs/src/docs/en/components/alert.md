# Alert

## Overview

Displays a callout for user attention. Useful for warnings, errors, or information.

## Usage

```vue
<script setup lang="ts">
import { SAlert } from '@soybeanjs/ui';
</script>

<template>
  <SAlert title="Info" description="This is an info alert" />
  <SAlert title="Error" description="Something went wrong" color="destructive" variant="soft" />
</template>
```

> `SAlert` now delegates the default icon/title/description/close composition to headless `AlertCompact`. When you need the unstyled composition entrypoint directly, import it from `@soybeanjs/headless/alert`.

## Demos

```playground
color
variant
description
icon
desc-icon
closable
slot
size
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: 'Root class name.' },
  { name: 'open', type: 'boolean', default: 'true', description: 'Controls whether the alert is visible.' },
  { name: 'title', type: 'string', default: '-', description: 'Alert title.' },
  { name: 'description', type: 'string', default: '-', description: 'Alert description.' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'Alert size.' },
  { name: 'color', type: `'primary' \| 'destructive' \| 'success' \| 'warning' \| 'info' \| 'carbon' \| 'secondary' \| 'accent'`, default: `'primary'`, description: 'Theme color.' },
  { name: 'variant', type: `'solid' \| 'outline' \| 'soft' \| 'ghost' \| 'pure'`, default: `'ghost'`, description: 'Visual style variant.' },
  { name: 'icon', type: 'string | Component', default: '-', description: 'Custom icon.' },
  { name: 'closable', type: 'boolean', default: 'false', description: 'Whether to show close button.' },
  { name: 'contentProps', type: 'AlertContentProps', default: '-', description: 'Native props forwarded to the content wrapper.' },
  { name: 'titleProps', type: 'AlertTitleProps', default: '-', description: 'Native props forwarded to the title element.' },
  { name: 'descriptionProps', type: 'AlertDescriptionProps', default: '-', description: 'Native props forwarded to the description element.' },
  { name: 'closeProps', type: 'AlertCloseProps', default: '-', description: 'Native props forwarded to the close trigger.' },
  { name: 'ui', type: 'AlertExtendedUi', default: '{}', description: 'Custom class names.' }
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'update:open', parameters: '(open: boolean) => void', description: 'Triggers when the alert open state changes.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '-', description: 'Main content.' },
  { name: 'leading', parameters: '-', description: 'Custom leading content. Replaces the default icon rendering.' },
  { name: 'title', parameters: '-', description: 'Custom title slot.' },
  { name: 'description', parameters: '-', description: 'Custom description slot.' },
  { name: 'trailing', parameters: '-', description: 'Custom trailing content.' },
  { name: 'close', parameters: '-', description: 'Custom close button slot.' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'AlertExtendedUi',
    description: 'Custom styling classes.',
    fields: [
      { name: 'root', type: 'string', description: 'Root element class.' },
      { name: 'icon', type: 'string', description: 'Icon container class.' },
      { name: 'content', type: 'string', description: 'Content wrapper class.' },
      { name: 'title', type: 'string', description: 'Title text class.' },
      { name: 'description', type: 'string', description: 'Description text class.' },
      { name: 'close', type: 'string', description: 'Close button class.' },
    ]
  }
]"/>

<UnionType name="ThemeSize" description="Theme size type" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
