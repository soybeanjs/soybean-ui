# Input

Source URL: https://ui.soybeanjs.cn/components/input
Markdown URL: https://ui.soybeanjs.cn/components/input.md
Category: Forms
Description: Displays a form input field or a component that looks like an input field. It supports standard input attributes, icons, and clearable functionality.

## Overview

Displays a form input field or a component that looks like an input field. It supports standard input attributes, icons, and clearable functionality.

## Usage

Usage examples for input are rendered on the site.

## Demos

Interactive demos for input are rendered on the site.

## API

Structured API summary generated from build-time component metadata.
- Exported symbols (5): Input, InputClear, InputCompact, InputControl, InputRoot.

### Input

#### Props
Properties for the Input component.
- `class`: root class (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<InputUi>`; optional)
- `inputRef`: The function to set the input element. (type `((el: HTMLInputElement) => void)`; optional)
- `clearable`: Whether to show the clear trigger. (type `boolean`; default `false`; optional)
- `controlProps`: Properties forwarded to the control element. (type `InputControlProps`; optional)
- `clearProps`: Properties forwarded to the clear element. (type `InputClearProps`; optional)
- `defaultValue`: The default value of the input (type `string`; optional)
- `modelValue`: The controlled value of the input (type `string`; optional)
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
Events for the Input component.
- `update:modelValue`: Emitted when the model value changes. (type `[value: string]`; parameters `value: string`)
#### Slots
Slots for the Input component.
- `leading`: Custom content for the leading slot. (type `((props: InputCompactSlotProps) => any) | undefined`)
- `trailing`: Custom content for the trailing slot. (type `((props: InputCompactSlotProps) => any) | undefined`)
- `clear`: Custom content for the clear slot. (type `((props: InputCompactSlotProps) => any) | undefined`)

### InputClear

#### Props
Properties for the InputClear component.
- `type`: The type of the button element. Can be one of 'button', 'submit', or 'reset'. (type `ButtonType`; default `'button'`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
#### Emits
Events for the InputClear component.
- `clear`: Emitted when the clear button is clicked. (type `[event: PointerEvent]`; parameters `event: PointerEvent`)

### InputCompact

#### Props
Properties for the InputCompact component.
- `inputRef`: The function to set the input element. (type `((el: HTMLInputElement) => void)`; optional)
- `clearable`: Whether to show the clear trigger. (type `boolean`; default `false`; optional)
- `controlProps`: Properties forwarded to the control element. (type `InputControlProps`; optional)
- `clearProps`: Properties forwarded to the clear element. (type `InputClearProps`; optional)
- `defaultValue`: The default value of the input (type `string`; optional)
- `modelValue`: The controlled value of the input (type `string`; optional)
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
Events for the InputCompact component.
- `update:modelValue`: Emitted when the model value changes. (type `[value: string]`; parameters `value: string`)
- `clear`: Emitted when the clear button is clicked. (type `[event: PointerEvent]`; parameters `event: PointerEvent`)
#### Slots
Slots for the InputCompact component.
- `leading`: Custom content for the leading slot. (type `((props: InputCompactSlotProps) => any) | undefined`)
- `trailing`: Custom content for the trailing slot. (type `((props: InputCompactSlotProps) => any) | undefined`)
- `clear`: Custom content for the clear slot. (type `((props: InputCompactSlotProps) => any) | undefined`)
#### Slot Props
Slot properties for the InputCompact component.
- `modelValue`: Current model value. (type `string`; optional)
- `clear`: Clear handler. (type `() => void`; required)

### InputControl

- No documented props, emits, slots, or slot props were available.

### InputRoot

#### Props
Properties for the InputRoot component.
- `defaultValue`: The default value of the input (type `string`; optional)
- `modelValue`: The controlled value of the input (type `string`; optional)
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
Events for the InputRoot component.
- `update:modelValue`: Emitted when the model value changes. (type `[value: string]`; parameters `value: string`)
