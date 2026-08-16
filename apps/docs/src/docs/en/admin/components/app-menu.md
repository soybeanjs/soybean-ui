# AppMenu

## Overview

`SAppMenu` renders the navigation shape for a given layout `mode` on top of `@soybeanjs/ui` menu primitives. It consumes the optional `AppLayoutContext` provided by `SAppLayout` for `mode` / `siderCollapse` / mount points; when used standalone it degrades to its own props and renders in place.

Six mode branches are supported: `vertical` (`STreeMenu`), `horizontal` (`SMenubar`), `vertical-mix`, `vertical-hybrid`, `top-sidebar` and `top-header` (header rail + tree / icon-rail compositions).

## Usage

<UsageCode component="app-menu" />

## Features

- 🧭 Six navigation shapes — driven by `mode` (synced with `SAppLayout` when nested)
- 🗂️ Data-driven — pass a typed `AppMenuData[]` tree (key / label / icon / badge / children / hideInMenu / disabled)
- 🎛️ Controlled or uncontrolled selection — `selectedKey` / `defaultSelectedKey`, `expanded` / `defaultExpanded`
- 📐 Collapse — `siderCollapse` collapses to icons with `collapsedWidth`
- 🌗 Inverted styling — `inverted` for dark sidebar surfaces
- 📌 Mix modes — `mixSiderFixed` pins the child drawer; `autoSelectFirstMenu` jumps to the deepest leaf
- 📍 Teleport — `headerMenuEl` / `siderMenuEl` mount header/sider branches into `SAppLayout` regions
- 🧩 `top` / `bottom` slots for custom chrome around the options

## Demos

<PlaygroundGallery component="app-menu" />

## API

### Props

<DataTable preset="props" :data="[
  { name: 'data', type: 'AppMenuData[]', default: '-', description: 'The menu data model.' },
  { name: 'mode', type: 'AppMenuMode', default: `'vertical'`, description: 'The menu shape. When unset, resolved from `AppLayoutContext`.' },
  { name: 'selectedKey', type: 'string', default: '-', description: 'The active menu key (controlled, `v-model:selected-key`).' },
  { name: 'defaultSelectedKey', type: 'string', default: '-', description: 'The active menu key when initially rendered (uncontrolled).' },
  { name: 'expanded', type: 'string[]', default: '-', description: 'The expanded menu keys (controlled, `v-model:expanded`).' },
  { name: 'defaultExpanded', type: 'string[]', default: '-', description: 'The expanded menu keys when initially rendered (uncontrolled).' },
  { name: 'siderCollapse', type: 'boolean', default: '-', description: 'Whether the menu is collapsed (icons only). When unset, resolved from `AppLayoutContext`.' },
  { name: 'inverted', type: 'boolean', default: 'false', description: 'Whether to use inverted (dark) styling.' },
  { name: 'collapsedWidth', type: 'number', default: '50', description: 'The width of the collapsed menu.' },
  { name: 'mixSiderFixed', type: 'boolean', default: '-', description: 'Whether the mix-mode child drawer is pinned.' },
  { name: 'mixMenuWidth', type: 'number', default: '220', description: 'The width of the mix-mode child drawer (px).' },
  { name: 'autoSelectFirstMenu', type: 'boolean', default: 'true', description: 'In mix modes, auto-select the deepest menu when a parent is chosen.' },
  { name: 'headerMenuEl', type: 'string', default: '-', description: 'Id of the header element to mount header-level menus into.' },
  { name: 'siderMenuEl', type: 'string', default: '-', description: 'Id of the sider element to mount sider-level menus into.' },
  { name: 'class', type: 'ClassValue', default: '-', description: 'Root class.' },
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'update:selectedKey', parameters: '[value: string | undefined]', description: 'Emitted when the active menu key changes.' },
  { name: 'update:expanded', parameters: '[value: string[]]', description: 'Emitted when the expanded menu keys change.' },
  { name: 'update:siderCollapse', parameters: '[value: boolean]', description: 'Emitted to toggle the sidebar collapse state.' },
  { name: 'update:mixSiderFixed', parameters: '[value: boolean]', description: 'Emitted to toggle whether the mix-mode child drawer is pinned.' },
  { name: 'select', parameters: '[key: string]', description: 'Emitted when a leaf menu item is chosen.' },
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'top', parameters: '-', description: 'Custom content rendered before the menu options.' },
  { name: 'bottom', parameters: '-', description: 'Custom content rendered after the menu options.' },
]"/>

## Notes

### Data model

`AppMenuData` nodes carry `key` (route name), optional `routeKey`, `label`, `icon` (iconify name), `children`, `hideInMenu`, `badge` and `disabled`. Hidden nodes and entries with no visible descendants are pruned automatically.
