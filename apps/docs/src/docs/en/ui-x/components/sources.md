# Sources

## Overview

`SxSources` is the AI citation list — a vertical list of reference sources used to answer a message. Each item is prefixed with a paperclip and either renders as an external link or a plain label.

Use it under an assistant `SxBubble` to show which documents, pages or internal entries informed the answer. Items with a `url` render as `<a target="_blank" rel="noopener noreferrer">` and emit `select` on click; items without a `url` render as a plain span.

## Usage

<UsageCode component="sources" />

## Features

- 📎 Paperclip prefix — every item starts with the 📎 glyph
- 🔗 External links — items with `url` render as `<a target="_blank" rel="noopener noreferrer">`, opening in a new tab
- 🖱 Click callback — clicking a link emits `select` with the full `Source`
- 🚫 Plain fallback — items without a `url` render as a non-link span (no navigation)
- 🧩 Custom label slot — the `label` slot receives `{ source }` for full control
- 🔒 Type safe — `Source[]` from `@soybeanjs/ui-x/types`

## Demos

<PlaygroundGallery component="sources" />

## API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: 'Root class.' },
  { name: 'sources', type: 'Source[]', default: '-', description: 'The sources to display.', required: true },
  { name: 'onSelect', type: '(source: Source) => void', default: '-', description: 'Callback invoked when a source is clicked.' },
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'select', parameters: '[source: Source]', description: 'Emitted when a source link is clicked.' },
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'label', parameters: '{ source: Source }', description: 'Custom label content for each source.' },
]"/>

## Notes

### Architecture and benchmark differences

`SxSources` is a styled, single-package AI component in `@soybeanjs/ui-x` built on top of `@soybeanjs/headless` / `@soybeanjs/ui`. It is a thin data-driven renderer: it iterates `sources`, picks the link or span branch based on `source.url`, and forwards the `label` slot — no headless composable is needed for a flat citation list. The `Source` type (`key`, `title`, `url`, `author`) is shared with `@soybeanjs/ui-x/types`.

| Capability | SoybeanUI-X | Vercel AI SDK | shadcn AI | Ant Design Chat |
| :--- | :---: | :---: | :---: | :---: |
| Citation/source list | ✅ | — | — | ✅ |
| Open-in-new-tab links | ✅ | — | — | ✅ |
| Click selection callback | ✅ | — | — | — |
| Plain fallback without URL | ✅ | — | — | — |
| Custom label slot | ✅ | — | — | — |

`—` = unsupported or handled differently.

### Cautions

- `select` fires only for items with a `url` — plain spans render no link and emit nothing.
- The link opens in a new tab by default (`target="_blank"`); you cannot override that via the component — block it in your click handler if needed.
- Items are keyed by `source.key` — keys must be unique within a single `sources` array.
- The `author` field is part of the `Source` type but is not rendered by default; use the `label` slot to display it.

## FAQ

### How do I show a source without a link?

Omit `url` on that `Source` — it renders as a plain label instead of a link. See the 02-without-url demo.

### How do I react when a source is clicked?

Listen to `select` (or pass `onSelect`) — it fires with the full `Source` whenever a link item is clicked.

### Why doesn't the click fire for some items?

Only items with `url` render as links and emit `select`. Items without a `url` render as a plain span with no click behavior.

### How do I display the author?

Use the `label` slot — it receives `{ source }`, so you can render `source.author` alongside the title.

### Where should I place the sources list?

Under the assistant `SxBubble` that references them — typically right below the message body as a citation trail.
