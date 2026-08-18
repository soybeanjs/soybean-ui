# @soybeanjs/ui-x

> SoybeanUI-X — AI conversation UI components built on top of SoybeanUI.
>
> **Note:** This package is still under development and is scheduled to ship with the v0.40.0 release. Stay tuned!

A collection of 20 styled components for building conversational AI interfaces: chat bubbles, streaming markdown, code blocks with syntax highlighting, mermaid diagrams, thought chains, file attachments, prompts, suggestions, and more. Built on `@soybeanjs/headless` + `@soybeanjs/ui` with `@soybeanjs/ui-x` composables for streaming, typing effects, and sender state.

## Status

20 components implemented — see the [component catalog](/ui-x) for the full list. Architecture plan: [ecosystem](/overview/introduction).

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

## Install

```bash
pnpm add @soybeanjs/ui-x
```

## Quick Start

```vue
<script setup lang="ts">
import { SxBubble, SxSender } from '@soybeanjs/ui-x';
</script>

<template>
  <div class="space-y-3">
    <SxBubble role="ai" placement="start" content="Hello! How can I help you today?" />
    <SxBubble role="user" placement="end" content="I need help building a component." />
    <SxSender placeholder="Type a message..." />
  </div>
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
