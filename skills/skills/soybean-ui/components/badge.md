# Badge

Source URL: https://ui.soybeanjs.cn/components/badge
Markdown URL: https://ui.soybeanjs.cn/components/badge.md
Category: Data Display
Description: A small status/notification marker that overlays a trigger (button, avatar, nav item) to indicate a count, a state, or new content. `SBadge` combines a `BadgeRoot`/`BadgeContent` family of headless primitives (zero styles) with the `badgeVariants` style recipe (2 slots: root/content; 8 colors × 6 sizes × 4 positions).

## Overview

A small status/notification marker that overlays a trigger (button, avatar, nav item) to indicate a count, a state, or new content. `SBadge` combines a `BadgeRoot`/`BadgeContent` family of headless primitives (zero styles) with the `badgeVariants` style recipe (2 slots: root/content; 8 colors × 6 sizes × 4 positions).

Use it for unread counts, notification badges, status dots, or any small label anchored to the top-right (or another corner) of a host element. Prefer `tag` for standalone inline category labels, and `alert` for contextual feedback with more content.

`SBadge` aggregates the primitives through `BadgeCompact` and exposes a `content`-driven API with `v-model:open` control over the bubble's visibility. For fully custom compositions, fall back to the headless `BadgeRoot`/`BadgeContent` primitives.

## Usage

Usage examples for badge are rendered on the site.

## Features

- 🧩 Headless/styled split — `BadgeCompact` aggregates `BadgeRoot`/`BadgeContent` and exposes a `content` slot; `SBadge` only injects styles and forwards slots/events
- 🔢 `content` prop / slot — a plain string or arbitrary VNode inside the bubble via the `content` slot
- 🎛️ Controlled visibility — `v-model:open` toggles whether the bubble renders (`useControllableState`, default `true`)
- 🎨 8 colors — `primary`/`destructive`/`success`/`warning`/`info`/`carbon`/`secondary`/`accent` from `ThemeColor`
- 📐 6 sizes — xs–2xl `size` from `ThemeSize`
- 📍 4 positions — `top-right`/`bottom-right`/`top-left`/`bottom-left`
- 🌐 RTL-aware — corner placement uses logical `start`/`end` properties so it mirrors under RTL
- ♿ Real content — the bubble text is rendered as real content and read by assistive technology; `axe-core` reports zero violations

## Component family

- `SBadge` (styled) — the entry wrapper; `badgeVariants` recipe with dynamic slot forwarding
- `BadgeRoot` (headless) — the container; owns the `open` state via `useControllableState` and `provideBadgeRootContext`
- `BadgeContent` (headless) — the bubble; rendered only while `open`
- `BadgeCompact` (headless) — the aggregated composite; composes root/content and defaults the bubble content

## Demos

Interactive demos for badge are rendered on the site.

## API

Structured API summary generated from build-time component metadata.

- Exported symbols (4): Badge, BadgeCompact, BadgeContent, BadgeRoot.

### Badge

#### Props

Properties for the Badge component.

- `class`: root class (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `color`: Theme color of the component. (type `ThemeColor`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<BadgeUi>`; optional)
- `position`: Position. (type `BadgePosition`; optional)
- `content`: Content rendered inside the badge bubble when no content slot is provided. (type `string`; optional)
- `contentProps`: Properties forwarded to the content element. (type `BadgeContentProps`; optional)
- `open`: Whether the component is open. (type `boolean`; optional)

#### Emits

Events for the Badge component.

- `update:open`: Emitted when the open state changes. (type `[open: boolean]`; parameters `open: boolean`)

### BadgeCompact

#### Props

Properties for the BadgeCompact component.

- `content`: Content rendered inside the badge bubble when no content slot is provided. (type `string`; optional)
- `contentProps`: Properties forwarded to the content element. (type `BadgeContentProps`; optional)
- `open`: Whether the component is open. (type `boolean`; optional)

#### Emits

Events for the BadgeCompact component.

- `update:open`: Emitted when the open state changes. (type `[open: boolean]`; parameters `open: boolean`)

#### Slots

Slots for the BadgeCompact component.

- `default`: Custom content for the default slot. (type `(() => any) | undefined`)
- `content`: Custom content for the badge content slot. (type `(() => any) | undefined`)

### BadgeContent

- No documented props, emits, slots, or slot props were available.

### BadgeRoot

#### Props

Properties for the BadgeRoot component.

- `open`: Whether the component is open. (type `boolean`; optional)

#### Emits

Events for the BadgeRoot component.

- `update:open`: Emitted when the open state changes. (type `[open: boolean]`; parameters `open: boolean`)

## Notes

### Architecture and benchmark differences

`BadgeCompact` owns the visibility orchestration while every primitive stays style-free and only the UI wrapper injects the `badgeVariants` classes. This mirrors shadcn/ui's headless/styled split (a plain styled label there) and Radix's `Badge` primitive, unlike Ant Design, Element Plus and Naive UI which ship a single styled `Badge` with `count`/`max`/`dot`/`offset` props. SoybeanUI exposes the bubble through a `content` prop/slot and a controlled `open` state, leaving count formatting (`max`) and dot/offset convenience out of the core — see the enhancement list below.

| Capability                     | SoybeanUI | shadcn/ui | Ant Design Badge | Element Plus Badge | Mantine Badge | Naive UI Badge |
| :----------------------------- | :-------: | :-------: | :--------------: | :----------------: | :-----------: | :------------: |
| Headless/styled split          |    ✅     |    ✅     |        —         |         —          |       —       |       —        |
| Content / notification bubble  |    ✅     |     —     |        ✅        |         ✅         |       —       |       ✅       |
| Position (corner placement)    |    ✅     |     —     |        ✅        |         ✅         |       —       |       ✅       |
| Color variants (8)             |    ✅     |    ✅     |        ✅        |         ✅         |      ✅       |       ✅       |
| Size variants (6)              |    ✅     |     —     |        ✅        |         ✅         |      ✅       |       ✅       |
| RTL-aware placement            |    ✅     |     —     |        —         |         —          |       —       |       —        |
| Controlled visibility (`open`) |    ✅     |     —     |        ✅        |         ✅         |       —       |       ✅       |
| `max` count cap (99+)          |    ➕     |     —     |        ✅        |         ✅         |       —       |       ✅       |
| `dot` mode / `offset`          |    ➕     |     —     |        ✅        |         ✅         |       —       |       ✅       |

`—` = unsupported or a different interaction model; `➕` = valuable enhancement not yet provided (see below).

### Cautions

- The bubble is absolutely positioned against the root, which is `position: relative`. If the host element has `overflow: hidden`, the bubble may be clipped near the edges.
- `open` defaults to `true`. To hide the bubble use `:open="false"` or bind it with `v-model:open`.
- The bubble uses `whitespace-nowrap`; very long content will overflow instead of wrapping — keep counts short or cap them yourself until a `max` prop lands.
- The bubble text is exposed to screen readers. If it duplicates the trigger's label (e.g. a status dot on a labelled button), consider making it decorative via the `content` slot.
- Under RTL the corner placement mirrors (`top-right` stays visually top-right using logical properties); the `transform` offsets are swapped automatically.

### Roadmap

Count formatting (`max`, rendering `99+`), a bare `dot` mode, and `offset` positioning are evaluated enhancements carried in `docs/roadmap.md` — they are not part of the current public API.

## FAQ

### How do I show an unread count on a button?

Wrap the trigger and set `content`:

```vue
<SButton variant="pure">Inbox</SButton>
```

### How do I control whether the badge is visible?

Use `v-model:open` (or `:open="false"` to hide it):

```vue
<SButton variant="pure">Messages</SButton>
```

### How do I place the badge in a different corner?

Use `position` with one of `top-right` / `bottom-right` / `top-left` / `bottom-left`:

```vue
<SAvatar src="/me.png" fallback-label="JD" />
```

### How do I change the color and size?

Use `color` (8 `ThemeColor` values) and `size` (xs–2xl):

```vue

```

### How do I render a custom badge bubble?

Use the `content` slot to render any VNode instead of plain text:

```vue
<SButton variant="pure">Cart</SButton>
<template #content><SIcon icon="lucide:bell" /></template>
```
