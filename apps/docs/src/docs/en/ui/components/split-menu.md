# SplitMenu

## Overview

A split navigation menu for admin/sidebar layouts. `SSplitMenu` splits a single menu tree across multiple panels so each visible level renders in its own column or bar, instead of nesting everything into one expanding sidebar. It ships four layout modes — `dual-vertical`, `vertical-horizontal`, `horizontal-vertical`, and `horizontal-dual-vertical` — and reuses the headless `TreeMenuCompact` (vertical panels) and `MenubarCompact` (horizontal panels) as the in-panel renderers, so the split shape is achieved by slicing the tree per depth rather than re-implementing menu behavior.

Use it when you need a multi-panel navigation (two-column menus, a horizontal top menu with a vertical sub-menu, or a three-panel top + double-column layout). Prefer `STreeMenu` for a single nested sidebar and `SMenubar`/`SNavigationMenu` for a standalone horizontal menu; `SSplitMenu` composes those shapes into a split layout.

## Usage

<UsageCode component="split-menu" />

## Features

- 🧭 Split layout — `mode` selects one of four panel shapes; each panel renders one menu depth
- 🪟 Teleport mounting — `horizontalMenuEl` / `verticalMenuEl` mount detached panels into `#id` elements via `Teleport`
- 🪜 Automatic slicing — each panel shows the children of the active parent (level-1 → level-2 → level-3)
- 🔄 Controlled/uncontrolled — `modelValue`/`defaultValue` (active value) and `collapsed`/`defaultCollapsed` (level-1 rail)
- 🧩 Reuses `TreeMenuCompact` (vertical) and `MenubarCompact` (horizontal) as in-panel renderers
- 🎨 6 sizes + style injection — `size` from xs to 2xl; `class`/`ui` overrides across named slots
- ✏️ Customizable — `item`/`item-leading`/`item-trailing`/`trigger` slots
- ♿ Accessibility — native button semantics, `data-soybean-split-menu-*` attributes, RTL-aware layout

## Component family

- `SSplitMenu` (styled) — entry wrapper; composes `SplitMenuCompact` + the `splitMenuVariants` mode/size recipe + `provideSplitMenuUi` slot-class injection
- `SplitMenuCompact` (headless) — composite root; maps `mode` to layout rows, slices the tree per depth, forwards `select` events
- `SplitMenuRoot` (headless) — state root; `useControllableState` manages the active value and collapse state
- `SplitMenuPanel` (headless) — one panel; renders `TreeMenuCompact` (vertical) or `MenubarCompact` (horizontal) with the sliced items
- `SplitMenuItem` / `SplitMenuTrigger` / `SplitMenuContent` (headless) — base primitives for advanced composition, all zero-style

## Demos

<PlaygroundGallery component="split-menu" />

- 01 Basic — `dual-vertical` two vertical columns
- 02 Vertical-Horizontal — level-1 vertical rail + level-2 horizontal bar
- 03 Horizontal-Vertical — level-1 horizontal bar + level-2 vertical column
- 04 Horizontal-Dual-Vertical — top horizontal bar + two vertical columns
- 05 Collapsed — collapse the level-1 panel to a rail
- 06 Teleport — mount panels into external `#id` elements
- 07 Custom — override item content through the slots

## API

<ComponentApi component="split-menu" />

## Notes

### Architecture and benchmark differences

`SSplitMenu` is a thin styled wrapper: the headless `SplitMenuCompact` owns the mode→row mapping (`getSplitMenuRows`), the per-depth tree slicing (`sliceSplitMenuItems`), and the active path derivation (`getSplitMenuActiveValues`), while each `SplitMenuPanel` delegates in-panel rendering to the existing `TreeMenuCompact` or `MenubarCompact`. The UI layer only injects the mode/size recipe and slot classes, and forwards the `SplitMenu` slot classes into the nested `TreeMenu`/`Menubar`/`Menu` UiContexts (the `provideTreeMenuUi`/`provideMenubarUi`/`provideMenuUi` pattern), so the panels pick up the shared styling without re-implementing menu behavior. Compared with mainstream split-menu implementations (Ant Design Layout.Sider, Element Plus el-menu split, Naive UI), SoybeanUI keeps the headless/style separation and reuses battle-tested menu primitives rather than shipping a monolithic menu.

| Capability                | SoybeanUI | Ant Design | Element Plus | Naive UI |
| :------------------------ | :-------: | :--------: | :----------: | :------: |
| Multiple panel modes      |    ✅     |     ⚠️     |      ⚠️      |    —     |
| Teleport to external el   |    ✅     |     —      |      —       |    —     |
| Headless/style separation |    ✅     |     —      |      —       |    —     |
| Reuses menu primitives    |    ✅     |     —      |      —       |    —     |

### Cautions

- Panels render in place by default; only set `horizontalMenuEl` / `verticalMenuEl` when you want to teleport a panel into an external element.
- Clicking a parent item activates it and drives the next panel without emitting `select`; clicking a leaf emits `select`.
- The `data-orientation` / `data-depth` attributes on each panel are the styling hooks the UI layer uses; do not rely on class names for behavior.
- The flex layout per `mode` is defined in the UI style recipe; the headless layer carries no layout classes.

## FAQ

### How do I switch between the four modes?

Set the `mode` prop: `dual-vertical` (two vertical columns), `vertical-horizontal` (rail + horizontal bar), `horizontal-vertical` (horizontal bar + vertical column), or `horizontal-dual-vertical` (top bar + two vertical columns).

### How do I mount a panel into a specific element?

Give the target element an `id` and pass it to `horizontalMenuEl` / `verticalMenuEl`:

```vue
<SSplitMenu mode="horizontal-vertical" :items="items" horizontal-menu-el="app-header" vertical-menu-el="app-sider" />
```

The panel is then rendered into `#app-header` / `#app-sider` through `Teleport` (the `defer` + `onMounted` pattern keeps SSR safe).

### How do I know when a leaf is chosen?

The `select` event fires with the leaf value; `v-model:modelValue` reflects the active value. Clicking a parent only activates it (drives the next panel) and does not emit `select`.

### Can I customize each item's content?

Yes — use the `item`, `item-leading`, `item-trailing`, and `trigger` slots. The `item` slot receives `{ item }`, and `item-leading`/`item-trailing` render around the label.

### Does it support route links?

Each node can carry `to`/`href` (inherited from the `LinkBaseProps` data model); the in-panel `TreeMenuCompact`/`MenubarCompact` renderers handle link rendering for you.

### Why are there no layout classes in the headless package?

Per the headless/style split, the headless layer exposes `data-orientation` / `data-depth` and the UI style recipe owns the flex layout; this keeps the headless package zero-style and fully themeable.
