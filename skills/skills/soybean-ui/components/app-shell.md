# AppShell

Source URL: https://ui.soybeanjs.cn/components/app-shell
Markdown URL: https://ui.soybeanjs.cn/components/app-shell.md
Category: Layout
Description: An aggregated application shell that assembles the layout regions, menu, breadcrumb, page tabs, brand, and footer from props and slots.

## Overview

`SAppShell` is an aggregated application shell for admin-style applications. A single `mode`, one menu tree, and a handful of props assemble the whole shell: the layout regions (sidebar, header, tabs, content, footer) plus everything that fills them — navigation, breadcrumb, page tabs, brand, and footer.

Use it when an application needs a persistent shell around routed pages — a sidebar or top-bar navigation, a breadcrumb in the header, a page-tab strip, and a footer — without writing the wiring yourself. Prefer the primitives (`SLayout`, `SSplitNav`, `STreeMenu`, `SNavMenu`, `SPageTabs`, `SBreadcrumb`) when the composition does not fit; the Layout Composition demo shows the same shell assembled by hand.

`SAppShell` is the aggregation layer of the layout family. It owns one thing the primitives cannot: the **mode skeleton** — which layout orientation, which menu renderer, which region each menu pane is mounted into, and the sidebar widths those panes require. Everything else stays in the family it belongs to: `SLayout` renders the regions, `SSplitNav` / `STreeMenu` / `SNavMenu` render the menu, `SBreadcrumb` and `SPageTabs` render their own bars.

Like `SLayout`, the shell is router-agnostic: it takes a menu tree, breadcrumb items, and tab items as data and reports interactions back through events. Routing, permissions, tab collections, and cache policy stay in the host, and the [playground examples](#demos) show the wiring.

## Usage

Usage examples for app-shell are rendered on the site.

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

Interactive demos for app-shell are rendered on the site.

## API

Structured API summary generated from build-time component metadata.

- Exported symbols (3): AppShell, AppShellLogo, AppShellMenu.

### AppShell

#### Props

Properties for the AppShell component.

- `class`: Additional class names applied to the shell root element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<UiClass<AppShellUiSlot>>`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; default `'md'`; optional)
- `mode`: Shell skeleton, driving both the layout regions and the menu shape. (type `AppShellMode`; default `'sidebar'`; optional)
- `side`: Side the sidebar is placed on. (type `import("@soybeanjs/headless").HorizontalSide`; default `'left'`; optional)
- `open`: The controlled expanded state of the sidebar. Can be bound with `v-model:open`. (type `boolean`; optional)
- `defaultOpen`: The expanded state of the sidebar when initially rendered. (type `boolean`; default `true`; optional)
- `isMobile`: Whether the shell is in mobile view. Declarative — pair it with `useMediaQuery` from `@vueuse/core` or a server-side detection. (type `boolean`; default `false`; optional)
- `layoutProps`: Properties forwarded to `SLayout`. Shell-owned options (`open`, `orientation`, `sidebarVisible`, `isMobile`, `pxToRem`) are derived from `mode`; `sidebarWidth` and `collapsedSidebarWidth` default to the widths the mode requires — override them only when the menu panes do not need to line up. (type `Omit<LayoutCompactProps, 'open' | 'defaultOpen' | 'class' | 'pxToRem' | 'orientation' | 'sidebarVisible' | 'isMobile'>`; optional)
- `layoutUi`: Per-slot class overrides for the internal `SLayout`. Takes precedence over the shell's `layout*` UI slots. (type `Partial<LayoutUi>`; optional)
- `logoPlacement`: Placement of the logo slot. (type `AppShellLogoPlacement`; default `'auto'`; optional)
- `items`: Menu tree rendered by the shell. (type `AppShellMenuItem[]`; required)
- `modelValue`: The controlled active menu value. Can be bound with `v-model`. (type `string`; optional)
- `defaultValue`: The active menu value when initially rendered. (type `string`; optional)
- `menuProps`: Properties forwarded to the rendered menu. (type `AppShellMenuProps`; optional)
- `menuUi`: Per-slot class overrides forwarded to the rendered menu. (type `AppShellMenuUi`; optional)
- `breadcrumbs`: Breadcrumb items rendered in the header. Omit it to derive the breadcrumb from `items` and the active value: the trail from the root menu down to the active item, where every ancestor whose menu has children opens a dropdown of those children. Provide it to render a plain breadcrumb from your own data instead. (type `BreadcrumbOptionData[]`; optional)
- `breadcrumbVisible`: Whether the breadcrumb region renders when the trail is not empty. (type `boolean`; default `true`; optional)
- `breadcrumbProps`: Properties forwarded to `SBreadcrumb`. (type `Omit<BreadcrumbCompactProps<BreadcrumbOptionData>, 'items'>`; optional)
- `breadcrumbUi`: Per-slot class overrides for `SBreadcrumb`. (type `Partial<BreadcrumbUi>`; optional)
- `tabs`: Page tabs rendered in the tab region. (type `PageTabsOptionData[]`; optional)
- `tabValue`: The controlled active tab value. Can be bound with `v-model:tabValue`. (type `string`; optional)
- `tabProps`: Properties forwarded to `SPageTabs`. (type `Omit<PageTabsCompactProps<PageTabsOptionData>, 'modelValue' | 'defaultValue' | 'items'>`; optional)
- `tabUi`: Per-slot class overrides for `SPageTabs`. (type `Partial<PageTabsUi>`; optional)
- `triggerVisible`: Whether the sidebar trigger renders in the header. (type `boolean`; default `true`; optional)

#### Emits

Events for the AppShell component.

- `update:open`: Emitted when the sidebar expanded state changes. (type `[open: boolean]`; parameters `open: boolean`)
- `update:modelValue`: Emitted when the active menu value changes. (type `[value: string]`; parameters `value: string`)
- `select`: Emitted when a menu leaf is selected. (type `[key: string, event?: Event | undefined]`; parameters `key: string, event?: Event | undefined`)
- `open`: Emitted when a menu parent opens its nested pane. (type `[item: AppShellMenuItem, event?: Event | undefined]`; parameters `item: AppShellMenuItem, event?: Event | undefined`)
- `update:tabValue`: Emitted when the active tab changes. (type `[value: string]`; parameters `value: string`)
- `update:tabs`: Emitted when the tab collection changes (close, pin, drag reorder). (type `[tabs: PageTabsOptionData[]]`; parameters `tabs: PageTabsOptionData[]`)
- `tabClick`: Emitted when a tab is clicked. (type `[tab: PageTabsOptionData]`; parameters `tab: PageTabsOptionData`)
- `tabClose`: Emitted when a tab is closed. (type `[tab: PageTabsOptionData]`; parameters `tab: PageTabsOptionData`)
- `tabPin`: Emitted when a tab is pinned or unpinned. (type `[tab: PageTabsOptionData]`; parameters `tab: PageTabsOptionData`)
- `tabContextmenu`: Emitted when the tab context menu target changes. (type `[tab: PageTabsOptionData]`; parameters `tab: PageTabsOptionData`)
- `tabSelectContextMenu`: Emitted when a tab context menu item is selected. (type `[menu: PageTabsContextMenuOptionData, tab: PageTabsOptionData]`; parameters `menu: PageTabsContextMenuOptionData, tab: PageTabsOptionData`)
- `tabDragStart`: Emitted when dragging a tab starts. (type `[tab: PageTabsDragEvent<PageTabsOptionData>]`; parameters `tab: PageTabsDragEvent<PageTabsOptionData>`)
- `tabDragMove`: Emitted while a tab is being dragged. (type `[tab: PageTabsDragEvent<PageTabsOptionData>]`; parameters `tab: PageTabsDragEvent<PageTabsOptionData>`)
- `tabDragReorder`: Emitted when the dragged tab is reordered in place. (type `[tab: PageTabsDragEvent<PageTabsOptionData>]`; parameters `tab: PageTabsDragEvent<PageTabsOptionData>`)
- `tabDragEnd`: Emitted when dragging a tab ends. (type `[tab: PageTabsDragEvent<PageTabsOptionData>]`; parameters `tab: PageTabsDragEvent<PageTabsOptionData>`)
- `breadcrumbClick`: Emitted when a breadcrumb item is clicked. (type `[item: BreadcrumbOptionData]`; parameters `item: BreadcrumbOptionData`)

#### Slots

Slots for the AppShell component.

- `default`: Custom content for the default slot — the page content. (type `(() => any) | undefined`)
- `logo`: Custom content for the brand region. The shell renders no logo of its own: the app title and its description belong to the injected content. (type `((props: AppShellLogoSlotProps) => any) | undefined`)
- `sidebar-start`: Custom content rendered at the top of the sidebar. (type `(() => any) | undefined`)
- `sidebar-end`: Custom content rendered at the bottom of the sidebar. (type `(() => any) | undefined`)
- `menu`: Custom content for the menu. Replaces the menu instance, not the mount targets. (type `((props: AppShellMenuSlotProps) => any) | undefined`)
- `header-start`: Custom content for the header leading region. (type `(() => any) | undefined`)
- `header`: Custom content for the header center region. (type `(() => any) | undefined`)
- `header-end`: Custom content for the header trailing region. (type `(() => any) | undefined`)
- `breadcrumb`: Custom content for the breadcrumb region. (type `((props: { items: BreadcrumbOptionData[]; }) => any) | undefined`)
- `tabs`: Custom content for the tab region. (type `(() => any) | undefined`)
- `footer`: Custom content for the footer region. (type `(() => any) | undefined`)

### AppShellLogo

#### Slot Props

Slot properties of the logo slot.

- `collapsed`: Whether the shell is collapsed. (type `boolean`; required)
- `placement`: Region the logo is rendered in. (type `'header' | 'sidebar'`; required)

### AppShellMenu

#### Props

Per-renderer props forwarded by the shell to the menu it renders.

- `tree`: Forwarded to the nested `STreeMenu` (`sidebar` mode). (type `Omit<TreeMenuCompactProps<import("@soybeanjs/headless").TreeMenuBaseOptionData>, 'modelValue' | 'defaultValue' | 'ite...`; optional)
- `split`: Forwarded to `SSplitNav` (the four split modes). (type `Omit<SplitNavRootProps<SplitNavBaseOptionData>, 'modelValue' | 'defaultValue' | 'as' | 'class' | 'items' | 'collapsed...`; optional)
- `nav`: Forwarded to `SNavMenu` (`top` mode). (type `Omit<NavMenuCompactProps, 'modelValue' | 'defaultValue' | 'class' | 'items'>`; optional)

#### Slot Props

Slot properties of the menu slot.

- `mode`: Current shell mode. (type `'sidebar' | 'top' | SplitNavMode`; required)
- `collapsed`: Whether the sidebar is collapsed. (type `boolean`; required)
- `collapsedWidth`: Collapsed width of the sidebar, in pixels. (type `number`; required)
- `side`: Side the sidebar is placed on. (type `'right' | 'left'`; required)
- `headerMountId`: Id of the header element the horizontal pane mounts into, when the mode teleports it. (type `string | undefined`; required)
- `sidebarMountId`: Id of the sidebar element the vertical pane mounts into, when the mode teleports it. (type `string | undefined`; required)

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
