# Suggestion

Source URL: https://ui.soybeanjs.cn/ui-x/suggestion
Markdown URL: https://ui.soybeanjs.cn/ui-x/suggestion.md
Category: Conversation
Description: `SxSuggestion` is the AI follow-up chip row — a compact row of small suggestion chips shown after an assistant message. It lets users continue, regenerate or drill into the last answer with one tap.

## Overview

`SxSuggestion` is the AI follow-up chip row — a compact row of small suggestion chips shown after an assistant message. It lets users continue, regenerate or drill into the last answer with one tap.

Use it inside an assistant `SxBubble` (typically after the message body) to offer quick follow-ups. It reuses the `Prompt` type and has the same shape as `SxPrompts`, but with a smaller chip style. Each chip is keyed by `suggestion.key` and can carry an optional icon glyph.

## Usage

Usage examples for suggestion are rendered on the site.

## Features

- 🏷 Compact chips — smaller pill styling than `SxPrompts`, designed for in-bubble placement
- 🖱 One-tap select — clicking a chip emits `select` with the full `Prompt`
- ✨ Optional icon glyph — renders `suggestion.icon` as raw text (emoji) before the label when present
- 🧩 Custom label slot — the `label` slot receives `{ suggestion }` for full control
- 🔁 Reuses `Prompt` — same `key` / `label` / `icon` / `description` shape as `SxPrompts`
- 🔒 Type safe — `Prompt[]` from `@soybeanjs/ui-x/types`

## Demos

Interactive demos for suggestion are rendered on the site.

## API

Structured API summary generated from build-time component metadata.

- Exported symbols (1): Suggestion.

### Suggestion

#### Props

Properties for the SxSuggestion component.

- `class`: root class (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `suggestions`: The suggestions to display. (type `Prompt[]`; required)
- `onSelect`: Emitted when a suggestion is clicked. (type `((suggestion: Prompt) => void)`; optional)

## Notes

### Architecture and benchmark differences

`SxSuggestion` is a styled, single-package AI component in `@soybeanjs/ui-x` built on top of `@soybeanjs/headless` / `@soybeanjs/ui`. It is structurally identical to `SxPrompts` — iterate data, emit `select`, forward a `label` slot — but uses the `suggestionVariants` recipe for smaller chip styling and exposes the `suggestions` prop name to fit the follow-up use case. The `Prompt` type it reuses is shared with `SxPrompts`, `SxWelcome` and the sender's suggestion logic.

| Capability                  | SoybeanUI-X | Vercel AI SDK | shadcn AI | Ant Design Chat |
| :-------------------------- | :---------: | :-----------: | :-------: | :-------------: |
| Follow-up suggestion chips  |     ✅      |       —       |     —     |        —        |
| One-tap selection callback  |     ✅      |       —       |     —     |        —        |
| Icon glyph per suggestion   |     ✅      |       —       |     —     |        —        |
| Custom label slot           |     ✅      |       —       |     —     |        —        |
| Reuses shared `Prompt` type |     ✅      |       —       |     —     |        —        |

`—` = unsupported or handled differently.

### Cautions

- Each chip is keyed by `suggestion.key` — keys must be unique within a single `suggestions` array.
- The `icon` field is rendered as raw text (intended for emoji). Do not pass HTML or arbitrary markup there.
- `select` fires on every click — there is no internal selected or disabled state.
- The component only renders the chip row; it does not auto-submit a follow-up message — wire that in your `select` handler.

## FAQ

### How do I react when a suggestion is clicked?

Listen to `select` (or pass `onSelect`) — the handler receives the full `Prompt` (as `suggestion`). See the 02-select demo.

### Where should I place the suggestion row?

Inside an assistant `SxBubble`, right after the message body — it offers quick follow-up actions.

### How is this different from `SxPrompts`?

`SxSuggestion` is the smaller, in-bubble chip variant of the same prompt pattern; `SxPrompts` is the larger standalone row used in `SxWelcome`. Both share the `Prompt` shape.

### How do I add an icon to a suggestion?

Set `icon` on the suggestion object — it renders before the label as raw text (emoji works great).

### How do I customise the chip label?

Use the `label` slot — it receives `{ suggestion }` so you can render any content you want.
