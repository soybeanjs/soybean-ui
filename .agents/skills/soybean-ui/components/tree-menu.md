# TreeMenu

Source URL: https://ui.soybeanjs.cn/components/tree-menu
Markdown URL: https://ui.soybeanjs.cn/components/tree-menu.md
Category: Navigation
Description: A hierarchical menu component commonly used for sidebar navigation. It supports nested items, grouping, icons, badges, and collapse state.

## Overview

A hierarchical menu component commonly used for sidebar navigation. It supports nested items, grouping, icons, badges, and collapse state.

## Usage

Usage examples for tree-menu are rendered on the site.

## Demos

Interactive demos for tree-menu are rendered on the site.

## API

Structured API summary generated from build-time component metadata.
- Exported symbols (16): TreeMenu, TreeMenuBaseItem, TreeMenuButton, TreeMenuCollapsible, TreeMenuCompact, TreeMenuGroup, TreeMenuGroupLabel, TreeMenuGroupRoot, TreeMenuItem, TreeMenuOptionCompact, TreeMenuOptionsCompact, TreeMenuOptionSlotCompact, TreeMenuRoot, TreeMenuSlotCompact, TreeMenuStyledItem, TreeMenuSub.

### TreeMenu

#### Props
Properties for the TreeMenu component.
- `class`: Additional class names applied to the root element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<Record<TreeMenuUiSlot, ClassValue>>`; optional)
- `modelValue`: the active value of the tree menu. can be bound-with with `v-model`. (type `string`; optional)
- `defaultValue`: the value of the tree menu when initially rendered. use when you do not need to control the state of the tree. (type `string`; optional)
- `expanded`: the expanded value of the tree menu. can be bound-with with `v-model`. (type `string[]`; optional)
- `defaultExpanded`: the expanded value of the tree menu when initially rendered. use when you do not need to control the state of the tree. (type `string[]`; optional)
- `collapsed`: Whether the tree menu is collapsed. (type `boolean`; default `false`; optional)
- `defaultCollapsed`: The value of the tree menu when it's collapsed. (type `boolean`; optional)
- `collapsedWidth`: The width of the sidebar menu when it's collapsed. (type `number`; default `50`; optional)
- `indent`: The width of the indent. (type `number`; default `16`; optional)
- `pxToRem`: The function to convert pixels to rem. (type `((px: number) => number)`; default `(px: number) => px / 16 (16 is the base font size)`; optional)
- `items`: Items rendered by the component. (type `TreeMenuOptionData<T>[]`; required)
- `groupRootProps`: Properties forwarded to the group root element. (type `TreeMenuGroupRootProps`; optional)
- `groupProps`: Properties forwarded to the group element. (type `TreeMenuGroupProps`; optional)
- `groupLabelProps`: Properties forwarded to the group label element. (type `TreeMenuGroupLabelProps`; optional)
- `showGroupIcon`: Whether to show the group icon. (type `boolean`; default `false`; optional)
- `side`: Horizontal side. (type `HorizontalSide`; optional)
- `itemProps`: Properties forwarded to the item element. (type `TreeMenuItemProps`; optional)
- `linkProps`: Properties forwarded to the link element. (type `LinkProps`; optional)
- `subProps`: Properties forwarded to the sub element. (type `TreeMenuSubProps`; optional)
- `buttonProps`: Properties forwarded to the button element. (type `TreeMenuButtonProps`; optional)
- `collapsibleProps`: Properties forwarded to the collapsible element. (type `TreeMenuCollapsibleProps`; optional)
#### Emits
Events for the TreeMenu component.
- `update:modelValue`: Emitted when the model value changes. (type `[value: string]`; parameters `value: string`)
- `update:expanded`: Emitted when the expanded state changes. (type `[value: string[]]`; parameters `value: string[]`)
- `update:collapsed`: Emitted when the collapsed state changes. (type `[value: boolean]`; parameters `value: boolean`)
- `selectDropdown`: Emitted when select dropdown occurs. (type `[value: string]`; parameters `value: string`)
#### Slots
Slots for the TreeMenu component.
- `top`: Custom content rendered before the options. (type `(() => any) | undefined`)
- `bottom`: Custom content rendered after the options. (type `(() => any) | undefined`)
- `group-label`: Custom content for the group label slot. (type `((props: { item: TreeMenuOptionData<T>; }) => any) | undefined`)
- `item`: Custom content for the item slot. (type `((props: { item: T; }) => any) | undefined`)
- `item-leading`: Custom content for the item leading slot. (type `((props: { item: T; }) => any) | undefined`)
- `item-trailing`: Custom content for the item trailing slot. (type `((props: { item: T; }) => any) | undefined`)

### TreeMenuBaseItem

#### Props
Properties for the TreeMenuBaseItem component.
- `value`: The unique value of the item. (type `string`; required)
- `disabled`: When `true`, prevents the user from interacting with the item. (type `boolean`; optional)

### TreeMenuButton

#### Props
Properties for the TreeMenuButton component.
- `disabledActive`: When `true`, prevents the user from activating the item. (type `boolean`; default `false`; optional)
- `type`: The type of the button element. Can be one of 'button', 'submit', or 'reset'. (type `ButtonType`; default `'button'`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### TreeMenuCollapsible

#### Props
Properties for the TreeMenuCollapsible component.
- `disabledCollapsible`: When `true`, prevents the user from activating the collapsible trigger. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### TreeMenuCompact

#### Props
Properties for the TreeMenuCompact component.
- `modelValue`: the active value of the tree menu. can be bound-with with `v-model`. (type `string`; optional)
- `defaultValue`: the value of the tree menu when initially rendered. use when you do not need to control the state of the tree. (type `string`; optional)
- `expanded`: the expanded value of the tree menu. can be bound-with with `v-model`. (type `string[]`; optional)
- `defaultExpanded`: the expanded value of the tree menu when initially rendered. use when you do not need to control the state of the tree. (type `string[]`; optional)
- `collapsed`: Whether the tree menu is collapsed. (type `boolean`; default `false`; optional)
- `defaultCollapsed`: The value of the tree menu when it's collapsed. (type `boolean`; optional)
- `collapsedWidth`: The width of the sidebar menu when it's collapsed. (type `number`; default `50`; optional)
- `indent`: The width of the indent. (type `number`; default `16`; optional)
- `pxToRem`: The function to convert pixels to rem. (type `((px: number) => number)`; default `(px: number) => px / 16 (16 is the base font size)`; optional)
- `items`: Items rendered by the component. (type `TreeMenuOptionData<T>[]`; required)
- `groupRootProps`: Properties forwarded to the group root element. (type `TreeMenuGroupRootProps`; optional)
- `groupProps`: Properties forwarded to the group element. (type `TreeMenuGroupProps`; optional)
- `groupLabelProps`: Properties forwarded to the group label element. (type `TreeMenuGroupLabelProps`; optional)
- `showGroupIcon`: Whether to show the group icon. (type `boolean`; default `false`; optional)
- `side`: Horizontal side. (type `HorizontalSide`; optional)
- `itemProps`: Properties forwarded to the item element. (type `TreeMenuItemProps`; optional)
- `linkProps`: Properties forwarded to the link element. (type `LinkProps`; optional)
- `subProps`: Properties forwarded to the sub element. (type `TreeMenuSubProps`; optional)
- `buttonProps`: Properties forwarded to the button element. (type `TreeMenuButtonProps`; optional)
- `collapsibleProps`: Properties forwarded to the collapsible element. (type `TreeMenuCollapsibleProps`; optional)
#### Emits
Events for the TreeMenuCompact component.
- `update:modelValue`: Emitted when the model value changes. (type `[value: string]`; parameters `value: string`)
- `update:expanded`: Emitted when the expanded state changes. (type `[value: string[]]`; parameters `value: string[]`)
- `update:collapsed`: Emitted when the collapsed state changes. (type `[value: boolean]`; parameters `value: boolean`)
- `selectDropdown`: Emitted when select dropdown occurs. (type `[value: string]`; parameters `value: string`)
#### Slots
Slots for the TreeMenuCompact component.
- `top`: Custom content rendered before the options. (type `(() => any) | undefined`)
- `bottom`: Custom content rendered after the options. (type `(() => any) | undefined`)
- `group-label`: Custom content for the group label slot. (type `((props: { item: TreeMenuOptionData<T>; }) => any) | undefined`)
- `item`: Custom content for the item slot. (type `((props: { item: T; }) => any) | undefined`)
- `item-leading`: Custom content for the item leading slot. (type `((props: { item: T; }) => any) | undefined`)
- `item-trailing`: Custom content for the item trailing slot. (type `((props: { item: T; }) => any) | undefined`)

### TreeMenuGroup

#### Props
Properties for the TreeMenuGroup component.
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### TreeMenuGroupLabel

- No documented props, emits, slots, or slot props were available.

### TreeMenuGroupRoot

- No documented props, emits, slots, or slot props were available.

### TreeMenuItem

#### Props
Properties for the TreeMenuItem component.
- `value`: The unique value of the item. (type `string`; required)
- `disabled`: When `true`, prevents the user from interacting with the item. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### TreeMenuOptionCompact

#### Props
Properties for the TreeMenuOptionCompact component.
- `as`: Rendered element tag. (type `AsTag`; optional)
- `item`: Current item data. (type `Omit<TreeMenuBaseOptionData, 'children'> & { children?: TreeMenuOptionData<TreeMenuBaseOptionData>[] | undefined; }`; required)
- `side`: Horizontal side. (type `HorizontalSide`; optional)
- `activePaths`: The active paths of the tree menu, used to determine whether the current item is active or has active descendants. (type `string[]`; optional)
- `itemProps`: Properties forwarded to the item element. (type `TreeMenuItemProps`; optional)
- `buttonProps`: Properties forwarded to the button element. (type `TreeMenuButtonProps`; optional)
- `linkProps`: Properties forwarded to the link element. (type `LinkProps`; optional)
- `collapsibleProps`: Properties forwarded to the collapsible element. (type `TreeMenuCollapsibleProps`; optional)
- `subProps`: Properties forwarded to the sub element. (type `TreeMenuSubProps`; optional)
#### Emits
Events for the TreeMenuOptionCompact component.
- `selectDropdown`: Emitted when select dropdown occurs. (type `[value: string]`; parameters `value: string`)

### TreeMenuOptionsCompact

#### Props
Properties for the TreeMenuOptionsCompact component.
- `items`: Items rendered by the component. (type `TreeMenuOptionData<T>[]`; required)
- `groupRootProps`: Properties forwarded to the group root element. (type `TreeMenuGroupRootProps`; optional)
- `groupProps`: Properties forwarded to the group element. (type `TreeMenuGroupProps`; optional)
- `groupLabelProps`: Properties forwarded to the group label element. (type `TreeMenuGroupLabelProps`; optional)
- `showGroupIcon`: Whether to show the group icon. (type `boolean`; default `false`; optional)
- `side`: Horizontal side. (type `HorizontalSide`; optional)
- `itemProps`: Properties forwarded to the item element. (type `TreeMenuItemProps`; optional)
- `linkProps`: Properties forwarded to the link element. (type `LinkProps`; optional)
- `subProps`: Properties forwarded to the sub element. (type `TreeMenuSubProps`; optional)
- `buttonProps`: Properties forwarded to the button element. (type `TreeMenuButtonProps`; optional)
- `collapsibleProps`: Properties forwarded to the collapsible element. (type `TreeMenuCollapsibleProps`; optional)
#### Emits
Events for the TreeMenuOptionsCompact component.
- `selectDropdown`: Emitted when select dropdown occurs. (type `[value: string]`; parameters `value: string`)

### TreeMenuOptionSlotCompact

#### Props
Slot properties for the TreeMenuOptionCompact component.
- `showLinkIcon`: Whether to show the link icon. (type `boolean`; optional)
- `as`: Rendered element tag. (type `AsTag`; optional)
- `item`: Current item data. (type `Omit<TreeMenuBaseOptionData, 'children'> & { children?: TreeMenuOptionData<TreeMenuBaseOptionData>[] | undefined; }`; required)
- `side`: Horizontal side. (type `HorizontalSide`; optional)
- `activePaths`: The active paths of the tree menu, used to determine whether the current item is active or has active descendants. (type `string[]`; optional)
- `itemProps`: Properties forwarded to the item element. (type `TreeMenuItemProps`; optional)
- `buttonProps`: Properties forwarded to the button element. (type `TreeMenuButtonProps`; optional)
- `linkProps`: Properties forwarded to the link element. (type `LinkProps`; optional)
- `collapsibleProps`: Properties forwarded to the collapsible element. (type `TreeMenuCollapsibleProps`; optional)
- `subProps`: Properties forwarded to the sub element. (type `TreeMenuSubProps`; optional)

### TreeMenuRoot

#### Props
Properties for the TreeMenuRoot component.
- `modelValue`: the active value of the tree menu. can be bound-with with `v-model`. (type `string`; optional)
- `defaultValue`: the value of the tree menu when initially rendered. use when you do not need to control the state of the tree. (type `string`; optional)
- `expanded`: the expanded value of the tree menu. can be bound-with with `v-model`. (type `string[]`; optional)
- `defaultExpanded`: the expanded value of the tree menu when initially rendered. use when you do not need to control the state of the tree. (type `string[]`; optional)
- `collapsed`: Whether the tree menu is collapsed. (type `boolean`; default `false`; optional)
- `defaultCollapsed`: The value of the tree menu when it's collapsed. (type `boolean`; optional)
- `collapsedWidth`: The width of the sidebar menu when it's collapsed. (type `number`; default `50`; optional)
- `indent`: The width of the indent. (type `number`; default `16`; optional)
- `pxToRem`: The function to convert pixels to rem. (type `((px: number) => number)`; default `(px: number) => px / 16 (16 is the base font size)`; optional)
#### Emits
Events for the TreeMenuRoot component.
- `update:modelValue`: Emitted when the model value changes. (type `[value: string]`; parameters `value: string`)
- `update:expanded`: Emitted when the expanded state changes. (type `[value: string[]]`; parameters `value: string[]`)
- `update:collapsed`: Emitted when the collapsed state changes. (type `[value: boolean]`; parameters `value: boolean`)

### TreeMenuSlotCompact

- No documented props, emits, slots, or slot props were available.

### TreeMenuStyledItem

#### Props
Properties for the TreeMenuStyledItem component.
- `class`: Additional class names applied to the root element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<Record<'item' | 'button', ClassValue>>`; optional)

### TreeMenuSub

#### Props
Properties for the TreeMenuSub component.
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
