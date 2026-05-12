# Tree

Source URL: https://ui.soybeanjs.cn/components/tree
Markdown URL: https://ui.soybeanjs.cn/components/tree.md
Category: Navigation
Description: A component used to display hierarchical data.

## Overview

A component used to display hierarchical data.

## Usage

Usage examples for tree are rendered on the site.

## Demos

Interactive demos for tree are rendered on the site.

## API

Structured API summary generated from build-time component metadata.

- Exported symbols (5): TreeItem, TreeRoot, TreeVirtualizer, TreeVirtualizerItem, TreeVirtualizerRoot.

### TreeItem

#### Props

Properties for the TreeItem component.

- `value`: Value associated with the current item. (type `string`; required)
- `level`: Level. (type `number`; required)
- `disabled`: When `true`, prevents the user from selecting or toggling the item. (type `boolean`; optional)
- `disabledSelect`: When `true`, prevents the user from selecting the item. (type `boolean`; optional)
- `disabledToggle`: When `true`, prevents the user from toggling the item. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

#### Emits

Events for the TreeItem component.

- `select`: Event handler called when selecting item. (type `[event: TreeSelectEvent<string>]`; parameters `event: TreeSelectEvent<string>`)
- `toggle`: Event handler called when toggling item. (type `[event: TreeToggleEvent<string>]`; parameters `event: TreeToggleEvent<string>`)

### TreeRoot

#### Props

Properties for the TreeRoot component.

- `modelValue`: The controlled value of the tree. Can be bound-with with `v-model`. (type `U`; optional)
- `defaultValue`: The value of the tree when initially rendered. Use when you do not need to control the state of the tree (type `U`; optional)
- `multiple`: Determines whether a "single" or "multiple" items can be selected at a time. (type `IsMultiple<U, M>`; optional)
- `items`: List of items (type `T[]`; optional)
- `expanded`: The controlled value of the expanded item. Can be bound-with with `v-model`. (type `string[]`; optional)
- `defaultExpanded`: The value of the expanded tree when initially rendered. (type `string[]`; optional)
- `selectionBehavior`: How multiple selection should behave in the collection. (type `TreeSelectBehavior`; optional)
- `toggleBehavior`: Determines whether a "single" or "multiple" items can be toggled at a time. (type `TreeToggleBehavior`; default `'multiple'`; optional)
- `dir`: The reading direction. (type `Direction`; optional)
- `loop`: When `true`, keyboard navigation will loop from last item to first, and vice versa. (type `boolean`; default `true`; optional)
- `disabled`: When `true`, prevents the user from interacting with tree (type `boolean`; optional)
- `propagateSelect`: When `true`, selecting parent will select the descendants. (type `boolean`; optional)
- `bubbleSelect`: When `true`, selecting children will update the parent state. (type `boolean`; optional)
- `allowParentSelect`: When `true`, parent can be selected. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

#### Emits

Events for the TreeRoot component.

- `update:modelValue`: Emitted when the model value changes. (type `[value: M extends true ? string[] : string]`; parameters `value: M extends true ? string[] : string`)
- `update:expanded`: Emitted when the expanded state changes. (type `[value: string[]]`; parameters `value: string[]`)

### TreeVirtualizer

#### Props

Properties for the TreeVirtualizer component.

- `contentProps`: Properties forwarded to the content element. (type `VirtualizerContentProps`; optional)
- `dynamicContentProps`: Properties forwarded to the dynamic content element. (type `VirtualizerDynamicContentProps`; optional)
- `modelValue`: The controlled value of the tree. Can be bound-with with `v-model`. (type `U`; optional)
- `defaultValue`: The value of the tree when initially rendered. Use when you do not need to control the state of the tree (type `U`; optional)
- `multiple`: Determines whether a "single" or "multiple" items can be selected at a time. (type `IsMultiple<U, M>`; optional)
- `items`: List of items (type `T[]`; optional)
- `expanded`: The controlled value of the expanded item. Can be bound-with with `v-model`. (type `string[]`; optional)
- `defaultExpanded`: The value of the expanded tree when initially rendered. (type `string[]`; optional)
- `selectionBehavior`: How multiple selection should behave in the collection. (type `TreeSelectBehavior`; optional)
- `toggleBehavior`: Determines whether a "single" or "multiple" items can be toggled at a time. (type `TreeToggleBehavior`; default `'multiple'`; optional)
- `dir`: The reading direction. (type `Direction`; optional)
- `loop`: When `true`, keyboard navigation will loop from last item to first, and vice versa. (type `boolean`; default `true`; optional)
- `disabled`: When `true`, prevents the user from interacting with tree (type `boolean`; optional)
- `propagateSelect`: When `true`, selecting parent will select the descendants. (type `boolean`; optional)
- `bubbleSelect`: When `true`, selecting children will update the parent state. (type `boolean`; optional)
- `allowParentSelect`: When `true`, parent can be selected. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
- `height`: The height of the virtualizer root (type `string | number`; required)
- `options`: Options. (type `VirtualizerOptions`; optional)
- `dynamic`: Whether dynamic. (type `boolean`; optional)

#### Emits

Events for the TreeVirtualizer component.

- `update:modelValue`: Emitted when the model value changes. (type `[value: M extends true ? string[] : string]`; parameters `value: M extends true ? string[] : string`)
- `update:expanded`: Emitted when the expanded state changes. (type `[value: string[]]`; parameters `value: string[]`)

### TreeVirtualizerItem

#### Props

Properties for the TreeVirtualizerItem component.

- `value`: Value associated with the current item. (type `string`; required)
- `level`: Level. (type `number`; required)
- `disabled`: When `true`, prevents the user from selecting or toggling the item. (type `boolean`; optional)
- `disabledSelect`: When `true`, prevents the user from selecting the item. (type `boolean`; optional)
- `disabledToggle`: When `true`, prevents the user from toggling the item. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
- `data`: Data. (type `VirtualItem`; required)
- `customStyle`: Whether custom style. (type `boolean`; optional)

#### Emits

Events for the TreeVirtualizerItem component.

- `select`: Event handler called when selecting item. (type `[event: TreeSelectEvent<string>]`; parameters `event: TreeSelectEvent<string>`)
- `toggle`: Event handler called when toggling item. (type `[event: TreeToggleEvent<string>]`; parameters `event: TreeToggleEvent<string>`)

### TreeVirtualizerRoot

#### Props

Properties for the TreeVirtualizerRoot component.

- `modelValue`: The controlled value of the tree. Can be bound-with with `v-model`. (type `U`; optional)
- `defaultValue`: The value of the tree when initially rendered. Use when you do not need to control the state of the tree (type `U`; optional)
- `multiple`: Determines whether a "single" or "multiple" items can be selected at a time. (type `IsMultiple<U, M>`; optional)
- `items`: List of items (type `T[]`; optional)
- `expanded`: The controlled value of the expanded item. Can be bound-with with `v-model`. (type `string[]`; optional)
- `defaultExpanded`: The value of the expanded tree when initially rendered. (type `string[]`; optional)
- `selectionBehavior`: How multiple selection should behave in the collection. (type `TreeSelectBehavior`; optional)
- `toggleBehavior`: Determines whether a "single" or "multiple" items can be toggled at a time. (type `TreeToggleBehavior`; default `'multiple'`; optional)
- `dir`: The reading direction. (type `Direction`; optional)
- `loop`: When `true`, keyboard navigation will loop from last item to first, and vice versa. (type `boolean`; default `true`; optional)
- `disabled`: When `true`, prevents the user from interacting with tree (type `boolean`; optional)
- `propagateSelect`: When `true`, selecting parent will select the descendants. (type `boolean`; optional)
- `bubbleSelect`: When `true`, selecting children will update the parent state. (type `boolean`; optional)
- `allowParentSelect`: When `true`, parent can be selected. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
- `height`: The height of the virtualizer root (type `string | number`; required)
- `options`: Options. (type `VirtualizerOptions`; optional)
- `dynamic`: Whether dynamic. (type `boolean`; optional)

#### Emits

Events for the TreeVirtualizerRoot component.

- `update:modelValue`: Emitted when the model value changes. (type `[value: M extends true ? string[] : string]`; parameters `value: M extends true ? string[] : string`)
- `update:expanded`: Emitted when the expanded state changes. (type `[value: string[]]`; parameters `value: string[]`)
