# Layout

## Overview

The layout component structure for admin dashboards or complex applications. It manages sidebar, header, footer, tabs, and main content areas.

## Features

- **Two layout modes** — `SLayout` (modern sidebar + main flow) and `SLayoutClassic` (admin-classic with scrollable wrapper, fixed header/footer, and orientation support).
- **Three variants** — `sidebar` (bordered), `floating` (rounded shadow), and `inset` (content with margin and rounded corners).
- **Collapsible sidebar** — `collapsible="icon"` collapses the sidebar to a rail width; `collapsible="offcanvas"` slides it off-canvas while preserving layout space.
- **Side control** — `side="left"` or `side="right"` flips the sidebar position with full RTL-aware logical properties.
- **Mobile drawer** — `isMobile` swaps the desktop sidebar for a `Dialog`-based drawer with overlay and focus trap.
- **Slot-level overrides** — every region (sidebar, header, tab, content, footer) accepts per-slot `*Props` for granular attribute forwarding.
- **CSS-variable driven** — dimensions (`sidebarWidth`, `headerHeight`, `tabHeight`, `footerHeight`) emit rem-based CSS variables for runtime customization.
- **Size scaling** — `size` (xs…2xl) scales the layout spacing and base typography through `themeSizeRatio`.
- **`fullContent` mode** — pins the content area to fill the viewport while keeping the tab bar above it.
- **Classic orientation** — `LayoutClassic` supports horizontal (sidebar beside content) and vertical (sidebar stacked under header) orientations.
- **Classic scroll behaviors** — `scrollBehavior="content"` scrolls only the content region; `scrollBehavior="wrapper"` scrolls the entire main wrapper.
- **Fixed header/footer** — `fixedTop` and `fixedFooter` keep the header/footer pinned during content scroll, with automatic placeholder elements to prevent overlap.
- **Base z-index control** — `baseZIndex` derives the stacking order of sidebar, header, tab, and footer so multiple layouts compose predictably.
- **Headless composition** — every region (`LayoutRoot`, `LayoutSidebar`, `LayoutRail`, `LayoutHeader`, `LayoutTab`, `LayoutContent`, `LayoutFooter`, `LayoutMobile`, `LayoutTrigger`) is exported from `@soybeanjs/headless/layout` for custom styled builds.
- **SSR safe** — no `window`/`document` access in setup; `useId()` generates stable scroll ids for server rendering.

## Usage

<UsageCode component="layout" />

## Demos

<PlaygroundGallery component="layout" />

## API

<ComponentApi component="layout" />

## Notes

### Architecture and benchmark comparison

| Concern                      | SoybeanUI                                                                                      | Ant Design `Layout`/`Header`/`Sider`/`Content`/`Footer` | Element Plus `ElContainer`/`ElHeader`/`ElAside`/`ElMain`/`ElFooter` |
| :--------------------------- | :--------------------------------------------------------------------------------------------- | :------------------------------------------------------ | :------------------------------------------------------------------ |
| Headless / styled separation | ✅ `@soybeanjs/headless/layout` ships logic + structure; `@soybeanjs/ui` ships `scv()` recipes | ❌ single styled package                                | ❌ single styled package                                            |
| Sidebar variants             | `sidebar` / `floating` / `inset`                                                               | `sider` only                                            | `aside` only                                                        |
| Collapsible modes            | `icon` (rail) + `offcanvas` (slide out)                                                        | `collapsible` + `collapsedWidth`                        | —                                                                   |
| Mobile drawer                | built-in `Dialog`-based drawer (`isMobile` prop)                                               | requires `Drawer` composition                           | requires `Drawer` composition                                       |
| Fixed header/footer          | `LayoutClassic` with `fixedTop` / `fixedFooter` + automatic placeholders                       | requires manual sticky CSS                              | requires manual sticky CSS                                          |
| Orientation                  | `LayoutClassic` `orientation="horizontal" \| "vertical"`                                       | —                                                       | —                                                                   |
| Scroll behavior              | `wrapper` / `content` on `LayoutClassic`                                                       | —                                                       | —                                                                   |
| CSS-variable dimensions      | `--soybean-sidebar-width`, `--soybean-layout-header-height`, etc.                              | inline width on `Sider`                                 | inline width on `Aside`                                             |
| RTL support                  | logical properties (`start-*`, `end-*`, `ps-*`, `pe-*`) + `rtl:` variants on rail              | —                                                       | —                                                                   |
| Z-index orchestration        | `baseZIndex` derives sidebar/header/tab/footer z-index                                         | manual                                                  | manual                                                              |
| Region visibility            | `sidebarVisible` / `headerVisible` / `tabVisible` / `footerVisible` props                      | remove the component                                    | remove the component                                                |

### Runtime considerations

1. **CSS variables are rem-based** — `sidebarWidth`, `collapsedSidebarWidth`, `headerHeight`, `tabHeight`, `footerHeight`, and `mobileSidebarWidth` are converted via `pxToRem` (default `px / 16`). Pass a custom `pxToRem` to align with a non-default root font size.
2. **`size` scales spacing and typography** — the UI wrapper multiplies pixel dimensions by `themeSizeRatio[size] / themeSizeMap.md`, so `size="xs"` shrinks both text and sidebar width proportionally.
3. **Mobile detection is declarative** — `isMobile` is a prop (not internal logic). Pair it with `@vueuse/core`'s `useMediaQuery` or a server-side detection to toggle the drawer.
4. **`LayoutTrigger` vs `LayoutRail`** — `LayoutTrigger` is a focusable button in the header for keyboard users; `LayoutRail` is the edge drag affordance with `tabindex="-1"` (click-only). Both reflect `aria-expanded`.
5. **`LayoutClassic` placeholder elements** — when `fixedTop` or `fixedFooter` is enabled, `LayoutClassicPlaceholder` renders empty spacer divs (`data-soybean-layout-{header|tab|footer}-placeholder`) to prevent content from sliding under the fixed region.
6. **`scrollId` for scroll restoration** — `LayoutClassic` generates a stable `soybean-layout-scroll-{id}` on the scrolling element (wrapper or content depending on `scrollBehavior`). Pass `scrollId` to make it deterministic across SSR/CSR.

## FAQ

### Which layout should I use — `SLayout` or `SLayoutClassic`?

Use `SLayout` for modern application shells where the sidebar sits beside a single scrolling content area. Use `SLayoutClassic` for admin dashboards that need fixed header/footer, orientation switching, or wrapper-level scrolling with placeholder spacers.

### How do I control the sidebar open state?

Use `v-model:open` (controlled) or `default-open` (uncontrolled). The state is reflected on the root via `data-state="expanded|collapsed"` and on `LayoutTrigger`/`LayoutRail` via `aria-expanded`.

### How do I make the sidebar collapse to icons instead of sliding away?

Set `collapsible="icon"` (default) and `collapsedSidebarWidth` to the rail width. The sidebar shrinks to the collapsed width and the `sidebarGapHandler` adjusts the main area accordingly. Use `collapsible="offcanvas"` to slide the sidebar off-canvas instead.

### How does mobile mode work?

Pass `isMobile` to swap the desktop sidebar for a `Dialog`-based drawer. The drawer inherits `mobileSidebarWidth` and reuses the same `sidebar` slot content. The drawer overlay and focus trap are provided by the underlying `Dialog` component.

### Can I render the sidebar on the right?

Yes — set `side="right"`. The layout uses RTL-aware logical properties (`start-*`, `end-*`, `border-s`, `border-e`) so the sidebar, gap handler, rail cursor, and fixed header/footer insets all flip correctly.

### How are z-index values coordinated?

`LayoutClassic` accepts a `baseZIndex` (default `50`). The sidebar, header, tab, and footer z-index values are derived from this base so they stack predictably. The derived values are exposed as `--soybean-layout-{sidebar|header|tab|footer}-z-index` CSS variables.

### How do I customize region-level attributes?

Each region accepts a `*Props` prop on the compact component (e.g. `sidebarProps`, `headerProps`, `tabProps`, `contentProps`, `footerProps`, `mainProps`, `railProps`, `mobileProps`). These are forwarded to the corresponding headless region component.
