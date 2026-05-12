# Command

Source URL: https://ui.soybeanjs.cn/components/command
Markdown URL: https://ui.soybeanjs.cn/components/command.md
Category: Navigation
Description: Fast, composable, command menu for Vue.

## Overview

Fast, composable, command menu for Vue.

## Usage

Usage examples for command are rendered on the site.

> `SCommand` now delegates filtering, grouped item aggregation, and default item composition to headless `CommandCompact`. For unstyled, data-driven usage, import `CommandCompact` from `@soybeanjs/headless/command`.

## Demos

Interactive demos for command are rendered on the site.

## API

Structured API summary generated from build-time component metadata.
- Exported symbols (6): Command, CommandCompact, CommandEmpty, CommandItemLabel, CommandSeparator, CommandShortcut.

### Command

#### Props
Properties for the Command component.
- `class`: Root class. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<CommandUi>`; optional)
- `items`: Items rendered by the component. (type `CommandOptionData<T>[]`; required)
- `placeholder`: Placeholder. (type `string`; optional)
- `searchTerm`: Search term. (type `string`; optional)
- `clearable`: Whether clearable. (type `boolean`; optional)
- `fuseOptions`: Fuse options. (type `UseFuseOptions<CommandSearchOptionData<T>>`; optional)
- `listProps`: Properties forwarded to the list element. (type `CommandListProps`; optional)
- `itemProps`: Properties forwarded to the item element. (type `CommandItemProps`; optional)
- `itemLabelProps`: Properties forwarded to the item label element. (type `CommandItemLabelProps`; optional)
- `groupProps`: Properties forwarded to the group element. (type `CommandGroupProps`; optional)
- `groupLabelProps`: Properties forwarded to the group label element. (type `CommandGroupLabelProps`; optional)
- `shortcutProps`: Properties forwarded to the shortcut element. (type `CommandShortcutProps`; optional)
- `separatorProps`: Properties forwarded to the separator element. (type `CommandSeparatorProps`; optional)
- `inputProps`: Properties forwarded to the input element. (type `CommandInputProps`; optional)
- `emptyProps`: Properties forwarded to the empty element. (type `CommandEmptyProps`; optional)
- `emptyLabel`: Empty label. (type `string`; optional)
- `modelValue`: The controlled value of the selected item(s). Use this when you need to control the state of the items. Can be bound with `v-model` (type `string`; optional)
- `defaultValue`: The default value of the selected item(s). Use this when you need to set the initial state of the items. (type `string`; optional)
- `multiple`: Determines whether a "single" or "multiple" items can be selected at a time. This prop will overwrite the inferred type from `modelValue` and `defaultValue`. (type `false`; optional)
- `selectionBehavior`: How multiple selection should behave in the collection. (type `SelectionBehavior`; default `'toggle'`; optional)
- `disabled`: When `true`, prevents the user from interacting with listbox (type `boolean`; optional)
- `dir`: The reading direction of the listbox when applicable. <br> If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode. (type `Direction`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `highlightOnHover`: When `true`, hover over item will trigger highlight (type `boolean`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
- `orientation`: The orientation of the listbox. <br>Mainly so arrow navigation is done accordingly (left & right vs. up & down) (type `DataOrientation`; optional)
#### Emits
Events for the Command component.
- `update:modelValue`: No description. (type `[value: string]`; parameters `value: string`)
- `highlight`: Event handler when highlighted element changes. (type `[payload?: CollectionItemData<ListboxCollectionItemData> | undefined]`; parameters `payload?: CollectionItemData<ListboxCollectionItemData> | undefined`)
- `entryFocus`: Event handler called when container is being focused. Can be prevented. (type `[event: CustomEvent<any>]`; parameters `event: CustomEvent<any>`)
- `leave`: Event handler called when the mouse leave the container (type `[event: Event]`; parameters `event: Event`)
- `select`: Event handler called when the selecting item. <br> It can be prevented by calling `event.preventDefault`. (type `[event: SelectEvent<string>]`; parameters `event: SelectEvent<string>`)
- `update:searchTerm`: Emitted when the search term value changes. (type `[value: string]`; parameters `value: string`)
#### Slots
Slots for the Command component.
- `input-leading`: Custom content for the input leading slot. (type `((props: CommandCompactInputSlotProps) => any) | undefined`)
- `input-trailing`: Custom content for the input trailing slot. (type `((props: CommandCompactInputSlotProps) => any) | undefined`)
- `empty`: Custom content for the empty slot. (type `(() => any) | undefined`)
- `item-leading`: Custom content for the item leading slot. (type `((props: CommandCompactItemSlotProps<T>) => any) | undefined`)
- `item-trailing`: Custom content for the item trailing slot. (type `((props: CommandCompactItemSlotProps<T>) => any) | undefined`)
- `item-label`: Custom content for the item label slot. (type `((props: CommandCompactItemSlotProps<T>) => any) | undefined`)
- `bottom`: Custom content for the bottom slot. (type `(() => any) | undefined`)

### CommandCompact

#### Props
Properties for the CommandCompact component.
- `items`: Items rendered by the component. (type `CommandOptionData<T>[]`; required)
- `placeholder`: Placeholder. (type `string`; optional)
- `searchTerm`: Search term. (type `string`; optional)
- `clearable`: Whether clearable. (type `boolean`; optional)
- `fuseOptions`: Fuse options. (type `UseFuseOptions<CommandSearchOptionData<T>>`; optional)
- `listProps`: Properties forwarded to the list element. (type `CommandListProps`; optional)
- `itemProps`: Properties forwarded to the item element. (type `CommandItemProps`; optional)
- `itemLabelProps`: Properties forwarded to the item label element. (type `CommandItemLabelProps`; optional)
- `groupProps`: Properties forwarded to the group element. (type `CommandGroupProps`; optional)
- `groupLabelProps`: Properties forwarded to the group label element. (type `CommandGroupLabelProps`; optional)
- `shortcutProps`: Properties forwarded to the shortcut element. (type `CommandShortcutProps`; optional)
- `separatorProps`: Properties forwarded to the separator element. (type `CommandSeparatorProps`; optional)
- `inputProps`: Properties forwarded to the input element. (type `CommandInputProps`; optional)
- `emptyProps`: Properties forwarded to the empty element. (type `CommandEmptyProps`; optional)
- `emptyLabel`: Empty label. (type `string`; optional)
- `modelValue`: The controlled value of the selected item(s). Use this when you need to control the state of the items. Can be bound with `v-model` (type `string`; optional)
- `defaultValue`: The default value of the selected item(s). Use this when you need to set the initial state of the items. (type `string`; optional)
- `multiple`: Determines whether a "single" or "multiple" items can be selected at a time. This prop will overwrite the inferred type from `modelValue` and `defaultValue`. (type `false`; optional)
- `selectionBehavior`: How multiple selection should behave in the collection. (type `SelectionBehavior`; default `'toggle'`; optional)
- `disabled`: When `true`, prevents the user from interacting with listbox (type `boolean`; optional)
- `dir`: The reading direction of the listbox when applicable. <br> If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode. (type `Direction`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `highlightOnHover`: When `true`, hover over item will trigger highlight (type `boolean`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
- `orientation`: The orientation of the listbox. <br>Mainly so arrow navigation is done accordingly (left & right vs. up & down) (type `DataOrientation`; optional)
#### Emits
Events for the CommandCompact component.
- `update:modelValue`: No description. (type `[value: string]`; parameters `value: string`)
- `highlight`: Event handler when highlighted element changes. (type `[payload?: CollectionItemData<ListboxCollectionItemData> | undefined]`; parameters `payload?: CollectionItemData<ListboxCollectionItemData> | undefined`)
- `entryFocus`: Event handler called when container is being focused. Can be prevented. (type `[event: CustomEvent<any>]`; parameters `event: CustomEvent<any>`)
- `leave`: Event handler called when the mouse leave the container (type `[event: Event]`; parameters `event: Event`)
- `select`: Event handler called when the selecting item. <br> It can be prevented by calling `event.preventDefault`. (type `[event: SelectEvent<string>]`; parameters `event: SelectEvent<string>`)
- `update:searchTerm`: Emitted when the search term value changes. (type `[value: string]`; parameters `value: string`)
#### Slots
Slots for the CommandCompact component.
- `input-leading`: Custom content for the input leading slot. (type `((props: CommandCompactInputSlotProps) => any) | undefined`)
- `input-trailing`: Custom content for the input trailing slot. (type `((props: CommandCompactInputSlotProps) => any) | undefined`)
- `empty`: Custom content for the empty slot. (type `(() => any) | undefined`)
- `item-leading`: Custom content for the item leading slot. (type `((props: CommandCompactItemSlotProps<T>) => any) | undefined`)
- `item-trailing`: Custom content for the item trailing slot. (type `((props: CommandCompactItemSlotProps<T>) => any) | undefined`)
- `item-label`: Custom content for the item label slot. (type `((props: CommandCompactItemSlotProps<T>) => any) | undefined`)
- `bottom`: Custom content for the bottom slot. (type `(() => any) | undefined`)

### CommandEmpty

- No documented props, emits, slots, or slot props were available.

### CommandItemLabel

- No documented props, emits, slots, or slot props were available.

### CommandSeparator

#### Props
Properties for the CommandSeparator component.
- `orientation`: Orientation of the component. Either `vertical` or `horizontal`. Defaults to `horizontal`. (type `DataOrientation`; optional)
- `decorative`: Whether or not the component is purely decorative. <br>When `true`, accessibility-related attributes are updated so that that the rendered element is removed from the accessibility tree. (type `boolean`; optional)

### CommandShortcut

#### Props
Properties for the CommandShortcut component.
- `symbolize`: Whether to convert the command value to symbol representation. (type `boolean`; default `true`; optional)
