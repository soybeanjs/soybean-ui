# AppLayout

## Overview

`SAppLayout` is the unified application shell of `@soybeanjs/admin`. It renders a complete admin page skeleton — sidebar, header, multi-tab bar, content and footer — and drives the navigation shape via a single `mode` prop so the layout skeleton and `SAppMenu` stay in sync.

It backs onto the unified `SLayout` component — the single layout that combines the sidebar variants (`sidebar` / `floating` / `inset`) with `orientation`, `scrollBehavior`, and fixed `header` / `tab` / `footer` behavior. All layout props/slots are forwarded, and the shell owns the sidebar open state (`v-model:open`) plus responsive mobile detection against `mobileBreakpoint`.

## Usage

<UsageCode component="app-layout" />

## Features

- 🏗️ Unified shell — one `SLayout` backend with `variant` (`sidebar` / `floating` / `inset`), `orientation`, `scrollBehavior`, `fixedTop` and `fixedFooter` for the shell presentation
- 🧭 Six navigation shapes — `vertical`, `vertical-mix`, `vertical-hybrid`, `horizontal`, `top-sidebar`, `top-header` drive both layout and `SAppMenu`
- 🎛️ Controlled sidebar — `v-model:open` + `defaultOpen` for a responsive collapse toggle
- 📱 Mobile drawer — when unset, resolved from the viewport width against `mobileBreakpoint` (default `768`)
- 📍 Teleport mount points — `headerMenuEl` / `siderMenuEl` give `SAppMenu` ids to mount into (defaults `app-header-menu` / `app-sider-menu`)
- 📐 Theme sizing — `size` accepts any `ThemeSize` (xs–2xl)
- 🎨 Slot class overrides — `ui` forwards per-slot classes to the backing layout

## Demos

<PlaygroundGallery component="app-layout" />

## API

### Props

<DataTable preset="props" :data="[
  { name: 'variant', type: `'sidebar' | 'floating' | 'inset'`, default: `'sidebar'`, description: 'The sidebar visual variant of the underlying layout.' },
  { name: 'mode', type: `AppLayoutMode`, default: `'vertical'`, description: 'The unified layout/menu mode.' },
  { name: 'open', type: 'boolean', default: '-', description: 'Controlled sidebar open state (`v-model:open`).' },
  { name: 'defaultOpen', type: 'boolean', default: 'true', description: 'Initial sidebar open state when uncontrolled.' },
  { name: 'sidebarVisible', type: 'boolean', default: 'true', description: 'Whether the sidebar is rendered.' },
  { name: 'headerVisible', type: 'boolean', default: 'true', description: 'Whether the header is rendered.' },
  { name: 'tabVisible', type: 'boolean', default: 'true', description: 'Whether the multi-tab bar is rendered.' },
  { name: 'footerVisible', type: 'boolean', default: 'true', description: 'Whether the footer is rendered.' },
  { name: 'isMobile', type: 'boolean', default: '-', description: 'Force mobile drawer mode. When unset, resolved from the viewport width.' },
  { name: 'mobileBreakpoint', type: 'number', default: '768', description: 'Viewport width (px) below which the layout enters mobile mode.' },
  { name: 'headerMenuEl', type: 'string', default: `'app-header-menu'`, description: 'Id of the header element header-level menus teleport into.' },
  { name: 'siderMenuEl', type: 'string', default: `'app-sider-menu'`, description: 'Id of the sider element sider-level menus teleport into.' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'Visual size of the shell.' },
  { name: 'class', type: 'ClassValue', default: '-', description: 'Root class.' },
  { name: 'ui', type: 'Partial<LayoutUi>', default: '-', description: 'Per-slot class overrides.' },
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'update:open', parameters: '[value: boolean]', description: 'Emitted when the sidebar open state changes.' },
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'sidebar', parameters: '-', description: 'Sidebar content (place an `#app-sider-menu` container here for `SAppMenu`).' },
  { name: 'header', parameters: '-', description: 'Header content (place an `#app-header-menu` container here for header-level menus).' },
  { name: 'tab', parameters: '-', description: 'Multi-tab bar content.' },
  { name: 'footer', parameters: '-', description: 'Footer content.' },
  { name: 'default', parameters: '-', description: 'Main content area.' },
]"/>

## Notes

### Composing a shell

The shell itself does not render the navigation — it only reserves the regions. Compose `SAppLogo` in the sidebar, mount `SAppMenu` via the `#app-sider-menu` / `#app-header-menu` containers, and add page chrome with `SAppPageHeader`, `SAppBreadcrumb` and `SAppFooter`. See the playground "Admin Shell" demo for a complete runnable composition.
