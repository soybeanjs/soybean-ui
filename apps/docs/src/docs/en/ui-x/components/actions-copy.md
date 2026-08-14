# ActionsCopy

## Overview

`SxActionsCopy` is a single-button copy action that copies a given text to the clipboard and shows a brief success state (✓/Copied) for 1.5 seconds.

Use it as the "copy" action on AI messages, code blocks, or any generated content that users may want to copy. It reads the text from the `text` prop (falling back to the default slot content) and invokes the `onCopy` callback after the copy attempt.

`SxActionsCopy` is a specialized member of the actions family, sitting alongside `SxActions` (generic action toolbar), `SxActionsFeedback` (like/dislike), and `SxFolder` (collapsible folder).

## Usage

<UsageCode component="actions-copy" />

## Features

- 📋 Clipboard copy — copies the `text` prop via `navigator.clipboard`
- ✅ Success feedback — shows ✓ and "Copied" for 1.5 seconds with a `data-copied` attribute
- 🧩 Custom slots — `icon` and `label` slots receive `{ copied }` for state-aware rendering
- 🚫 Disabled state — `disabled` blocks the copy action entirely
- 📞 `onCopy` callback — invoked with the copied text after every attempt, regardless of clipboard success
- 🛡️ Failure safe — clipboard errors (permissions, SSR) are silently ignored
- ♿ Accessible — the button carries an `aria-label` from the `label` prop

## Demos

<PlaygroundGallery component="actions-copy" />

## API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: 'Root class.' },
  { name: 'text', type: 'string', default: `''`, description: 'The text to copy. Falls back to the default slot content.' },
  { name: 'label', type: 'string', default: `'Copy'`, description: 'Accessible label.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the button is disabled.' },
  { name: 'onCopy', type: '(text: string) => void', default: '-', description: 'Callback invoked after a copy attempt, with the copied text.' },
]"/>

### Emits

This component does not emit any events — the copy result is delivered via the `onCopy` prop.

### Slots

<DataTable preset="slots" :data="[
  { name: 'icon', parameters: '{ copied: boolean }', description: 'Custom icon. Receives the current `copied` state.' },
  { name: 'label', parameters: '{ copied: boolean }', description: 'Custom label. Receives the current `copied` state.' },
]"/>

## Notes

### Architecture and benchmark differences

`SxActionsCopy` is a styled, single-package AI component in `@soybeanjs/ui-x` built on top of `@soybeanjs/headless` / `@soybeanjs/ui`: it is a self-contained presentational component with no headless composable dependency. The SFC wires the `actionsCopyVariants` recipe, calls `navigator.clipboard.writeText`, manages the transient `copied` state, and forwards slots. The `onCopy` prop is invoked after every copy attempt — even when the clipboard write fails — so callers always get notified.

| Capability | SoybeanUI-X | Vercel AI SDK | shadcn AI | Ant Design Chat |
| :--- | :---: | :---: | :---: | :---: |
| One-click copy to clipboard | ✅ | — | — | ✅ |
| Copied success feedback | ✅ | — | — | ✅ |
| Custom icon/label with `copied` state | ✅ | — | — | — |
| `onCopy` callback on every attempt | ✅ | — | — | — |
| Failure-safe (SSR/permissions) | ✅ | — | — | — |

`—` = unsupported or handled differently.

### Cautions

- The copy succeeds only when `navigator.clipboard` is available and permission is granted. In SSR or restricted environments the write fails silently — but `onCopy` still fires.
- `copied` resets to `false` after 1.5 seconds via `setTimeout`. Rapid re-clicks restart the timer.
- `text` falls back to the default slot content. If you use the default slot, the copied text is the slot's rendered text content.
- `disabled` blocks the copy entirely — the button is rendered with `disabled` and no `onCopy` call occurs.

## FAQ

### What text gets copied?

The `text` prop is the source of truth. When `text` is empty, the component falls back to the default slot content.

### How do I know when copying finished?

Pass an `onCopy` callback. It is invoked with the copied text after every attempt, including failed ones.

### Can I customise the copied state label?

Yes — use the `label` slot, which receives `{ copied }`:

```vue
<template #label="{ copied }">{{ copied ? 'Copied!' : 'Copy sentence' }}</template>
```

### Why does nothing happen on some environments?

`navigator.clipboard` requires a secure context and user permission. If the API is unavailable (SSR, permissions denied), the write is silently ignored — the component never throws.

### Does this component emit events?

No — `SxActionsCopy` has no emits. Use the `onCopy` prop to react to copy attempts.