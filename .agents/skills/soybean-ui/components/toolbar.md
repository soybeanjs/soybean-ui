# Toolbar

Source URL: https://ui.soybeanjs.cn/components/toolbar
Markdown URL: https://ui.soybeanjs.cn/components/toolbar.md
Category: Layout
Description: A compact container that groups related actions, links, and toggle controls into a single roving-focus toolbar.

## Overview

A compact container that groups related actions, links, and toggle controls into a single roving-focus toolbar.

## Usage

Usage examples for toolbar are rendered on the site.

## Demos

Interactive demos for toolbar are rendered on the site.

## API

Structured API summary generated from build-time component metadata.
- Exported symbols (7): Toolbar, ToolbarButton, ToolbarLink, ToolbarRoot, ToolbarSeparator, ToolbarToggleGroup, ToolbarToggleItem.

### Toolbar

#### Props
Properties for the Toolbar component.
- `class`: Additional class names applied to the root element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<ToolbarUi>`; optional)
- `orientation`: The orientation of the toolbar. (type `DataOrientation`; optional)
- `dir`: The reading direction of the toolbar. (type `Direction`; optional)
- `loop`: Whether keyboard roving focus loops. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### ToolbarButton

#### Props
Properties for the ToolbarButton component.
- `type`: The type of the button element. Can be one of 'button', 'submit', or 'reset'. (type `ButtonType`; default `'button'`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
#### Emits
Events for the ToolbarButton component.
- `click`: Emitted when click occurs. (type `[event: PointerEvent]`; parameters `event: PointerEvent`)

### ToolbarLink

#### Props
Properties for the ToolbarLink component.
- `showIcon`: Whether or not to show an icon when the `href` prop is provided. (type `boolean`; optional)
- `to`: Route Location the link should navigate to when clicked on. (type `string | import("vue-router").RouteLocationAsRelativeGeneric | import("vue-router").RouteLocationAsPathGeneric`; optional)
- `replace`: Calls `router.replace` instead of `router.push`. (type `boolean`; optional)
- `href`: The URL the link should navigate to when clicked on. (type `string`; optional)
- `disabled`: When `true`, the link is disabled. (type `boolean`; optional)
- `activeClass`: Class to apply when the link is active (type `string`; optional)
- `exactActiveClass`: Class to apply when the link is exact active (type `string`; optional)
- `inactiveClass`: The class to apply to the link when it is inactive. (type `string`; optional)
- `prefetchedClass`: A class to apply to links that have been prefetched. (type `string`; optional)
- `external`: Forces the link to be considered as external (true) or internal (false). This is helpful to handle edge-cases (type `boolean`; optional)
- `ariaCurrentValue`: Value passed to the attribute `aria-current` when the link is exact active. (type `'true' | 'false' | 'page' | 'step' | 'location' | 'date' | 'time'`; default ``'page'``; optional)
- `viewTransition`: Pass the returned promise of `router.push()` to `document.startViewTransition()` if supported. (type `boolean`; optional)
- `target`: Where to display the linked URL, as the name for a browsing context. (type `'_blank' | '_parent' | '_self' | '_top' | (string & {}) | null`; optional)
- `rel`: A rel attribute value to apply on the link. Defaults to "noopener noreferrer" for external links. (type `(string & {}) | 'noopener' | 'noreferrer' | 'nofollow' | 'sponsored' | 'ugc' | null`; default `'noopener noreferrer'`; optional)
- `noRel`: If set to true, no rel attribute will be added to the link (type `boolean`; optional)
- `prefetch`: When enabled will prefetch middleware, layouts and payloads of links in the viewport. (type `boolean`; optional)
- `prefetchOn`: Allows controlling when to prefetch links. By default, prefetch is triggered only on visibility. (type `'visibility' | 'interaction' | Partial<{ visibility: boolean; interaction: boolean; }>`; optional)
- `noPrefetch`: Escape hatch to disable `prefetch` attribute. (type `boolean`; optional)
- `trailingSlash`: An option to either add or remove trailing slashes in the `href` for this specific link. Overrides the global `trailingSlash` option if provided. (type `'append' | 'remove'`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### ToolbarRoot

#### Props
Properties for the ToolbarRoot component.
- `orientation`: The orientation of the toolbar. (type `DataOrientation`; optional)
- `dir`: The reading direction of the toolbar. (type `Direction`; optional)
- `loop`: Whether keyboard roving focus loops. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### ToolbarSeparator

#### Props
Properties for the ToolbarSeparator component.
- `decorative`: Whether or not the component is purely decorative. <br>When `true`, accessibility-related attributes are updated so that that the rendered element is removed from the accessibility tree. (type `boolean`; optional)

### ToolbarToggleGroup

#### Props
Properties for the ToolbarToggleGroup component.
- `rovingFocus`: When `false`, navigating through items with arrow keys is disabled. (type `boolean`; optional)
- `disabled`: When `true`, prevents interaction with all items in the group. (type `boolean`; optional)
- `orientation`: The orientation of the component. (type `DataOrientation`; optional)
- `dir`: The reading direction of the group when applicable. (type `Direction`; optional)
- `loop`: When `true`, keyboard navigation loops from last to first item, and vice versa. (type `boolean`; optional)
- `modelValue`: The controlled value of the selected item(s). Use this when you need to control the state of the items. Can be bound with `v-model` (type `(M extends true ? T[] : T)`; optional)
- `defaultValue`: The default value of the selected item(s). Use this when you need to set the initial state of the items. (type `(M extends true ? T[] : T)`; optional)
- `multiple`: Determines whether a "single" or "multiple" items can be selected at a time. This prop will overwrite the inferred type from `modelValue` and `defaultValue`. (type `M`; optional)
- `clearable`: Whether selected item can be cleared when `multiple` is false. (type `boolean`; optional)
- `selectionBehavior`: How multiple selection should behave in the collection. (type `SelectionBehavior`; default `'toggle'`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
#### Emits
Events for the ToolbarToggleGroup component.
- `update:modelValue`: No description. (type `[value: M extends true ? T[] : T]`; parameters `value: M extends true ? T[] : T`)

### ToolbarToggleItem

#### Props
Properties for the ToolbarToggleItem component.
- `value`: A unique value that identifies the item inside the group. (type `T`; required)
- `type`: The type of the button element. Can be one of 'button', 'submit', or 'reset'. (type `ButtonType`; default `'button'`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
