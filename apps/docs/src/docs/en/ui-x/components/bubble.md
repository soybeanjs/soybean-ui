# Bubble

## Overview

`SxBubble` renders a single chat message bubble — the atomic message unit of an AI conversation UI. It displays one message (user, AI, system or divider) with configurable placement, visual variant, a loading state and an optional typewriter animation.

Use it whenever you need to display an individual message: a fixed user/AI exchange, a streaming assistant message, or a "thinking" placeholder. `SxBubbleList` composes `SxBubble` internally for its default item rendering — user messages are placed at the `end`, everything else at the `start`. Pair it with `SxSender` (which produces the messages) and `SxMarkdown` / `SxAttachments` (which enrich message content).

## Usage

<UsageCode component="bubble" />

## Features

- 🧩 Message or parts — pass a full `ChatMessage` via `message`, or `content` + `role` directly
- 🎨 Three variants — `filled`, `outlined`, `shadow` via the `bubbleVariants` recipe
- ↔️ Placement — `start` (AI/system) vs `end` (user)
- 📏 Theme sizing — `avatarSize` accepts any `ThemeSize` (xs–2xl)
- ⏳ Loading — shows a muted "Thinking…" placeholder while `loading`
- ⌨️ Typing effect — typewriter animation powered by `useTyping({ effect: 'typing', step: 2, interval: 16 })`
- 🧩 Three slots — `header`, `content` (receives the typing progress) and `footer`
- ♿ Accessible — semantic structure with muted loading text that does not shout at screen readers
- 🔒 Type safe — typed `ChatMessage` / `ChatRole` / `ThemeSize` / `ClassValue` props with no `any`

## Demos

<PlaygroundGallery component="bubble" />

## API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: 'Root class.' },
  { name: 'message', type: 'ChatMessage', default: '-', description: 'The message to render. When omitted, `content` / `role` props are used.' },
  { name: 'content', type: 'string', default: '-', description: 'Message text content (used when `message` is not provided).' },
  { name: 'role', type: 'ChatRole', default: '-', description: 'Message role (used when `message` is not provided). `ChatRole` = `\'ai\' | \'user\' | \'system\' | \'divider\' | string`.' },
  { name: 'placement', type: `'start' | 'end'`, default: `'start'`, description: 'Message placement.' },
  { name: 'variant', type: `'filled' | 'outlined' | 'shadow'`, default: `'filled'`, description: 'Visual variant.' },
  { name: 'avatarSize', type: 'ThemeSize', default: `'md'`, description: 'Avatar size.' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Whether to show a loading indicator.' },
  { name: 'typing', type: 'boolean', default: 'false', description: 'Enable a typewriter / fade-in effect on the content.' },
]"/>

### Emits

This component emits no events.

### Slots

<DataTable preset="slots" :data="[
  { name: 'header', parameters: '-', description: 'Custom content above the message body.' },
  { name: 'content', parameters: '{ content: string }', description: 'Custom message body; `content` is the displayed text including the typing progress.' },
  { name: 'footer', parameters: '-', description: 'Custom content below the message body.' },
]"/>

## Notes

### Architecture and benchmark differences

`SxBubble` is a styled, single-package AI component in `@soybeanjs/ui-x` built on top of `@soybeanjs/headless` / `@soybeanjs/ui`: it shares the `cv()` recipe approach, `ThemeSize` and `ClassValue` types, while the typewriter animation is delegated to the framework-agnostic `useTyping` composable from `@soybeanjs/ui-x` and base message types come from `@soybeanjs/ui-x/types`. The SFC itself stays thin — it only wires the variant recipe, prop/state forwarding and slot rendering, with no DOM or timer logic.

| Capability | SoybeanUI-X | Vercel AI SDK | shadcn AI | Ant Design Chat |
| :--- | :---: | :---: | :---: | :---: |
| Single styled message bubble | ✅ | — | ✅ | ✅ |
| Variants (filled / outlined / shadow) | ✅ | — | — | ✅ |
| Typewriter typing effect | ✅ | — | — | — |
| "Thinking…" loading state | ✅ | — | — | ✅ |
| Headless/styled logic split | ✅ | — | — | — |
| Renders a full `ChatMessage` object | ✅ | — | — | — |

`—` = unsupported or handled outside the component (the Vercel AI SDK ships headless message primitives and leaves presentation to the app).

### Cautions

- `typing` is a purely visual effect — it animates text that is already available but does not fetch, throttle or produce tokens. For real streaming, feed the growing `content` / `message.content` and toggle `typing` to animate arrival.
- When `typing` is active the `content` slot receives the partially revealed text, and when `loading` is set (and not typing) the fallback shows "Thinking…". If you supply a custom `content` slot you own this fallback/typing rendering.
- `placement` only affects alignment and color styling — it does not reorder messages; ordering is the parent's job (e.g. `SxBubbleList`).

## FAQ

### How do I render one of my stored messages?

Pass the whole message object to `message` (`<SxBubble :message="item" />`), or pass `content` and `role` separately. `SxBubbleList` does exactly this per item.

### How do I show the assistant is "thinking"?

Set `loading` — the bubble then shows a muted "Thinking…" placeholder in place of the content.

### How do I animate a streaming message?

Set `typing`; the text reveals character by character via `useTyping`. See the 04-typing demo.

### Which placement should user vs AI messages use?

The convention is `end` for the user and `start` for the AI/system. `SxBubbleList` applies this automatically based on `role`.

### How do I render markdown inside a bubble?

Use the `content` slot with `SxMarkdown` (see the bubble-list 02-custom-item demo). The slot receives the displayed text including the typing progress.
