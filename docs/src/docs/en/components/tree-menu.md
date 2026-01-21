# TreeMenu

## Overview

A hierarchical menu component commonly used for sidebar navigation. It supports nested items, grouping, icons, badges, and collapse state.

## Usage

```vue
<script setup lang="ts">
import { STreeMenu } from '@soybeanjs/ui';

const items = [
  {
    label: 'Dashboard',
    value: 'dashboard',
    icon: 'lucide:layout-dashboard',
    children: [
      { label: 'Analytics', value: 'analytics' },
      { label: 'Reports', value: 'reports' }
    ]
  },
  {
    label: 'Settings',
    value: 'settings',
    icon: 'lucide:settings'
  }
];
</script>

<template>
  <STreeMenu :items="items" />
</template>
```

## Demos

```playground
base
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'items', type: 'TreeMenuOptionData[]', default: '-', description: 'Menu data.', required: true },
  { name: 'defaultExpanded', type: 'string[]', default: '[]', description: 'Default expanded keys.' },
  { name: 'defaultSelected', type: 'string', default: '-', description: 'Default selected key.' },
  { name: 'accordion', type: 'boolean', default: 'false', description: 'Whether to enable accordion mode.' },
  { name: 'collapsed', type: 'boolean', default: 'false', description: 'Whether the menu is collapsed.' },
  { name: 'collapsedWidth', type: 'number', default: '50', description: 'Width when collapsed.' },
  { name: 'indent', type: 'number', default: '16', description: 'Indentation width for nested items.' },
  { name: 'side', type: `'left' \| 'right'`, default: `'left'`, description: 'Side position (affects indentation direction).' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'Menu size.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom class names.' }
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'update:expanded', parameters: '(keys: string[]) => void', description: 'Triggers when expanded keys change.' },
  { name: 'update:selected', parameters: '(key: string) => void', description: 'Triggers when selected key changes.' },
  { name: 'click', parameters: '(item: TreeMenuOptionData) => void', description: 'Triggers when an item is clicked.' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'TreeMenuOptionData',
    description: 'Data structure for menu items.',
    fields: [
      { name: 'label', type: 'string', description: 'Display text.' },
      { name: 'value', type: 'string', description: 'Unique identifier.' },
      { name: 'icon', type: 'string', description: 'Icon name (Iconify).' },
      { name: 'children', type: 'TreeMenuOptionData[]', description: 'Child items.' },
      { name: 'disabled', type: 'boolean', description: 'Whether item is disabled.' },
      { name: 'badge', type: 'string', description: 'Badge text.' },
      { name: 'tag', type: 'string', description: 'Tag text.' },
    ]
  }
]"/>

<UnionType name="ThemeSize" description="Theme size type" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
