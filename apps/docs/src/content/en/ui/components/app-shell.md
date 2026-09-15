---
head:
  title: AppShell
  description: 'An aggregated application shell that assembles the layout regions, menu, breadcrumb, page tabs, brand, and footer from props and slots.'
---

# AppShell

## Overview

`SAppShell` is an aggregated application shell for admin-style applications. A single `mode`, one menu tree, and a handful of props assemble the whole shell: the layout regions (sidebar, header, tabs, content, footer) plus everything that fills them — navigation, breadcrumb, page tabs, brand, and footer.

Use it when an application needs a persistent shell around routed pages — a sidebar or top-bar navigation, a breadcrumb in the header, a page-tab strip, and a footer — without writing the wiring yourself. Prefer the primitives (`SLayout`, `SSplitNav`, `STreeMenu`, `SNavMenu`, `SPageTabs`, `SBreadcrumb`) when the composition does not fit; the Layout Composition demo shows the same shell assembled by hand.

`SAppShell` is the aggregation layer of the layout family. It owns one thing the primitives cannot: the **mode skeleton** — which layout orientation, which menu renderer, which region each menu pane is mounted into, and the sidebar widths those panes require. Everything else stays in the family it belongs to: `SLayout` renders the regions, `SSplitNav` / `STreeMenu` / `SNavMenu` render the menu, `SBreadcrumb` and `SPageTabs` render their own bars.

Like `SLayout`, the shell is router-agnostic: it takes a menu tree, breadcrumb items, and tab items as data and reports interactions back through events. Routing, permissions, tab collections, and cache policy stay in the host, and the [playground examples](#demos) show the wiring.

## Usage

<UsageCode component="app-shell" />

## Features

- 🧭 **Six modes** — `sidebar` (nested sidebar menu), `top` (popup top-bar menu), and the four `SSplitNav` modes `dual-vertical` / `vertical-horizontal` / `horizontal-vertical` / `horizontal-dual-vertical`, forwarded verbatim.
- 📐 **A sidebar that follows the menu** — the nested-pane modes size the sidebar to the panes they actually render: `rail + tree` while a first-level menu with children is active, rail only when it is not.
- 🧩 **Renderer per mode** — one `items` tree feeds `STreeMenu`, `SNavMenu`, or `SSplitNav`, chosen by the mode; `menuProps` / `menuUi` forward to the active renderer only.
- 🪆 **Teleport mounting** — panes that belong in another region (a top bar beside a sidebar tree) are mounted into shell-owned targets; the shell generates the ids and exposes them on the `menu` slot.
- 🍞 **Breadcrumb from the menu** — the header breadcrumb is derived from `items` and the active value: the trail down to the active menu, where every ancestor whose menu has children opens a dropdown of those children. Pass `breadcrumbs` to render your own data instead.
- 📑 **Tabs and footer** — `tabs` render in the tab region and the footer is a slot; both accept per-region props and `ui` overrides.
- 🗂️ **Collapsed pane as an overlay** — a collapsed sidebar keeps only its rail; activating a first-level menu with children shows the nested pane next to the rail, without widening the layout.
- 🏷️ **Brand is a slot** — the shell renders no logo of its own: inject the mark, the app title, and the subtitle through `#logo`, which receives the live `collapsed` state and its `placement`.
- 📱 **Mobile drawer** — `isMobile` swaps the sidebar for the layout's dialog drawer, reusing the same brand and menu content.
- 🎛️ **Three override levels** — `ui` for the shell's own nodes, `layoutUi` for the layout regions it themes, `menuUi` for the menu renderer; each region also accepts a slot.
- ♿ **Accessibility inherited** — keyboard, focus, ARIA, and RTL come from the composed families; the shell only adds structure and classes.

## Demos

<PlaygroundGallery component="app-shell" />

## API

<ComponentApi component="app-shell" />

## Notes

### Mode skeleton

`mode` drives the layout orientation, the menu renderer, and where the menu panes mount. Mode names describe the **menu shape**, not the layout orientation — the orientation follows from whether the first menu level is vertical or horizontal.

| `mode`                     | First level | Renderer    | `layoutProps.orientation` | Brand   | Menu panes                                            |
| :------------------------- | :---------- | :---------- | :------------------------ | :------ | :---------------------------------------------------- |
| `sidebar`                  | sidebar     | `STreeMenu` | `horizontal`              | sidebar | one nested tree                                       |
| `top`                      | header      | `SNavMenu`  | `vertical`                | header  | one popup bar                                         |
| `dual-vertical`            | sidebar     | `SSplitNav` | `horizontal`              | sidebar | rail + nested tree, side by side                      |
| `vertical-horizontal`      | sidebar     | `SSplitNav` | `horizontal`              | header  | rail in the sidebar, horizontal sub-nav in the header |
| `horizontal-vertical`      | header      | `SSplitNav` | `vertical`                | header  | top bar in the header, tree in the sidebar            |
| `horizontal-dual-vertical` | header      | `SSplitNav` | `vertical`                | header  | top bar in the header, rail + tree in the sidebar     |

The nested panes only take space while they have something to show. The sidebar of `dual-vertical` and `horizontal-dual-vertical` is the rail plus the tree while a first-level menu with children is active, and the rail alone otherwise; `horizontal-vertical` has no rail, so its sidebar is the tree or nothing at all. When the sidebar is collapsed, the pane leaves the flow and overlays the content next to the rail, so activating another first-level menu still reveals it.

The rule behind the orientation column: a vertical first level keeps the sidebar full height and lets the header start beside it (`orientation="horizontal"`); a horizontal first level puts the header across the full width with the sidebar beneath it (`orientation="vertical"`). This is the inverse of the raw `SLayout` prop names, so read this table rather than guessing.

### Architecture and benchmark comparison

| Concern           | SoybeanUI `SAppShell`                                                                  | Ant Design Pro `ProLayout`               | Element Plus          | shadcn/ui                 |
| :---------------- | :------------------------------------------------------------------------------------- | :--------------------------------------- | :-------------------- | :------------------------ |
| Layer split       | Styled aggregation over the headless `layout` family; `SLayout` still ships standalone | Single styled package                    | Single styled package | Copy-in block, no library |
| Modes             | 6 (`sidebar`, `top`, + 4 split shapes) driven by one `mode`                            | 6 (`side`/`top`/`mix` + header variants) | —                     | 1                         |
| Menu tree         | One `items` tree, rendered by `STreeMenu` / `SNavMenu` / `SSplitNav` per mode          | Routes/props                             | `el-menu` config      | Composed by hand          |
| Sidebar geometry  | Derived from `mode` + `size`, aligned to the menu panes                                | Numeric props                            | Numeric props         | Hand-written CSS          |
| Brand             | `#logo` slot (no default rendering)                                                    | `logo` / `title` props                   | `el-aside` content    | Composed by hand          |
| Breadcrumb / tabs | `breadcrumbs` / `tabs` data props, rendered by `SBreadcrumb` / `SPageTabs`             | `menu` config + `PageContainer`          | Composed by hand      | Composed by hand          |
| Router dependency | None — data in, events out                                                             | Vue Router assumed                       | None                  | None                      |
| Overrides         | `ui` / `layoutUi` / `menuUi` + a slot per region                                       | `token` / slots                          | CSS vars              | Edit the copied source    |
| Accessibility     | Owned by the composed headless families                                                | Package-level                            | Package-level         | Manual                    |

### Cautions

1. **The brand is yours.** There is no `logo` or `title` prop: the app title belongs to the `#logo` slot content. The shell only renders the region and hands over `collapsed` and `placement` so the injected mark can adapt.
2. **`isMobile` is declarative.** The shell never reads `matchMedia`; pass `useMediaQuery` from `@vueuse/core` (or a server-side hint). The layout, the drawer, and the trigger all follow the prop.
3. **Sidebar widths are derived — do not override them casually.** `layoutProps.sidebarWidth` / `collapsedSidebarWidth` win over the derived values, but in the split modes that breaks the alignment between the sidebar and the menu panes, and it also loses the dynamic behaviour below.
4. **Switching modes re-creates the menu.** Each mode renders a different menu instance, so the panes' expanded state (which lives inside `SSplitNav` / `STreeMenu`) resets to the active path on a mode change.
5. **Top-bar selection is anchor-driven.** `SNavMenu` links do not report a keyed selection, so `top` mode marks the active item with `selected` on the item (derive it from the route) and `select` is emitted by the tree-based modes only.
6. **The tab collection is mutated in place.** `SPageTabs` removes a closed tab and flips `pinned` by mutating the `tabs` array it is given; `update:tabs` only fires for bulk operations (close others/all) and drag reorders. Keep the collection reactive (a deep `ref`, not `shallowRef`) and use `tabClose` / `tabPin` when you need to observe those actions.
7. **The nested pane overlays while the sidebar is collapsed.** The sidebar then keeps its rail width, and the pane is anchored outside it with the layout's sidebar z-index. It stays open until the sidebar is expanded again or the active menu changes; content that must not be covered (a full-bleed canvas, for example) should be expand-only — keep the sidebar open and let the pane take a column.
8. **Sidebar content sits outside a landmark.** The layout sidebar region is a plain element with no landmark role, so content injected around the menu (brand, `sidebar-start`, `sidebar-end`) is not inside a landmark. Wrap it in your own landmark if you run an accessibility audit.

## FAQ

### How do I keep the breadcrumb in sync with the route?

Keep `v-model` in sync with the route and the breadcrumb follows on its own: it is derived from `items` plus the active value, so the trail, the labels, and the dropdowns all come from one menu tree. When the trail has to differ from the menu — permission-trimmed routes, a title that is not the menu label — pass your own `breadcrumbs` and the shell renders that data instead. `breadcrumbClick` reports crumb activation, while picking an entry in an ancestor dropdown emits `select` / `update:modelValue` (or `open` for a parent) exactly like the menu does.

### Why does the sidebar change width when I open another menu?

Because the nested pane is part of the sidebar only while it exists. A first-level menu without children has no pane to show, so the sidebar falls back to its rail; activating a menu with children widens it again. Overriding `layoutProps.sidebarWidth` gives a constant width and loses that behaviour.

### How do I make the sidebar narrower or wider?

Set `layoutProps.sidebarWidth` / `collapsedSidebarWidth` for the `sidebar` mode. In the split modes leave them alone: the widths are computed from the pane metrics of the active `size`, and overriding them desynchronises the sidebar from the menu.

### Why is `select` not emitted in `top` mode?

`SNavMenu` renders real links and does not carry a menu key in its select payload, so a top bar is expected to navigate through `href`. Mark the active item with `selected: true` on the matching entry (or use the `#menu` slot to render `SNavMenu` yourself).

### How do I add a page header or a footer above the tabs?

The `#header` slot replaces the header's center region (the `#header-start` / `#header-end` slots cover the leading and trailing regions), and the `#footer` slot fills the footer. For a page-level header inside the content, compose `SCard` or a plain header in the default slot — there is no page-header region in the shell.

### How do I replace the menu entirely?

Use the `#menu` slot. It replaces the menu instance, not the mount targets: the shell still renders the region and the teleport targets, and the slot receives `headerMountId` / `sidebarMountId` so your own `SSplitNav` can target them.
