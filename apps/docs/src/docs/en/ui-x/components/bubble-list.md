# BubbleList

## Overview

`SxBubbleList` renders a data-driven chat transcript from a `ChatMessage[]`. It owns the scroll container, auto-follows new messages while the user is at the bottom, and renders each item through the default `SxBubble` — user messages at the `end`, everything else at the `start`.

Use it for any sequence of chat messages: a static transcript, a live conversation fed by `SxSender`, or a streaming session. It pairs with `SxSender` (input), `SxMarkdown` (rich content) and `SxAttachments` (file items) to build a complete chat panel.

## Usage

<UsageCode component="bubble-list" />

## Features

- 📜 Scroll container — sets `role="log"` when `scrollable`; grows to fit content otherwise
- 🔒 Auto-follow — pins to the bottom when new items arrive while the user is already near the bottom (`useBubbleListScroll`)
- 🎯 Configurable threshold — `scrollThreshold` (px) defines "at bottom", default `40`
- ⬇️ Back-to-bottom button — auto-shows when scrolled up, with a `back-to-bottom-icon` slot
- 🧩 `items` slot — fully replace the default rendering
- 🧩 `content` slot — override the body of each message while keeping the default bubble chrome
- 🔠 Role-based placement — `role === 'user'` renders with placement `end`, otherwise `start`
- ♿ Accessible — `role="log"` live region on the scrollable container
- 🔒 Type safe — requires `items: ChatMessage[]`; every message needs a unique `id`

## Demos

<PlaygroundGallery component="bubble-list" />

## API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: 'Root class.' },
  { name: 'items', type: 'ChatMessage[]', default: '-', description: 'The message list to render. Required.' },
  { name: 'scrollable', type: 'boolean', default: 'true', description: 'Whether the container has a constrained height and should be scrollable. When `false`, the list grows to fit its content.' },
  { name: 'scrollThreshold', type: 'number', default: '40', description: 'Distance (px) from the bottom that is considered at bottom.' },
  { name: 'showBackToBottom', type: 'boolean', default: 'true', description: 'Whether to show the back-to-bottom button.' },
]"/>

### Emits

This component emits no events.

### Slots

<DataTable preset="slots" :data="[
  { name: 'items', parameters: '{ items }', description: 'Replace the whole default bubble list.' },
  { name: 'content', parameters: '{ message, content }', description: 'Override the body of a single message (`ChatMessage` + displayed text).' },
  { name: 'back-to-bottom-icon', parameters: '-', description: 'Replace the default back-to-bottom icon.' },
]"/>

## Notes

### Architecture and benchmark differences

`SxBubbleList` is a styled, single-package AI component in `@soybeanjs/ui-x` built on top of `@soybeanjs/headless` / `@soybeanjs/ui`: scroll state (near-bottom detection, follow and distance measurement) is delegated to the `useBubbleListScroll` composable from `@soybeanjs/ui-x`, and default item rendering composes the sibling `SxBubble` component. The SFC itself only wires the `bubbleListVariants` recipe, the auto-pin watcher and slot forwarding. Because it composes `SxBubble` rather than re-implementing bubbles, every bubble capability (variants, typing, loading) is available in a list context for free.

| Capability | SoybeanUI-X | Vercel AI SDK | shadcn AI | Ant Design Chat |
| :--- | :---: | :---: | :---: | :---: |
| Data-driven message list | ✅ | — | ✅ | ✅ |
| Auto-follow while at bottom | ✅ | — | ✅ | ✅ |
| Back-to-bottom button | ✅ | — | — | — |
| `role="log"` live region | ✅ | — | ✅ | — |
| Per-message content slot | ✅ | — | — | ✅ |
| Composes the single bubble component | ✅ | — | — | — |

`—` = unsupported or handled differently.

### Cautions

- `scrollable` only matters when the container has a constrained height — give the list a height (e.g. `h-80` / `h-full` as in the demos), otherwise it grows to fit content and never scrolls.
- Auto-follow is position-aware, not forced: the list only pins to the bottom when the user is already near it. Reading older messages pauses the follow (by design) until the user returns to the bottom.
- Every message needs a stable, unique `id` — it is used as the render `key` (`message.id`).

## FAQ

### How do I make the list a fixed-height scroll area?

Pass `scrollable` and constrain the height with a class, e.g. `<SxBubbleList class="h-80" :items="items" scrollable />` (see the 01-basic demo).

### How do I render markdown for AI messages?

Use the `content` slot with `SxMarkdown` — the 02-custom-item demo shows an AI markdown / plain-text user split.

### How do I completely replace the default bubbles?

Use the `items` slot; it receives the full `items` array so you can render your own layout.

### Can I hide or restyle the back-to-bottom button?

Hide it with `show-back-to-bottom="false"`, or replace its icon via the `back-to-bottom-icon` slot.

### Why doesn't it auto-scroll while I'm reading old messages?

Auto-follow is position-aware: it only pins when you are already at the bottom. Scroll back down (or press the back-to-bottom button) to resume following.
