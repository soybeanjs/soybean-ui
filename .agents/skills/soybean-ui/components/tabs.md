# Tabs

Source URL: https://ui.soybeanjs.cn/components/tabs
Markdown URL: https://ui.soybeanjs.cn/components/tabs.md
Category: Navigation
Description: A set of layered sections of content—known as tab panels—that are displayed one at a time.

## Overview

A set of layered sections of content—known as tab panels—that are displayed one at a time.

## Usage

Usage examples for tabs are rendered on the site.

> `STabs` now delegates item iteration, default trigger/content composition, and indicator rendering to headless `TabsCompact`. For unstyled, data-driven usage, import `TabsCompact` from `@soybeanjs/headless/tabs`.

## Demos

Interactive demos for tabs are rendered on the site.

## API

Structured API summary generated from build-time component metadata.
- Exported symbols (7): Tabs, TabsCompact, TabsContent, TabsIndicator, TabsList, TabsRoot, TabsTrigger.

### Tabs

#### Props
Properties for the Tabs component.
- `class`: Additional class names applied to the root element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Styled tabs ui slots, including `indicatorContent` for the compact indicator body. (type `Partial<TabsUi>`; optional)
- `fill`: Fill. (type `TabsFill`; optional)
- `items`: Items rendered by the component. (type `T[]`; required)
- `enableIndicator`: Whether to enable indicator. (type `boolean`; optional)
- `listProps`: Properties forwarded to the list element. (type `TabsListProps`; optional)
- `triggerProps`: Properties forwarded to the trigger element. (type `TabsTriggerProps`; optional)
- `contentProps`: Properties forwarded to the content element. (type `TabsContentProps`; optional)
- `indicatorProps`: Properties forwarded to the indicator element. (type `TabsIndicatorProps`; optional)
- `modelValue`: The controlled value of the tab to activate. Can be bind as `v-model`. (type `T['value'] | null`; optional)
- `defaultValue`: The value of the tab that should be active when initially rendered. Use when you do not need to control the state of the tabs (type `T['value'] | null`; optional)
- `activationMode`: Whether a tab is activated automatically (on focus) or manually (on click). (type `TabsActivationMode`; default `automatic`; optional)
- `unmountOnHide`: When `true`, the element will be unmounted on closed state. (type `boolean`; default ``true``; optional)
- `dir`: The direction of navigation between items. (type `Direction`; optional)
- `orientation`: The orientation of the group. Mainly so arrow navigation is done accordingly (left & right vs. up & down) (type `DataOrientation`; optional)
- `loop`: Whether keyboard navigation should loop around (type `boolean`; default `false`; optional)
#### Emits
Events for the Tabs component.
- `update:modelValue`: Event handler called when the value changes (type `[payload: Exclude<T, undefined>]`; parameters `payload: Exclude<T, undefined>`)
#### Slots
Slots for the Tabs component.
- `trigger`: Custom content for the trigger slot. (type `((props: T & { active: boolean; }) => any) | undefined`)
- `content`: Custom content for the content slot. (type `((props: T & { active: boolean; }) => any) | undefined`)
- `indicator`: Custom content for the indicator slot. (type `(() => any) | undefined`)

### TabsCompact

#### Props
Properties for the TabsCompact component.
- `items`: Items rendered by the component. (type `T[]`; required)
- `enableIndicator`: Whether to enable indicator. (type `boolean`; optional)
- `listProps`: Properties forwarded to the list element. (type `TabsListProps`; optional)
- `triggerProps`: Properties forwarded to the trigger element. (type `TabsTriggerProps`; optional)
- `contentProps`: Properties forwarded to the content element. (type `TabsContentProps`; optional)
- `indicatorProps`: Properties forwarded to the indicator element. (type `TabsIndicatorProps`; optional)
- `modelValue`: The controlled value of the tab to activate. Can be bind as `v-model`. (type `T['value'] | null`; optional)
- `defaultValue`: The value of the tab that should be active when initially rendered. Use when you do not need to control the state of the tabs (type `T['value'] | null`; optional)
- `activationMode`: Whether a tab is activated automatically (on focus) or manually (on click). (type `TabsActivationMode`; default `automatic`; optional)
- `unmountOnHide`: When `true`, the element will be unmounted on closed state. (type `boolean`; default ``true``; optional)
- `dir`: The direction of navigation between items. (type `Direction`; optional)
- `orientation`: The orientation of the group. Mainly so arrow navigation is done accordingly (left & right vs. up & down) (type `DataOrientation`; optional)
- `loop`: Whether keyboard navigation should loop around (type `boolean`; default `false`; optional)
#### Emits
Events for the TabsCompact component.
- `update:modelValue`: Event handler called when the value changes (type `[payload: Exclude<T, undefined>]`; parameters `payload: Exclude<T, undefined>`)
#### Slots
Slots for the TabsCompact component.
- `trigger`: Custom content for the trigger slot. (type `((props: T & { active: boolean; }) => any) | undefined`)
- `content`: Custom content for the content slot. (type `((props: T & { active: boolean; }) => any) | undefined`)
- `indicator`: Custom content for the indicator slot. (type `(() => any) | undefined`)

### TabsContent

#### Props
Properties for the TabsContent component.
- `value`: A unique value that associates the content with a trigger. (type `string | number`; required)
- `forceMount`: Used to force mounting when more control is needed. Useful when controlling animation with Vue animation libraries. (type `boolean`; optional)

### TabsIndicator

#### Props
Properties for the TabsIndicator component.
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### TabsList

- No documented props, emits, slots, or slot props were available.

### TabsRoot

#### Props
Properties for the TabsRoot component.
- `modelValue`: The controlled value of the tab to activate. Can be bind as `v-model`. (type `T`; optional)
- `defaultValue`: The value of the tab that should be active when initially rendered. Use when you do not need to control the state of the tabs (type `T`; optional)
- `activationMode`: Whether a tab is activated automatically (on focus) or manually (on click). (type `TabsActivationMode`; default `automatic`; optional)
- `unmountOnHide`: When `true`, the element will be unmounted on closed state. (type `boolean`; default ``true``; optional)
- `dir`: The direction of navigation between items. (type `Direction`; optional)
- `orientation`: The orientation of the group. Mainly so arrow navigation is done accordingly (left & right vs. up & down) (type `DataOrientation`; optional)
- `loop`: Whether keyboard navigation should loop around (type `boolean`; default `false`; optional)
#### Emits
Events for the TabsRoot component.
- `update:modelValue`: Event handler called when the value changes (type `[payload: Exclude<T, undefined>]`; parameters `payload: Exclude<T, undefined>`)

### TabsTrigger

#### Props
Properties for the TabsTrigger component.
- `value`: A unique value that associates the trigger with a content. (type `string | number`; required)
- `disabled`: When `true`, prevents the user from interacting with the tab. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
