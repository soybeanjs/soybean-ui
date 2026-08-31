# SplitNav

## Overview

A split navigation for admin layouts. `SSplitNav` takes one menu tree and renders it across independent first-level and nested panes, instead of nesting every level in a single sidebar. It ships four layout modes — `dual-vertical`, `vertical-horizontal`, `horizontal-vertical`, and `horizontal-dual-vertical`. The first-level rail is a dedicated RovingFocus menu (Menubar-like arrow keys; Enter/Space to activate; ArrowDown on a horizontal parent, ArrowLeft/ArrowRight on a vertical parent to open the nested pane). Nested vertical panes reuse `TreeMenuCompact`; the nested horizontal pane reuses `TreeNavCompact`.

Use it when a layout needs a first-level switcher plus a nested tree or horizontal nav (two vertical columns, a vertical rail with a horizontal bar, a top bar with a sider, or a top bar plus two vertical columns). Prefer `STreeMenu` for a single nested sidebar and `STreeNav` for a standalone horizontal tree nav.

## Usage

<UsageCode component="split-nav" />

## Features

- 🧭 Four modes — `mode` selects the pane composition; the root switches the matching mode component
- 🎹 First-level keyboard — vertical/horizontal `RovingFocusGroup` with Arrow, Home/End; Enter/Space activates; ArrowDown on a horizontal parent and ArrowLeft/ArrowRight on a vertical parent open the nested pane; Tab moves between panes
- 🪟 Teleport mounting — `verticalMountedId` / `horizontalMountedId` mount panes into `#id` elements (`dual-vertical` teleports as one block)
- 🪜 Path slicing — `openPath` drives nested panes; `modelValue` is the selected leaf only
- 🔄 Controlled/uncontrolled — `modelValue` / `defaultValue` store the selected leaf; clicking a parent only opens its pane, without changing `v-model` or applying the selected style
- 📢 Open event — activating a parent emits `open` with its complete option data (children included), e.g. to activate the first child at the same time
- 🧩 Reuses `TreeMenuCompact` (nested vertical) and `TreeNavCompact` (nested horizontal)
- 🎨 6 sizes + style injection — `size` from xs to 2xl; `class` / `ui` overrides across named slots
- ✏️ Customizable — `first-level-item` / `item` / `item-leading` / `item-trailing` slots
- ♿ Accessibility — `role="menubar"` / `menuitem`, `data-soybean-split-nav-*` attributes, RTL-aware `dir`

## Component family

- `SSplitNav` (styled) — entry wrapper; composes `SplitNavRoot` + `splitNavVariants` mode/size recipe + `provideSplitNavUi` slot-class injection
- `SplitNavRoot` (headless) — compact aggregator; `useControllableState` for the active value, mode switch, slot forwarding
- Internal mode components (headless) — `DualVerticalPane`, `VerticalHorizontalMenu`, `HorizontalVerticalMenu`, `HorizontalDualVerticalMenu`
- Internal first-level menus (headless) — `VerticalFirstLevelMenu` / `HorizontalFirstLevelMenu` with shared RovingFocus items

## Demos

<PlaygroundGallery component="split-nav" />

- 01 Basic — `dual-vertical` two vertical columns, with TreeMenu width and collapse
- 02 Vertical-Horizontal — level-1 vertical rail + nested TreeNav
- 03 Horizontal-Vertical — level-1 horizontal bar + nested TreeMenu
- 04 Horizontal-Dual-Vertical — top horizontal bar + nested dual-vertical
- 05 Teleport — mount panes into external `#id` elements
- 06 Custom — override first-level and nested item content through slots
- 07 Open Event — listen to `open` and activate the first child when a parent is clicked

## API

<ComponentApi component="split-nav" />

## Notes

### Architecture

`SSplitNav` is a thin styled wrapper. Headless `SplitNavRoot` owns mode switching, the active path (`findActivePath`), and leaf-vs-parent selection. First-level items are a dedicated RovingFocus list — not a TreeMenu — so parent nodes switch the nested pane instead of expanding in place, and they **do not** take on the selected-leaf style. Vertical first-level items stack icon above label in a compact rail (overflowing labels ellipsize); horizontal first-level items stay icon-then-label in a row. Nested vertical content is `TreeMenuCompact` styled with `treeMenuVariants`, including a dedicated pane width and `v-model:collapsed`; nested horizontal content is `TreeNavCompact` styled with `treeNavVariants` so it matches `STreeNav`. `class` applies to the standalone `dual-vertical` pane; mixed modes render as independent teleported fragments.

| Capability                | SoybeanUI | Ant Design | Element Plus | Naive UI |
| :------------------------ | :-------: | :--------: | :----------: | :------: |
| Multiple layout modes     |    ✅     |     ⚠️     |      ⚠️      |    —     |
| Teleport to external el   |    ✅     |     —      |      —       |    —     |
| Headless/style separation |    ✅     |     —      |      —       |    —     |
| First-level roving keys   |    ✅     |     ⚠️     |      ⚠️      |    —     |

### Cautions

- Panes render in place by default; set `horizontalMountedId` / `verticalMountedId` only when a pane must mount into an external element (pass the id without `#`).
- In `dual-vertical` and the nested dual-vertical of `horizontal-dual-vertical`, the two vertical columns teleport together via `verticalMountedId`. Mixed modes teleport the first-level and nested panes independently.
- Clicking a parent item only opens the nested pane (`data-state="open"`); it does not change `v-model` or set `data-selected`. Clicking a leaf updates `v-model` and emits `select`; the selected leaf renders `data-selected="true"` and `data-state="closed"`. A parent whose descendant is selected also gets `data-child-selected`.
- Activating a parent item (click or keyboard) emits `open` with the complete option data of that parent, children included; it fires only for parents with visible children and never for leaves.
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

The `select` event fires with the leaf value; `v-model` reflects the selected leaf only. Clicking a parent only opens the nested pane (`data-state="open"`) and does not emit `select` or set `data-selected`. If a descendant is already selected, the parent also gets `data-child-selected`.

### How do I activate the first child when a parent is clicked?

Listen to the `open` event: it carries the complete option data of the activated parent, children included. Pick its first visible child and write the value to `v-model`:

```vue
<script setup lang="ts">
import { shallowRef } from 'vue';
import { SSplitNav } from '@soybeanjs/ui';
import type { SplitNavOptionData } from '@soybeanjs/ui';

const active = shallowRef('');

function handleOpen(item: SplitNavOptionData) {
  const firstChild = item.children?.find(child => !child.hidden);

  if (firstChild) {
    active.value = firstChild.value;
  }
}
</script>

<template>
  <SSplitNav v-model="active" :items="items" @open="handleOpen" />
</template>
```

`open` fires only when a parent with visible children is activated (click or keyboard), so leaves keep using `select`.

### Can I customize each item's content?

Yes — use `first-level-item` for the first-level rail, and `item` / `item-leading` / `item-trailing` for nested TreeMenu and TreeNav items.

### Does it support route links?

Each node can carry `to` / `href` (inherited from `LinkBaseProps`). First-level items and nested TreeMenu / TreeNav renderers handle link rendering.

### How does first-level keyboard navigation work?

The first-level list is a `menubar`: Arrow keys move focus (vertical uses Up/Down, horizontal uses Left/Right, RTL-aware), Home/End jump to the ends, Enter/Space activates the focused item. When the item has children, ArrowDown on a horizontal rail and ArrowLeft/ArrowRight on a vertical rail open the nested pane. Nested TreeMenu and TreeNav keep their own keyboard contracts; Tab moves between panes.
