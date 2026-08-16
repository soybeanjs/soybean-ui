# AppLogo

## Overview

`SAppLogo` renders the brand block — an icon (iconify name) and an optional title — used in admin sidebar and header regions. It ships with light and inverted (dark sidebar) styling.

## Usage

<UsageCode component="app-logo" />

## Features

- 🖼️ Iconify icon — pass any icon name (e.g. `lucide:command`) via `logo`
- 🏷️ Optional title — `title` renders next to the icon, hidden via `showTitle`
- 🌗 Inverted variant — `inverted` switches the title to `text-sidebar-foreground` for dark surfaces
- 📏 Theme sizing — root height/spacing come from the recipe

## Demos

<PlaygroundGallery component="app-logo" />

## API

### Props

<DataTable preset="props" :data="[
  { name: 'logo', type: 'string', default: '-', description: 'The logo source — an iconify name (e.g. `lucide:command`) or an image URL.' },
  { name: 'title', type: 'string', default: '-', description: 'The title text shown next to the logo.' },
  { name: 'showTitle', type: 'boolean', default: 'true', description: 'Whether to show the title.' },
  { name: 'inverted', type: 'boolean', default: 'false', description: 'Whether to use inverted (light-on-dark) styling.' },
  { name: 'class', type: 'ClassValue', default: '-', description: 'Root class.' },
]"/>

### Emits

This component emits no events.

### Slots

This component exposes no named slots.
