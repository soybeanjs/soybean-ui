# Attachments

## Overview

`SxAttachments` is the AI attachment strip — a vertical list of attachment previews with built-in select and remove actions. It renders one `SxFileCard` per attachment and delegates all visual details (icon, name, meta line) to that sibling component.

Use it above a `SxSender` to show pending attachments before a message is sent, or inside a `SxBubble` to display attachments attached to an already-sent message. It composes `SxFileCard` internally, so the two components share the same `Attachment` data model and kind-based icon map.

## Usage

<UsageCode component="attachments" />

## Features

- 🧱 Composes `SxFileCard` — every attachment renders as a full file card with kind icon, name and meta line
- 🖱 Click to select — clicking a card emits `select` (e.g. open a preview)
- 🗑 Remove per item — the default `actions` slot renders a remove button that emits `remove` with `click.stop`
- 🎨 Custom slots — `prepend`, `item`, `actions` and `remove-icon` cover most layout needs
- 📏 Compact vertical layout — a slim root column that scales with any number of attachments
- 🔒 Type safe — accepts `Attachment[]` directly from `@soybeanjs/ui-x/types`

## Demos

<PlaygroundGallery component="attachments" />

## API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: 'Root class.' },
  { name: 'attachments', type: 'Attachment[]', default: '-', description: 'The attachments to render.', required: true },
  { name: 'showIcons', type: 'boolean', default: 'true', description: 'Whether to render the icon column.' },
  { name: 'onRemove', type: '(attachment: Attachment) => void', default: '-', description: 'Callback invoked when the user requests to remove an attachment.' },
  { name: 'onSelect', type: '(attachment: Attachment) => void', default: '-', description: 'Callback invoked when an attachment is clicked.' },
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'remove', parameters: '[attachment: Attachment]', description: 'Emitted when an attachment is removed via the remove button.' },
  { name: 'select', parameters: '[attachment: Attachment]', description: 'Emitted when an attachment is clicked.' },
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'prepend', parameters: '-', description: 'Content rendered above the attachment list.' },
  { name: 'item', parameters: '{ attachment: Attachment }', description: 'Custom item content replacing the default SxFileCard.' },
  { name: 'actions', parameters: '{ attachment: Attachment }', description: 'Custom actions per attachment (overrides the default remove button).' },
  { name: 'remove-icon', parameters: '-', description: 'Custom remove button icon.' },
]"/>

## Notes

### Architecture and benchmark differences

`SxAttachments` is a styled, single-package AI component in `@soybeanjs/ui-x` built on top of `@soybeanjs/headless` / `@soybeanjs/ui`. It owns only the list iteration and the select/remove wiring; the per-item presentation is fully delegated to the sibling `SxFileCard` component, which keeps icon mapping and meta rendering in one place. There is no headless counterpart in `@soybeanjs/ui-x` for this list shell — it is a thin styled composition over the shared `Attachment` type.

| Capability | SoybeanUI-X | Vercel AI SDK | shadcn AI | Ant Design Chat |
| :--- | :---: | :---: | :---: | :---: |
| Attachment preview list | ✅ | — | — | ✅ |
| Click-to-select attachment | ✅ | — | — | — |
| Per-item remove action | ✅ | — | — | ✅ |
| Composable slots (item/actions) | ✅ | — | — | — |
| Shared `Attachment` data model | ✅ | — | — | — |

`—` = unsupported or handled differently.

### Cautions

- The default `actions` slot renders a remove button that emits `remove` — the component does **not** mutate your `attachments` array. Filter it yourself in the handler.
- The remove button uses `click.stop`, so clicking it never also fires `select`.
- When you provide the `item` slot, the default `SxFileCard` (and therefore its click-to-select wiring) is replaced — wire your own click handler if you still need selection.
- `showIcons` only hides the icon column; icon *content* is decided by `SxFileCard` based on `attachment.kind`.

## FAQ

### How do I remove an attachment?

Listen to `remove` and update your array: `@remove="attachments = attachments.filter(a => a.id !== $event.id)"`.

### How do I open a preview when an attachment is clicked?

Listen to `select` and open your own preview — `@select="openPreview($event)"`. Each card click emits `select` with the clicked `Attachment`.

### How do I add a header above the list?

Use the `prepend` slot — it renders at the very top of the root container.

### Can I fully customize how each attachment looks?

Yes — the `item` slot receives `{ attachment }` and replaces the default `SxFileCard` entirely. See the 02-custom-item demo.

### How do I swap the remove icon?

Use the `remove-icon` slot, or override `actions` to render your own controls (the slot receives `{ attachment }`).
