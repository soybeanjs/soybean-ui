# PageTabs

## Overview

A tabbed interface designed for navigating between different pages or views. It supports features like closable tabs, context menus, and customizable styling.

## Features

- **Data-driven compact composition** — `SPageTabs` delegates the whole structure to the headless generic `PageTabsCompact<T>`, which owns tab iteration, pin sorting, close semantics, context-menu wiring, and the default item body (icon + label + pin + close + indicator).
- **Controlled or uncontrolled state** — `modelValue` / `items` support `v-model` / `v-model:items` (controlled); omitting them falls back to internal state via `useControllableState`.
- **Closable tabs with async guard** — every non-pinned tab renders a close button; `beforeClose` may return `false` or a promise resolving to `false` to block closing. Closing the active tab activates the next (or previous) sibling; closing via keyboard `Backspace` and middle-click (`middleClickClose`) work out of the box.
- **Pin / unpin with auto-sorting** — pinned tabs sort to the front on any change (hidden-pinned icons first, then pinned, then normal tabs); the inline pin button toggles pinned state and the context menu provides `Pin` / `Unpin`.
- **Context-menu factory** — `menuFactory(tab, state)` receives the hovered tab plus a `PageTabsState` (close, closeLeft, closeRight, closeOther, closeAll, pin, unpin and their per-action `*Closable` booleans) to build custom menus; `selectContextMenu` emits the chosen action and tab.
- **Full keyboard support** — a `RovingFocusGroup` provides arrow-key movement; `Enter` activates a tab, `Backspace` closes it.
- **Auto-scroll active tab** — `usePageTabsScroll` keeps the active tab horizontally centered (`scrollTo` smooth) and converts the vertical wheel into horizontal scrolling.
- **Three visual variants** — `variant` (`chrome` / `card` / `slider`) with per-variant indicators (chrome corner SVGs / slider underline) and `size` (xs…2xl) via the `pageTabsVariants` `scv()` recipe.
- **Six customization slots** — `item` (scoped `{ item, index, active, closable }`), `icon`, `label`, `indicator`, `pin-icon`, `close-icon`.
- **Localized accessibility text** — the close / pin buttons fall back to localized `aria-label`s (`closeTab` / `pinTab` / `unpinTab`) across 13 built-in languages, overridable per button via `aria-label`.
- **Headless composition** — `PageTabsRoot` / `PageTabsItem` / `PageTabsClose` / `PageTabsPin` / `PageTabsCompact` are exported from `@soybeanjs/headless/page-tabs` for fully custom styled builds.

## Usage

<UsageCode component="page-tabs" />

> `SPageTabs` delegates its tab management to headless `PageTabsCompact`. For unstyled, data-driven composition, import `PageTabsCompact` from `@soybeanjs/headless/page-tabs`.

## Demos

<PlaygroundGallery component="page-tabs" />

## API

<ComponentApi component="page-tabs" />

## Notes

### Architecture and benchmark comparison

| Concern                                   | SoybeanUI                                        | Ant Design `Tabs`                   | Element Plus `Tabs`            | tags-view (vue-element-admin style) |
| :---------------------------------------- | :----------------------------------------------- | :---------------------------------- | :----------------------------- | :---------------------------------- |
| Headless / styled separation              | ✅ `@soybeanjs/headless/page-tabs` + `scv()`     | ❌ single package                   | ❌ single package              | ❌ custom per app                   |
| Data-driven compact API                   | ✅ generic `PageTabsCompact<T>` + `items`        | ✅ config-driven (items)            | ✅ config-driven               | ✅ per app                          |
| Controlled / uncontrolled                 | ✅ `modelValue`/`items` + `useControllableState` | ✅ `activeKey` / `defaultActiveKey` | ✅ `v-model`                   | —                                   |
| Closable + async guard                    | ✅ `beforeClose` (false / Promise\<false>)       | ✅ `onEdit` + `beforeChange`        | ✅ `closable` / `before-leave` | ✅ `before-close`                   |
| Pin / unpin + auto-sort                   | ✅ pinned tabs sort to front                     | ❌ (custom tabLabel)                | ❌                             | ✅ (per app, e.g. affix-tab)        |
| Context menu (left/right/other/all close) | ✅ `menuFactory` + `PageTabsState`               | ❌ (`dropdownMenu` on `more` only)  | ❌                             | ✅ (per app)                        |
| Middle-click close                        | ✅ `middleClickClose`                            | ❌                                  | ❌                             | ✅ (per app)                        |
| Keyboard (roving focus + Enter/Backspace) | ✅ `RovingFocusGroup`                            | ✅ arrows / Home / End              | ✅ arrows                      | ❌                                  |
| Auto-scroll active tab                    | ✅ centered `scrollTo` + wheel-to-horizontal     | ✅ `auto` on tabBar                 | ❌                             | ✅ (per app)                        |
| Variants                                  | ✅ `chrome`/`card`/`slider` × xs…2xl             | ✅ `line`/`card`/`editable-card`    | ✅ `card`/`border-card`        | —                                   |
| Localized `aria-label`                    | ✅ locale registry (13 langs)                    | partial                             | —                              | —                                   |
| Slots                                     | ✅ 6 typed slots                                 | ✅ `label`/`closeIcon`/…            | ✅ `label`/`icon`/…            | —                                   |

### Runtime considerations

1. **Pinned tabs are not closable** — `closable` derives from `!pinned`; pinned tabs render no close button, and middle-click / `Backspace` / context-menu close actions are disabled for them.
2. **Active-tab close fallback** — closing the active tab activates the next sibling, falling back to the previous one; closing the last tab clears `modelValue` to `''` (no tab active).
3. **Async `beforeClose`** — it may be synchronous or return a promise; only a resolved `false` blocks the close. The `close` event fires after the guard passes and the tab is removed.
4. **Pin sorting** — `sortTabs` reorders items as hidden-pinned-icon → pinned → normal and emits `update:items` when the order changes; in controlled mode the parent must accept the new order to see the reorder.
5. **Controlled vs. uncontrolled** — when `modelValue` / `items` props are provided, internal writes only emit `update:modelValue` / `update:items`; the DOM follows the props, so external changes re-render automatically.
6. **Context menu target** — hovering a tab (pointerenter) sets it as the context target and emits `contextmenu`; the menu itself renders from `menuFactory` only when it returns non-empty options.
7. **Locale fallback** — close/pin `aria-label`s come from `useLocaleMessages`; missing keys fall back to the default English bundle; an explicit `aria-label` on the close/pin button wins.

## FAQ

### How do I prevent closing a tab?

Return `false` (or a promise that resolves to `false`) from `beforeClose`. The guard applies to the close button, middle-click, `Backspace`, and the context-menu close actions. For a pinned tab, just mark `pinned: true` — pinned tabs are never closable.

### Why are pinned tabs shown first?

Pinning is meant to keep important pages accessible; `sortTabs` moves hidden-pinned-icon tabs first, then pinned, then normal ones. If you pass `pinned` items in arbitrary order, the component reorders them on mount and emits `update:items` with the sorted array.

### Can I customize the context menu?

Yes — implement `menuFactory(tab, state)`. `state` exposes `close`, `closeLeft`, `closeRight`, `closeOther`, `closeAll`, `pin`, `unpin`, and the matching `*Closable` flags so you can disable irrelevant actions (e.g. "Close Left" on the first tab). Selecting an item runs its `action` and emits `selectContextMenu(menu, tab)`.

### How do I close the active tab gracefully?

Closing the active tab automatically activates the next sibling (or the previous one when the closed tab was last). If the last remaining tab is closed, `modelValue` becomes `''` and no tab is active.

### What keyboard shortcuts are supported?

Arrow keys move focus through tabs (roving focus), `Enter` activates the focused tab, and `Backspace` closes it (unless pinned or blocked by `beforeClose`). Middle-click also closes when `middleClickClose` is enabled.

### Can I build a fully custom page tabs?

Yes — compose `PageTabsRoot` / `PageTabsItem` / `PageTabsClose` / `PageTabsPin` / `PageTabsCompact` from `@soybeanjs/headless/page-tabs` and inject styles via `providePageTabsUi` (or `SPageTabs`'s `ui` prop). The `item` slot receives `{ item, index, active, closable }` scoped props for per-tab rendering.
