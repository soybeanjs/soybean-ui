# Drawer

## Overview

A panel that slides out from the edge of the screen. It reuses the declarative API and slot contract of `SDialog`, and adds `side` to control where the panel enters.

## Usage

```vue
<script setup lang="ts">
import { SDrawer, SButton } from '@soybeanjs/ui';

const open = ref(false);
</script>

<template>
  <SDrawer v-model:open="open" title="Menu" side="left">
    <template #trigger>
      <SButton variant="outline">Open Drawer</SButton>
    </template>
    <div class="py-4">
      <p>Navigation links...</p>
    </div>
  </SDrawer>
</template>
```

## Demos

```playground
side
scroll
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'side', type: `'top' \| 'right' \| 'bottom' \| 'left'`, default: `'right'`, description: 'The side of the screen from which the drawer appears.' },
  { name: 'open', type: 'boolean', default: '-', description: 'The controlled open state.' },
  { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'The default open state.' },
  { name: 'modal', type: 'boolean', default: 'true', description: 'Whether outside interaction is blocked.' },
  { name: 'isAlert', type: 'boolean', default: 'false', description: 'Render the panel with alert dialog semantics.' },
  { name: 'alertType', type: 'DialogAlertType', default: '-', description: 'Semantic alert type used by alert drawers.' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'Drawer size (width/height depending on side).' },
  { name: 'title', type: 'string', default: '-', description: 'Drawer title.' },
  { name: 'description', type: 'string', default: '-', description: 'Drawer description.' },
  { name: 'icon', type: 'IconValue', default: '-', description: 'Leading icon rendered before the title.' },
  { name: 'showClose', type: 'boolean', default: 'true', description: 'Whether to show the built-in close button.' },
  { name: 'pure', type: 'boolean', default: 'false', description: 'Render only the panel shell and skip the built-in header/footer layout.' },
  { name: 'cancelText', type: 'string', default: '`Cancel`', description: 'Fallback text for the cancel action.' },
  { name: 'confirmText', type: 'string', default: '`Confirm`', description: 'Fallback text for the confirm action.' },
  { name: 'showCancel', type: '`onlyWarning` | boolean', default: '`onlyWarning`', description: 'Whether to render the built-in cancel action.' },
  { name: 'showConfirm', type: 'boolean', default: '`true` when `isAlert` is `true`', description: 'Whether to render the built-in confirm action.' },
  { name: 'class', type: 'ClassValue', default: '-', description: 'Custom class applied to the popup slot.' },
  { name: 'ui', type: 'Partial<DialogUi>', default: '-', description: 'Custom slot class names.' },
  { name: 'triggerProps', type: 'DialogTriggerProps', default: '-', description: 'Pass-through props for the trigger slot.' },
  { name: 'popupProps', type: 'DialogPopupProps', default: '-', description: 'Pass-through props for the popup element.' },
  { name: 'headerProps', type: 'DialogHeaderProps', default: '-', description: 'Pass-through props for the header wrapper.' },
  { name: 'contentProps', type: 'DialogContentProps', default: '-', description: 'Pass-through props for the content wrapper.' },
  { name: 'footerProps', type: 'DialogFooterProps', default: '-', description: 'Pass-through props for the footer wrapper.' },
  { name: 'titleProps', type: 'DialogTitleProps', default: '-', description: 'Pass-through props for the title element.' },
  { name: 'descriptionProps', type: 'DialogDescriptionProps', default: '-', description: 'Pass-through props for the description element.' },
  { name: 'overlayProps', type: 'DialogOverlayProps', default: '-', description: 'Pass-through props for the overlay element.' },
  { name: 'portalProps', type: 'DialogPortalProps', default: '-', description: 'Pass-through props for the portal wrapper.' },
  { name: 'closeProps', type: 'DialogCloseProps', default: '-', description: 'Pass-through props for the built-in close button.' },
  { name: 'cancelProps', type: 'DialogCancelProps', default: '-', description: 'Pass-through props for the built-in cancel button.' },
  { name: 'confirmProps', type: 'DialogConfirmProps', default: '-', description: 'Pass-through props for the built-in confirm button.' }
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'update:open', parameters: '(open: boolean) => void', description: 'Triggers when open state changes.' },
  { name: 'close', parameters: '(event: MouseEvent) => void', description: 'Triggers when the built-in close button is clicked.' },
  { name: 'cancel', parameters: '(event: MouseEvent) => void', description: 'Triggers when the built-in cancel button is clicked.' },
  { name: 'confirm', parameters: '(event: MouseEvent) => void', description: 'Triggers when the built-in confirm button is clicked.' },
  { name: 'open-auto-focus', parameters: '(event: Event) => void', description: 'Triggers when focus moves to drawer.' },
  { name: 'close-auto-focus', parameters: '(event: Event) => void', description: 'Triggers when focus moves back trigger.' },
  { name: 'escape-key-down', parameters: '(event: KeyboardEvent) => void', description: 'Triggers when escape key is pressed.' },
  { name: 'pointer-down-outside', parameters: '(event: PointerDownOutsideEvent) => void', description: 'Triggers when pointer is down outside.' },
  { name: 'interact-outside', parameters: '(event: PointerDownOutsideEvent | FocusOutsideEvent) => void', description: 'Triggers when interaction occurs outside.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'trigger', parameters: '{ open: boolean; close: () => void }', description: 'The element that opens the drawer.' },
  { name: 'default', parameters: '{ open: boolean; close: () => void }', description: 'Main content inside the drawer body.' },
  { name: 'title', parameters: '{ open: boolean; close: () => void }', description: 'Custom title content.' },
  { name: 'description', parameters: '{ open: boolean; close: () => void }', description: 'Custom description content.' },
  { name: 'close', parameters: '-', description: 'Custom content for the built-in close button.' },
  { name: 'footer', parameters: '{ open: boolean; close: () => void }', description: 'Custom footer content.' },
  { name: 'cancel', parameters: '-', description: 'Custom content for the built-in cancel action.' },
  { name: 'confirm', parameters: '-', description: 'Custom content for the built-in confirm action.' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'DialogUi',
    description: 'Custom styling classes reused from Dialog. `popup` controls the drawer panel container.',
    fields: [
      { name: 'overlay', type: 'string', description: 'Overlay backdrop class.' },
      { name: 'popup', type: 'string', description: 'Drawer panel container class.' },
      { name: 'header', type: 'string', description: 'Header container class.' },
      { name: 'content', type: 'string', description: 'Content container class.' },
      { name: 'footer', type: 'string', description: 'Footer container class.' },
      { name: 'title', type: 'string', description: 'Title class.' },
      { name: 'icon', type: 'string', description: 'Icon class.' },
      { name: 'description', type: 'string', description: 'Description class.' },
      { name: 'close', type: 'string', description: 'Close button class.' },
      { name: 'cancel', type: 'string', description: 'Cancel button class.' },
      { name: 'confirm', type: 'string', description: 'Confirm button class.' }
    ]
  }
]"/>

<UnionType name="ThemeSize" description="Theme size type" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />

<UnionType name="DialogAlertType" description="Dialog alert type" type="'default' | 'info' | 'success' | 'warning' | 'error'" />

<UnionType name="Side" description="Drawer placement" type="'top' | 'right' | 'bottom' | 'left'" />
