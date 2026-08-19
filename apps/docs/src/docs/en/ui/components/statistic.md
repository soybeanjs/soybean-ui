# Statistic

## Overview

A component that displays a labelled numeric value with optional prefix, suffix, and locale-style formatting. `SStatistic` aggregates a headless family — `StatisticRoot` (formatting context), `StatisticLabel`, `StatisticValueRow`, `StatisticValue`, `StatisticPrefix`, `StatisticSuffix` — through `StatisticCompact`, and injects the `statisticVariants` style recipe (6 sizes, optional `trend`). Use it for dashboards, KPI cards, and report headers where a single highlighted number needs a label and units. Prefer `table` or `list` for multiple related values, and pair with `skeleton` for loading states.

## Usage

<UsageCode component="statistic" />

## Features

- 🧩 Headless/styled split — `StatisticCompact` owns the label/value/prefix/suffix composition; `SStatistic` only injects styles and forwards slots
- 🔢 Pure value formatting — `formatNumber` shared helper supports `precision`, `groupSeparator`, `decimalSeparator`, and a custom `formatter` override
- 📊 `trend` (`up`/`down`) renders a default trend arrow icon and colors the prefix (success/destructive) via the recipe
- 🎚 `value` is reactive — the formatted display string recomputes on every change
- 🧭 `dir` (ltr/rtl) resolved from `SConfigProvider`, reflected on the root for RTL-aware layout
- 🎨 `statisticVariants` — 6 sizes (xs–2xl) scaling label/value/prefix/suffix proportionally
- 🧩 Overridable slots — `label`, `value`, `prefix`, `suffix` let you replace any segment with custom content
- ♿ Semantic `<div>`/`<span>` structure with no redundant ARIA — the numeric value stays machine-readable text

## Demos

<PlaygroundGallery component="statistic" />

## API

<ComponentApi component="statistic" />

## Notes

### Architecture and benchmark differences

SoybeanUI splits the statistic into headless primitives (formatting context + slot structure) and the styled `SStatistic` wrapper. The value formatting lives in the pure `formatNumber` helper in `packages/headless/src/shared`, keeping it SSR-safe and testable without a component mount. Compared with Ant Design `Statistic`, Chakra `Stat`, Element Plus `el-statistic`, and Naive UI `n-statistic`, SoybeanUI is the only benchmarked library with a headless/styled split and per-slot `ui` class override; it also adds a `trend` variant and RTL support.

| Capability             | SoybeanUI | Ant Design | Chakra (`Stat`) | Element Plus | Naive UI |
| :--------------------- | :-------: | :--------: | :-------------: | :----------: | :------: |
| headless/styled split  |    ✅     |     —      |        —        |      —       |    —     |
| Label + value          |    ✅     |     ✅     |       ✅        |      ✅      |    ✅    |
| Prefix/suffix          |    ✅     |     ✅     |        —        |      ✅      |    ✅    |
| Precision/grouping     |    ✅     |     ✅     |        —        |      ✅      |    ✅    |
| Custom formatter       |    ✅     |     ✅     |        —        |      —       |    —     |
| Trend indicator        |    ✅     |     —      |        —        |      —       |    —     |
| RTL support            |    ✅     |     —      |        —        |      —       |    —     |
| Per-slot `ui` override |    ✅     |     —      |        —        |      —       |    —     |

### Cautions

- The `prefix`/`suffix` props accept plain text or icon glyph strings; for rich content use the `prefix`/`suffix` slots instead.
- When `trend` is set and no `prefix` is provided, a default trend arrow icon is rendered in the prefix position; providing a `prefix` replaces it.
- `precision` uses `toFixed`, so floating-point display follows standard rounding rules.

## FAQ

### How do I show thousands separators?

Set `precision` (e.g. `2`) so the value passes through grouping logic, then customize with `group-separator`/`decimal-separator` if your locale uses different characters.

### How do I format the value as currency or with a custom format?

Pass a `formatter` function: `:formatter="(value) => \`\$\${value.toFixed(2)}\`"`. It takes priority over `precision` and the separator props.

### How do I add a trend arrow?

Set `trend="up"` or `trend="down"`. The default prefix becomes a trending icon colored success/destructive.

### How do I replace only the value with custom content?

Use the `value` slot: `<template #value><MyCustomNumber /></template>`.
