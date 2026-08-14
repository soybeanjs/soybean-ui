# Arrow

## Overview

`SArrow` is a primitive SVG component that renders a downward-pointing triangle, used as a visual pointer for popovers, tooltips, and other floating elements. It is primarily consumed internally by SoybeanUI overlay components (popover, tooltip, hover-card, etc.) but can be used directly when building custom floating UI.

## Usage

<UsageCode component="arrow" />

## Demos

<PlaygroundGallery component="arrow" />

## API

<ComponentApi component="arrow" />

## Notes

### Architecture

`SArrow` is a headless primitive — the UI layer (`@soybeanjs/ui`) re-exports the headless `Arrow` directly without adding styled variants. The SVG renders a fixed `viewBox="0 0 12 6"` path (`M 0,0 L 6,6 L 12,0`) with `preserveAspectRatio="none"` so it stretches to any container size. Styling (fill, stroke, dimensions) is applied via `class` fallthrough from the parent component.

### Accessibility

The arrow is always decorative — it has `aria-hidden="true"` and `focusable="false"` by default to ensure screen readers ignore it and legacy browsers don't include it in the tab order. These attributes are hardcoded in the headless template because the arrow never conveys semantic information.

### Styling

The arrow inherits fill and stroke from CSS classes. Common patterns:

- `fill-popover stroke-border` — matches a popover background with a border
- `fill-popover-foreground` — solid foreground-colored arrow
- `w-8 h-4` — controls the arrow dimensions

The arrow is rotated and positioned by the parent floating component (e.g., `SPopover`, `STooltip`) using CSS transforms.
