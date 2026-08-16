# Attachments

Source URL: https://ui.soybeanjs.cn/ui-x/attachments
Markdown URL: https://ui.soybeanjs.cn/ui-x/attachments.md
Category: Attachments
Description: `SxAttachments` is the AI attachment strip — a vertical list of attachment previews with built-in select and remove actions. It renders one `SxFileCard` per attachment and delegates all visual details (icon, name, meta line) to that sibling component.

## Overview

`SxAttachments` is the AI attachment strip — a vertical list of attachment previews with built-in select and remove actions. It renders one `SxFileCard` per attachment and delegates all visual details (icon, name, meta line) to that sibling component.

Use it above a `SxSender` to show pending attachments before a message is sent, or inside a `SxBubble` to display attachments attached to an already-sent message. It composes `SxFileCard` internally, so the two components share the same `Attachment` data model and kind-based icon map.

## Usage

Usage examples for attachments are rendered on the site.

## Features

- 🧱 Composes `SxFileCard` — every attachment renders as a full file card with kind icon, name and meta line
- 🖱 Click to select — clicking a card emits `select` (e.g. open a preview)
- 🗑 Remove per item — the default `actions` slot renders a remove button that emits `remove` with `click.stop`
- 🎨 Custom slots — `prepend`, `item`, `actions` and `remove-icon` cover most layout needs
- 📏 Compact vertical layout — a slim root column that scales with any number of attachments
- 🔒 Type safe — accepts `Attachment[]` directly from `@soybeanjs/ui-x/types`

## Demos

Interactive demos for attachments are rendered on the site.

## API

Structured API summary generated from build-time component metadata.

- Exported symbols (1): Attachments.

### Attachments

#### Props

Properties for the SxAttachments component.

- `class`: root class (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `attachments`: The attachments to render. (type `Attachment[]`; required)
- `showIcons`: Whether to render the icon column. Defaults to `true`. (type `boolean`; optional)
- `onRemove`: Emitted when the user requests to remove an attachment. (type `((attachment: Attachment) => void)`; optional)
- `onSelect`: Emitted when an attachment is clicked. (type `((attachment: Attachment) => void)`; optional)

## Notes

### Architecture and benchmark differences

`SxAttachments` is a styled, single-package AI component in `@soybeanjs/ui-x` built on top of `@soybeanjs/headless` / `@soybeanjs/ui`. It owns only the list iteration and the select/remove wiring; the per-item presentation is fully delegated to the sibling `SxFileCard` component, which keeps icon mapping and meta rendering in one place. There is no headless counterpart in `@soybeanjs/ui-x` for this list shell — it is a thin styled composition over the shared `Attachment` type.

| Capability                      | SoybeanUI-X | Vercel AI SDK | shadcn AI | Ant Design Chat |
| :------------------------------ | :---------: | :-----------: | :-------: | :-------------: |
| Attachment preview list         |     ✅      |       —       |     —     |       ✅        |
| Click-to-select attachment      |     ✅      |       —       |     —     |        —        |
| Per-item remove action          |     ✅      |       —       |     —     |       ✅        |
| Composable slots (item/actions) |     ✅      |       —       |     —     |        —        |
| Shared `Attachment` data model  |     ✅      |       —       |     —     |        —        |

`—` = unsupported or handled differently.

### Cautions

- The default `actions` slot renders a remove button that emits `remove` — the component does **not** mutate your `attachments` array. Filter it yourself in the handler.
- The remove button uses `click.stop`, so clicking it never also fires `select`.
- When you provide the `item` slot, the default `SxFileCard` (and therefore its click-to-select wiring) is replaced — wire your own click handler if you still need selection.
- `showIcons` only hides the icon column; icon _content_ is decided by `SxFileCard` based on `attachment.kind`.

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
