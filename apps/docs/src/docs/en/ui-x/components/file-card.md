# FileCard

## Overview

`SxFileCard` is the atomic file preview card of the AI package — a single attachment rendered as a kind icon, file name and meta line (`mimeType · size`). It is the building block used by `SxAttachments` to render its list items.

Use it to preview a single attachment inside a message, an upload queue, or any file list. It composes nothing internally but is designed to be nested inside `SxAttachments`, which supplies the select/remove behavior on top of the card.

## Usage

<UsageCode component="file-card" />

## Features

- 🗂 Kind-based icon map — 📄 file, 🖼 image, 🎬 video, 🎵 audio, 🔗 link, 🗄 database, ❔ unknown (defaults to file)
- 📋 Auto meta line — joins `mimeType` and `size` with a `·` separator, hidden when both are empty
- 🖱 Optional click handler — pass `onClick` to open a preview; the root becomes a focusable `role="button"` with `tabindex=0`
- 🧩 Four slots — `icon`, `name`, `meta`, `actions` give full control over the card surface
- 🎨 Token-based styling — styled via the `fileCardVariants` UnoCSS recipe, inherits your theme
- 🔒 Type safe — renders any `Attachment` from `@soybeanjs/ui-x/types`

## Demos

<PlaygroundGallery component="file-card" />

## API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: 'Root class.' },
  { name: 'attachment', type: 'Attachment', default: '-', description: 'The attachment to render.', required: true },
  { name: 'onClick', type: '() => void', default: 'undefined', description: 'Optional click handler (e.g. open preview).' },
]"/>

### Emits

This component does not emit any events (click is delivered via the `onClick` prop).

### Slots

<DataTable preset="slots" :data="[
  { name: 'icon', parameters: '{ kind: AttachmentKind }', description: 'Custom icon content for the given kind.' },
  { name: 'name', parameters: '{ attachment: Attachment }', description: 'Custom file name rendering.' },
  { name: 'meta', parameters: '{ meta: string }', description: 'Custom meta line rendering (mimeType · size).' },
  { name: 'actions', parameters: '{ attachment: Attachment }', description: 'Actions rendered on the right of the card.' },
]"/>

## Notes

### Architecture and benchmark differences

`SxFileCard` is a styled, single-package AI component in `@soybeanjs/ui-x` built on top of `@soybeanjs/headless` / `@soybeanjs/ui`. It is a leaf component: it renders only the card surface from a single `Attachment` and holds no state — the kind→icon map is a pure constant and the meta line is derived with a computed. Clicking behavior is opt-in via the `onClick` prop, which also toggles the keyboard-focusable `role="button"` semantics. `SxAttachments` composes this card and adds the list-level select/remove wiring.

| Capability                       | SoybeanUI-X | Vercel AI SDK | shadcn AI | Ant Design Chat |
| :------------------------------- | :---------: | :-----------: | :-------: | :-------------: |
| Single file preview card         |     ✅      |       —       |     —     |       ✅        |
| Kind-based icon mapping          |     ✅      |       —       |     —     |       ✅        |
| MIME + size meta line            |     ✅      |       —       |     —     |        —        |
| Keyboard-focusable click card    |     ✅      |       —       |     —     |        —        |
| Slots for icon/name/meta/actions |     ✅      |       —       |     —     |        —        |

`—` = unsupported or handled differently.

### Cautions

- The `icon` slot receives `{ kind }`, not the whole attachment — use it to render a custom glyph per kind.
- The meta line only renders when at least one of `mimeType` / `size` is present; the `meta` slot also stays empty then.
- `onClick` adds `role="button"` and `tabindex=0` to the root, but the component itself implements no keyboard activation — pair it with your own `keydown` handler if the card must be activated via keyboard.
- Clicking the card fires only `onClick`; it does not emit any Vue event. For event-based selection, wrap the card in `SxAttachments`.

## FAQ

### How do I open a preview when the card is clicked?

Pass `onClick` — `:on-click="openPreview"`. When provided, the card becomes keyboard-focusable. See the 02-clickable demo.

### How do I change the icon for a specific kind?

Use the `icon` slot — it receives `{ kind }` so you can map kinds to your own icons: `#icon="{ kind }"`.

### Why is the meta line missing?

The meta line joins `mimeType` and `size`; if both are empty on your `Attachment`, nothing renders. Provide at least one of them.

### How do I add an action button (e.g. download)?

Use the `actions` slot — it renders on the right of the card with `{ attachment }`.

### What kinds of icons are supported?

`file`, `image`, `video`, `audio`, `link`, `database` and `unknown`. A missing `kind` defaults to `file`.
