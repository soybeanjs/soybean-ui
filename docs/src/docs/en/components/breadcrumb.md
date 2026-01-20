# Breadcrumb

## Overview

Breadcrumbs allow users to navigate through the hierarchy of pages. It displays the current location within the application structure.

## Usage

```vue
<script setup lang="ts">
import { SBreadcrumb } from '@soybeanjs/ui';

const items = [{ label: 'Home', link: '/' }, { label: 'Components', link: '/components' }, { label: 'Breadcrumb' }];
</script>

<template>
  <SBreadcrumb :items="items" />
</template>
```

## Demos

```playground
base
separator
link
item-dropdown
ellipsis-dropdown
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'items', type: 'BreadcrumbOptionData[]', default: '-', description: 'Data array for breadcrumb items.', required: true },
  { name: 'size', type: `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`, default: `'md'`, description: 'Breadcrumb size.' },
  { name: 'ellipsis', type: 'boolean | [number, number]', default: 'false', description: 'Enable ellipsis for long paths. True collapses middle items. Array specifies start/end count.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom class names.' },
  { name: 'listProps', type: 'object', default: '{}', description: 'Props for the list container.' },
  { name: 'itemProps', type: 'object', default: '{}', description: 'Props for item wrapper.' },
  { name: 'linkProps', type: 'object', default: '{}', description: 'Props for link element.' },
  { name: 'pageProps', type: 'object', default: '{}', description: 'Props for current page text.' },
  { name: 'separatorProps', type: 'object', default: '{}', description: 'Props for separator.' },
  { name: 'ellipsisProps', type: 'object', default: '{}', description: 'Props for ellipsis item.' }
]"/>

### Events

<DataTable preset="emits" :data="[
  { name: 'click', parameters: '(item: BreadcrumbOptionData) => void', description: 'Triggers when a breadcrumb item is clicked.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'separator', parameters: '-', description: 'Custom separator content.' },
  { name: 'ellipsis', parameters: '{ ellipsisItems: BreadcrumbOptionData[] }', description: 'Custom ellipsis content.' },
  { name: 'item-leading', parameters: '{ item: BreadcrumbOptionData }', description: 'Content before item label.' },
  { name: 'item-label', parameters: '{ item: BreadcrumbOptionData }', description: 'Custom label content.' },
  { name: 'item-trailing', parameters: '{ item: BreadcrumbOptionData }', description: 'Content after item label.' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'BreadcrumbOptionData',
    description: 'Data structure for breadcrumb items.',
    fields: [
      { name: 'label', type: 'string', description: 'Display text.' },
      { name: 'value', type: 'string', description: 'Unique identifier.' },
      { name: 'link', type: 'string', description: 'URL or route path.' },
      { name: 'icon', type: 'string', description: 'Icon name (Iconify).' },
      { name: 'disabled', type: 'boolean', description: 'Whether the item is disabled.' },
      { name: 'linkProps', type: 'BreadcrumbLinkProps', description: 'Props for the link.' },
    ]
  },
  {
    name: 'Ui',
    description: 'Custom styling classes.',
    fields: [
      { name: 'root', type: 'string', description: 'Root element class.' },
      { name: 'list', type: 'string', description: 'List container class.' },
      { name: 'item', type: 'string', description: 'Item wrapper class.' },
      { name: 'link', type: 'string', description: 'Link element class.' },
      { name: 'page', type: 'string', description: 'Current page text class.' },
      { name: 'separator', type: 'string', description: 'Separator element class.' },
      { name: 'ellipsis', type: 'string', description: 'Ellipsis element class.' },
    ]
  }
]"/>
