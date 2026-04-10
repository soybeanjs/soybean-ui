# Anchor

## Overview

Anchor provides in-page navigation for long content sections and keeps the current section highlighted while scrolling.

## Usage

```vue
<script setup lang="ts">
import { shallowRef } from 'vue';
import { SAnchor } from '@soybeanjs/ui';

const containerRef = shallowRef<HTMLElement>();

const items = [
  { href: '#overview', title: 'Overview' },
  { href: '#api', title: 'API' }
];

const getContainer = () => containerRef.value ?? window;
</script>

<template>
  <div class="grid gap-4 md:grid-cols-[220px_minmax(0,1fr)]">
    <SAnchor :items="items" :get-container="getContainer" />
    <div ref="containerRef" class="max-h-80 overflow-auto">
      <section id="overview" class="min-h-60">...</section>
      <section id="api" class="min-h-60">...</section>
    </div>
  </div>
</template>
```

## Demos

```playground
basic
color
size
sticky
custom-styling
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'items', type: 'AnchorItemData[]', default: '[]', description: 'Anchor items to render.', required: true },
  { name: 'class', type: 'ClassValue', default: '-', description: 'Root container class.' },
  { name: 'bounds', type: 'number', default: '5', description: 'Extra threshold used when deciding the active anchor during scrolling.' },
  { name: 'color', type: 'ThemeColor', default: `'primary'`, description: 'Color used for the active item and indicator.' },
  { name: 'dir', type: `'ltr' \| 'rtl'`, default: `'ltr'`, description: 'Text direction.' },
  { name: 'getContainer', type: '() => HTMLElement | Window', default: '() => window', description: 'Returns the scroll container used for anchor tracking.' },
  { name: 'getCurrentAnchor', type: '(activeHref: string) => string', default: '-', description: 'Maps the internally detected active href to a custom href.' },
  { name: 'linkProps', type: 'Omit<AnchorLinkProps, `href`>', default: '-', description: 'Shared props forwarded to each rendered anchor link.' },
  { name: 'modelValue', type: 'string', default: '-', description: 'Controlled active href.' },
  { name: 'offsetTop', type: 'number', default: '0', description: 'Offset applied when scrolling to a section and when using sticky mode.' },
  { name: 'orientation', type: `'vertical' \| 'horizontal'`, default: `'vertical'`, description: 'Anchor layout orientation.' },
  { name: 'replace', type: 'boolean', default: 'false', description: 'Uses history.replaceState instead of history.pushState for hash updates.' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'Anchor size.' },
  { name: 'sticky', type: 'boolean', default: 'true', description: 'Makes the anchor stick within its container.' },
  { name: 'targetOffset', type: 'number', default: '-', description: 'Overrides offsetTop when calculating scroll targets.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom class names.' }
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: string) => void', description: 'Triggers when the active href changes.' },
  { name: 'activeChange', parameters: '(value: string) => void', description: 'Triggers when scroll tracking activates a new href.' },
  { name: 'itemSelect', parameters: '(event: MouseEvent, payload: { href: string }) => void', description: 'Triggers when an anchor item is clicked.' }
]"/>

### Slots

<DataTable preset="slots" :data="[]"/>

### Types

<TypeTable :data="[
  {
    name: 'Ui',
    description: 'Custom styling classes.',
    fields: [
      { name: 'root', type: 'string', description: 'Root container class.' },
      { name: 'link', type: 'string', description: 'Anchor link class.' },
      { name: 'item', type: 'string', description: 'Anchor item wrapper class.' },
      { name: 'indicator', type: 'string', description: 'Active indicator class.' },
      { name: 'children', type: 'string', description: 'Nested item container class.' }
    ]
  },
  {
    name: 'AnchorItemData',
    description: 'Anchor item tree node.',
    fields: [
      { name: 'href', type: 'string', description: 'Target hash href.' },
      { name: 'title', type: 'string', description: 'Displayed label.' },
      { name: 'target', type: 'string', description: 'Optional link target.' },
      { name: 'disabled', type: 'boolean', description: 'Whether the item is disabled.' },
      { name: 'children', type: 'AnchorItemData[]', description: 'Nested child items.' }
    ]
  }
]"/>

<UnionType name="ThemeSize" description="Theme size type" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
<UnionType name="ThemeColor" description="Theme color type" type="'primary' | 'destructive' | 'success' | 'warning' | 'info' | 'carbon' | 'secondary' | 'accent'" />
