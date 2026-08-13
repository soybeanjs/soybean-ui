# Empty

Source URL: https://ui.soybeanjs.cn/components/empty
Markdown URL: https://ui.soybeanjs.cn/components/empty.md
Category: Data Display
Description: A lightweight empty-state component that highlights missing content and guides the user toward a next action. `SEmpty` combines an `EmptyRoot`/`EmptyHeader`/`EmptyMedia`/`EmptyTitle`/`EmptyDescription`/`EmptyContent` family of headless primitives (zero styles) with the `emptyVariants` style recipe (6 slots, 6 sizes).

## Overview

A lightweight empty-state component that highlights missing content and guides the user toward a next action. `SEmpty` combines an `EmptyRoot`/`EmptyHeader`/`EmptyMedia`/`EmptyTitle`/`EmptyDescription`/`EmptyContent` family of headless primitives (zero styles) with the `emptyVariants` style recipe (6 slots, 6 sizes).

Use it for "no results", empty inboxes, blank tables, or onboarding prompts. Prefer `alert` for inline feedback about state, and `skeleton` when content is still loading rather than absent.

## Usage

Usage examples for empty are rendered on the site.

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

Interactive demos for empty are rendered on the site.

## API

Structured API summary generated from build-time component metadata.

- Exported symbols (8): Empty, EmptyCompact, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyRoot, EmptyTitle.

### Empty

#### Props

Properties for the Empty component.

- `class`: Additional class names applied to the root element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<EmptyUi>`; optional)
- `size`: Size variant of the component. (type `ThemeSize`; optional)
- `title`: Title text rendered by the component. (type `string`; optional)
- `description`: Description text rendered by the component. (type `string`; optional)
- `icon`: Icon rendered by the component. (type `string | import("vue").Component | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, { [...`; optional)
- `headerProps`: Properties forwarded to the header element. (type `EmptyHeaderProps`; optional)
- `mediaProps`: Properties forwarded to the media element. (type `EmptyMediaProps`; optional)
- `contentProps`: Properties forwarded to the content element. (type `EmptyContentProps`; optional)
- `titleProps`: Properties forwarded to the title element. (type `EmptyTitleProps`; optional)
- `descriptionProps`: Properties forwarded to the description element. (type `EmptyDescriptionProps`; optional)

#### Slots

Slots for the Empty component.

- `default`: Custom content for the default slot. (type `(() => any) | undefined`)
- `media`: Custom content for the media slot. (type `(() => any) | undefined`)
- `title`: Custom content for the title slot. (type `(() => any) | undefined`)
- `description`: Custom content for the description slot. (type `(() => any) | undefined`)
- `content`: Custom content for the content slot. (type `(() => any) | undefined`)

### EmptyCompact

#### Props

Properties for the EmptyCompact component.

- `title`: Title text rendered by the component. (type `string`; optional)
- `description`: Description text rendered by the component. (type `string`; optional)
- `icon`: Icon rendered by the component. (type `string | import("vue").Component | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, { [...`; optional)
- `headerProps`: Properties forwarded to the header element. (type `EmptyHeaderProps`; optional)
- `mediaProps`: Properties forwarded to the media element. (type `EmptyMediaProps`; optional)
- `contentProps`: Properties forwarded to the content element. (type `EmptyContentProps`; optional)
- `titleProps`: Properties forwarded to the title element. (type `EmptyTitleProps`; optional)
- `descriptionProps`: Properties forwarded to the description element. (type `EmptyDescriptionProps`; optional)

#### Slots

Slots for the EmptyCompact component.

- `default`: Custom content for the default slot. (type `(() => any) | undefined`)
- `media`: Custom content for the media slot. (type `(() => any) | undefined`)
- `title`: Custom content for the title slot. (type `(() => any) | undefined`)
- `description`: Custom content for the description slot. (type `(() => any) | undefined`)
- `content`: Custom content for the content slot. (type `(() => any) | undefined`)

### EmptyContent

- No documented props, emits, slots, or slot props were available.

### EmptyDescription

- No documented props, emits, slots, or slot props were available.

### EmptyHeader

- No documented props, emits, slots, or slot props were available.

### EmptyMedia

- No documented props, emits, slots, or slot props were available.

### EmptyRoot

- No documented props, emits, slots, or slot props were available.

### EmptyTitle

- No documented props, emits, slots, or slot props were available.

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

```

### How do I add an action button?

Use the `content` (or `default`) slot:

```vue
<SButton color="primary">New project</SButton>
```

### How do I change the size?

Pass `size` (xs–2xl):

```vue

```

### How do I customize the look?

Use `class`/`ui` for styling or the `custom-styling` demo pattern; pass per-part props to adjust header/media/content individually.

### Is it accessible?

The title is a real heading and the component passes `axe-core` with zero violations; any action you place in the slots keeps its own accessible semantics.
