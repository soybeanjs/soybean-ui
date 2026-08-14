# Prompts

## Overview

`SxPrompts` is the AI prompt pill row — a responsive row of clickable prompt buttons that give users quick, one-tap starter questions. It is the reusable building block inside `SxWelcome` and can also be used standalone under a `SxSender`.

Use it anywhere you want to suggest questions, commands or actions. Each prompt renders as a pill button with an optional raw icon glyph before the label, keyed by `prompt.key`.

## Usage

<UsageCode component="prompts" />

## Features

- 💊 Pill buttons — one button per prompt, styled via the `promptsVariants` UnoCSS recipe
- 🖱 One-tap select — clicking a pill emits `select` with the full `Prompt`
- ✨ Optional icon glyph — renders `prompt.icon` as raw text (emoji) before the label when present
- 🧩 Custom label slot — the `label` slot receives `{ prompt }` for full label control
- 🎨 Responsive layout — combine with your own grid classes (e.g. `grid grid-cols-2 gap-2`)
- 🔒 Type safe — `Prompt[]` from `@soybeanjs/ui-x/types`

## Demos

<PlaygroundGallery component="prompts" />

## API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: 'Root class.' },
  { name: 'prompts', type: 'Prompt[]', default: '-', description: 'The prompts to display.', required: true },
  { name: 'onSelect', type: '(prompt: Prompt) => void', default: '-', description: 'Callback invoked when a prompt is clicked.' },
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'select', parameters: '[prompt: Prompt]', description: 'Emitted when a prompt is clicked.' },
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'label', parameters: '{ prompt: Prompt }', description: 'Custom label content for each prompt.' },
]"/>

## Notes

### Architecture and benchmark differences

`SxPrompts` is a styled, single-package AI component in `@soybeanjs/ui-x` built on top of `@soybeanjs/headless` / `@soybeanjs/ui`. It is a thin data-driven renderer: it iterates `prompts`, emits `select`, and forwards the `label` slot — no headless composable is needed for a flat pill list. The `Prompt` type (`key`, `label`, `icon`, `description`) is shared with `@soybeanjs/ui-x/types` and also powers `SxWelcome`, `SxSuggestion` and the sender's suggestion logic.

| Capability | SoybeanUI-X | Vercel AI SDK | shadcn AI | Ant Design Chat |
| :--- | :---: | :---: | :---: | :---: |
| Prompt pill row | ✅ | — | — | ✅ |
| One-tap selection callback | ✅ | — | — | — |
| Icon glyph per prompt | ✅ | — | — | ✅ |
| Custom label slot | ✅ | — | — | — |
| Shared `Prompt` type | ✅ | — | — | — |

`—` = unsupported or handled differently.

### Cautions

- Each pill is keyed by `prompt.key` — keys must be unique within a single `prompts` array or Vue will warn and re-render incorrectly.
- The `icon` field is rendered as raw text (intended for emoji). Do not pass HTML or arbitrary markup there.
- `select` fires on every click, even if the prompt is already "selected" — there is no internal selected state.
- The component does not lay out its pills by default beyond the recipe; add your own container classes (e.g. `grid` / `flex`) for a custom arrangement.

## FAQ

### How do I react when a prompt is clicked?

Listen to `select` (or pass `onSelect`) — the handler receives the full `Prompt`. See the 02-select demo.

### How do I add an icon to a prompt?

Set `icon` on the `Prompt` object — it renders before the label as raw text (emoji works great).

### How do I customise the label text?

Use the `label` slot — it receives `{ prompt }` so you can render anything you want.

### Can I change the layout of the pills?

Yes — apply classes to the root via `class`, e.g. `class="grid grid-cols-2 gap-2"` for a two-column grid.

### How is this different from `SxSuggestion`?

Both render prompt pills, but `SxSuggestion` uses a smaller chip style (typically inside a `SxBubble`) while `SxPrompts` is the larger standalone row (e.g. in `SxWelcome`). They share the same `Prompt` shape.