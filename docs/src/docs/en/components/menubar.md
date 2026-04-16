# Menubar

## Overview

Displays a persistent application-style menu bar with horizontal trigger navigation, nested menus, and keyboard roving focus.

## Usage

```vue
<script setup lang="ts">
import { SMenubar } from '@soybeanjs/ui';

const items = [
  {
    value: 'file',
    label: 'File',
    items: [
      { value: 'new-tab', label: 'New Tab', shortcut: '⌘T' },
      { value: 'share', label: 'Share', children: [{ value: 'mail', label: 'Email Link' }] }
    ]
  },
  {
    value: 'edit',
    label: 'Edit',
    items: [
      { value: 'undo', label: 'Undo' },
      { value: 'redo', label: 'Redo' }
    ]
  }
];
</script>

<template>
  <SMenubar :items="items" />
</template>
```

## Demos

```playground
basic
controlled
rtl
```

## API

### SMenubar Props

<DataTable preset="props" :data="[
  { name: 'items', type: 'MenubarMenuData[]', default: '-', description: 'Top-level menubar sections.', required: true },
  { name: 'modelValue', type: 'string', default: '-', description: 'Controlled open menu value.' },
  { name: 'defaultValue', type: 'string', default: '-', description: 'Initially open menu value.' },
  { name: 'dir', type: 'Direction', default: '`ltr`', description: 'Reading direction.' },
  { name: 'loop', type: 'boolean', default: 'false', description: 'Whether roving focus loops across triggers.' },
  { name: 'class', type: 'ClassValue', default: '-', description: 'Class name applied to the menubar root.' },
  { name: 'size', type: 'ThemeSize', default: '`md`', description: 'Menubar size preset.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom slot class names.' },
  { name: 'indicatorPosition', type: '`start` | `end`', default: '`start`', description: 'Checkbox and radio indicator position inside popup items.' },
  { name: 'showArrow', type: 'boolean', default: 'false', description: 'Whether to show the popup arrow.' },
  { name: 'placement', type: 'Placement', default: '-', description: 'Preferred popup placement.' },
  { name: 'triggerProps', type: 'MenubarTriggerProps', default: '{}', description: 'Props forwarded to each trigger.' },
  { name: 'portalProps', type: 'MenubarPortalProps', default: '{}', description: 'Props forwarded to top-level and nested portals.' },
  { name: 'contentProps', type: 'MenubarContentProps', default: '{}', description: 'Props forwarded to each top-level popup.' },
  { name: 'popupProps', type: 'MenubarPopupProps', default: '{}', description: 'Props forwarded to the popup surface.' },
  { name: 'arrowProps', type: 'MenubarArrowProps', default: '{}', description: 'Props forwarded to the popup arrow.' },
  { name: 'groupProps', type: 'MenuGroupProps', default: '{}', description: 'Props forwarded to option groups.' },
  { name: 'groupLabelProps', type: 'MenuGroupLabelProps', default: '{}', description: 'Props forwarded to group labels.' },
  { name: 'itemProps', type: 'MenuItemProps', default: '{}', description: 'Props forwarded to menu items.' },
  { name: 'linkProps', type: 'LinkProps', default: '{}', description: 'Props forwarded to linked menu items.' },
  { name: 'subProps', type: 'MenuSubProps', default: '{}', description: 'Props forwarded to nested submenus.' },
  { name: 'subTriggerProps', type: 'MenuSubTriggerProps', default: '{}', description: 'Props forwarded to submenu triggers.' },
  { name: 'subContentProps', type: 'MenuSubContentProps', default: '{}', description: 'Props forwarded to submenu content.' },
  { name: 'separatorProps', type: 'MenuSeparatorProps', default: '{}', description: 'Props forwarded to separators.' },
  { name: 'shortcutProps', type: 'MenuShortcutProps', default: '{}', description: 'Props forwarded to shortcut badges.' }
]"/>

### SMenubar Emits

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: string) => void', description: 'Triggers when the active menu changes.' },
  { name: 'select', parameters: '(item: MenuOptionData, event: Event) => void', description: 'Triggers when a content item is selected.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'trigger', parameters: '{ item: MenubarMenuData }', description: 'Custom trigger content.' },
  { name: 'item', parameters: '{ item: MenuOptionData, isTrigger?: boolean }', description: 'Custom item content.' },
  { name: 'item-leading', parameters: '{ item: MenuOptionData }', description: 'Leading item content.' },
  { name: 'item-trailing', parameters: '{ item: MenuOptionData }', description: 'Trailing item content.' },
  { name: 'item-trigger-icon', parameters: '{ item: MenuOptionData }', description: 'Custom submenu trigger icon.' },
  { name: 'item-link-icon', parameters: '{ item: MenuOptionData }', description: 'Custom external-link icon.' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'MenubarMenuData',
    description: 'Top-level menubar section data.',
    fields: [
      { name: 'value', type: 'string', description: 'Unique menu value.' },
      { name: 'label', type: 'string', description: 'Trigger label.' },
      { name: 'disabled', type: 'boolean', description: 'Whether the trigger is disabled.' },
      { name: 'items', type: 'MenuOptionData[]', description: 'Content items rendered inside the popup.' }
    ]
  },
  {
    name: 'Ui',
    description: 'Custom styling classes.',
    fields: [
      { name: 'root', type: 'string', description: 'Menubar root class.' },
      { name: 'trigger', type: 'string', description: 'Top-level trigger class.' },
      { name: 'positioner', type: 'string', description: 'Top-level popup positioner class.' },
      { name: 'popup', type: 'string', description: 'Top-level popup class.' },
      { name: 'arrow', type: 'string', description: 'Popup arrow class.' },
      { name: 'subPositioner', type: 'string', description: 'Submenu positioner class.' },
      { name: 'subPopup', type: 'string', description: 'Submenu popup class.' },
      { name: 'subTrigger', type: 'string', description: 'Submenu trigger class.' },
      { name: 'group', type: 'string', description: 'Group container class.' },
      { name: 'groupLabel', type: 'string', description: 'Group label class.' },
      { name: 'item', type: 'string', description: 'Item class.' },
      { name: 'checkboxGroup', type: 'string', description: 'Checkbox group class.' },
      { name: 'checkboxItem', type: 'string', description: 'Checkbox item class.' },
      { name: 'radioGroup', type: 'string', description: 'Radio group class.' },
      { name: 'radioItem', type: 'string', description: 'Radio item class.' },
      { name: 'itemIndicator', type: 'string', description: 'Item indicator class.' },
      { name: 'separator', type: 'string', description: 'Separator class.' },
      { name: 'subTriggerIcon', type: 'string', description: 'Submenu trigger icon class.' },
      { name: 'itemLinkIcon', type: 'string', description: 'External-link icon class.' },
      { name: 'shortcut', type: 'string', description: 'Shortcut badge class.' }
    ]
  }
]"/>

<UnionType name="ThemeSize" description="Theme size type" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
