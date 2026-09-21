---
head:
  title: AppShell
  description: 'An aggregated application shell that assembles the layout regions, menu, breadcrumb, page tabs, brand, and footer from props and slots.'
---

# AppShell

## Overview

`SAppShell` is an aggregated application shell for admin-style applications. A single `mode`, one menu tree, and a handful of props assemble the whole shell: the layout regions (sidebar, header, tabs, content, footer) plus everything that fills them — navigation, breadcrumb, page tabs, brand, and footer.

Use it when an application needs a persistent shell around routed pages — a sidebar or top-bar navigation, a breadcrumb in the header, a page-tab strip, and a footer — without writing the wiring yourself. Prefer the primitives (`SLayout`, `SSplitNav`, `STreeMenu`, `STreeNav`, `SPageTabs`, `SBreadcrumb`) when the composition does not fit; the Layout Composition demo shows the same shell assembled by hand.

`SAppShell` is the aggregation layer of the layout family. It owns one thing the primitives cannot: the **mode skeleton** — which layout orientation, which menu renderer, which region each menu pane is mounted into, and the sidebar widths those panes require. Everything else stays in the family it belongs to: `SLayout` renders the regions, `SSplitNav` / `STreeMenu` / `STreeNav` render the menu, `SBreadcrumb` and `SPageTabs` render their own bars.

Like `SLayout`, the shell is router-agnostic: it takes a menu tree, breadcrumb items, and tab items as data and reports interactions back through events. Routing, permissions, tab collections, and cache policy stay in the host, and the [playground examples](#demos) show the wiring.

## Usage

<UsageCode component="app-shell" />

## Features

- 🧭 **Six modes** — `sidebar` (nested sidebar menu), `top` (popup top-bar menu), and the four `SSplitNav` modes `dual-vertical` / `vertical-horizontal` / `horizontal-vertical` / `horizontal-dual-vertical`, forwarded verbatim.
- 📐 **A sidebar that follows the menu** — the nested-pane modes size the sidebar to the panes they actually render: `rail + tree` while a first-level menu with children is active, the rail plus the folded pane or the rail alone otherwise.
- 🧩 **Renderer per mode** — one `items` tree feeds `STreeMenu`, `STreeNav`, or `SSplitNav`, chosen by the mode; `menuProps` / `menuUi` forward to the active renderer only.
- 🌲 **A menu that mirrors the route** — `expandStrategy` (default `selected`, or `keep`) drives the nested `STreeMenu` and the split panes: the active path stays expanded and the branches the session left behind close; `top` renders `STreeNav`, which has no expand strategy.
- 🪆 **Teleport mounting** — panes that belong in another region (a top bar beside a sidebar tree) are mounted into shell-owned targets; the shell generates the ids and exposes them on the `menu` slot.
- 🍞 **Breadcrumb from the menu** — the header breadcrumb is derived from `items` and the active value: the trail down to the active menu, where every ancestor whose menu has children opens a dropdown of those children, nested like the menu itself — an entry that has children keeps its own submenu. Pass `breadcrumbs` to render your own data instead.
- 📑 **Tabs and footer** — `tabs` render in the tab region and the footer is a slot; both accept per-region props and `ui` overrides.
- 🗂️ **A collapse that follows the panes** — a collapsed sidebar keeps its rail and folds the nested pane into its own icon rail, so the sidebar narrows to the columns it actually shows instead of leaving an expanded tree beside a shrunken rail; the trigger sits in the header, or in the sidebar's bottom corner for the modes whose first level is a top bar.
- 🏷️ **Brand is a slot** — the shell renders no logo of its own: inject the mark through `#logo` and the app name through `#title`. The shell places them so they line up with the menu — the mark over the first-level rail, the title over the pane below it, centered while the sidebar is collapsed — and `logoPlacement` moves the region to the top of the sidebar, its bottom, or the header.
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

| `mode`                     | First level | Renderer    | `layoutProps.orientation` | Brand   | Collapse trigger | Menu panes                                            |
| :------------------------- | :---------- | :---------- | :------------------------ | :------ | :--------------- | :---------------------------------------------------- |
| `sidebar`                  | sidebar     | `STreeMenu` | `horizontal`              | sidebar | header           | one nested tree                                       |
| `top`                      | header      | `STreeNav`  | `vertical`                | header  | —                | one nav bar, collapsible via `menuProps.treeNav`      |
| `dual-vertical`            | sidebar     | `SSplitNav` | `horizontal`              | sidebar | header           | rail + nested tree, side by side                      |
| `vertical-horizontal`      | sidebar     | `SSplitNav` | `horizontal`              | header  | header           | rail in the sidebar, horizontal sub-nav in the header |
| `horizontal-vertical`      | header      | `SSplitNav` | `vertical`                | header  | sidebar bottom   | top bar in the header, tree in the sidebar            |
| `horizontal-dual-vertical` | header      | `SSplitNav` | `vertical`                | header  | sidebar bottom   | top bar in the header, rail + tree in the sidebar     |

The collapse trigger lives where the mode's first level is: the top-bar-first modes (`horizontal-vertical`, `horizontal-dual-vertical`) keep it in the bottom corner of the sidebar — right-aligned over the column it collapses, centered over that column's icon rail once the sidebar is folded — because their header already carries the first level; every other sidebar mode keeps it beside the brand in the header. `triggerVisible` hides it either way.

The two sidebar placements render the trigger only while that pane column exists: a sidebar left with nothing but a rail has nothing to collapse, so opening a branch from the top bar is what brings the trigger out. The row it sits in mirrors the columns as well — its first cell is the rail's width and carries the rail's border, so the divider runs on past the menu to the sidebar's bottom edge.

The nested panes only take space while they have something to show, and the shell asks the split-nav family which columns exist instead of guessing per mode: the sidebar of `dual-vertical` is the rail plus the tree while a first-level menu with children is active, and the rail alone otherwise; `horizontal-vertical` has no rail, so its sidebar is the tree or nothing at all. `horizontal-dual-vertical` is the one to read twice: its sidebar hosts the dual-vertical pane of the active **first-level** menu, so the rail holds that menu's children and the pane the level below them — activating a first-level leaf, or opening a menu whose children have not been opened yet, leaves the sidebar with the rail alone or with no column at all. The pane follows every menu activation rather than the value: activating a parent opens it, activating a leaf closes it, and re-activating the leaf that is already active closes it too — that activation resets the menu's path without moving `v-model`. Collapsing the sidebar folds the pane with it: the sidebar becomes the rail plus the pane's icon rail (or that icon rail alone in the rail-less mode), and the entries below the pane's own top level stay reachable from the popups the collapsed menu opens.

The rule behind the orientation column: a vertical first level keeps the sidebar full height and lets the header start beside it (`orientation="horizontal"`); a horizontal first level puts the header across the full width with the sidebar beneath it (`orientation="vertical"`). This is the inverse of the raw `SLayout` prop names, so read this table rather than guessing.

### Brand placement

`#logo` and `#title` render in one region; `logoPlacement` decides where that region goes, and the mode decides what it can line up with. The sidebar placements mirror the columns the menu renders — the mark takes the first column, the title the second — so the brand sits exactly over the rail and the pane below it instead of being padded to the sidebar.

| `mode`                     | Default placement | `sidebar` | `sidebar-bottom` | What the region lines up with                                     |
| :------------------------- | :---------------- | :-------: | :--------------: | :---------------------------------------------------------------- |
| `sidebar`                  | sidebar           |    ✅     |        ✅        | One column: mark and title share a row, centered while collapsed. |
| `top`                      | header            |    ❌     |        ❌        | No sidebar region; both fall back to the header.                  |
| `dual-vertical`            | sidebar           |    ✅     |        ✅        | The mark on the first-level rail, the title on the pane below it. |
| `vertical-horizontal`      | header            |    ⚠️     |        ❌        | The sidebar is the rail alone, so only the mark renders there.    |
| `horizontal-vertical`      | header            |    ⚠️     |        ❌        | The sidebar is the pane of the active first-level menu.           |
| `horizontal-dual-vertical` | header            |    ⚠️     |        ❌        | The sidebar hosts the columns of the active first-level menu.     |

❌ means the shell keeps the mode's default placement rather than rendering the region where it cannot stay. ⚠️ means the placement is honored, but those sidebars only have columns while the active first-level menu has children — the brand comes and goes with the menu, which is why `sidebar-bottom` is refused there: a brand pinned to a column that keeps disappearing reads as a bug, while one in the header never moves.

Three rules hold in every placement: a bottom region renders after the menu and `sidebar-end`, so it sits on the sidebar's bottom edge; the title is hidden while the sidebar is collapsed, because the pane column it aligns to is folded away; and the mark either centers in the shrunken sidebar (`sidebar`) or stays on the rail that keeps its column (`dual-vertical`).

A sidebar placement also follows the menu's own dividers: the mark cell is as wide as the first column and carries the same border, so the rail reads as one strip from the brand down through its items and into the collapse-trigger row instead of the divider stopping at either end. The columns themselves stretch to the sidebar's full height for the same reason — a divider that stops where the items do looks like a mistake.

### Architecture and benchmark comparison

| Concern           | SoybeanUI `SAppShell`                                                              | Ant Design Pro `ProLayout`               | Element Plus          | shadcn/ui                 |
| :---------------- | :--------------------------------------------------------------------------------- | :--------------------------------------- | :-------------------- | :------------------------ |
| Layer split       | Styled aggregation over the Aria `layout` family; `SLayout` still ships standalone | Single styled package                    | Single styled package | Copy-in block, no library |
| Modes             | 6 (`sidebar`, `top`, + 4 split shapes) driven by one `mode`                        | 6 (`side`/`top`/`mix` + header variants) | —                     | 1                         |
| Menu tree         | One `items` tree, rendered by `STreeMenu` / `STreeNav` / `SSplitNav` per mode      | Routes/props                             | `el-menu` config      | Composed by hand          |
| Sidebar geometry  | Derived from `mode` + `size`, aligned to the menu panes                            | Numeric props                            | Numeric props         | Hand-written CSS          |
| Brand             | `#logo` / `#title` slots, aligned to the menu columns                              | `logo` / `title` props                   | `el-aside` content    | Composed by hand          |
| Breadcrumb / tabs | `breadcrumbs` / `tabs` data props, rendered by `SBreadcrumb` / `SPageTabs`         | `menu` config + `PageContainer`          | Composed by hand      | Composed by hand          |
| Router dependency | None — data in, events out                                                         | Vue Router assumed                       | None                  | None                      |
| Overrides         | `ui` / `layoutUi` / `menuUi` + a slot per region                                   | `token` / slots                          | CSS vars              | Edit the copied source    |
| Accessibility     | Owned by the composed Aria families                                                | Package-level                            | Package-level         | Manual                    |

### Cautions

1. **The brand is yours.** There is no `logo` or `title` prop: the mark goes in `#logo`, the app name and any subtitle in `#title`. The shell renders the region and hands both slots the live `collapsed` state and the resolved `placement` so the injected content can adapt. `#title` is optional — it is hidden while the sidebar is collapsed, since the column it aligns to is folded away — and a brand without `#logo` renders no region at all.
2. **`isMobile` is declarative.** The shell never reads `matchMedia`; pass `useMediaQuery` from `@vueuse/core` (or a server-side hint). The layout, the drawer, and the trigger all follow the prop.
3. **Sidebar widths are derived — do not override them casually.** `layoutProps.sidebarWidth` / `collapsedSidebarWidth` win over the derived values, but in the split modes that breaks the alignment between the sidebar and the menu panes, and it also loses the dynamic behaviour below.
4. **Switching modes re-creates the menu.** Each mode renders a different menu instance, so the panes' expanded state (which lives inside `SSplitNav` / `STreeMenu`) resets to the active path on a mode change.
5. **The top bar is a `STreeNav`, not a plain menubar.** It selects through `modelValue` like the sidebar: activating a leaf emits `select` / `update:modelValue`, an entry with children only opens its popup, and an entry that carries `to` / `href` follows it as well. Set `menuProps.treeNav.collapsible` to fold the entries that no longer fit into a trailing "more" popup.
6. **The tab collection is mutated in place.** `SPageTabs` removes a closed tab and flips `pinned` by mutating the `tabs` array it is given; `update:tabs` only fires for bulk operations (close others/all) and drag reorders. Keep the collection reactive (a deep `ref`, not `shallowRef`) and use `tabClose` / `tabPin` when you need to observe those actions.
7. **A collapsed sidebar folds the nested pane with it.** The rail keeps its width, the pane collapses to its icon rail, and the sidebar takes exactly those columns — nothing overlays the content. The folded menu keeps its own behaviour: leaves show tooltips and branches open their flyout popup, so the hierarchy stays reachable at every level. A menu tree that has to stay readable at a glance should keep the sidebar open and let the pane take a column. The collapse trigger follows the same skeleton: the top-bar-first modes keep it in the sidebar's bottom corner — and only while the pane column is there to collapse — right-aligned over the pane and centered over that column once it folds, while every other mode keeps it in the header.
8. **Sidebar content sits outside a landmark.** The layout sidebar region is a plain element with no landmark role, so content injected around the menu (brand, `sidebar-start`, `sidebar-end`) is not inside a landmark. Wrap it in your own landmark if you run an accessibility audit.
9. **The active menu is controlled — there is no initial-value prop.** The shell derives its sidebar geometry and breadcrumb from the value before it renders, so it reads the value it is given instead of keeping one of its own. Bind `v-model` (or pass `modelValue` and handle `update:modelValue`): with no value the shell shows no active menu, an empty breadcrumb, and a sidebar with none of its pane columns.
10. **The menu expands along the route by default.** `expandStrategy` defaults to `selected`: only the chain the active menu sits in stays expanded, so a branch you opened and then navigated away from closes instead of piling up in the pane. Pass `expand-strategy="keep"` when manual expansions have to survive navigation, or set it per renderer through `menuProps.tree` / `menuProps.split` when only one of them should differ — those take precedence over the shell prop. The `top` mode renders `STreeNav`, which has no expand strategy, so the prop never reaches its markup.
11. **The brand follows the columns, and only two modes can pin it to the bottom.** In the sidebar placements the mark takes the first column the menu renders and the title the second, so they line up with the rail and the pane below them; a column that does not exist drops its cell, which is why the title is hidden whenever the sidebar shows no pane (nothing opened yet, or collapsed). `sidebar-bottom` additionally needs a sidebar that is always a column of its own — `sidebar` and `dual-vertical` support it, every other mode keeps its default placement instead of pinning the brand where it would come and go with the menu. See [Brand placement](#brand-placement).

## FAQ

### How do I keep the breadcrumb in sync with the route?

Keep `v-model` in sync with the route and the breadcrumb follows on its own: it is derived from `items` plus the active value, so the trail, the labels, and the dropdowns all come from one menu tree. When the trail has to differ from the menu — permission-trimmed routes, a title that is not the menu label — pass your own `breadcrumbs` and the shell renders that data instead. `breadcrumbClick` reports crumb activation, while picking an entry in an ancestor dropdown behaves exactly like that entry in the menu: one with children opens its own submenu, and a leaf emits `select` / `update:modelValue`.

### Why does the sidebar change width when I open another menu?

Because the nested pane is part of the sidebar only while it exists. A first-level menu without children has no pane to show, so the sidebar falls back to its rail; activating a menu with children widens it again. The collapsed sidebar follows the same rule with the pane folded: the rail plus the pane's icon rail, or the rail alone when there is nothing to show. Overriding `layoutProps.sidebarWidth` gives a constant width and loses that behaviour.

### Why does the branch I opened close when I navigate?

Because the menu follows the route by default. `expandStrategy` is `selected`, so the expanded set is replaced by the chain the active menu sits in as soon as the selection changes: the pane stays aligned with the current page instead of accumulating the branches of a long session. Pass `expand-strategy="keep"` to let a branch you opened by hand survive navigation:

```vue
<SAppShell v-model="active" expand-strategy="keep" :items="items" />
```

Either way the chain of the active menu is expanded on mount and whenever the value moves from outside — a route change driving `v-model`, for example — so the current page never goes out of sight. The strategy reaches the nested `STreeMenu` (`sidebar` mode) and the split panes; `top` mode renders a `STreeNav` with no branches to expand, so it has no effect there.

### How do I pin the brand to the bottom of the sidebar?

Set `logo-placement="sidebar-bottom"` in a mode that supports it (`sidebar` or `dual-vertical`). The region renders after the menu and after `sidebar-end`, and the menu region grows to fill the sidebar, so the brand lands on the bottom edge:

```vue
<SAppShell v-model="active" mode="sidebar" logo-placement="sidebar-bottom" :items="items" />
```

Everything else about the brand stays the same: the mark and the title still line up with the columns above them, the title still hides when the sidebar is collapsed, and the mark still centers in the shrunken sidebar — or stays on the rail in `dual-vertical`. The other modes keep their default placement, which the [Brand placement](#brand-placement) table spells out per mode.

### Why does the brand title disappear?

Because the title's cell is a sidebar column like any other: it takes the width of the nested pane, and the pane column only exists while a first-level menu with children is open and the sidebar is expanded. With nothing opened yet, or with the sidebar collapsed (the pane folds into its icon rail), there is no column for the title to align to, so the shell drops the cell instead of reserving width the sidebar does not take. The mark always stays — it aligns to the first-level rail, which is the column that survives.

### How do I make the sidebar narrower or wider?

Set `layoutProps.sidebarWidth` / `collapsedSidebarWidth` for the `sidebar` mode. In the split modes leave them alone: the widths are computed from the pane metrics of the active `size`, and overriding them desynchronises the sidebar from the menu.

### How do I keep the top bar in sync with the route?

The same way as the sidebar: keep `v-model` in sync and the bar highlights the active entry, including through nested levels — an ancestor whose child is active is marked as well. Entries with `to` / `href` navigate as well as report, so a routed app can either let the router drive `v-model` or rely on the activation the shell reports.

### How do I add a page header or a footer above the tabs?

The `#header` slot replaces the header's center region (the `#header-start` / `#header-end` slots cover the leading and trailing regions), and the `#footer` slot fills the footer. For a page-level header inside the content, compose `SCard` or a plain header in the default slot — there is no page-header region in the shell.

### How do I replace the menu entirely?

Use the `#menu` slot. It replaces the menu instance, not the mount targets: the shell still renders the region and the teleport targets, and the slot receives `headerMountId` / `sidebarMountId` so your own `SSplitNav` can target them.
