# Timeline

## Overview

A chronological display component that renders a sequence of events with markers along a vertical or horizontal axis. `STimeline` provides the timeline context (`orientation`, `mode`, `reverse`, `dir`) and the `timelineVariants` recipe; `STimelineItem` composes the headless `TimelineItem`, `TimelineSeparator`, `TimelineDot`, and `TimelineContent` parts. Use it for order flows, release history, process steps, or activity feeds. Prefer `stepper` for a numbered multi-step form flow, and `list` for flat, unordered content.

## Usage

<UsageCode component="timeline" />

## Features

- 🧩 Headless/styled split — `STimeline` + `STimelineItem` compose 5 headless primitives (`TimelineRoot`/`Item`/`Separator`/`Dot`/`Content`) with zero styling in headless
- 📐 `orientation` (`vertical`/`horizontal`) — vertical default with a connecting line; horizontal renders items in a row with a through-line
- 🧭 `mode` (`left`/`right`/`alternate`) — alternate mode places odd/even items on opposite sides via `data-position`
- 🔄 `reverse` flips the visual order for newest-first layouts
- 🎨 `color` on `STimelineItem` maps to 8 theme colors on the dot via `data-[color=...]` selectors
- 🧩 `dot` slot replaces the marker with any icon or custom content; `label` slot renders timestamps
- 🧭 `dir` (ltr/rtl) resolved from `SConfigProvider` and reflected on the root
- ♿ Semantic `<ol>`/`<li>` structure with decorative dots hidden from the accessibility tree

## Demos

<PlaygroundGallery component="timeline" />

## API

<ComponentApi component="timeline" />

## Notes

### Architecture and benchmark differences

SoybeanUI splits the timeline into 5 headless primitives (`TimelineRoot` provides orientation/mode/reverse/dir context plus item registration; `TimelineItem` composes separator + dot + content and resolves alternate positioning) and the styled wrappers `STimeline`/`STimelineItem`. Compared with Ant Design `Timeline`, MUI `Timeline` family, Element Plus `el-timeline`, and Naive UI `n-timeline`, SoybeanUI is the only benchmarked library with a headless/styled split, per-slot `ui` class overrides, RTL support, and both `mode` and `orientation` on the same component; MUI requires assembling 6 separate primitives manually, while Ant Design's alternate mode is fixed to a single layout.

| Capability             | SoybeanUI | Ant Design | MUI Timeline | Element Plus | Naive UI |
| :--------------------- | :-------: | :--------: | :----------: | :----------: | :------: |
| headless/styled split  |    ✅     |     —      |      —       |      —       |    —     |
| Vertical/horizontal    |    ✅     |     ✅     |      ✅      |      —       |    —     |
| Alternate mode         |    ✅     |     ✅     |      —       |      —       |    —     |
| Reverse order          |    ✅     |     ✅     |      —       |      —       |    —     |
| Dot color              |    ✅     |     ✅     |      ✅      |      ✅      |    ✅    |
| Custom dot (slot)      |    ✅     |     ✅     |      ✅      |      ✅      |    —     |
| Timestamp label        |    ✅     |     ✅     |      ✅      |      ✅      |    ✅    |
| RTL support            |    ✅     |     —      |      —       |      —       |    —     |
| Per-slot `ui` override |    ✅     |     —      |      —       |      —       |    —     |

### Cautions

- `mode` only applies to the vertical orientation; horizontal items flow in a row regardless of `mode`.
- The connecting line is drawn with the separator's `::before`/`::after` pseudo-elements; hiding them (e.g. via `ui` overrides) removes the connector for that item.
- The `color` prop styles the dot via theme-color selectors; for arbitrary CSS colors use the `dot` slot.

## FAQ

### How do I put the content on the right side?

Set `mode="right"` on `STimeline` (vertical). For alternating sides use `mode="alternate"`.

### How do I customize the dot?

Use the `dot` slot on `STimelineItem`: `<template #dot><SIcon icon="..." /></template>`. You can combine it with `color` for the marker.

### How do I show newest events first?

Set `reverse` on `STimeline`. The visual order flips while the semantic `<ol>` order stays intact.

### How do I use it horizontally?

Set `orientation="horizontal"`. Each item becomes a column with the label above and content below.
