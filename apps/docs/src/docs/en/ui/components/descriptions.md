# Descriptions

## Overview

A structured key–value display component that renders labelled fields in a responsive grid. `SDescriptions` provides the grid context and the `descriptionsVariants` recipe (bordered/borderless × horizontal/vertical × label alignment); `SDescriptionsItem` composes the headless `DescriptionsItem` (label + content cells) and applies per-item `span`. Use it for detail pages, order summaries, profile views, or any "field: value" read-only layout. Prefer `table` for tabular data with many rows, `form` for editable inputs, and `statistic` for a single highlighted number.

## Usage

<UsageCode component="descriptions" />

## Features

- 🧩 Headless/styled split — `DescriptionsRoot` + `DescriptionsItem` own the grid structure and item registration; `SDescriptions*` wrappers only inject styles
- 🔢 `column` (default 3) — sets items per row via a `grid-template-columns` inline style on the root
- 📐 `layout` (`horizontal`/`vertical`) — label beside or above the content
- 🧱 `bordered` — table-style cells with dividers between label and content
- ↔️ `labelAlign` (`start`/`center`/`end`) — label cell alignment
- 🧩 `SDescriptionsItem` `span` — an item occupies multiple columns (`grid-column: span N`)
- 🧩 `label` prop / `#label` slot + default content slot for full customization
- 🧭 `dir` (ltr/rtl) resolved from `SConfigProvider` and reflected on the root
- ♿ Semantic `<div>` grid with `data-layout`/`data-bordered`/`data-span` state attributes

## Demos

<PlaygroundGallery component="descriptions" />

## API

<ComponentApi component="descriptions" />

## Notes

### Architecture and benchmark differences

SoybeanUI splits descriptions into a headless `DescriptionsRoot` (grid context + layout state) and `DescriptionsItem` (label/content cells with span), with the styled `SDescriptions`/`SDescriptionsItem` wrappers applying the `scv()` recipe and the column/span grid styles. Compared with Ant Design `Descriptions`, Naive UI `n-descriptions`, Arco `Descriptions`, and TDesign `Descriptions`, SoybeanUI is the only benchmarked library with a headless/styled split, per-slot `ui` class overrides, and RTL support; Ant Design's `column` accepts responsive objects while this milestone ships a fixed number (use the `ui` root override with UnoCSS breakpoint classes for responsive column counts).

| Capability             | SoybeanUI | Ant Design | Naive UI | Arco | TDesign |
| :--------------------- | :-------: | :--------: | :------: | :--: | :-----: |
| headless/styled split  |    ✅     |     —      |    —     |  —   |    —    |
| Column count           |    ✅     |     ✅     |    ✅    |  ✅  |   ✅    |
| Bordered variant       |    ✅     |     ✅     |    ✅    |  ✅  |   ✅    |
| Horizontal/vertical    |    ✅     |     ✅     |    ✅    |  ✅  |   ✅    |
| Item span              |    ✅     |     ✅     |    —     |  —   |    —    |
| Label alignment        |    ✅     |     ✅     |    —     |  —   |    —    |
| RTL support            |    ✅     |     —      |    —     |  —   |    —    |
| Per-slot `ui` override |    ✅     |     —      |    —     |  —   |    —    |

### Cautions

- The `column` count is applied as an inline `grid-template-columns` style on the root; an item's `span` maps to `grid-column: span N`.
- In `bordered` mode the cells are drawn with the root `gap-px bg-border` trick — the root background shows through the 1px gaps to form grid lines.
- Responsive column presets (e.g. `{ xs: 1, md: 3 }`) are not built in; override the root `ui` class with UnoCSS breakpoint utilities (`grid-cols-1 md:grid-cols-3`) and drop `column` when doing so.

## FAQ

### How do I make the value span multiple columns?

Set `span` on `SDescriptionsItem` (`:span="2"`). The item's grid cell stretches across that many columns.

### How do I create responsive column counts?

Set `column` for a fixed count, or override the root via `ui: { root: 'grid-cols-1 md:grid-cols-3' }` and leave `column` at its default (the inline style is overridden by the responsive classes).

### How do I customize a label with rich content?

Use the `#label` slot: `<template #label><SIcon icon="..." /> Label</template>`.

### How do I make it look like a table?

Set `bordered`. Each item becomes a bordered cell with an internal divider between label and content.
