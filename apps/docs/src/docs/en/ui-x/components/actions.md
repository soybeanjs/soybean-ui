# Actions

## Overview

`SxActions` is a compact action toolbar that renders a horizontal row of buttons, each representing a user action on an AI message (e.g., copy, like, dislike, share, regenerate).

Use it below a chat message bubble to provide quick, inline actions. Each item is defined by an `ActionItem` object with `key`, `label`, optional `icon`, and optional `disabled` state. Disabled items automatically render with `disabled` and `data-disabled` attributes and do not emit events.

`SxActions` is a sibling of `SxActionsCopy` (dedicated copy action), `SxActionsFeedback` (like/dislike toggle), and `SxFolder` (collapsible folder). It is the most flexible toolbar, suitable for any custom action set.

## Usage

<UsageCode component="actions" />

## Features

- 🔘 One button per action — renders a `button` for each item in the `items` array
- 🚫 Disabled state — items with `disabled: true` render with `:disabled` and `data-disabled`; clicks are suppressed
- 🧩 Custom slots — `icon` and `label` slots per item, receiving `{ item }` for full customisation
- 🔔 `action` emit — fires with the clicked `ActionItem` object (skips disabled items)
- ♿ Accessible — each button has `aria-label` from the item's `label` field
- 🔒 Type safe — `ActionItem` and `ActionsProps` with full TypeScript interfaces

## Demos

<PlaygroundGallery component="actions" />

## API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: 'Root class.' },
  { name: 'items', type: 'ActionItem[]', default: '-', description: 'The actions to display. Each item has `key`, `label`, optional `icon`, and optional `disabled`.' },
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'action', parameters: '[item: ActionItem]', description: 'Emitted when a non-disabled action is clicked, with the action item.' },
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'icon', parameters: '{ item: ActionItem }', description: 'Custom icon rendering for each action button.' },
  { name: 'label', parameters: '{ item: ActionItem }', description: 'Custom label rendering for each action button.' },
]"/>

## Notes

### Architecture and benchmark differences

`SxActions` is a styled, single-package AI component in `@soybeanjs/ui-x` built on top of `@soybeanjs/headless` / `@soybeanjs/ui`: it is a pure presentational component with no headless composable dependency — the `ActionItem` type and the `action` emit form the entire API surface. The SFC wires the `actionsVariants` recipe and iterates over items with slot forwarding.

| Capability | SoybeanUI-X | Vercel AI SDK | shadcn AI | Ant Design Chat |
| :--- | :---: | :---: | :---: | :---: |
| Configurable action toolbar | ✅ | — | — | ✅ |
| Per-item disabled state | ✅ | — | — | ✅ |
| Custom icon/label slots | ✅ | — | — | — |
| `aria-label` on each button | ✅ | — | — | — |
| Type-safe action items | ✅ | — | — | — |

`—` = unsupported or handled differently.

### Cautions

- `items` is optional — the component renders an empty container when no items are provided.
- Disabled items still render in the DOM but with `disabled` and `data-disabled` attributes. The `action` emit is not fired for disabled items.
- The `icon` slot falls back to rendering the item's `icon` string if present. Use the slot to replace icons with custom components.
- The `action` emit passes the entire `ActionItem` object, not just the key — you can access `key`, `label`, `icon`, and `disabled` in the handler.

## FAQ

### How do I add a custom action?

Add an item to the `items` array with a unique `key` and `label`:

```ts
const items = [{ key: 'regenerate', label: 'Regenerate', icon: '🔄' }];
```

### How do I make an action disabled?

Set `disabled: true` on the `ActionItem`. The button renders with `disabled` and `data-disabled` attributes and does not emit.

### Which action was clicked?

Listen to the `action` emit and check `$event.key`:

```vue
<SxActions :items="items" @action="onAction" />
```

```ts
function onAction(item: ActionItem) {
  if (item.key === 'copy') copyToClipboard();
}
```

### How do I customise the icon for a specific action?

Use the `icon` slot — it receives `{ item }` so you can conditionally render different icons:

```vue
<template #icon="{ item }">
  <MyIcon :name="item.key" />
</template>
```