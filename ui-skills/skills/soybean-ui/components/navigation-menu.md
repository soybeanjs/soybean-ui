# NavigationMenu

Source URL: https://ui.soybeanjs.cn/components/navigation-menu
Markdown URL: https://ui.soybeanjs.cn/components/navigation-menu.md
Category: Navigation
Description: A collection of links for navigating websites. Supports submenus and responsive behavior.

## Overview

A collection of links for navigating websites. Supports submenus and responsive behavior.

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
- `linkProps`: Properties forwarded to the link element. (type `NavigationMenuLinkProps`; optional)
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
- `linkProps`: Properties forwarded to the link element. (type `NavigationMenuLinkProps`; optional)
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
- `to`: Route Location the link should navigate to when clicked on. (type `string | import("vue-router").RouteLocationAsRelativeGeneric | import("vue-router").RouteLocationAsPathGeneric`; optional)
- `href`: The URL the link should navigate to when clicked on. (type `string`; optional)
- `activeClass`: Class to apply when the link is active (type `string`; optional)
- `exactActiveClass`: Class to apply when the link is exact active (type `string`; optional)
- `inactiveClass`: The class to apply to the link when it is inactive. (type `string`; optional)
- `prefetchedClass`: A class to apply to links that have been prefetched. (type `string`; optional)
- `external`: Forces the link to be considered as external (true) or internal (false). This is helpful to handle edge-cases (type `boolean`; optional)
- `ariaCurrentValue`: Value passed to the attribute `aria-current` when the link is exact active. (type `'true' | 'false' | 'date' | 'time' | 'page' | 'step' | 'location'`; default `'page'`; optional)
- `viewTransition`: Pass the returned promise of `router.push()` to `document.startViewTransition()` if supported. (type `boolean`; optional)
- `target`: Where to display the linked URL, as the name for a browsing context. (type `'_blank' | '_parent' | '_self' | '_top' | (string & {}) | null`; optional)
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
