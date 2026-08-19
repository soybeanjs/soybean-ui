# Ellipsis

## Overview

A text-truncation primitive that clamps content to a configurable number of lines (`-webkit-line-clamp`) and reveals the full text through a tooltip when it actually overflows. `SEllipsis` composes the headless `EllipsisRoot` (overflow detection via `useOverflow`, expanded state, plain-text capture) with `STooltip`, and applies the `ellipsisVariants` recipe (1–6 lines). Use it for list items, table cells, card titles, or any constrained space where long text must stay compact. Prefer `TypographyText`'s `ellipsis` for document prose, and `tooltip` directly when you need tooltips without truncation.

## Usage

<UsageCode component="ellipsis" />

## Features

- 🧩 Headless/styled split — `EllipsisRoot` owns overflow detection and state; `SEllipsis` only composes the tooltip and injects the clamp recipe
- 📏 `lines` (1–6) maps to `-webkit-line-clamp` via `ellipsisVariants`; overflow is measured with a shared `useOverflow` composable
- 💡 Tooltip only when overflowed — the popup is disabled unless `scrollWidth`/`scrollHeight` exceeds the box (`ResizeObserver` + `MutationObserver` track size and text changes)
- 🔽 `expandable` toggles collapsed/expanded on click with `v-model:expanded` support and `aria-expanded` reflection
- 🧭 `as`/`asChild` polymorphism — render as `span`, `div`, or merge onto a child element
- 🧩 Slot props expose `{ overflowed, expanded, text, toggle, tooltip }` for fully custom behavior
- 🎨 `ellipsisVariants` — single-class `cv()` recipe; expanded state unclamps via `data-[expanded]:[display:block]`
- ♿ No redundant ARIA; interactive expandable mode reflects `data-state` and `aria-expanded`

## Demos

<PlaygroundGallery component="ellipsis" />

## API

<ComponentApi component="ellipsis" />

## Notes

### Architecture and benchmark differences

SoybeanUI splits the ellipsis into a headless `EllipsisRoot` (uses the shared `useOverflow` composable to detect overflow via `ResizeObserver` + `MutationObserver`, manages the controllable expanded state, and captures plain text for the tooltip) and a styled `SEllipsis` wrapper that composes `STooltip`. Compared with Naive UI `n-ellipsis`, Arco `Typography` ellipsis, and Mantine `LineClamp`, SoybeanUI is the only benchmarked library with a headless/styled split, slot-prop access to the live overflow state, and `as`/`asChild` polymorphism; Mantine's `LineClamp` has no tooltip or expansion, while Naive UI's tooltip only appears on hover and its expandable mode is mutually exclusive with the tooltip.

| Capability             | SoybeanUI | Naive UI | Arco Typography | Mantine LineClamp |
| :--------------------- | :-------: | :------: | :-------------: | :---------------: |
| headless/styled split  |    ✅     |    —     |        —        |         —         |
| Line clamp (1–N)       |    ✅     |    ✅    |       ✅        |        ✅         |
| Overflow-aware tooltip |    ✅     |    ✅    |       ✅        |         —         |
| Expandable (click)     |    ✅     |    ✅    |       ✅        |         —         |
| Controlled expanded    |    ✅     |    —     |        —        |         —         |
| Custom tooltip content |    ✅     |    —     |       ✅        |         —         |
| `as`/`asChild`         |    ✅     |    —     |        —        |         —         |
| Live slot props        |    ✅     |    —     |        —        |         —         |

### Cautions

- Overflow detection requires a measurable box; an inline `span` inside a block needs a width constraint on an ancestor for `scrollWidth` to exceed `clientWidth`.
- Tooltip is disabled automatically in `expandable` mode to avoid conflict between click-to-expand and hover-popup.
- `-webkit-line-clamp` is a WebKit/Blink standard that is also supported by Firefox; the expanded state switches `display` to `block` to remove the clamp.

## FAQ

### Why doesn't the tooltip show on short content?

The tooltip is disabled unless the content actually overflows the clamp. `useOverflow` compares `scrollWidth`/`scrollHeight` against the box size, so short text never triggers a popup.

### How do I make the text expandable?

Set `expandable` and optionally bind `v-model:expanded`. Clicking the text toggles between the clamped preview and the full content.

### How do I customize the tooltip text?

Pass `tooltip-content`. Without it, `SEllipsis` uses the plain text content captured by `EllipsisRoot`.

### How do I render it as a block or heading?

Use the polymorphic `as` prop (`as="div"`) or `asChild` to merge onto a single child element.
