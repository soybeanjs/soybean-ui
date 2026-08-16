# AppBreadcrumb

## Overview

`SAppBreadcrumb` renders a breadcrumb trail with optional child dropdowns: a node with `children` becomes a hover dropdown listing its children; a leaf node is a clickable page.

## Usage

<UsageCode component="app-breadcrumb" />

## Features

- 🧱 Item model — `AppBreadcrumbItem[]` with `value`, `label`, `icon`, `disabled`
- 📂 Child dropdowns — items with `children` render an `SDropdownMenu` on hover
- 🖱️ Interactions — `click` for page nodes, `select-child` when a dropdown item is chosen
- 🎨 Slot class overrides — `ui` merges per-slot classes into the breadcrumb recipe

## Demos

<PlaygroundGallery component="app-breadcrumb" />

## API

### Props

<DataTable preset="props" :data="[
  { name: 'items', type: 'AppBreadcrumbItem[]', default: '-', description: 'Items rendered by the component.' },
  { name: 'class', type: 'ClassValue', default: '-', description: 'Root class.' },
  { name: 'ui', type: 'Partial<BreadcrumbUi>', default: '-', description: 'Per-slot class overrides.' },
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'click', parameters: '[item: AppBreadcrumbItem]', description: 'Emitted when a leaf item is clicked.' },
  { name: 'select-child', parameters: '[item: AppBreadcrumbItem]', description: 'Emitted when a child dropdown item is selected.' },
]"/>

### Slots

This component exposes no named slots.
