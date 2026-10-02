---
head:
  title: ThemeModeSegment
  description: 'SThemeModeSegment is a context-bound segmented control bound to the active SConfigProvider theme. It exposes the three ThemeModePreference options — auto (follows the OS prefers-color-scheme), light, and dark — as icon-led segment options, letting users pick a color scheme preference directly. Visual props are inherited from the Segment component, with shape defaulting to rounded.'
---

# ThemeModeSegment

## Overview

`SThemeModeSegment` is a context-bound segmented control bound to the active `SConfigProvider` theme. It exposes the three `ThemeModePreference` options — `auto` (follows the OS `prefers-color-scheme`), `light`, and `dark` — as icon-led segment options, letting users pick a color scheme preference directly. Use it when all three preferences should be visible at a glance, such as in a header, settings panel, or customizer.

## Usage

<UsageCode component="theme-mode-segment" />

## Features

- 🌓 Three options — `auto` / `light` / `dark`, matching the theme `mode` type
- 🎚 Selection writes the preference through the shared theme context
- 🎨 Inherits `Segment` visual props (`size` / `shape` / `fill` / …), with `shape` defaulting to `rounded`
- 🖼 Scheme icons (monitor / sun / moon) are always rendered; `showLabel` adds the localized label next to them (hidden labels still provide accessible names)

## Demos

<PlaygroundGallery component="theme-mode-segment" />

## API

<ComponentApi component="theme-mode-segment" />

## Notes

### Scope

Like `SThemeModeSelect` and `SThemeModeSwitch`, `SThemeModeSegment` is a theme-layer component that operates on the theme context from a parent `SConfigProvider`. It does not accept a `modelValue`; the preference is owned by the provider and shared across all theme components. It is the segmented counterpart of `SThemeModeSelect` — same three options, no dropdown.

### Cautions

- The component must be rendered inside a `SConfigProvider`, otherwise `useTheme` throws.
- `auto` is a _preference_ — the resolved scheme (`light` / `dark`) still depends on the OS `prefers-color-scheme` and is exposed as `effectiveMode` on the theme context.
- `items`, `modelValue`, and `defaultValue` are not exposed: the option list is fixed and the state lives in the theme context.
