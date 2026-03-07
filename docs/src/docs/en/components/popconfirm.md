# Popconfirm

## Overview

A confirmation box component based on Popover, used for lightweight secondary confirmation operations.

## Usage

```vue
<script setup lang="ts">
import { SPopconfirm, SButton } from '@soybeanjs/ui';

function handleConfirm() {
  console.log('Confirmed!');
}

function handleCancel() {
  console.log('Cancelled!');
}
</script>

<template>
  <SPopconfirm
    title="Delete Item?"
    description="This action cannot be undone. Are you sure you want to delete this item?"
    type="destructive"
    :before-confirm="handleConfirm"
    :before-cancel="handleCancel"
  >
    <template #trigger>
      <SButton color="destructive">Delete</SButton>
    </template>
  </SPopconfirm>
</template>
```

## Playground

```playground
base
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'Size of the popconfirm.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom class names.' },
  { name: 'class', type: 'ClassValue', default: '-', description: 'Class name for the popup element.' },
  { name: 'type', type: 'PopconfirmType', default: '-', description: 'Confirm box type, determines icon color.' },
  { name: 'open', type: 'boolean', default: '-', description: 'Controlled open state.' },
  { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'Default open state.' },
  { name: 'modal', type: 'boolean', default: 'false', description: 'Whether the popconfirm should be modal.' },
  { name: 'placement', type: 'Placement', default: `'bottom'`, description: 'Preferred popup placement.' },
  { name: 'showIcon', type: 'boolean', default: 'true', description: 'Whether to show the icon.' },
  { name: 'showArrow', type: 'boolean', default: 'true', description: 'Whether to show the arrow.' },
  { name: 'title', type: 'string', default: '-', description: 'Title text.' },
  { name: 'description', type: 'string', default: '-', description: 'Description text.' },
  { name: 'content', type: 'string', default: '-', description: 'Content text for the default slot.' },
  { name: 'cancelText', type: 'string', default: `'Cancel'`, description: 'Cancel button text.' },
  { name: 'confirmText', type: 'string', default: `'Confirm'`, description: 'Confirm button text.' },
  { name: 'showCancel', type: `'onlyWarning' \| boolean`, default: `'onlyWarning'`, description: `Whether to show cancel button. 'onlyWarning' shows cancel only when type is warning.` },
  { name: 'beforeCancel', type: '() => MaybePromise<boolean \| void>', default: '-', description: 'Callback before cancel. Return false to prevent closing.' },
  { name: 'beforeConfirm', type: '() => MaybePromise<boolean \| void>', default: '-', description: 'Callback before confirm. Return false to prevent closing.' },
  { name: 'confirmProps', type: 'PopconfirmConfirmProps', default: '-', description: 'Props for the confirm button.' },
  { name: 'cancelProps', type: 'PopconfirmCancelProps', default: '-', description: 'Props for the cancel button.' },
  { name: 'positionerProps', type: 'PopoverPositionerProps', default: '-', description: 'Props for the positioner element.' },
  { name: 'popupProps', type: 'PopoverPopupProps', default: '-', description: 'Props for the popup element.' },
  { name: 'triggerProps', type: 'PopoverTriggerProps', default: '-', description: 'Props for the trigger element.' },
  { name: 'closeProps', type: 'PopoverCloseProps', default: '-', description: 'Props for the close element.' },
  { name: 'portalProps', type: 'PopoverPortalProps', default: '-', description: 'Props for the portal element.' },
  { name: 'arrowProps', type: 'PopoverArrowProps', default: '-', description: 'Props for the arrow element.' },
  { name: 'headerProps', type: 'PopconfirmHeaderProps', default: '-', description: 'Props for the header element.' },
  { name: 'titleProps', type: 'PopconfirmTitleProps', default: '-', description: 'Props for the title element.' },
  { name: 'descriptionProps', type: 'PopconfirmDescriptionProps', default: '-', description: 'Props for the description element.' },
  { name: 'contentProps', type: 'PopconfirmContentProps', default: '-', description: 'Props for the content element.' },
  { name: 'footerProps', type: 'PopconfirmFooterProps', default: '-', description: 'Props for the footer element.' },
]"/>

### Events

<DataTable preset="emits" :data="[
  { name: 'update:open', parameters: '(open: boolean) => void', description: 'Emitted when the open state changes.' },
  { name: 'close', parameters: '() => void', description: 'Emitted when the popconfirm is closed.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'trigger', parameters: '-', description: 'The element that triggers the popconfirm.' },
  { name: 'title', parameters: '{ close: () => void }', description: 'Custom title content.' },
  { name: 'description', parameters: '{ close: () => void }', description: 'Custom description content.' },
  { name: 'default', parameters: '{ close: () => void }', description: 'Custom content between description and footer.' },
  { name: 'footer', parameters: '{ close: () => void }', description: 'Custom footer content with action buttons.' },
  { name: 'close', parameters: '-', description: 'Custom close button element.' }
]"/>

### Types

<UnionType name="ThemeSize" description="Theme size type" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />

<TypeTable :data="[
  {
    name: 'Ui',
    description: 'Custom style classes.',
    fields: [
      { name: 'positioner', type: 'string', description: 'Positioner container class.' },
      { name: 'popup', type: 'string', description: 'Popup content container class.' },
      { name: 'arrow', type: 'string', description: 'Arrow element class.' },
      { name: 'header', type: 'string', description: 'Header area class.' },
      { name: 'title', type: 'string', description: 'Title class.' },
      { name: 'description', type: 'string', description: 'Description class.' },
      { name: 'content', type: 'string', description: 'Content area class.' },
      { name: 'footer', type: 'string', description: 'Footer action area class.' }
    ]
  }
]"/>

<UnionType name="ClassValue" description="Class value type" type="string | null | undefined | Record<string, boolean> | ClassValue[]" />

<UnionType name="PopconfirmType" description="Popconfirm type" type="'destructive' | 'success' | 'warning' | 'info'" />

<UnionType name="Placement" description="Popup placement options" type="'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'" />
