# Menubar

## Overview

Use it to organize top-level application menus with desktop-style interactions such as grouped items, submenus, checkbox items, and radio items.

## Usage

```vue
<script setup lang="ts">
import {
  SMenubar,
  SMenubarContent,
  SMenubarItem,
  SMenubarMenu,
  SMenubarTrigger
} from '@soybeanjs/ui';
</script>

<template>
  <SMenubar>
    <SMenubarMenu value="file">
      <SMenubarTrigger>File</SMenubarTrigger>
      <SMenubarContent>
        <SMenubarItem>New Tab</SMenubarItem>
        <SMenubarItem>New Window</SMenubarItem>
      </SMenubarContent>
    </SMenubarMenu>
  </SMenubar>
</template>
```

## Demo

```playground
basic
checkbox
radio
```

## API

### Primary components

<DataTable preset="props" :data="[
  { name: 'SMenubar', type: 'MenubarRootProps', default: '-', description: 'Menubar root that manages roving focus and the active top-level menu.' },
  { name: 'SMenubarMenu', type: 'MenubarMenuProps', default: '-', description: 'Container for a single top-level menu.' },
  { name: 'SMenubarTrigger', type: 'MenubarTriggerProps', default: '-', description: 'Top-level menu trigger.' },
  { name: 'SMenubarContent', type: 'MenubarContentProps', default: '-', description: 'Popup content for a top-level menu.' },
  { name: 'SMenubarItem', type: 'MenubarItemProps', default: '-', description: 'Standard menu item with destructive and inset visual variants.' },
  { name: 'SMenubarCheckboxItem', type: 'MenubarCheckboxItemProps', default: '-', description: 'Checkbox menu item.' },
  { name: 'SMenubarRadioItem', type: 'MenubarRadioItemProps', default: '-', description: 'Radio menu item.' },
  { name: 'SMenubarSubTrigger', type: 'MenubarSubTriggerProps', default: '-', description: 'Trigger for nested submenus.' },
  { name: 'SMenubarSubContent', type: 'MenubarSubContentProps', default: '-', description: 'Popup content for nested submenus.' },
  { name: 'SMenubarShortcut', type: 'MenubarShortcutProps', default: '-', description: 'Helper element for rendering shortcut hints.' }
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: string) => void', description: 'Emitted when the active SMenubar menu changes.' },
  { name: 'select', parameters: '(event: Event) => void', description: 'Emitted when SMenubarItem / SMenubarCheckboxItem / SMenubarRadioItem is selected.' },
  { name: 'update:modelValue', parameters: '(value: CheckedState) => void', description: 'Emitted when the checked state of SMenubarCheckboxItem changes.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '-', description: 'Default slot content for each component.', required: true },
  { name: 'indicator-icon', parameters: '-', description: 'Custom indicator icon for SMenubarCheckboxItem / SMenubarRadioItem.' },
  { name: 'icon', parameters: '-', description: 'Custom trailing icon for SMenubarSubTrigger.' }
]"/>
