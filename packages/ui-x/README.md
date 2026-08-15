# @soybeanjs/ui-x

> SoybeanUI-X — AI conversation UI components built on top of SoybeanUI.

A collection of 20 styled components for building conversational AI interfaces: chat bubbles, streaming markdown, code blocks with syntax highlighting, mermaid diagrams, thought chains, file attachments, prompts, suggestions, and more. Built on `@soybeanjs/headless` + `@soybeanjs/ui` with `@soybeanjs/ui-x` composables for streaming, typing effects, and sender state.

## Install

```bash
pnpm add @soybeanjs/ui-x
```

## Components

| Category     | Components                                                  |
| ------------ | ----------------------------------------------------------- |
| Core         | `SxBubble`, `SxBubbleList`, `SxSender`                      |
| Content      | `SxMarkdown`, `SxCodeBlock`, `SxMermaid`                    |
| Attachments  | `SxAttachments`, `SxFileCard`                               |
| Conversation | `SxConversations`, `SxWelcome`, `SxPrompts`, `SxSuggestion` |
| Reasoning    | `SxThink`, `SxThoughtChain`, `SxSources`                    |
| Actions      | `SxActions`, `SxActionsCopy`, `SxActionsFeedback`           |
| Misc         | `SxFolder`, `SxNotification`                                |

## Quick Start

```vue
<script setup lang="ts">
import { SxBubble } from '@soybeanjs/ui-x';
</script>

<template>
  <SxBubble role="ai" placement="start" content="Hello! How can I help you today?" />
</template>
```

## Features

- 20 AI conversation components
- Streaming markdown via `markstream-vue`
- Typewriter and fade-in text effects
- Slash (`/`) and mention (`@`) command suggestions in Sender
- Copy-to-clipboard and like/dislike feedback actions
- Mermaid diagram rendering (optional peer dep)
- Shiki syntax highlighting (optional peer dep)
- TypeScript type safety
- Dark mode support

## License

MIT
