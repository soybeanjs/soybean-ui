# Welcome

## Overview

`SxWelcome` is the AI chat greeting screen — a centered welcome panel with an optional title, description and a list of recommended prompts. It is the first thing a user sees in a fresh chat.

Use it as the empty-state of your chat app when there are no messages yet. It composes `SxPrompts` internally to render the prompt pills, so passing `prompts` gives users one-click starter questions. It pairs naturally with `SxSender` below it and `SxBubbleList` above it once the conversation starts.

## Usage

<UsageCode component="welcome" />

## Features

- 👋 Greeting copy — `title` (rendered as `h2`) and `description` (rendered as `p`), each optional
- 💡 Recommended prompts — composes `SxPrompts` internally; pill buttons re-emitted as `selectPrompt`
- 🧩 Custom slots — `title` and `description` slots fully replace the default heading and paragraph
- 🚫 Conditional rendering — title/description fall back to their heading elements only when non-empty; prompts render only when `prompts?.length`
- 🔗 One-click kickoff — clicking a prompt hands the `Prompt` object to your handler
- 🔒 Type safe — `Prompt[]` shared with `SxPrompts` from `@soybeanjs/ui-x/types`

## Demos

<PlaygroundGallery component="welcome" />

## API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: 'Root class.' },
  { name: 'title', type: 'string', default: `''`, description: 'Greeting title.' },
  { name: 'description', type: 'string', default: `''`, description: 'Description text.' },
  { name: 'prompts', type: 'Prompt[]', default: '-', description: 'Recommended prompts to show below the copy.' },
  { name: 'onSelectPrompt', type: '(prompt: Prompt) => void', default: '-', description: 'Callback invoked when a prompt is clicked.' },
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'selectPrompt', parameters: '[prompt: Prompt]', description: 'Emitted when a prompt is clicked.' },
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'title', parameters: '-', description: 'Custom title content (replaces the default h2).' },
  { name: 'description', parameters: '-', description: 'Custom description content (replaces the default p).' },
]"/>

## Notes

### Architecture and benchmark differences

`SxWelcome` is a styled, single-package AI component in `@soybeanjs/ui-x` built on top of `@soybeanjs/headless` / `@soybeanjs/ui`. It is a pure composition shell: it renders the copy block and delegates the prompt pill list to the sibling `SxPrompts` component, re-emitting its `select` as `selectPrompt`. There is no headless counterpart — the component owns no state beyond prop passthrough and conditional rendering.

| Capability                     | SoybeanUI-X | Vercel AI SDK | shadcn AI | Ant Design Chat |
| :----------------------------- | :---------: | :-----------: | :-------: | :-------------: |
| Greeting title + description   |     ✅      |       —       |     —     |        —        |
| Recommended prompt pills       |     ✅      |       —       |     —     |       ✅        |
| Prompt selection callback      |     ✅      |       —       |     —     |        —        |
| Custom title/description slots |     ✅      |       —       |     —     |        —        |
| Empty-state for chat apps      |     ✅      |       —       |     —     |       ✅        |

`—` = unsupported or handled differently.

### Cautions

- The default `h2` / `p` only render when the corresponding string prop is non-empty — pass both `title` and `description` to avoid a bare prompt list.
- `title` and `description` are mutually exclusive with their slots: if you provide a slot, the string prop is ignored for that region.
- The prompts section renders only when `prompts?.length` — an empty array hides it entirely.
- `selectPrompt` re-emits the inner `SxPrompts` `select` event, so each click delivers the full `Prompt` object (`key`, `label`, `icon`, `description`).

## FAQ

### How do I make the welcome screen show starter prompts?

Pass `prompts` — an array of `Prompt` objects. The pills appear below the copy automatically.

### How do I react when a prompt is clicked?

Listen to `selectPrompt` (or pass `onSelectPrompt`) — the handler receives the full `Prompt` so you can map `key` to an action: `@select-prompt="startChat($event)"`.

### How do I fully replace the title with custom markup?

Use the `title` slot — it replaces the default `h2` entirely. The `description` slot does the same for the paragraph. See the 02-custom-slots demo.

### Can I hide the prompts section?

Yes — omit `prompts` or pass an empty array. The section is only rendered when `prompts?.length` is truthy.

### Where does this fit in a chat app?

Use it as the empty state before any messages: `SxWelcome` on top, `SxSender` below. Once the conversation starts, swap it for `SxBubbleList`.
