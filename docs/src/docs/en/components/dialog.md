# Dialog

## Overview

A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.

`SDialog` is the declarative wrapper for inline usage. `dialog(...)` is the imperative API for creating alert-style dialogs programmatically.

Mount `SDialogProvider` once near your app root before calling the imperative `dialog(...)` API.

## Usage

### Declarative

```vue
<script setup lang="ts">
import { SDialog, SButton } from '@soybeanjs/ui';

const open = ref(false);
</script>

<template>
  <SDialog v-model:open="open" title="Edit Profile" description="Make changes to your profile here.">
    <template #trigger>
      <SButton variant="outline">Edit Profile</SButton>
    </template>
    <div class="grid gap-4 py-4">
      <!-- Form content -->
    </div>
    <template #footer>
      <SButton @click="open = false">Save changes</SButton>
    </template>
  </SDialog>
</template>
```

### Imperative API

```vue
<script setup lang="ts">
import { h } from 'vue';
import { SButton, SDialogProvider, dialog } from '@soybeanjs/ui';

function openWarningDialog() {
  dialog.warning('Delete Project', {
    description: 'This action cannot be undone.',
    content: h('div', 'Please confirm before continuing.'),
    confirmText: 'Delete'
  });
}
</script>

<template>
  <SDialogProvider />

  <SButton color="warning" @click="openWarningDialog">Open Dialog</SButton>
</template>
```

## Demos

```playground
base
footer
state
prevent
pure
dialog-api
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'open', type: 'boolean', default: '-', description: 'The controlled open state.' },
  { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'The default open state (uncontrolled).' },
  { name: 'modal', type: 'boolean', default: 'true', description: 'Whether outside interaction is blocked.' },
  { name: 'isAlert', type: 'boolean', default: 'false', description: 'Render the popup with alert dialog semantics.' },
  { name: 'alertType', type: 'DialogAlertType', default: '-', description: 'Semantic alert type used by alert dialogs.' },
  { name: 'title', type: 'string', default: '-', description: 'Dialog title.' },
  { name: 'description', type: 'string', default: '-', description: 'Dialog description.' },
  { name: 'icon', type: 'IconValue', default: '-', description: 'Leading icon rendered before the title.' },
  { name: 'showClose', type: 'boolean', default: 'true', description: 'Whether to show the built-in close button.' },
  { name: 'pure', type: 'boolean', default: 'false', description: 'Render only the popup shell and skip the built-in header/footer layout.' },
  { name: 'cancelText', type: 'string', default: '`Cancel`', description: 'Fallback text for the cancel action.' },
  { name: 'confirmText', type: 'string', default: '`Confirm`', description: 'Fallback text for the confirm action.' },
  { name: 'showCancel', type: '`onlyWarning` | boolean', default: '`onlyWarning`', description: 'Whether to render the built-in cancel action.' },
  { name: 'showConfirm', type: 'boolean', default: '`true` when `isAlert` is `true`', description: 'Whether to render the built-in confirm action.' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'Dialog size.' },
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
  { name: 'open-auto-focus', parameters: '(event: Event) => void', description: 'Triggers when focus moves to dialog.' },
  { name: 'close-auto-focus', parameters: '(event: Event) => void', description: 'Triggers when focus moves back trigger.' },
  { name: 'escape-key-down', parameters: '(event: KeyboardEvent) => void', description: 'Triggers when escape key is pressed.' },
  { name: 'pointer-down-outside', parameters: '(event: PointerDownOutsideEvent) => void', description: 'Triggers when pointer is down outside.' },
  { name: 'interact-outside', parameters: '(event: PointerDownOutsideEvent | FocusOutsideEvent) => void', description: 'Triggers when interaction occurs outside.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'trigger', parameters: '{ open: boolean; close: () => void }', description: 'The element that opens the dialog.' },
  { name: 'default', parameters: '{ open: boolean; close: () => void }', description: 'Main content inside the popup body.' },
  { name: 'title', parameters: '{ open: boolean; close: () => void }', description: 'Custom title content.' },
  { name: 'description', parameters: '{ open: boolean; close: () => void }', description: 'Custom description content.' },
  { name: 'close', parameters: '-', description: 'Custom content for the built-in close button.' },
  { name: 'footer', parameters: '{ open: boolean; close: () => void }', description: 'Custom footer content.' },
  { name: 'cancel', parameters: '-', description: 'Custom content for the built-in cancel action.' },
  { name: 'confirm', parameters: '-', description: 'Custom content for the built-in confirm action.' }
]"/>

### dialog Methods

<DataTable preset="props" :data="[
  { name: 'dialog(message, options?)', type: '(message: VNode | string, options?: DialogExternal) => number | string', default: '-', description: 'Create or update a default dialog. Reuse `options.id` to update an existing entry.' },
  { name: 'dialog.success(message, options?)', type: '(message: VNode | string, options?: DialogExternal) => number | string', default: '-', description: 'Create a success dialog.' },
  { name: 'dialog.info(message, options?)', type: '(message: VNode | string, options?: DialogExternal) => number | string', default: '-', description: 'Create an info dialog.' },
  { name: 'dialog.warning(message, options?)', type: '(message: VNode | string, options?: DialogExternal) => number | string', default: '-', description: 'Create a warning dialog.' },
  { name: 'dialog.error(message, options?)', type: '(message: VNode | string, options?: DialogExternal) => number | string', default: '-', description: 'Create an error dialog.' },
  { name: 'dialog.getDialogs()', type: '() => DialogT[]', default: '-', description: 'Get the currently active dialogs.' },
  { name: 'dialog.getHistory()', type: '() => DialogT[]', default: '-', description: 'Get the internal dialog history.' }
]"/>

### dialog Options

<DataTable preset="props" :data="[
  { name: 'id', type: 'number | string', default: 'auto', description: 'Stable dialog id. Reuse it to update an existing dialog.' },
  { name: 'open', type: 'boolean', default: 'true', description: 'Whether the created dialog starts in the open state.' },
  { name: 'description', type: 'VNode | string', default: '-', description: 'Secondary content rendered below the title.' },
  { name: 'icon', type: 'IconValue', default: '-', description: 'Leading icon rendered before the title.' },
  { name: 'content', type: 'VNode', default: '-', description: 'Extra body content rendered in the built-in layout.' },
  { name: 'footer', type: 'VNode', default: '-', description: 'Custom footer content.' },
  { name: 'cancelText', type: 'VNode | string', default: '-', description: 'Override the built-in cancel label.' },
  { name: 'confirmText', type: 'VNode | string', default: '-', description: 'Override the built-in confirm label.' },
  { name: 'showCancel', type: '`onlyWarning` | boolean', default: '-', description: 'Whether to render the built-in cancel action.' },
  { name: 'showConfirm', type: 'boolean', default: '-', description: 'Whether to render the built-in confirm action.' },
  { name: 'ui', type: 'Partial<DialogUi>', default: '-', description: 'Override slot class names for the current dialog.' },
  { name: 'onCancel', type: '(event: MouseEvent) => void', default: '-', description: 'Called when the built-in cancel button is clicked.' },
  { name: 'onConfirm', type: '(event: MouseEvent) => void', default: '-', description: 'Called when the built-in confirm button is clicked.' },
  { name: 'onDismiss', type: '(dialog: DialogT) => void', default: '-', description: 'Called when the dialog is dismissed by the provider.' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'DialogUi',
    description: 'Custom styling classes.',
    fields: [
      { name: 'overlay', type: 'string', description: 'Overlay backdrop class.' },
      { name: 'popup', type: 'string', description: 'Popup container class.' },
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
