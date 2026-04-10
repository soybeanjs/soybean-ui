# Splitter

## Overview

A composable layout component that divides an area into resizable panels.

## Usage

```vue
<script setup lang="ts">
import { SSplitterGroup, SSplitterPanel, SSplitterResizeHandle } from '@soybeanjs/ui';
</script>

<template>
  <SSplitterGroup>
    <SSplitterPanel :default-size="30">Sidebar</SSplitterPanel>
    <SSplitterResizeHandle with-handle aria-label="Resize panels" />
    <SSplitterPanel>Main content</SSplitterPanel>
  </SSplitterGroup>
</template>
```

## Demo

```playground
basic
vertical
collapsible
disabled
custom-handle
```

## API

### Group Props

<DataTable preset="props" :data="[
  { name: 'direction', type: '`horizontal` | `vertical`', default: '`horizontal`', description: 'Splitter orientation.' },
  { name: 'dir', type: '`ltr` | `rtl`', default: '`ltr`', description: 'Reading direction for horizontal keyboard and pointer behavior.' },
  { name: 'defaultLayout', type: 'number[]', default: '-', description: 'Initial panel layout percentages.' },
  { name: 'keyboardResizeBy', type: 'number', default: '10', description: 'Percentage step used by keyboard resizing.' },
  { name: 'class', type: 'ClassValue', default: '-', description: 'Custom class for the group root element.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom classes for internal elements.' },
]"/>

### Panel Props

<DataTable preset="props" :data="[
  { name: 'defaultSize', type: 'number', default: '-', description: 'Initial panel size as a percentage.' },
  { name: 'minSize', type: 'number', default: '10', description: 'Minimum expanded panel size as a percentage.' },
  { name: 'maxSize', type: 'number', default: '100', description: 'Maximum panel size as a percentage.' },
  { name: 'collapsible', type: 'boolean', default: 'false', description: 'Whether the panel can collapse.' },
  { name: 'collapsedSize', type: 'number', default: '0', description: 'Panel size when collapsed.' },
  { name: 'order', type: 'number', default: '-', description: 'Explicit panel order for conditional rendering scenarios.' },
  { name: 'class', type: 'ClassValue', default: '-', description: 'Custom class for the panel root element.' },
]"/>

### Resize Handle Props

<DataTable preset="props" :data="[
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the resize handle is disabled.' },
  { name: 'tabindex', type: 'number', default: '0', description: 'Tab order of the resize handle.' },
  { name: 'class', type: 'ClassValue', default: '-', description: 'Custom class for the resize handle.' },
  { name: 'withHandle', type: 'boolean', default: 'false', description: 'Render the default visual grip inside the handle.' },
]"/>

### Events

<DataTable preset="emits" :data="[
  { name: 'layout', parameters: '(value: number[]) => void', description: 'Triggered when the group layout changes.' },
  { name: 'collapse', parameters: '() => void', description: 'Triggered when a panel collapses.' },
  { name: 'expand', parameters: '() => void', description: 'Triggered when a panel expands.' },
  { name: 'resize', parameters: '(size: number, prevSize?: number) => void', description: 'Triggered when a panel size changes.' },
  { name: 'dragging', parameters: '(value: boolean) => void', description: 'Triggered when a resize handle starts or stops dragging.' },
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '{ layout }', description: 'Splitter group content.', required: true },
  { name: 'default (panel)', parameters: '{ isCollapsed, isExpanded, collapse, expand, resize }', description: 'Panel content and imperative helpers.' },
  { name: 'default (resize handle)', parameters: '{ active, focused }', description: 'Custom resize handle content.' },
]"/>

### Types

<TypeTable :data="[
  {
    name: 'Ui',
    description: 'Custom class map for Splitter.',
    fields: [
      { name: 'root', type: 'string', description: 'Group root container class.' },
      { name: 'panel', type: 'string', description: 'Panel root class.' },
      { name: 'resizeHandle', type: 'string', description: 'Resize handle class.' },
    ],
  }
]"/>
