# ThoughtChain

## Overview

`SxThoughtChain` is a structured reasoning step display that renders an ordered list of AI thinking stages. Each step shows a status symbol, title, optional icon, and expandable body content for steps with details.

Use it to visualize the step-by-step reasoning process of an AI model — from parsing the query, searching knowledge bases, generating responses, to formatting output. Each step's lifecycle status (`pending`, `loading`, `success`, `error`) is communicated visually, and steps with additional content are expandable inline.

`SxThoughtChain` pairs with `SxThink` (for a collapsible reasoning panel) and `SxBubble` (for the overall message). It is powered by the `useThoughtChain` composable from `@soybeanjs/ui-x`.

## Usage

<UsageCode component="thought-chain" />

## Features

- 📋 Ordered list — rendered as an accessible `<ol>`, with each step as an `<li>`
- 🟢 Status symbols — `·` pending, `⟳` loading, `✓` success, `✕` error
- 🔽 Expandable steps — steps with `content` render a toggleable header button with `aria-expanded`
- 🧩 Custom slots — `title` and `content` slots for custom rendering per step
- 🎨 Status-based styling — style each step differently based on `status` via the `item` slot props
- 🚫 Static header — steps without `content` render a plain header (no button, no chevron)
- 🔒 Type safe — `ThoughtChainItem` interface with full TypeScript support

## Demos

<PlaygroundGallery component="thought-chain" />

## API

<ComponentApi component="thought-chain" />

## Notes

### Architecture and benchmark differences

`SxThoughtChain` is a styled, single-package AI component in `@soybeanjs/ui-x` built on top of `@soybeanjs/headless` / `@soybeanjs/ui`: the iteration, expansion state, and status tracking are delegated to the `useThoughtChain` composable from `@soybeanjs/ui-x`, and the SFC only wires the `thoughtChainVariants` recipe, status symbols, and slot forwarding. The `useThoughtChain` composable manages an expandable items map and provides `toggle()` and `isExpanded()` methods.

| Capability                                              | SoybeanUI-X | Vercel AI SDK | shadcn AI | Ant Design Chat |
| :------------------------------------------------------ | :---------: | :-----------: | :-------: | :-------------: |
| Structured reasoning steps                              |     ✅      |       —       |     —     |        —        |
| Four lifecycle statuses (pending/loading/success/error) |     ✅      |       —       |     —     |        —        |
| Expandable step content                                 |     ✅      |       —       |     —     |        —        |
| Custom title/content slots                              |     ✅      |       —       |     —     |        —        |
| Accessible `<ol>` list                                  |     ✅      |       —       |     —     |        —        |
| Headless composable for chain state                     |     ✅      |       —       |     —     |        —        |

`—` = unsupported or handled differently.

### Cautions

- `items` is **required** — the component renders nothing without it.
- Steps without `content` render a static header without a button or chevron. Only steps with `content` are expandable.
- `defaultExpand` applies to all expandable steps uniformly — you cannot expand individual steps independently at mount time.
- The `ThoughtChainItem` type is imported from `@soybeanjs/ui-x/types`. Each item requires at minimum `key` and `title`.

## FAQ

### What is the `ThoughtChainItem` type?

```ts
interface ThoughtChainItem {
  key: string;
  title: string;
  status?: 'pending' | 'loading' | 'success' | 'error';
  content?: string;
  icon?: string;
}
```

### How do I make all steps expanded by default?

Set `default-expand` (or `:defaultExpand`) to `true`. All expandable steps (those with `content`) will start expanded.

### How do I show a custom icon per step?

Set `icon` on the `ThoughtChainItem` — it is rendered as a text node before the title. Use an emoji or a short string.

### How do I customise the title or content rendering?

Use the `title` and `content` slots. Both receive `{ item }` so you can access all fields of the step:

```vue
<template #title="{ item }">
  <strong>{{ item.title }}</strong>
</template>
```
