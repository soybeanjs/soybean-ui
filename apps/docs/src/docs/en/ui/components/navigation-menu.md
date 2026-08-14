# NavigationMenu

## Overview

NavigationMenu builds site-level horizontal or vertical navigation with arbitrarily nested submenus, hover/click triggers, arrow-key keyboard navigation, and an indicator and viewport that follow the active item.

`SNavigationMenu` is a data-driven composite: pass an `items` array and it renders the full `nav > ul > li` structure, submenu surfaces, indicator, and positioned viewport. The logic and accessibility semantics live in the headless `NavigationMenuCompact`, while styles are injected through an `scv()` recipe.

> `SNavigationMenu` delegates all structure composition to the headless `NavigationMenuCompact`. For an unstyled, data-driven usage, import `@soybeanjs/headless/navigation-menu`.

## Features

- **Data-driven composition** — pass `items` (`NavigationMenuOptionData`) to render the navigation; any item declares a submenu via `children`, and sub-items support `label` / `description` / `icon` / `href` / `to` / `disabled`.
- **Hover / click triggers** — hover opens and click toggles by default; `disableClickTrigger` / `disableHoverTrigger` turn each trigger mode off independently.
- **Delay and debounce** — `delayDuration` (default `200`ms) controls the hover-open delay, with a 150ms grace when switching between triggers; `skipDelayDuration` and `disablePointerLeaveClose` tune closing behavior.
- **Submenu surfaces** — sub-items render inside a positioned viewport with motion direction animations (`from-start` / `from-end` etc.), an arrow indicator, and `unmountOnHide` control.
- **Keyboard navigation** — arrow keys move focus across items (Roving Focus); `Enter` / `Space` activate a link or toggle a submenu; with a submenu open, the entry arrow key (horizontal `ArrowDown`, vertical `ArrowRight`) moves focus into the content; `Escape` closes and restores focus.
- **Indicator and viewport positioning** — `NavigationMenuIndicator` slides with the active item; the viewport positions against the active trigger (or the root), supports `align`, and clamps to the screen edges.
- **Controlled / uncontrolled** — with `modelValue`, highlight follows the prop and `update:modelValue` fires; otherwise `defaultValue` seeds the initial open item.
- **Bidirectional** — `orientation` supports horizontal / vertical; `dir` supports LTR / RTL with logical positioning and animations.
- **Per-item and global link props** — `disabled` / `target` can be set per item or fall back to global `linkProps`; explicit item values always win, and `linkProps.href` is deliberately excluded from the type (the destination is decided by the item's `href` / `to`).
- **Disabled items** — disabled links render `aria-disabled="true"`, `tabindex="-1"`, and block interaction; disabled triggers never open a submenu.
- **Six sizes** — `size` (xs…2xl) variants cover spacing and type scale across viewport, lists, trigger, links, sub-items, and indicator.
- **19 UI slots** — `root` / `item` / `trigger` / `content` / `link` / `subLink` / `indicator` / `viewport` / `arrow` and more are individually customizable through the `ui` prop.
- **Headless composition** — `NavigationMenuRoot` / `List` / `Item` / `Trigger` / `Content` / `Link` / `Indicator` / `Viewport` plus the `Compact` series are all exported from `@soybeanjs/headless/navigation-menu`.

## Usage

<UsageCode component="navigation-menu" />

## Demos

<PlaygroundGallery component="navigation-menu" />

## API

<ComponentApi component="navigation-menu" />

## Notes

### Architecture and industry comparison

| Capability            | SoybeanUI                                                             | Ant Design `Menu`        | Element Plus `Menu`            | Radix `NavigationMenu`         |
| :-------------------- | :-------------------------------------------------------------------- | :----------------------- | :----------------------------- | :----------------------------- |
| headless/styled split | ✅ `@soybeanjs/headless/navigation-menu` + `scv()`                    | ❌ single package        | ❌ single package              | ✅ `@radix-ui/navigation-menu` |
| data-driven compact   | ✅ generic `NavigationMenuCompact` + nested `items`                   | ✅ `items`               | ✅ `default-active` data       | ❌ JSX-oriented                |
| trigger modes         | ✅ hover / click, each independently disableable                      | ✅ click + hover         | ✅ click + hover               | ✅ hover + click (config)      |
| delay control         | ✅ `delayDuration` / `skipDelayDuration` / `disablePointerLeaveClose` | —                        | —                              | ✅ `delayDuration` etc.        |
| submenu depth         | ✅ arbitrary nesting                                                  | ✅ arbitrary nesting     | ✅ two levels                  | ✅ nested                      |
| keyboard navigation   | ✅ Roving Focus + entry arrow + Escape                                | ✅                       | ✅                             | ✅                             |
| indicator             | ✅ slides with active item + arrow                                    | ✅                       | ❌                             | ✅                             |
| positioned viewport   | ✅ trigger/root-relative + edge clamp + `align`                       | —                        | —                              | ✅                             |
| disabled items        | ✅ per-item + `linkProps` fallback                                    | ✅ `disabled`            | ✅ `disabled`                  | ✅ `disabled`                  |
| per-element props     | ✅ `linkProps` / `triggerProps` / `contentProps` forwarding           | —                        | —                              | —                              |
| direction             | ✅ horizontal / vertical + LTR / RTL                                  | ✅ horizontal / vertical | ✅ horizontal / vertical + RTL | ✅ horizontal / vertical + RTL |
| size variants         | ✅ `size` xs…2xl                                                      | ✅ `size`                | —                              | —                              |
| controlled mode       | ✅ `modelValue` / `defaultValue`                                      | ✅ `selectedKeys`        | ✅ `default-active`            | ✅ `value` / `onValueChange`   |

### Runtime notes

1. **Hover delay** — submenus open after `delayDuration` on hover, with a 150ms grace when moving between triggers. Lower `delayDuration` or use click triggers for instant opening.
2. **Click vs. hover** — a submenu opened by pointer move ignores the subsequent click (`hasPointerMoveOpenedRef` guard), preventing accidental toggling. Set `disableHoverTrigger: true` for a click-only experience.
3. **Controlled / uncontrolled** — with `modelValue`, internal writes only emit `update:modelValue`; highlight fully follows the prop, so changing it externally switches the open item.
4. **Unmount and animation** — `unmountOnHide` (default `true`) unmounts content when closed; while the viewport plays its exit animation the last active content stays mounted and is removed after the animation ends.
5. **Link triggers** — when a parent item has both `href` / `to` and `children`, the trigger renders as a link (`as-child`). Clicking an already-open link trigger closes it: the link dismisses the menu first, then the trigger skips re-opening. The behavior is “click again to collapse”.
6. **Positioning relies on measurement** — the viewport and indicator compute positions via `getBoundingClientRect` and write CSS variables; they re-measure on container size or scroll changes. If the viewport appears misplaced, check for animated or `transform` ancestors.
7. **Disabled items** — disabled links are fully inert: `aria-disabled="true"`, `tabindex="-1"`, with click and keyboard activation blocked; disabled triggers (`disabled: true` parent items) never expand a submenu.

## FAQ

### How do I keep only click triggers?

Set `disableHoverTrigger: true` — hovering no longer opens submenus while clicks still toggle. If you want hover-only (clicks never open), set `disableClickTrigger: true` instead.

### How do I precisely control the open item?

Use `v-model` on `modelValue`. Each item's `value` becomes the controlled value; toggling emits `update:modelValue`, and changing the prop externally syncs the highlight. When uncontrolled, use `defaultValue` to seed the initially open item.

### Can a parent item be both a link and have a submenu?

Yes — give the item both `href` / `to` and `children`. The trigger then renders as a link: with the submenu closed, clicking navigates; while open, clicking collapses the menu first. Omit `href` / `to` if the parent should only expand.

### How do I customize submenu width or overall styling?

`SNavigationMenu` accepts `class` (on the root) and `ui` (class overrides for all 19 slots). For example `:ui="{ subLink: 'w-60' }"` fixes the sub-link width, and `:ui="{ root: 'z-10' }"` adjusts overlay stacking.

### How does the keyboard work?

After `Tab` focuses a navigation item, arrow keys move between items; `Enter` / `Space` activate a link or toggle a submenu; with a submenu open, the entry arrow key moves focus into the content, and `Escape` closes and returns focus to the trigger. Disabled items are excluded from the tab order.

### Why does clicking an open menu item collapse it instead of navigating?

When a parent item is both a link and a trigger, the link's `select` flow dismisses the menu first, and the trigger recognizes the menu was already closed by this click and does not re-open it. This is intentional — clicking the same trigger again “collapses” the menu; navigate via the link when the submenu is closed.
