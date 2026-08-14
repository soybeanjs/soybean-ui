# Conversations

## Overview

`SxConversations` is the AI conversation sidebar list — a grouped, selectable list of conversation items with active state tracking. It groups items by their `group` field and renders group headers automatically.

Use it as the left sidebar in a chat interface to list all user conversations. It pairs with `SxSender` (message input) and `SxBubbleList` (message display) to form a complete chat shell. Items with a `group` value are rendered under a group header; items without a group are rendered without a section header.

## Usage

<UsageCode component="conversations" />

## Features

- 🗂 Auto-grouping — items are grouped by `item.group`; empty group suppresses the header
- ✅ Active state — the active item (matched by `id`) gets `aria-current="true"` and an active class
- 🖱 Selectable — clicking an item emits `change` and calls `onChange` with the full `ConversationItem`
- 🧩 Two slots — `groupTitle` (with the group key) and `item` (with the full item)
- 🎨 Accessible — each item is a `<button>` with `aria-current` for the active item
- 🔒 Type safe — accepts `ConversationItem[]` from `@soybeanjs/ui-x/types`

## Demos

<PlaygroundGallery component="conversations" />

## API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: 'Root class.' },
  { name: 'items', type: 'ConversationItem[]', default: '-', description: 'The conversation list to display.', required: true },
  { name: 'active', type: 'string | null', default: 'null', description: 'The currently active conversation id.' },
  { name: 'onChange', type: '(item: ConversationItem) => void', default: '-', description: 'Callback invoked when a conversation is selected.' },
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'change', parameters: '[item: ConversationItem]', description: 'Emitted when a conversation is selected.' },
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'groupTitle', parameters: '{ group: string }', description: 'Custom group header content.' },
  { name: 'item', parameters: '{ item: ConversationItem }', description: 'Custom item content.' },
]"/>

## Notes

### Architecture and benchmark differences

`SxConversations` is a styled, single-package AI component in `@soybeanjs/ui-x` built on top of `@soybeanjs/headless` / `@soybeanjs/ui`. The grouping logic is computed locally with a `Map` — there is no headless composable because the algorithm is trivial (single `group by` pass). The component only wires the grouping, the active-class toggle, and the select emit. The `ConversationItem` type is shared with `@soybeanjs/ui-x/types`.

| Capability | SoybeanUI-X | Vercel AI SDK | shadcn AI | Ant Design Chat |
| :--- | :---: | :---: | :---: | :---: |
| Grouped conversation list | ✅ | — | — | ✅ |
| Active item with `aria-current` | ✅ | — | — | — |
| Custom group title slot | ✅ | — | — | — |
| Custom item slot | ✅ | — | — | — |
| `ConversationItem` type with `group` | ✅ | — | — | ✅ |

`—` = unsupported or handled differently.

### Cautions

- `active` is compared by identity (`item.id === active`), not by reference. Use strings or primitive IDs.
- Items without a `group` field are lumped under an empty group key that suppresses the header — they still render as clickable items.
- The `change` emit fires both `onChange` and the Vue emit. If you only listen to `@change`, the callback prop is not called, and vice versa.
- Sorting is not handled — pass items in the order you want them displayed. Groups appear in insertion order of the `Map`.

## FAQ

### How do I set the active conversation?

Pass its `id` to `active`: `:active="currentId"`. Update it on `@change`.

### How do I add a group header icon?

Use the `groupTitle` slot — it receives `{ group }` so you can prefix it: `#groupTitle="{ group }">📂 {{ group }}</template>`. See the 02-custom-title demo.

### How do I customise the item rendering?

Use the `item` slot — it receives `{ item }` with the full `ConversationItem` (`id`, `title`, `group`, `updatedAt`).

### What happens when an item has no group?

Items without a group are grouped under an empty key and rendered without a header. They are still selectable.

### How do I add a "New conversation" button?

Render it outside `SxConversations` — the component is a pure list and does not include a create action.