# Folder

## Overview

`SxFolder` is a collapsible folder component that presents a folder-style header (name, optional icon, and optional item-count badge) above a toggleable content area.

Use it to group related content — such as attachments, sources, or sub-documents — under a folder-like header. The folder's open state is initialized from `defaultOpen` (initial only, not watched), the header button sets `aria-expanded`, and the content renders only when a default slot is present.

`SxFolder` is a sibling of the actions family (`SxActions`, `SxActionsCopy`, `SxActionsFeedback`) but is purpose-built for organizing content rather than triggering actions.

## Usage

<UsageCode component="folder" />

## Features

- 📁 Collapsible folder — header button toggles the content area with `aria-expanded`
- 🔢 Count badge — `count` renders an item-count badge; hidden when `undefined`
- 🧩 Custom slots — `icon` (receives `{ open }`), `name` (no props), and the default content slot
- 🚦 Conditional content — content renders only when the default slot is provided, shown with `v-show`
- ⚙️ Initial state only — `defaultOpen` seeds the internal `open` ref and is not watched afterward
- 🔒 Type safe — `FolderProps` requires the `name` string prop

## Demos

<PlaygroundGallery component="folder" />

## API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: 'Root class.' },
  { name: 'name', type: 'string', default: '-', description: 'The folder name. Required.' },
  { name: 'count', type: 'number', default: '-', description: 'Number of items to show as a badge. Hidden when `undefined`.' },
  { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'Whether the folder is expanded by default.' },
]"/>

### Emits

This component does not emit any events.

### Slots

<DataTable preset="slots" :data="[
  { name: 'icon', parameters: '{ open: boolean }', description: 'Custom folder icon. Receives the current open state.' },
  { name: 'name', parameters: '-', description: 'Custom folder name rendering.' },
  { name: 'default', parameters: '-', description: 'Folder content, displayed when expanded.' },
]"/>

## Notes

### Architecture and benchmark differences

`SxFolder` is a styled, single-package AI component in `@soybeanjs/ui-x` built on top of `@soybeanjs/headless` / `@soybeanjs/ui`: it is a self-contained presentational component with no headless composable dependency. The SFC wires the `folderVariants` recipe and manages a single internal `open` ref initialized from `defaultOpen`. Unlike `SxThink`, whose `defaultOpen` is watched for external control, `SxFolder` treats `defaultOpen` as an initial value only — the open state is internal after mount.

| Capability                         | SoybeanUI-X | Vercel AI SDK | shadcn AI | Ant Design Chat |
| :--------------------------------- | :---------: | :-----------: | :-------: | :-------------: |
| Collapsible folder header          |     ✅      |       —       |     —     |        —        |
| Item-count badge                   |     ✅      |       —       |     —     |        —        |
| Custom icon with `open` state      |     ✅      |       —       |     —     |        —        |
| Conditional content rendering      |     ✅      |       —       |     —     |        —        |
| Internal open state (uncontrolled) |     ✅      |       —       |     —     |        —        |

`—` = unsupported or handled differently.

### Cautions

- `name` is **required** — it renders as the folder header text (or through the `name` slot).
- `defaultOpen` is read **once** at initialization. Changing it later does not re-open/close the folder; the open state is internal.
- The content area renders only when the default slot is present, and is shown with `v-show`. Without a default slot the component renders just the header.
- The `count` badge is hidden when `count` is `undefined` — pass a number to display it.

## FAQ

### How do I show the folder expanded initially?

Set `default-open` (or `:defaultOpen`) to `true`. The folder starts expanded on first render.

### Can I control the folder from outside after mount?

No — unlike `SxThink`, `SxFolder` reads `defaultOpen` only once at initialization. The open state becomes internal after mount.

### How do I change the folder icon?

Use the `icon` slot, which receives `{ open }`:

```vue
<template #icon="{ open }">{{ open ? '📂' : '📁' }}</template>
```

### How do I show the item count?

Pass the `count` prop with a number. The badge is hidden when `count` is `undefined`.

### When is the content area rendered?

Only when you provide a default slot. Without it, `SxFolder` renders just the header button.
