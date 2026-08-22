# SplitNav

## Overview

A split navigation for admin layouts. `SSplitNav` takes one menu tree and renders it across independent first-level and nested panes, instead of nesting every level in a single sidebar. It ships four layout modes — `dual-vertical`, `vertical-horizontal`, `horizontal-vertical`, and `horizontal-dual-vertical`. The first-level rail is a dedicated RovingFocus menu (Menubar-like arrow keys, Enter/Space to select, no popup). Nested vertical panes reuse `TreeMenuCompact`; the nested horizontal pane reuses `MenubarCompact`.

Use it when a layout needs a first-level switcher plus a nested tree or menubar (two vertical columns, a vertical rail with a horizontal bar, a top bar with a sider, or a top bar plus two vertical columns). Prefer `STreeMenu` for a single nested sidebar and `SMenubar` / `SNavigationMenu` for a standalone horizontal menu.

## Usage

<UsageCode component="split-nav" />

## Features

- 🧭 Four modes — `mode` selects the pane composition; the root switches the matching mode component
- 🎹 First-level keyboard — vertical/horizontal `RovingFocusGroup` with Arrow, Home/End, Enter/Space; Tab moves between panes
- 🪟 Teleport mounting — `verticalMountedId` / `horizontalMountedId` mount panes into `#id` elements (`dual-vertical` teleports as one block)
- 🪜 Path slicing — the active `modelValue` derives the first-level highlight and the nested pane's items
- 🔄 Controlled/uncontrolled — `modelValue` / `defaultValue`; clicking a parent only activates it, clicking a leaf also emits `select`
- 🧩 Reuses `TreeMenuCompact` (nested vertical) and `MenubarCompact` (nested horizontal)
- 🎨 6 sizes + style injection — `size` from xs to 2xl; `class` / `ui` overrides across named slots
- ✏️ Customizable — `first-level-item` / `item` / `item-leading` / `item-trailing` / `trigger` slots
- ♿ Accessibility — `role="menubar"` / `menuitem`, `data-soybean-split-nav-*` attributes, RTL-aware `dir`

## Component family

- `SSplitNav` (styled) — entry wrapper; composes `SplitNavRoot` + `splitNavVariants` mode/size recipe + `provideSplitNavUi` slot-class injection
- `SplitNavRoot` (headless) — compact aggregator; `useControllableState` for the active value, mode switch, slot forwarding
- Internal mode components (headless) — `DualVerticalMenu`, `VerticalHorizontalMenu`, `HorizontalVerticalMenu`, `HorizontalDualVerticalMenu`
- Internal first-level menus (headless) — `VerticalFirstLevelMenu` / `HorizontalFirstLevelMenu` with shared RovingFocus items

## Demos

<PlaygroundGallery component="split-nav" />

- 01 Basic — `dual-vertical` two vertical columns
- 02 Vertical-Horizontal — level-1 vertical rail + nested Menubar
- 03 Horizontal-Vertical — level-1 horizontal bar + nested TreeMenu
- 04 Horizontal-Dual-Vertical — top horizontal bar + nested dual-vertical
- 05 Teleport — mount panes into external `#id` elements
- 06 Custom — override first-level and nested item content through slots

## API

<ComponentApi component="split-nav" />

## Notes

### Architecture

`SSplitNav` is a thin styled wrapper. Headless `SplitNavRoot` owns mode switching, the active path (`findActivePath`), and leaf-vs-parent selection. First-level items are a dedicated RovingFocus list — not a TreeMenu — so parent nodes switch the nested pane instead of expanding in place. Nested vertical content is `TreeMenuCompact`; nested horizontal content is `MenubarCompact` with `activeValue` (the Menubar open state is never bound to the nav `modelValue`). `provideSplitNavUi` forwards slot classes into the nested TreeMenu / Menubar / Menu UiContexts.

| Capability                | SoybeanUI | Ant Design | Element Plus | Naive UI |
| :------------------------ | :-------: | :--------: | :----------: | :------: |
| Multiple layout modes     |    ✅     |     ⚠️     |      ⚠️      |    —     |
| Teleport to external el   |    ✅     |     —      |      —       |    —     |
| Headless/style separation |    ✅     |     —      |      —       |    —     |
| First-level roving keys   |    ✅     |     ⚠️     |      ⚠️      |    —     |

### Cautions

- Panes render in place by default; set `horizontalMountedId` / `verticalMountedId` only when a pane must mount into an external element (pass the id without `#`).
- In `dual-vertical` and the nested dual-vertical of `horizontal-dual-vertical`, the two vertical columns teleport together via `verticalMountedId`. Mixed modes teleport the first-level and nested panes independently.
- Clicking a parent item activates it and drives the nested pane without emitting `select`; clicking a leaf emits `select`.
- Flex layout per `mode` lives in the UI style recipe; the headless layer carries no layout classes.

## FAQ

### How do I switch between the four modes?

Set the `mode` prop: `dual-vertical` (two vertical columns), `vertical-horizontal` (rail + horizontal bar), `horizontal-vertical` (horizontal bar + vertical column), or `horizontal-dual-vertical` (top bar + two vertical columns).

### How do I mount a pane into a specific element?

Give the target element an `id` and pass it to `horizontalMountedId` / `verticalMountedId`:

```vue
<SSplitNav
  mode="horizontal-vertical"
  :items="items"
  horizontal-mounted-id="app-header"
  vertical-mounted-id="app-sider"
/>
```

The pane is then rendered into `#app-header` / `#app-sider` through `Teleport` (`defer` keeps late-mounted targets safe).

### How do I know when a leaf is chosen?

The `select` event fires with the leaf value; `v-model` reflects the active value. Clicking a parent only activates it (drives the nested pane) and does not emit `select`.

### Can I customize each item's content?

Yes — use `first-level-item` for the first-level rail, `item` / `item-leading` / `item-trailing` for nested TreeMenu items, and `trigger` for nested Menubar triggers.

### Does it support route links?

Each node can carry `to` / `href` (inherited from `LinkBaseProps`). First-level items and nested TreeMenu / Menubar renderers handle link rendering.

### How does first-level keyboard navigation work?

The first-level list is a `menubar`: Arrow keys move focus (vertical uses Up/Down, horizontal uses Left/Right, RTL-aware), Home/End jump to the ends, Enter/Space selects the focused item. Nested TreeMenu and Menubar keep their own keyboard contracts; Tab moves between panes.
