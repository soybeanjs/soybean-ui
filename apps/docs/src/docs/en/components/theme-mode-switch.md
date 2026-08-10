# ThemeModeSwitch

## Overview

`SThemeModeSwitch` is a context-bound toggle bound to the active `SConfigProvider` theme. It reflects the current _effective_ scheme (so an `auto` preference shows the OS-resolved light/dark state) and pins an explicit `light` / `dark` preference when toggled. Use it as a quick, compact light/dark switch in a header or toolbar.

## Usage

<UsageCode component="theme-mode-switch" />

## Features

- 🌓 Reflects the _effective_ scheme — with `auto`, the thumb tracks the OS `prefers-color-scheme`
- 🎚 Pins an explicit preference on toggle, overriding any `auto` resolution
- 🎨 Inherits `size` and `color` from the theme, with a sun/moon icon by default
- ♿ Forwards an accessible label to the `role="switch"` control (`axe`-clean)
- 🧩 `showIcon` toggles the sun/moon glyph

## Demos

<PlaygroundGallery component="theme-mode-switch" />

## API

<ComponentApi component="theme-mode-switch" />

## Notes

### Scope

`SThemeModeSwitch` is a theme-layer component that operates directly on the theme context from a parent `SConfigProvider`. It does not accept a `modelValue`; state is owned by the provider and shared across all theme components. To select `auto` (which a binary switch cannot express), pair it with `SThemeModeSelect`.

### Cautions

- The component must be rendered inside a `SConfigProvider` that provides the theme context, otherwise `useTheme` throws.
- Toggling a switch that is currently following `auto` pins an explicit `light` / `dark` preference; use `SThemeModeSelect` to return to `auto`.
