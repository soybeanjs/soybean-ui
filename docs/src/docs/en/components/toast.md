# Toast

## Overview

`Toaster` renders the toast viewports and `toast` is the imperative API used to create, update, dismiss, and inspect notifications.

The first argument of `toast(...)` becomes the toast title/message. Use `description`, `action`, `cancel`, `icon`, `ui`, and `position` to customize each notification.

## Usage

Mount one `Toaster` near your app root. If your app is already wrapped with `SConfigProvider`, a default `Toaster` is rendered automatically unless `customToast` is set to `true`.

```vue
<script setup lang="ts">
import { SButton, Toaster, toast } from '@soybeanjs/ui';

function openToast() {
  toast.success('Project published', {
    description: 'The package has been pushed to the registry.',
    richColor: true
  });
}
</script>

<template>
  <Toaster />

  <SButton @click="openToast">Show Toast</SButton>
</template>
```

## Demos

```playground
base
types
promise
action
control
appearance
stack
position
```

## API

### toast Methods

<DataTable preset="props" :data="[
  { name: 'toast(message, options?)', type: '(message: VNode | string, options?: ToastExternal) => number | string', default: '-', description: 'Create or update a default toast. Reuse `options.id` to update an existing toast.' },
  { name: 'toast.message(message, options?)', type: '(message: VNode | string, options?: ToastExternal) => number | string', default: '-', description: 'Alias of `toast(...)`.' },
  { name: 'toast.success(message, options?)', type: '(message: VNode | string, options?: ToastExternal) => number | string', default: '-', description: 'Create a success toast.' },
  { name: 'toast.info(message, options?)', type: '(message: VNode | string, options?: ToastExternal) => number | string', default: '-', description: 'Create an info toast.' },
  { name: 'toast.warning(message, options?)', type: '(message: VNode | string, options?: ToastExternal) => number | string', default: '-', description: 'Create a warning toast.' },
  { name: 'toast.error(message, options?)', type: '(message: VNode | string, options?: ToastExternal) => number | string', default: '-', description: 'Create an error toast.' },
  { name: 'toast.loading(message, options?)', type: '(message: VNode | string, options?: ToastExternal) => number | string', default: '-', description: 'Create a loading toast. Combine with `id` to replace it later.' },
  { name: 'toast.custom(component, options?)', type: '(component: VNode, options?: ToastExternal) => number | string', default: '-', description: 'Render a fully custom VNode instead of the built-in toast layout.' },
  { name: 'toast.promise(promise, data)', type: '<T>(promise: ToastPromise<T>, data: ToastPromiseData<T>) => { unwrap: () => Promise<T> }', default: '-', description: 'Bind toast lifecycle to a promise and show loading / success / error states.' },
  { name: 'toast.dismiss(id?)', type: '(id?: number | string) => number | string | void', default: '-', description: 'Dismiss one toast by id, or all active toasts when called without arguments.' },
  { name: 'toast.getToasts()', type: '() => ToastT[]', default: '-', description: 'Get the currently active toasts.' },
  { name: 'toast.getHistory()', type: '() => (ToastT | ToastDismiss)[]', default: '-', description: 'Get the internal toast history, including dismiss events.' }
]"/>

### Toast Options

<DataTable preset="props" :data="[
  { name: 'id', type: 'number | string', default: 'auto', description: 'Stable toast id. Reuse it to update an existing toast.' },
  { name: 'toasterId', type: 'string', default: '-', description: 'Route the toast to a specific `Toaster` instance.' },
  { name: 'position', type: 'ToastPosition', default: 'inherits `Toaster.position`', description: 'Per-toast viewport position override.' },
  { name: 'duration', type: 'number', default: 'inherits `Toaster.duration`', description: 'Auto close duration in milliseconds. Use `0` or `Infinity` to disable auto dismiss.' },
  { name: 'description', type: 'VNode | string', default: '-', description: 'Secondary content shown below the title.' },
  { name: 'icon', type: 'VNode | string', default: '-', description: 'Custom leading icon. String values are resolved through `iconRender`.' },
  { name: 'content', type: 'VNode', default: '-', description: 'Extra content rendered inside the built-in layout.' },
  { name: 'action', type: 'VNode | string', default: '-', description: 'Primary footer action. String values are resolved through `buttonRender`.' },
  { name: 'cancel', type: 'VNode | string', default: '-', description: 'Secondary footer action. String values are resolved through `buttonRender`.' },
  { name: 'onAction', type: '(event: MouseEvent) => void', default: '-', description: 'Called when the action button is clicked.' },
  { name: 'onCancel', type: '(event: MouseEvent) => void', default: '-', description: 'Called when the cancel button is clicked.' },
  { name: 'dismissible', type: 'boolean', default: 'true', description: 'Whether swipe and close interactions are allowed.' },
  { name: 'showClose', type: 'boolean', default: 'inherits `Toaster.showClose`', description: 'Whether to show the close button for this toast.' },
  { name: 'close', type: 'VNode | string', default: '-', description: 'Custom close icon or node.' },
  { name: 'richColor', type: 'boolean', default: 'false', description: 'Apply semantic filled color styles for info, success, warning, and error toasts.' },
  { name: 'inverted', type: 'boolean', default: 'false', description: 'Use the inverted toast palette.' },
  { name: 'ui', type: 'Partial<ToastUi>', default: '-', description: 'Override slot class names for the current toast.' },
  { name: 'onDismiss', type: '(toast: ToastT) => void', default: '-', description: 'Called when the toast is dismissed manually.' },
  { name: 'onAutoClose', type: '(toast: ToastT) => void', default: '-', description: 'Called when the toast closes after its duration elapses.' },
  { name: 'testId', type: 'string', default: '-', description: 'Test id forwarded to the rendered toast element.' }
]"/>

### toast.promise Data

<DataTable preset="props" :data="[
  { name: 'loading', type: 'VNode | string', default: '-', description: 'Message rendered while the promise is pending.' },
  { name: 'success', type: 'ToastPromiseResolver<ToastPromiseResult | VNode | string, T>', default: '-', description: 'Content or resolver used when the promise resolves.' },
  { name: 'error', type: 'ToastPromiseResolver<ToastPromiseResult | VNode | string>', default: '-', description: 'Content or resolver used when the promise rejects.' },
  { name: 'description', type: 'ToastPromiseResolver<VNode | string, T>', default: '-', description: 'Optional shared description or resolver for promise states.' },
  { name: 'finally', type: '() => void | Promise<void>', default: '-', description: 'Called after the promise flow completes.' },
  { name: 'id / position / duration / dismissible / richColor / inverted / ui', type: 'same as Toast Options', default: '-', description: 'Common toast options also supported by `toast.promise`.' }
]"/>

### Toaster Props

<DataTable preset="props" :data="[
  { name: 'id', type: 'string', default: '-', description: 'Unique toaster id used together with `toast(..., { toasterId })`.' },
  { name: 'size', type: 'ThemeSize', default: '`md`', description: 'Controls width, spacing, and typography of the built-in toast UI.' },
  { name: 'ui', type: 'ToastUi', default: '-', description: 'Override slot class names for the built-in toast UI.' },
  { name: 'position', type: 'ToastPosition', default: '`top-right`', description: 'Default position for new toasts.' },
  { name: 'hotkey', type: 'string[]', default: '`[\'altKey\', \'KeyT\']`', description: 'Keyboard shortcut used to focus the first active toast position.' },
  { name: 'containerAriaLabel', type: 'string', default: '`Notifications`', description: 'Base aria label announced for the toast region.' },
  { name: 'customAriaLabel', type: 'string', default: '-', description: 'Override the generated aria label completely.' },
  { name: 'dir', type: '`ltr` | `rtl`', default: 'inherits global direction', description: 'Direction override for the toaster.' },
  { name: 'duration', type: 'number', default: '`4000`', description: 'Default auto close duration in milliseconds.' },
  { name: 'gap', type: 'number', default: '`12`', description: 'Gap between stacked toasts.' },
  { name: 'offset', type: 'ToastOffset', default: '`24`', description: 'Viewport offset from screen edges. Also supports per-side values.' },
  { name: 'visibleCounts', type: 'number', default: '`3`', description: 'Maximum number of visible toasts per position before collapsing into a stack.' },
  { name: 'defaultExpanded', type: 'boolean', default: '`false`', description: 'Render stacks expanded by default.' },
  { name: 'swipeDirections', type: 'SwipeDirection[]', default: 'inferred from position', description: 'Allowed swipe directions for dismissing toasts.' },
  { name: 'showIcon', type: 'boolean', default: '`true`', description: 'Whether built-in toasts render type icons by default.' },
  { name: 'showClose', type: 'boolean', default: '`true`', description: 'Whether built-in toasts render the close button by default.' },
  { name: 'icons', type: 'Partial<Record<ToastIconType, VNode | string>>', default: 'built-in icon map', description: 'Override built-in icons for `info`, `success`, `warning`, `error`, `loading`, and `close`.' },
  { name: 'iconRender', type: '(name: string) => VNode', default: 'renders `SIcon`', description: 'Convert string icon values into rendered icon nodes.' },
  { name: 'buttonRender', type: '(label: string, type: \`action\` | \`cancel\`) => VNode', default: 'renders `SButton`', description: 'Convert string `action` and `cancel` values into rendered buttons.' },
  { name: 'toastProps / wrapperProps / contentProps / titleProps / descriptionProps / iconProps / footerProps / actionProps / cancelProps / closeProps', type: 'HTMLAttributes / LiHTMLAttributes', default: '-', description: 'Pass-through props for built-in toast slots.' }
]"/>

## Types

<UnionType name="ToastType" description="Toast type" type="'default' | 'success' | 'info' | 'warning' | 'error' | 'loading'" />

<UnionType name="ToastPosition" description="Toast position" type="'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'" />
