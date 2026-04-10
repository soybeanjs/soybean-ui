# Toolbar

## Overview

A compact container that groups related actions, links, and toggle controls into a single roving-focus toolbar.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { SToolbar, SToolbarButton, SToolbarSeparator, SToolbarToggleGroup, SToolbarToggleItem } from '@soybeanjs/ui';

const value = ref('bold');
</script>

<template>
  <SToolbar>
    <SToolbarButton>Cut</SToolbarButton>
    <SToolbarButton>Copy</SToolbarButton>
    <SToolbarSeparator />
    <SToolbarToggleGroup v-model="value">
      <SToolbarToggleItem value="bold">Bold</SToolbarToggleItem>
      <SToolbarToggleItem value="italic">Italic</SToolbarToggleItem>
    </SToolbarToggleGroup>
  </SToolbar>
</template>
```

## Demos

```playground
basic
link
toggle-group
vertical
```

## API

### SToolbar Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: 'Custom toolbar class name.' },
  { name: 'ui', type: 'ToolbarUi', default: '{}', description: 'Custom classes for toolbar slots.' },
  { name: 'orientation', type: `'horizontal' | 'vertical'`, default: `'horizontal'`, description: 'Toolbar orientation.' },
  { name: 'dir', type: `'ltr' | 'rtl'`, default: '-', description: 'Reading direction.' },
  { name: 'loop', type: 'boolean', default: 'false', description: 'Whether roving focus loops.' },
  { name: 'as', type: 'string | Component', default: `'div'`, description: 'Rendered element.' },
  { name: 'asChild', type: 'boolean', default: 'false', description: 'Merge props into the child element.' }
]"/>

### SToolbarButton Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: 'Custom button class name.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the button is disabled.' },
  { name: 'type', type: `'button' | 'submit' | 'reset'`, default: `'button'`, description: 'Native button type when rendered as a button.' },
  { name: 'as', type: 'string | Component', default: `'button'`, description: 'Rendered element.' },
  { name: 'asChild', type: 'boolean', default: 'false', description: 'Merge props into the child element.' }
]"/>

### SToolbarLink Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: 'Custom link class name.' },
  { name: 'href', type: 'string', default: '-', description: 'Link URL.' },
  { name: 'to', type: 'RouteLocationRaw', default: '-', description: 'Router target.' },
  { name: 'disabled', type: 'boolean', default: '-', description: 'Whether the link is disabled.' },
  { name: 'target', type: 'string', default: '-', description: 'Link target.' }
]"/>

### SToolbarSeparator Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: 'Custom separator class name.' },
  { name: 'decorative', type: 'boolean', default: 'false', description: 'Whether the separator is decorative only.' }
]"/>

### SToolbarToggleGroup Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: 'Custom toggle group class name.' },
  { name: 'modelValue', type: 'string | string[]', default: '-', description: 'Controlled selected value(s).' },
  { name: 'defaultValue', type: 'string | string[]', default: '-', description: 'Initial selected value(s).' },
  { name: 'multiple', type: 'boolean', default: 'false', description: 'Whether multiple items can be active.' },
  { name: 'singleClearable', type: 'boolean', default: 'true', description: 'Whether single mode can clear the active item.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the group is disabled.' },
  { name: 'orientation', type: `'horizontal' | 'vertical'`, default: 'inherits toolbar orientation', description: 'Toggle group orientation.' }
]"/>

### SToolbarToggleItem Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: 'Custom toggle item class name.' },
  { name: 'value', type: 'string | number', default: '-', description: 'Unique item value.', required: true },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the item is disabled.' }
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'click', parameters: '(event: MouseEvent) => void', description: 'Triggered when a toolbar button is clicked.' },
  { name: 'update:modelValue', parameters: '(value: string | string[]) => void', description: 'Triggered when a toolbar toggle group selection changes.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '-', description: 'Toolbar content.', required: true }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'ToolbarUi',
    description: 'Toolbar slot class map.',
    fields: [
      { name: 'root', type: 'string', description: 'Toolbar root class.' },
      { name: 'button', type: 'string', description: 'Toolbar button class.' },
      { name: 'link', type: 'string', description: 'Toolbar link class.' },
      { name: 'separator', type: 'string', description: 'Toolbar separator class.' },
      { name: 'toggleGroup', type: 'string', description: 'Toolbar toggle group class.' },
      { name: 'toggleItem', type: 'string', description: 'Toolbar toggle item class.' }
    ],
  }
]"/>
