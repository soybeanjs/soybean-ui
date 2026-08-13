# Empty

## Overview

A lightweight empty-state component that highlights missing content and guides the user toward a next action. `SEmpty` combines an `EmptyRoot`/`EmptyHeader`/`EmptyMedia`/`EmptyTitle`/`EmptyDescription`/`EmptyContent` family of headless primitives (zero styles) with the `emptyVariants` style recipe (6 slots, 6 sizes).

Use it for "no results", empty inboxes, blank tables, or onboarding prompts. Prefer `alert` for inline feedback about state, and `skeleton` when content is still loading rather than absent.

## Usage

<UsageCode component="empty" />

## Features

- 🧩 Headless/styled split — `EmptyCompact` aggregates the 6 primitives and composes the default header/media/title/description; `SEmpty` only injects styles and forwards slots
- 🖼️ Media / icon — `icon` prop or the `media` slot for an illustration, emoji or custom graphic
- 🏷️ Title + description — `title`/`description` props or the matching slots
- ⚡ Action area — `content`/`default` slots for buttons or follow-up guidance
- 🎨 6 sizes — xs–2xl `size` matching `ThemeSize`
- 🎛️ Per-slot control — `headerProps`/`mediaProps`/`contentProps`/`titleProps`/`descriptionProps` forwarded to each part
- ♿ Accessible by default — title renders as a real heading and `axe-core` reports zero violations

## Component family

- `SEmpty` (styled) — the entry wrapper; `emptyVariants` recipe with dynamic slot forwarding
- `EmptyRoot` (headless) — the container
- `EmptyHeader` (headless) — the top block hosting media/title/description
- `EmptyMedia` (headless) — the media/icon area
- `EmptyTitle` (headless) — the heading
- `EmptyDescription` (headless) — the muted description
- `EmptyContent` (headless) — the action/content area
- `EmptyCompact` (headless) — the aggregated composite; composes the default header and exposes the slots

## Demos

<PlaygroundGallery component="empty" />

## API

<ComponentApi component="empty" />

## Notes

### Architecture and benchmark differences

`EmptyCompact` owns the header/media/title/description orchestration while every primitive stays style-free and only the UI wrapper injects the `emptyVariants` classes. This mirrors shadcn/ui's headless/styled split, unlike Ant Design, Element Plus, Mantine and Naive UI which ship a single styled `Empty` with `image`/`description` props. SoybeanUI exposes a full per-part `*Props` channel set and a `size` scale the single-package libraries generally omit, and routes the default media through the ConfigProvider `iconRender`.

| Capability            | SoybeanUI | shadcn/ui | Ant Design Empty | Element Plus Empty | Mantine | Naive UI Empty |
| :-------------------- | :-------: | :-------: | :--------------: | :----------------: | :-----: | :------------: |
| Headless/styled split |    ✅     |    ✅     |        —         |         —          |    —    |       —        |
| Media / icon          |    ✅     |    ✅     |        ✅        |         ✅         |   ✅    |       ✅       |
| Title                 |    ✅     |     —     |        ✅        |         ✅         |   ✅    |       ✅       |
| Description           |    ✅     |     —     |        ✅        |         ✅         |   ✅    |       ✅       |
| Action / content slot |    ✅     |     —     |        ✅        |         ✅         |   ✅    |       ✅       |
| Size variants (6)     |    ✅     |     —     |        —         |         —          |    —    |       —        |
| Per-part `*Props`     |    ✅     |    ✅     |        —         |         —          |    —    |       —        |

`—` = unsupported or a different interaction model.

### Cautions

- The default media is rendered through the ConfigProvider `iconRender` (`icon` prop). Without a configured icon renderer, provide the `media` slot or an `icon` value that resolves.
- `EmptyTitle` renders a heading; keep the empty state at an appropriate heading level for the surrounding document outline.
- The root uses a dashed border by default — override via `class`/`ui` when embedding inside a card or a filled surface.
- `Empty` is purely presentational and holds no state; it does not intercept focus or provide interactive semantics.

### Roadmap

No blocking gaps identified for the core empty API.

## FAQ

### How do I show an icon or illustration?

Pass `icon` (resolved through `iconRender`) or use the `media` slot for arbitrary content:

```vue
<SEmpty title="No messages" description="Inbox is empty" icon="lucide:inbox" />
```

### How do I add an action button?

Use the `content` (or `default`) slot:

```vue
<SEmpty title="No projects" description="Create one to get started.">
  <SButton color="primary">New project</SButton>
</SEmpty>
```

### How do I change the size?

Pass `size` (xs–2xl):

```vue
<SEmpty size="lg" title="Large empty state" />
```

### How do I customize the look?

Use `class`/`ui` for styling or the `custom-styling` demo pattern; pass per-part props to adjust header/media/content individually.

### Is it accessible?

The title is a real heading and the component passes `axe-core` with zero violations; any action you place in the slots keeps its own accessible semantics.
