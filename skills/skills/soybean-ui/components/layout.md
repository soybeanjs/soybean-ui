# Layout

Source URL: https://ui.soybeanjs.cn/components/layout
Markdown URL: https://ui.soybeanjs.cn/components/layout.md
Category: Layout
Description: The layout component structure for admin dashboards or complex applications. It manages sidebar, header, footer, tabs, and main content areas.

## Overview

The layout component structure for admin dashboards or complex applications. It manages sidebar, header, footer, tabs, and main content areas.

## Features

- **One unified layout** — `SLayout` combines the modern sidebar shell with admin-classic capabilities: scrollable wrapper, fixed header/footer, and orientation support.
- **Three variants** — `sidebar` (bordered), `floating` (rounded shadow), and `inset` (content with margin and rounded corners).
- **Collapsible sidebar** — `collapsible="icon"` collapses the sidebar to a rail width; `collapsible="offcanvas"` slides it off-canvas while preserving layout space.
- **Side control** — `side="left"` or `side="right"` flips the sidebar position with full RTL-aware logical properties.
- **Mobile drawer** — `isMobile` swaps the desktop sidebar for a `Dialog`-based drawer with overlay and focus trap.
- **Slot-level overrides** — every region (sidebar, header, tab, content, footer) accepts per-slot `*Props` for granular attribute forwarding.
- **CSS-variable driven** — dimensions (`sidebarWidth`, `headerHeight`, `tabHeight`, `footerHeight`) emit rem-based CSS variables for runtime customization.
- **Size scaling** — `size` (xs…2xl) scales the layout spacing and base typography through `themeSizeRatio`.
- **`fullContent` mode** — pins the content area to fill the viewport while keeping the tab bar above it.
- **Orientation** — `Layout` supports horizontal (sidebar beside content) and vertical (sidebar stacked under header) orientations.
- **Scroll behaviors** — `scrollBehavior="content"` scrolls only the content region; `scrollBehavior="wrapper"` scrolls the entire main wrapper.
- **Fixed header/footer** — `fixedTop` and `fixedFooter` keep the header/footer pinned during content scroll, with automatic placeholder elements to prevent overlap.
- **Base z-index control** — `baseZIndex` derives the stacking order of sidebar, header, tab, and footer so multiple layouts compose predictably.
- **Headless composition** — every region (`LayoutRoot`, `LayoutSidebar`, `LayoutRail`, `LayoutHeader`, `LayoutTab`, `LayoutContent`, `LayoutFooter`, `LayoutMobile`, `LayoutTrigger`) is exported from `@soybeanjs/headless/layout` for custom styled builds.
- **SSR safe** — no `window`/`document` access in setup; `useId()` generates stable scroll ids for server rendering.

## Usage

Usage examples for layout are rendered on the site.

## Demos

Interactive demos for layout are rendered on the site.

## API

Structured API summary generated from build-time component metadata.

- Exported symbols (12): Layout, LayoutCompact, LayoutContent, LayoutFooter, LayoutHeader, LayoutMain, LayoutMobile, LayoutRail, LayoutRoot, LayoutSidebar, LayoutTab, LayoutTrigger.

### Layout

#### Props

Properties for the Layout component.

- `class`: Additional class names applied to the root element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<LayoutUi>`; optional)
- `open`: The controlled open state of the layout. Can be bound with `v-model`. (type `boolean`; optional)
- `defaultOpen`: The open state of the layout when it is initially rendered. Use when you do not need to control its open state. (type `boolean`; optional)
- `side`: The side of the layout. (type `HorizontalSide`; optional)
- `variant`: The variant of the layout. (type `LayoutVariant`; optional)
- `collapsible`: The collapsible state of the layout. (type `LayoutCollapsible`; optional)
- `sidebarVisible`: whether to show the sidebar. (type `boolean`; default `true`; optional)
- `sidebarWidth`: The width of the sidebar. (px) (type `number`; default `240`; optional)
- `collapsedSidebarWidth`: The width of the sidebar when it is collapsed. (px) (type `number`; default `50`; optional)
- `isMobile`: Whether the layout is in mobile view. (type `boolean`; default `false`; optional)
- `mobileSidebarWidth`: The width of the sidebar in the mobile view. (px) (type `number`; default `240`; optional)
- `headerVisible`: whether to show the header. (type `boolean`; default `true`; optional)
- `headerHeight`: The height of the header. (px) (type `number`; default `56`; optional)
- `tabVisible`: whether to show the tab. (type `boolean`; default `true`; optional)
- `tabHeight`: The height of the tab. (px) (type `number`; default `44`; optional)
- `footerVisible`: whether to show the footer. (type `boolean`; default `true`; optional)
- `footerHeight`: The height of the footer. (px) (type `number`; default `48`; optional)
- `fullContent`: whether the content takes the full height of the layout (include). (type `boolean`; default `false`; optional)
- `pxToRem`: The function to convert pixels to rem. (type `((px: number) => number)`; default `(px: number) => px / 16 (16 is the base font size)`; optional)
- `orientation`: Orientation of the component. (type `DataOrientation`; optional)
- `scrollBehavior`: Scroll behavior. (type `LayoutScrollBehavior`; optional)
- `scrollId`: Scroll id. (type `string`; optional)
- `baseZIndex`: The base z-index of the layout. The z-index of the sidebar, header, tab, footer, and their fixed versions will be calculated based on this value. (type `number`; default `50`; optional)
- `fixedTop`: Whether the header and tab are fixed to the top of the layout when the orientation is vertical. If true, the header and tab will be fixed to the top of the layout when the orientation is vertical, and will scroll with the content when the orientation is horizontal. (type `boolean`; default `true`; optional)
- `fixedFooter`: Whether footer is fixed (type `boolean`; default `true`; optional)
- `stretchFooter`: Whether the footer should stretch to the full width of the layout or the content when layout orientation is vertical. (type `boolean`; default `true`; optional)
- `sidebarProps`: No description. (type `LayoutSidebarProps`; optional)
- `railProps`: No description. (type `LayoutRailProps`; optional)
- `mainProps`: No description. (type `LayoutMainProps`; optional)
- `headerProps`: No description. (type `LayoutHeaderProps`; optional)
- `tabProps`: No description. (type `LayoutTabProps`; optional)
- `contentProps`: No description. (type `LayoutContentProps`; optional)
- `footerProps`: No description. (type `LayoutFooterProps`; optional)
- `mobileProps`: No description. (type `LayoutMobileProps`; optional)

#### Emits

Events for the Layout component.

- `update:open`: Emitted when the open state changes. (type `[open: boolean]`; parameters `open: boolean`)

#### Slots

Slots for the Layout component.

- `default`: Custom content for the default slot. (type `(() => any) | undefined`)
- `sidebar`: Custom content for the sidebar slot. (type `((props: { open: boolean | undefined; collapsedSidebarWidth: number; }) => any) | undefined`)
- `header`: Custom content for the header slot. (type `(() => any) | undefined`)
- `tab`: Custom content for the tab slot. (type `(() => any) | undefined`)
- `content`: Custom content for the content slot. (type `(() => any) | undefined`)
- `footer`: Custom content for the footer slot. (type `(() => any) | undefined`)

### LayoutCompact

#### Props

Properties for the LayoutCompact component.

- `open`: The controlled open state of the layout. Can be bound with `v-model`. (type `boolean`; optional)
- `defaultOpen`: The open state of the layout when it is initially rendered. Use when you do not need to control its open state. (type `boolean`; optional)
- `side`: The side of the layout. (type `HorizontalSide`; optional)
- `variant`: The variant of the layout. (type `LayoutVariant`; optional)
- `collapsible`: The collapsible state of the layout. (type `LayoutCollapsible`; optional)
- `sidebarVisible`: whether to show the sidebar. (type `boolean`; default `true`; optional)
- `sidebarWidth`: The width of the sidebar. (px) (type `number`; default `240`; optional)
- `collapsedSidebarWidth`: The width of the sidebar when it is collapsed. (px) (type `number`; default `50`; optional)
- `isMobile`: Whether the layout is in mobile view. (type `boolean`; default `false`; optional)
- `mobileSidebarWidth`: The width of the sidebar in the mobile view. (px) (type `number`; default `240`; optional)
- `headerVisible`: whether to show the header. (type `boolean`; default `true`; optional)
- `headerHeight`: The height of the header. (px) (type `number`; default `56`; optional)
- `tabVisible`: whether to show the tab. (type `boolean`; default `true`; optional)
- `tabHeight`: The height of the tab. (px) (type `number`; default `44`; optional)
- `footerVisible`: whether to show the footer. (type `boolean`; default `true`; optional)
- `footerHeight`: The height of the footer. (px) (type `number`; default `48`; optional)
- `fullContent`: whether the content takes the full height of the layout (include). (type `boolean`; default `false`; optional)
- `pxToRem`: The function to convert pixels to rem. (type `((px: number) => number)`; default `(px: number) => px / 16 (16 is the base font size)`; optional)
- `orientation`: Orientation of the component. (type `DataOrientation`; optional)
- `scrollBehavior`: Scroll behavior. (type `LayoutScrollBehavior`; optional)
- `scrollId`: Scroll id. (type `string`; optional)
- `baseZIndex`: The base z-index of the layout. The z-index of the sidebar, header, tab, footer, and their fixed versions will be calculated based on this value. (type `number`; default `50`; optional)
- `fixedTop`: Whether the header and tab are fixed to the top of the layout when the orientation is vertical. If true, the header and tab will be fixed to the top of the layout when the orientation is vertical, and will scroll with the content when the orientation is horizontal. (type `boolean`; default `true`; optional)
- `fixedFooter`: Whether footer is fixed (type `boolean`; default `true`; optional)
- `stretchFooter`: Whether the footer should stretch to the full width of the layout or the content when layout orientation is vertical. (type `boolean`; default `true`; optional)
- `sidebarProps`: No description. (type `LayoutSidebarProps`; optional)
- `railProps`: No description. (type `LayoutRailProps`; optional)
- `mainProps`: No description. (type `LayoutMainProps`; optional)
- `headerProps`: No description. (type `LayoutHeaderProps`; optional)
- `tabProps`: No description. (type `LayoutTabProps`; optional)
- `contentProps`: No description. (type `LayoutContentProps`; optional)
- `footerProps`: No description. (type `LayoutFooterProps`; optional)
- `mobileProps`: No description. (type `LayoutMobileProps`; optional)

#### Emits

Events for the LayoutCompact component.

- `update:open`: Emitted when the open state changes. (type `[open: boolean]`; parameters `open: boolean`)

#### Slots

Slots for the LayoutCompact component.

- `default`: Custom content for the default slot. (type `(() => any) | undefined`)
- `sidebar`: Custom content for the sidebar slot. (type `((props: { open: boolean | undefined; collapsedSidebarWidth: number; }) => any) | undefined`)
- `header`: Custom content for the header slot. (type `(() => any) | undefined`)
- `tab`: Custom content for the tab slot. (type `(() => any) | undefined`)
- `content`: Custom content for the content slot. (type `(() => any) | undefined`)
- `footer`: Custom content for the footer slot. (type `(() => any) | undefined`)

### LayoutContent

- No documented props, emits, slots, or slot props were available.

### LayoutFooter

- No documented props, emits, slots, or slot props were available.

### LayoutHeader

- No documented props, emits, slots, or slot props were available.

### LayoutMain

- No documented props, emits, slots, or slot props were available.

### LayoutMobile

- No documented props, emits, slots, or slot props were available.

### LayoutRail

- No documented props, emits, slots, or slot props were available.

### LayoutRoot

#### Props

Properties for the LayoutRoot component.

- `open`: The controlled open state of the layout. Can be bound with `v-model`. (type `boolean`; optional)
- `defaultOpen`: The open state of the layout when it is initially rendered. Use when you do not need to control its open state. (type `boolean`; optional)
- `side`: The side of the layout. (type `HorizontalSide`; optional)
- `variant`: The variant of the layout. (type `LayoutVariant`; optional)
- `collapsible`: The collapsible state of the layout. (type `LayoutCollapsible`; optional)
- `sidebarVisible`: whether to show the sidebar. (type `boolean`; default `true`; optional)
- `sidebarWidth`: The width of the sidebar. (px) (type `number`; default `240`; optional)
- `collapsedSidebarWidth`: The width of the sidebar when it is collapsed. (px) (type `number`; default `50`; optional)
- `isMobile`: Whether the layout is in mobile view. (type `boolean`; default `false`; optional)
- `mobileSidebarWidth`: The width of the sidebar in the mobile view. (px) (type `number`; default `240`; optional)
- `headerVisible`: whether to show the header. (type `boolean`; default `true`; optional)
- `headerHeight`: The height of the header. (px) (type `number`; default `56`; optional)
- `tabVisible`: whether to show the tab. (type `boolean`; default `true`; optional)
- `tabHeight`: The height of the tab. (px) (type `number`; default `44`; optional)
- `footerVisible`: whether to show the footer. (type `boolean`; default `true`; optional)
- `footerHeight`: The height of the footer. (px) (type `number`; default `48`; optional)
- `fullContent`: whether the content takes the full height of the layout (include). (type `boolean`; default `false`; optional)
- `pxToRem`: The function to convert pixels to rem. (type `((px: number) => number)`; default `(px: number) => px / 16 (16 is the base font size)`; optional)
- `orientation`: Orientation of the component. (type `DataOrientation`; optional)
- `scrollBehavior`: Scroll behavior. (type `LayoutScrollBehavior`; optional)
- `scrollId`: Scroll id. (type `string`; optional)
- `baseZIndex`: The base z-index of the layout. The z-index of the sidebar, header, tab, footer, and their fixed versions will be calculated based on this value. (type `number`; default `50`; optional)
- `fixedTop`: Whether the header and tab are fixed to the top of the layout when the orientation is vertical. If true, the header and tab will be fixed to the top of the layout when the orientation is vertical, and will scroll with the content when the orientation is horizontal. (type `boolean`; default `true`; optional)
- `fixedFooter`: Whether footer is fixed (type `boolean`; default `true`; optional)
- `stretchFooter`: Whether the footer should stretch to the full width of the layout or the content when layout orientation is vertical. (type `boolean`; default `true`; optional)

#### Emits

Events for the LayoutRoot component.

- `update:open`: Emitted when the open state changes. (type `[open: boolean]`; parameters `open: boolean`)

### LayoutSidebar

- No documented props, emits, slots, or slot props were available.

### LayoutTab

- No documented props, emits, slots, or slot props were available.

### LayoutTrigger

#### Props

Properties for the LayoutTrigger component.

- `type`: The type of the button element. Can be one of 'button', 'submit', or 'reset'. (type `ButtonType`; default `'button'`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

## Notes

### Architecture and benchmark comparison

| Concern                      | SoybeanUI                                                                                      | Ant Design `Layout`/`Header`/`Sider`/`Content`/`Footer` | Element Plus `ElContainer`/`ElHeader`/`ElAside`/`ElMain`/`ElFooter` |
| :--------------------------- | :--------------------------------------------------------------------------------------------- | :------------------------------------------------------ | :------------------------------------------------------------------ |
| Headless / styled separation | ✅ `@soybeanjs/headless/layout` ships logic + structure; `@soybeanjs/ui` ships `scv()` recipes | ❌ single styled package                                | ❌ single styled package                                            |
| Sidebar variants             | `sidebar` / `floating` / `inset`                                                               | `sider` only                                            | `aside` only                                                        |
| Collapsible modes            | `icon` (rail) + `offcanvas` (slide out)                                                        | `collapsible` + `collapsedWidth`                        | —                                                                   |
| Mobile drawer                | built-in `Dialog`-based drawer (`isMobile` prop)                                               | requires `Drawer` composition                           | requires `Drawer` composition                                       |
| Fixed header/footer          | `Layout` with `fixedTop` / `fixedFooter` + automatic placeholders                              | requires manual sticky CSS                              | requires manual sticky CSS                                          |
| Orientation                  | `Layout` `orientation="horizontal" \| "vertical"`                                              | —                                                       | —                                                                   |
| Scroll behavior              | `wrapper` / `content` on `Layout`                                                              | —                                                       | —                                                                   |
| CSS-variable dimensions      | `--soybean-sidebar-width`, `--soybean-layout-header-height`, etc.                              | inline width on `Sider`                                 | inline width on `Aside`                                             |
| RTL support                  | logical properties (`start-*`, `end-*`, `ps-*`, `pe-*`) + `rtl:` variants on rail              | —                                                       | —                                                                   |
| Z-index orchestration        | `baseZIndex` derives sidebar/header/tab/footer z-index                                         | manual                                                  | manual                                                              |
| Region visibility            | `sidebarVisible` / `headerVisible` / `tabVisible` / `footerVisible` props                      | remove the component                                    | remove the component                                                |

### Runtime considerations

1. **CSS variables are rem-based** — `sidebarWidth`, `collapsedSidebarWidth`, `headerHeight`, `tabHeight`, `footerHeight`, and `mobileSidebarWidth` are converted via `pxToRem` (default `px / 16`). Pass a custom `pxToRem` to align with a non-default root font size.
2. **`size` scales spacing and typography** — the UI wrapper multiplies pixel dimensions by `themeSizeRatio[size] / themeSizeMap.md`, so `size="xs"` shrinks both text and sidebar width proportionally.
3. **Mobile detection is declarative** — `isMobile` is a prop (not internal logic). Pair it with `@vueuse/core`'s `useMediaQuery` or a server-side detection to toggle the drawer.
4. **`LayoutTrigger` vs `LayoutRail`** — `LayoutTrigger` is a focusable button in the header for keyboard users; `LayoutRail` is the edge drag affordance with `tabindex="-1"` (click-only). Both reflect `aria-expanded`.
5. **`Layout` placeholder elements** — when `fixedTop` or `fixedFooter` is enabled, `LayoutPlaceholder` renders empty spacer divs (`data-soybean-layout-{header|tab|footer}-placeholder`) to prevent content from sliding under the fixed region.
6. **`scrollId` for scroll restoration** — `Layout` generates a stable `soybean-layout-scroll-{id}` on the scrolling element (wrapper or content depending on `scrollBehavior`). Pass `scrollId` to make it deterministic across SSR/CSR.

## FAQ

### Which layout mode should I use?

Use `SLayout` for both modern application shells and admin dashboards. It handles fixed header/footer, orientation switching (`horizontal` / `vertical`), and wrapper-level scrolling with placeholder spacers through a single unified component.

### How do I control the sidebar open state?

Use `v-model:open` (controlled) or `default-open` (uncontrolled). The state is reflected on the root via `data-state="expanded|collapsed"` and on `LayoutTrigger`/`LayoutRail` via `aria-expanded`.

### How do I make the sidebar collapse to icons instead of sliding away?

Set `collapsible="icon"` (default) and `collapsedSidebarWidth` to the rail width. The sidebar shrinks to the collapsed width and the `sidebarGapHandler` adjusts the main area accordingly. Use `collapsible="offcanvas"` to slide the sidebar off-canvas instead.

### How does mobile mode work?

Pass `isMobile` to swap the desktop sidebar for a `Dialog`-based drawer. The drawer inherits `mobileSidebarWidth` and reuses the same `sidebar` slot content. The drawer overlay and focus trap are provided by the underlying `Dialog` component.

### Can I render the sidebar on the right?

Yes — set `side="right"`. The layout uses RTL-aware logical properties (`start-*`, `end-*`, `border-s`, `border-e`) so the sidebar, gap handler, rail cursor, and fixed header/footer insets all flip correctly.

### How are z-index values coordinated?

`Layout` accepts a `baseZIndex` (default `50`). The sidebar, header, tab, and footer z-index values are derived from this base so they stack predictably. The derived values are exposed as `--soybean-layout-{sidebar|header|tab|footer}-z-index` CSS variables.

### How do I customize region-level attributes?

Each region accepts a `*Props` prop on the compact component (e.g. `sidebarProps`, `headerProps`, `tabProps`, `contentProps`, `footerProps`, `mainProps`, `railProps`, `mobileProps`). These are forwarded to the corresponding headless region component.
