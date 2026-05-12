# Tags Input

Source URL: https://ui.soybeanjs.cn/components/tags-input
Markdown URL: https://ui.soybeanjs.cn/components/tags-input.md
Category: Forms
Description: A composable multi-value input for adding, displaying, and removing tags, with support for object values, delimiter-based creation, and keyboard navigation.

## Overview

A composable multi-value input for adding, displaying, and removing tags, with support for object values, delimiter-based creation, and keyboard navigation.

## Usage

Usage examples for tags-input are rendered on the site.

## Demo

Interactive demos for tags-input are rendered on the site.

## API

Structured API summary generated from build-time component metadata.

- Exported symbols (8): TagsInput, TagsInputClear, TagsInputCompact, TagsInputControl, TagsInputItem, TagsInputItemDelete, TagsInputItemText, TagsInputRoot.

### TagsInput

#### Props

Properties for the TagsInput component.

- `class`: Additional class names applied to the root element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<TagsInputUi>`; optional)
- `clearable`: Whether to render the clear trigger. (type `boolean`; optional)
- `controlProps`: Props forwarded to the input element. (type `TagsInputControlProps`; optional)
- `clearProps`: Props forwarded to the clear element. (type `TagsInputClearProps`; optional)
- `itemProps`: Props forwarded to the item element. (type `TagsInputItemProps`; optional)
- `itemTextProps`: Props forwarded to the item text element. (type `TagsInputItemTextProps`; optional)
- `itemDeleteProps`: Props forwarded to the item delete element. (type `TagsInputItemDeleteProps`; optional)
- `dir`: The reading direction of the tags input. (type `Direction`; optional)
- `modelValue`: The controlled value of the tags input. (type `string[]`; optional)
- `defaultValue`: The uncontrolled default value of the tags input. (type `string[]`; optional)
- `addOnPaste`: Whether to add tags on paste. (type `boolean`; optional)
- `addOnTab`: Whether to add tags on tab. (type `boolean`; optional)
- `addOnBlur`: Whether to add tags on blur. (type `boolean`; optional)
- `duplicate`: Whether to allow duplicated tags. (type `boolean`; optional)
- `delimiter`: The delimiter used to add tags. (type `string | RegExp`; optional)
- `max`: Maximum number of tags. Set to 0 for unlimited. (type `number`; optional)
- `displayValue`: Display the value of the tag. Useful when you want to apply modifications to the value like adding a suffix (type `((value: string) => string)`; default `"(value: string) => value"`; optional)
- `id`: Id of the input element (type `string`; optional)
- `autofocus`: When `true`, the input is auto-focused. (type `boolean`; optional)
- `disabled`: When `true`, prevents the user from interacting with the input. (type `boolean`; optional)
- `maxlength`: The maximum number of characters allowed in the input (type `number`; optional)
- `minlength`: The minimum number of characters allowed in the input (type `number`; optional)
- `pattern`: The pattern attribute of the input (type `string`; optional)
- `placeholder`: The placeholder of the input (type `string`; optional)
- `readonly`: When `true`, the input is read-only. (type `boolean`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)

#### Emits

Events for the TagsInput component.

- `update:modelValue`: Emitted when the model value changes. (type `[value: string[]]`; parameters `value: string[]`)
- `invalid`: Emitted when invalid occurs. (type `[value: string]`; parameters `value: string`)
- `addTag`: Emitted when add tag occurs. (type `[value: string]`; parameters `value: string`)
- `removeTag`: Emitted when remove tag occurs. (type `[value: string]`; parameters `value: string`)

#### Slots

Slots for the TagsInput component.

- `item`: Custom item content or full item replacement. (type `((props: TagsInputCompactSlotProps) => any) | undefined`)

### TagsInputClear

#### Props

Properties for the TagsInputClear component.

- `type`: The type of the button element. Can be one of 'button', 'submit', or 'reset'. (type `ButtonType`; default `'button'`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### TagsInputCompact

#### Props

Properties for the TagsInputCompact component.

- `clearable`: Whether to render the clear trigger. (type `boolean`; optional)
- `controlProps`: Props forwarded to the input element. (type `TagsInputControlProps`; optional)
- `clearProps`: Props forwarded to the clear element. (type `TagsInputClearProps`; optional)
- `itemProps`: Props forwarded to the item element. (type `TagsInputItemProps`; optional)
- `itemTextProps`: Props forwarded to the item text element. (type `TagsInputItemTextProps`; optional)
- `itemDeleteProps`: Props forwarded to the item delete element. (type `TagsInputItemDeleteProps`; optional)
- `dir`: The reading direction of the tags input. (type `Direction`; optional)
- `modelValue`: The controlled value of the tags input. (type `string[]`; optional)
- `defaultValue`: The uncontrolled default value of the tags input. (type `string[]`; optional)
- `addOnPaste`: Whether to add tags on paste. (type `boolean`; optional)
- `addOnTab`: Whether to add tags on tab. (type `boolean`; optional)
- `addOnBlur`: Whether to add tags on blur. (type `boolean`; optional)
- `duplicate`: Whether to allow duplicated tags. (type `boolean`; optional)
- `delimiter`: The delimiter used to add tags. (type `string | RegExp`; optional)
- `max`: Maximum number of tags. Set to 0 for unlimited. (type `number`; optional)
- `displayValue`: Display the value of the tag. Useful when you want to apply modifications to the value like adding a suffix (type `((value: string) => string)`; default `"(value: string) => value"`; optional)
- `id`: Id of the input element (type `string`; optional)
- `autofocus`: When `true`, the input is auto-focused. (type `boolean`; optional)
- `disabled`: When `true`, prevents the user from interacting with the input. (type `boolean`; optional)
- `maxlength`: The maximum number of characters allowed in the input (type `number`; optional)
- `minlength`: The minimum number of characters allowed in the input (type `number`; optional)
- `pattern`: The pattern attribute of the input (type `string`; optional)
- `placeholder`: The placeholder of the input (type `string`; optional)
- `readonly`: When `true`, the input is read-only. (type `boolean`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)

#### Emits

Events for the TagsInputCompact component.

- `update:modelValue`: Emitted when the model value changes. (type `[value: string[]]`; parameters `value: string[]`)
- `invalid`: Emitted when invalid occurs. (type `[value: string]`; parameters `value: string`)
- `addTag`: Emitted when add tag occurs. (type `[value: string]`; parameters `value: string`)
- `removeTag`: Emitted when remove tag occurs. (type `[value: string]`; parameters `value: string`)

#### Slots

Slots for the TagsInputCompact component.

- `item`: Custom item content or full item replacement. (type `((props: TagsInputCompactSlotProps) => any) | undefined`)

#### Slot Props

Slot properties for item-related compact slots.

- `value`: Value associated with the current item. (type `string`; required)
- `index`: Current item index. (type `number`; required)
- `displayedValue`: Current item display value. (type `string`; required)
- `onDelete`: Delete handler for the current item. (type `() => void`; required)
- `onClear`: Clear handler for the current item. (type `() => void`; required)

### TagsInputControl

- No documented props, emits, slots, or slot props were available.

### TagsInputItem

#### Props

Properties for the TagsInputItem component.

- `value`: Value associated with the tag. (type `string`; required)
- `disabled`: Whether to disable the tag item. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### TagsInputItemDelete

#### Props

Properties for the TagsInputItemDelete component.

- `type`: The type of the button element. Can be one of 'button', 'submit', or 'reset'. (type `ButtonType`; default `'button'`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### TagsInputItemText

#### Props

Properties for the TagsInputItemText component.

- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### TagsInputRoot

#### Props

Properties for the TagsInputRoot component.

- `dir`: The reading direction of the tags input. (type `Direction`; optional)
- `modelValue`: The controlled value of the tags input. (type `string[]`; optional)
- `defaultValue`: The uncontrolled default value of the tags input. (type `string[]`; optional)
- `addOnPaste`: Whether to add tags on paste. (type `boolean`; optional)
- `addOnTab`: Whether to add tags on tab. (type `boolean`; optional)
- `addOnBlur`: Whether to add tags on blur. (type `boolean`; optional)
- `duplicate`: Whether to allow duplicated tags. (type `boolean`; optional)
- `delimiter`: The delimiter used to add tags. (type `string | RegExp`; optional)
- `max`: Maximum number of tags. Set to 0 for unlimited. (type `number`; optional)
- `displayValue`: Display the value of the tag. Useful when you want to apply modifications to the value like adding a suffix (type `((value: string) => string)`; default `"(value: string) => value"`; optional)
- `id`: Id of the input element (type `string`; optional)
- `autofocus`: When `true`, the input is auto-focused. (type `boolean`; optional)
- `disabled`: When `true`, prevents the user from interacting with the input. (type `boolean`; optional)
- `maxlength`: The maximum number of characters allowed in the input (type `number`; optional)
- `minlength`: The minimum number of characters allowed in the input (type `number`; optional)
- `pattern`: The pattern attribute of the input (type `string`; optional)
- `placeholder`: The placeholder of the input (type `string`; optional)
- `readonly`: When `true`, the input is read-only. (type `boolean`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)

#### Emits

Events for the TagsInputRoot component.

- `update:modelValue`: Emitted when the model value changes. (type `[value: string[]]`; parameters `value: string[]`)
- `invalid`: Emitted when invalid occurs. (type `[value: string]`; parameters `value: string`)
- `addTag`: Emitted when add tag occurs. (type `[value: string]`; parameters `value: string`)
- `removeTag`: Emitted when remove tag occurs. (type `[value: string]`; parameters `value: string`)
