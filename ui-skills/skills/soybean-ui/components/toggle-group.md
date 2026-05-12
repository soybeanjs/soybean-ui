# ToggleGroup

Source URL: https://ui.soybeanjs.cn/components/toggle-group
Markdown URL: https://ui.soybeanjs.cn/components/toggle-group.md
Category: Forms
Description: A set of two-state buttons that can be toggled on or off as a single or multiple selection group.

## Overview

A set of two-state buttons that can be toggled on or off as a single or multiple selection group.

## Usage

Usage examples for toggle-group are rendered on the site.

## Demos

Interactive demos for toggle-group are rendered on the site.

## API

Structured API summary generated from build-time component metadata.

- Exported symbols (3): ToggleGroup, ToggleGroupItem, ToggleGroupRoot.

### ToggleGroup

#### Props

Properties for the ToggleGroup component.

- `class`: Additional class names applied to the root element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `color`: Theme color of the component. (type `ThemeColor`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `variant`: Visual variant of the component. (type `ToggleGroupVariant`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<ToggleGroupUi>`; optional)
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

Events for the ToggleGroup component.

- `update:modelValue`: No description. (type `[value: M extends true ? T[] : T]`; parameters `value: M extends true ? T[] : T`)

### ToggleGroupItem

#### Props

Properties for the ToggleGroupItem component.

- `value`: A unique value that identifies the item inside the group. (type `T`; required)
- `type`: The type of the button element. Can be one of 'button', 'submit', or 'reset'. (type `ButtonType`; default `'button'`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### ToggleGroupRoot

#### Props

Properties for the ToggleGroupRoot component.

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

Events for the ToggleGroupRoot component.

- `update:modelValue`: No description. (type `[value: M extends true ? T[] : T]`; parameters `value: M extends true ? T[] : T`)
