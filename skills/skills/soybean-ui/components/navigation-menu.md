# NavigationMenu

Source URL: https://ui.soybeanjs.cn/components/navigation-menu
Markdown URL: https://ui.soybeanjs.cn/components/navigation-menu.md
Category: Navigation
Description: NavigationMenu builds site-level horizontal or vertical navigation with arbitrarily nested submenus, hover/click triggers, arrow-key keyboard navigation, and an indicator and viewport that follow the active item.

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
- **Per-item and global link props** — the destination (`href` / `to`), `target`, and `external` are owned by each item; `linkProps` only forwards the remaining link props (for example a global `disabled` fallback, where an explicit item value always wins).
- **Disabled items** — disabled links render `aria-disabled="true"`, `tabindex="-1"`, and block interaction; disabled triggers never open a submenu.
- **Six sizes** — `size` (xs…2xl) variants cover spacing and type scale across viewport, lists, trigger, links, sub-items, and indicator.
- **19 UI slots** — `root` / `item` / `trigger` / `content` / `link` / `subLink` / `indicator` / `viewport` / `arrow` and more are individually customizable through the `ui` prop.
- **Headless composition** — `NavigationMenuRoot` / `List` / `Item` / `Trigger` / `Content` / `Link` / `Indicator` / `Viewport` plus the `Compact` series are all exported from `@soybeanjs/headless/navigation-menu`.

## Usage

Usage examples for navigation-menu are rendered on the site.

## Demos

Interactive demos for navigation-menu are rendered on the site.

## API

Structured API summary generated from build-time component metadata.

- Exported symbols (12): NavigationMenu, NavigationMenuCompact, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuRoot, NavigationMenuSub, NavigationMenuSubList, NavigationMenuTrigger, NavigationMenuViewport.

### NavigationMenu

#### Props

Properties for the NavigationMenu component.

- `class`: Additional class names applied to the root element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<NavigationMenuUi>`; optional)
- `items`: The items to render in the navigation menu. (type `NavigationMenuOptionData[]`; required)
- `modelValue`: The controlled value of the menu item to activate. Can be used as `v-model`. (type `string`; optional)
- `defaultValue`: The value of the menu item that should be active when initially rendered. Use when you do not need to control the value state. (type `string`; optional)
- `dir`: The reading direction of the combobox when applicable. If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode. (type `Direction`; optional)
- `orientation`: The orientation of the menu. (type `DataOrientation`; optional)
- `delayDuration`: The duration from when the pointer enters the trigger until the tooltip gets opened. (type `number`; default `200`; optional)
- `skipDelayDuration`: How much time a user has to enter another trigger without incurring a delay again. (type `number`; default `300`; optional)
- `disableClickTrigger`: If `true`, menu cannot be open by click on trigger (type `boolean`; default `false`; optional)
- `disableHoverTrigger`: If `true`, menu cannot be open by hover on trigger (type `boolean`; default `false`; optional)
- `disablePointerLeaveClose`: If `true`, menu will not close during pointer leave event (type `boolean`; default `false`; optional)
- `unmountOnHide`: When `true`, the element will be unmounted on closed state. (type `boolean`; default `true`; optional)
- `itemProps`: Properties forwarded to the item element. (type `NavigationMenuItemProps`; optional)
- `linkProps`: Properties forwarded to the link element. (type `Omit<NavigationMenuLinkProps, LinkBasePropsKey>`; optional)
- `triggerProps`: Properties forwarded to the trigger element. (type `NavigationMenuTriggerProps`; optional)
- `contentProps`: Properties forwarded to the content element. (type `NavigationMenuContentProps`; optional)
- `viewportProps`: Properties forwarded to the viewport element. (type `NavigationMenuViewportProps`; optional)
- `indicatorProps`: Properties forwarded to the indicator element. (type `NavigationMenuIndicatorProps`; optional)
- `listProps`: Properties forwarded to the list element. (type `NavigationMenuListProps`; optional)
- `subListProps`: Properties forwarded to the sub list element. (type `NavigationMenuListProps`; optional)
- `subItemProps`: Properties forwarded to the sub item element. (type `NavigationMenuItemProps`; optional)

#### Emits

Events for the NavigationMenu component.

- `update:modelValue`: Emitted when the model value changes. (type `[value: string]`; parameters `value: string`)
- `escapeKeyDown`: Event handler called when the escape key is down. Can be prevented. (type `[event: KeyboardEvent]`; parameters `event: KeyboardEvent`)
- `pointerDownOutside`: Event handler called when a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented. (type `[event: PointerDownOutsideEvent]`; parameters `event: PointerDownOutsideEvent`)
- `focusOutside`: Event handler called when the focus moves outside of the `DismissableLayer`. Can be prevented. (type `[event: FocusOutsideEvent]`; parameters `event: FocusOutsideEvent`)
- `interactOutside`: Event handler called when an interaction happens outside the `DismissableLayer`. Specifically, when a `pointerdown` event happens outside or focus moves outside of it. Can be prevented. (type `[event: PointerDownOutsideEvent | FocusOutsideEvent]`; parameters `event: PointerDownOutsideEvent | FocusOutsideEvent`)
- `select`: Emitted when select occurs. (type `[payload: CustomEvent<{ originalEvent: Event; }>]`; parameters `payload: CustomEvent<{ originalEvent: Event; }>`)

#### Slots

Slots for the NavigationMenu component.

- `item`: No description. (type `(props: { item: NavigationMenuOptionData; isTrigger?: boolean; }) => any`; parameters `props: { item: NavigationMenuOptionData; isTrigger?: boolean; }`)
- `item-leading`: No description. (type `(props: { item: NavigationMenuOptionData; }) => any`; parameters `props: { item: NavigationMenuOptionData; }`)
- `item-trailing`: No description. (type `(props: { item: NavigationMenuOptionData; }) => any`; parameters `props: { item: NavigationMenuOptionData; }`)
- `item-link-icon`: No description. (type `(props: { item: NavigationMenuOptionData; }) => any`; parameters `props: { item: NavigationMenuOptionData; }`)
- `item-children`: No description. (type `(props: { item: NavigationMenuOptionData; }) => any`; parameters `props: { item: NavigationMenuOptionData; }`)
- `item-trigger-icon`: No description. (type `(props: { item: NavigationMenuOptionData; }) => any`; parameters `props: { item: NavigationMenuOptionData; }`)

### NavigationMenuCompact

#### Props

Properties for the NavigationMenuCompact component.

- `items`: The items to render in the navigation menu. (type `NavigationMenuOptionData[]`; required)
- `modelValue`: The controlled value of the menu item to activate. Can be used as `v-model`. (type `string`; optional)
- `defaultValue`: The value of the menu item that should be active when initially rendered. Use when you do not need to control the value state. (type `string`; optional)
- `dir`: The reading direction of the combobox when applicable. If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode. (type `Direction`; optional)
- `orientation`: The orientation of the menu. (type `DataOrientation`; optional)
- `delayDuration`: The duration from when the pointer enters the trigger until the tooltip gets opened. (type `number`; default `200`; optional)
- `skipDelayDuration`: How much time a user has to enter another trigger without incurring a delay again. (type `number`; default `300`; optional)
- `disableClickTrigger`: If `true`, menu cannot be open by click on trigger (type `boolean`; default `false`; optional)
- `disableHoverTrigger`: If `true`, menu cannot be open by hover on trigger (type `boolean`; default `false`; optional)
- `disablePointerLeaveClose`: If `true`, menu will not close during pointer leave event (type `boolean`; default `false`; optional)
- `unmountOnHide`: When `true`, the element will be unmounted on closed state. (type `boolean`; default `true`; optional)
- `itemProps`: Properties forwarded to the item element. (type `NavigationMenuItemProps`; optional)
- `linkProps`: Properties forwarded to the link element. (type `Omit<NavigationMenuLinkProps, LinkBasePropsKey>`; optional)
- `triggerProps`: Properties forwarded to the trigger element. (type `NavigationMenuTriggerProps`; optional)
- `contentProps`: Properties forwarded to the content element. (type `NavigationMenuContentProps`; optional)
- `viewportProps`: Properties forwarded to the viewport element. (type `NavigationMenuViewportProps`; optional)
- `indicatorProps`: Properties forwarded to the indicator element. (type `NavigationMenuIndicatorProps`; optional)
- `listProps`: Properties forwarded to the list element. (type `NavigationMenuListProps`; optional)
- `subListProps`: Properties forwarded to the sub list element. (type `NavigationMenuListProps`; optional)
- `subItemProps`: Properties forwarded to the sub item element. (type `NavigationMenuItemProps`; optional)

#### Emits

Events for the NavigationMenuCompact component.

- `update:modelValue`: Emitted when the model value changes. (type `[value: string]`; parameters `value: string`)
- `escapeKeyDown`: Event handler called when the escape key is down. Can be prevented. (type `[event: KeyboardEvent]`; parameters `event: KeyboardEvent`)
- `pointerDownOutside`: Event handler called when a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented. (type `[event: PointerDownOutsideEvent]`; parameters `event: PointerDownOutsideEvent`)
- `focusOutside`: Event handler called when the focus moves outside of the `DismissableLayer`. Can be prevented. (type `[event: FocusOutsideEvent]`; parameters `event: FocusOutsideEvent`)
- `interactOutside`: Event handler called when an interaction happens outside the `DismissableLayer`. Specifically, when a `pointerdown` event happens outside or focus moves outside of it. Can be prevented. (type `[event: PointerDownOutsideEvent | FocusOutsideEvent]`; parameters `event: PointerDownOutsideEvent | FocusOutsideEvent`)
- `select`: Emitted when select occurs. (type `[payload: CustomEvent<{ originalEvent: Event; }>]`; parameters `payload: CustomEvent<{ originalEvent: Event; }>`)

#### Slots

Slots for the NavigationMenuCompact component.

- `item`: No description. (type `(props: { item: NavigationMenuOptionData; isTrigger?: boolean; }) => any`; parameters `props: { item: NavigationMenuOptionData; isTrigger?: boolean; }`)
- `item-leading`: No description. (type `(props: { item: NavigationMenuOptionData; }) => any`; parameters `props: { item: NavigationMenuOptionData; }`)
- `item-trailing`: No description. (type `(props: { item: NavigationMenuOptionData; }) => any`; parameters `props: { item: NavigationMenuOptionData; }`)
- `item-link-icon`: No description. (type `(props: { item: NavigationMenuOptionData; }) => any`; parameters `props: { item: NavigationMenuOptionData; }`)
- `item-children`: No description. (type `(props: { item: NavigationMenuOptionData; }) => any`; parameters `props: { item: NavigationMenuOptionData; }`)
- `item-trigger-icon`: No description. (type `(props: { item: NavigationMenuOptionData; }) => any`; parameters `props: { item: NavigationMenuOptionData; }`)

### NavigationMenuContent

#### Props

Properties for the NavigationMenuContent component.

- `disableOutsidePointerEvents`: When `true`, hover/focus/click interactions will be disabled on elements outside the `DismissableLayer`. Users will need to click twice on outside elements to interact with them: once to close the `DismissableLayer`, and again to trigger the element. (type `boolean`; optional)
- `forceMount`: Used to force mounting when more control is needed. Useful when controlling animation with Vue animation libraries. (type `boolean`; optional)

#### Emits

Events for the NavigationMenuContent component.

- `escapeKeyDown`: Event handler called when the escape key is down. Can be prevented. (type `[event: KeyboardEvent]`; parameters `event: KeyboardEvent`)
- `pointerDownOutside`: Event handler called when a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented. (type `[event: PointerDownOutsideEvent]`; parameters `event: PointerDownOutsideEvent`)
- `focusOutside`: Event handler called when the focus moves outside of the `DismissableLayer`. Can be prevented. (type `[event: FocusOutsideEvent]`; parameters `event: FocusOutsideEvent`)
- `interactOutside`: Event handler called when an interaction happens outside the `DismissableLayer`. Specifically, when a `pointerdown` event happens outside or focus moves outside of it. Can be prevented. (type `[event: PointerDownOutsideEvent | FocusOutsideEvent]`; parameters `event: PointerDownOutsideEvent | FocusOutsideEvent`)

### NavigationMenuIndicator

#### Props

Properties for the NavigationMenuIndicator component.

- `forceMount`: Used to force mounting when more control is needed. Useful when controlling animation with Vue animation libraries. (type `boolean`; optional)

### NavigationMenuItem

#### Props

Properties for the NavigationMenuItem component.

- `value`: Value associated with the current item. (type `string`; optional)

### NavigationMenuLink

#### Props

Properties for the NavigationMenuLink component.

- `active`: Used to identify the link as the currently active page. (type `boolean`; optional)
- `replace`: Calls `router.replace` instead of `router.push`. (type `boolean`; optional)
- `disabled`: When `true`, the link is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
- `href`: The URL the link should navigate to when clicked on. (type `string`; optional)
- `to`: Route Location the link should navigate to when clicked on. (type `string | import("vue-router").RouteLocationAsRelativeGeneric | import("vue-router").RouteLocationAsPathGeneric`; optional)
- `activeClass`: Class to apply when the link is active (type `string`; optional)
- `exactActiveClass`: Class to apply when the link is exact active (type `string`; optional)
- `inactiveClass`: The class to apply to the link when it is inactive. (type `string`; optional)
- `prefetchedClass`: A class to apply to links that have been prefetched. (type `string`; optional)
- `external`: Forces the link to be considered as external (true) or internal (false). This is helpful to handle edge-cases (type `boolean`; optional)
- `ariaCurrentValue`: Value passed to the attribute `aria-current` when the link is exact active. (type `'true' | 'false' | 'date' | 'time' | 'page' | 'step' | 'location'`; default `'page'`; optional)
- `viewTransition`: Pass the returned promise of `router.push()` to `document.startViewTransition()` if supported. (type `boolean`; optional)
- `target`: Where to display the linked URL, as the name for a browsing context. (type `(string & {}) | '_blank' | '_parent' | '_self' | '_top' | null`; optional)
- `rel`: A rel attribute value to apply on the link. Defaults to "noopener noreferrer" for external links. (type `(string & {}) | 'noopener' | 'noreferrer' | 'nofollow' | 'sponsored' | 'ugc' | null`; default `'noopener noreferrer'`; optional)
- `noRel`: If set to true, no rel attribute will be added to the link (type `boolean`; optional)
- `prefetch`: When enabled will prefetch middleware, layouts and payloads of links in the viewport. (type `boolean`; optional)
- `prefetchOn`: Allows controlling when to prefetch links. By default, prefetch is triggered only on visibility. (type `'visibility' | 'interaction' | Partial<{ visibility: boolean; interaction: boolean; }>`; optional)
- `noPrefetch`: Escape hatch to disable `prefetch` attribute. (type `boolean`; optional)
- `trailingSlash`: An option to either add or remove trailing slashes in the `href` for this specific link. Overrides the global `trailingSlash` option if provided. (type `'append' | 'remove'`; optional)

#### Emits

Events for the NavigationMenuLink component.

- `select`: Emitted when select occurs. (type `[payload: CustomEvent<{ originalEvent: Event; }>]`; parameters `payload: CustomEvent<{ originalEvent: Event; }>`)

### NavigationMenuList

- No documented props, emits, slots, or slot props were available.

### NavigationMenuRoot

#### Props

Properties for the NavigationMenuRoot component.

- `modelValue`: The controlled value of the menu item to activate. Can be used as `v-model`. (type `string`; optional)
- `defaultValue`: The value of the menu item that should be active when initially rendered. Use when you do not need to control the value state. (type `string`; optional)
- `dir`: The reading direction of the combobox when applicable. If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode. (type `Direction`; optional)
- `orientation`: The orientation of the menu. (type `DataOrientation`; optional)
- `delayDuration`: The duration from when the pointer enters the trigger until the tooltip gets opened. (type `number`; default `200`; optional)
- `skipDelayDuration`: How much time a user has to enter another trigger without incurring a delay again. (type `number`; default `300`; optional)
- `disableClickTrigger`: If `true`, menu cannot be open by click on trigger (type `boolean`; default `false`; optional)
- `disableHoverTrigger`: If `true`, menu cannot be open by hover on trigger (type `boolean`; default `false`; optional)
- `disablePointerLeaveClose`: If `true`, menu will not close during pointer leave event (type `boolean`; default `false`; optional)
- `unmountOnHide`: When `true`, the element will be unmounted on closed state. (type `boolean`; default `true`; optional)

#### Emits

Events for the NavigationMenuRoot component.

- `update:modelValue`: Emitted when the model value changes. (type `[value: string]`; parameters `value: string`)

### NavigationMenuSub

#### Props

Properties for the NavigationMenuSub component.

- `modelValue`: Current model value. (type `string`; optional)
- `defaultValue`: Default value. (type `string`; optional)

#### Emits

Events for the NavigationMenuSub component.

- `update:modelValue`: Emitted when the model value changes. (type `[value: string]`; parameters `value: string`)

### NavigationMenuSubList

- No documented props, emits, slots, or slot props were available.

### NavigationMenuTrigger

#### Props

Properties for the NavigationMenuTrigger component.

- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### NavigationMenuViewport

#### Props

Properties for the NavigationMenuViewport component.

- `align`: Align. (type `Align`; optional)
- `forceMount`: Used to force mounting when more control is needed. Useful when controlling animation with Vue animation libraries. (type `boolean`; optional)

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
