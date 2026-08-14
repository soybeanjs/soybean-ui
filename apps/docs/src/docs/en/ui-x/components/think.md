# Think

## Overview

`SxThink` is a collapsible AI "deep thinking" panel that reveals the model's reasoning process behind an answer. It opens as a toggleable section with a header button and expandable content area, making it easy to show or hide the chain-of-thought trace.

Use it to display the internal reasoning steps of an AI response, helping users understand how the model arrived at its conclusion. The panel is collapsed by default so the main answer remains clean, and users can expand it on demand.

`SxThink` is a lightweight wrapper around the `useThink` composable from `@soybeanjs/ui-x`. It is often used alongside `SxThoughtChain` (for structured step-by-step reasoning) and `SxBubble` (for the overall message display).

## Usage

<UsageCode component="think" />

## Features

- 🧠 Collapsible panel — toggle the reasoning section with a single click
- 🎯 Accessible — `aria-expanded` is set on the trigger button, and the content is shown/hidden with `v-show`
- 🔄 Controlled via `defaultOpen` — sync the open state from outside by watching the prop
- 🎛️ Custom trigger slot — replace the default label with your own content via the `trigger` slot
- 🔔 `toggleChange` emit — react to open/close state changes programmatically
- 🔒 Type safe — `ThinkProps` with full TypeScript interfaces

## Demos

<PlaygroundGallery component="think" />

## API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: 'Root class.' },
  { name: 'title', type: 'string', default: `''`, description: 'The collapsed / expanded header title.' },
  { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'Whether the panel is expanded by default.' },
  { name: 'onToggleChange', type: '(open: boolean) => void', default: '-', description: 'Callback invoked when the panel toggles, with the new open state.' },
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'toggleChange', parameters: '[open: boolean]', description: 'Emitted when the panel toggles, with the new open state.' },
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'trigger', parameters: '{ open: boolean }', description: 'Custom trigger content. Receives the current open state.' },
  { name: 'default', parameters: '-', description: 'Panel content displayed when expanded.' },
]"/>

## Notes

### Architecture and benchmark differences

`SxThink` is a styled, single-package AI component in `@soybeanjs/ui-x` built on top of `@soybeanjs/headless` / `@soybeanjs/ui`: the collapsible panel logic is delegated to the `useThink` composable from `@soybeanjs/ui-x`, and the SFC only wires the `thinkVariants` recipe, `defaultOpen` sync, and slot forwarding. The `useThink` composable provides a simple `open` ref with `toggle()`, `openPanel()`, and `close()` methods.

| Capability | SoybeanUI-X | Vercel AI SDK | shadcn AI | Ant Design Chat |
| :--- | :---: | :---: | :---: | :---: |
| Collapsible thought panel | ✅ | — | ✅ | — |
| `defaultOpen` initial state | ✅ | — | — | — |
| Controlled open state via prop | ✅ | — | — | — |
| Custom trigger slot | ✅ | — | — | — |
| Headless composable for toggle logic | ✅ | — | — | — |

`—` = unsupported or handled differently.

### Cautions

- `defaultOpen` is watched for changes — setting it to `true` after mount opens the panel, and `false` closes it. This allows external control.
- The `trigger` slot receives `{ open }` — use it to render different labels based on the expanded state.
- The content area uses `v-show`, so it is always rendered in the DOM but hidden when collapsed. Content with heavy initialization may benefit from `v-if` alternatives.
- `onToggleChange` fires on every toggle, including programmatic changes from `defaultOpen` sync.

## FAQ

### How do I show the panel expanded by default?

Set `default-open` (or `:defaultOpen`) to `true` — the panel renders expanded on first render.

### How do I change the trigger label?

Use the `trigger` slot. It receives `{ open }` so you can render "Show" vs "Hide" text:

```vue
<template #trigger="{ open }">{{ open ? 'Hide reasoning' : 'Show reasoning' }}</template>
```

### Can I control the panel open state from outside?

Yes — pass `defaultOpen` as a prop. The component watches it and syncs the open/close state accordingly.

### Does `SxThink` work with `SxThoughtChain`?

Yes — `SxThink` is a generic collapsible panel. You can place `SxThoughtChain` or any other content inside its default slot.

### How do I listen for open/close changes?

Listen to the `toggleChange` emit, or pass an `onToggleChange` callback prop. Both fire with the new `boolean` state.