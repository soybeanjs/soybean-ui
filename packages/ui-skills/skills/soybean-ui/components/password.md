# Password

Source URL: https://ui.soybeanjs.cn/components/password
Markdown URL: https://ui.soybeanjs.cn/components/password.md
Category: Forms
Description: A password input field with a toggle button to show/hide the password.

## Overview

A password input field with a toggle button to show/hide the password.

## Usage

Usage examples for password are rendered on the site.

## Demos

Interactive demos for password are rendered on the site.

## API

Structured API summary generated from build-time component metadata.

- Exported symbols (2): Password, PasswordCompact.

### Password

#### Props

Properties for the Password component.

- `class`: Additional class names applied to the root element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<PasswordUi>`; optional)
- `visible`: Controlled password visibility. (type `boolean`; optional)
- `visibleProps`: Properties forwarded to the visible element. (type `ButtonProps`; optional)
- `inputRef`: The function to set the input element. (type `((el: HTMLInputElement) => void)`; optional)
- `clearable`: Whether to show the clear trigger. (type `boolean`; default `false`; optional)
- `controlProps`: Properties forwarded to the control element. (type `InputControlProps`; optional)
- `clearProps`: Properties forwarded to the clear element. (type `InputClearProps`; optional)
- `defaultValue`: The default value of the input (type `string`; optional)
- `modelValue`: The controlled value of the input (type `string`; optional)
- `disabled`: When `true`, prevents the user from interacting with the input. (type `boolean`; optional)
- `readonly`: When `true`, the input is read-only. (type `boolean`; optional)
- `rootProps`: Properties forwarded to the root element (type `BaseProps`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
- `id`: Id of the input element (type `string`; optional)
- `autofocus`: When `true`, the input is auto-focused. (type `boolean`; optional)
- `autocomplete`: The autocomplete attribute of the input (type `'on' | 'off'`; optional)
- `maxlength`: The maximum number of characters allowed in the input (type `number`; optional)
- `minlength`: The minimum number of characters allowed in the input (type `number`; optional)
- `pattern`: The pattern attribute of the input (type `string`; optional)
- `placeholder`: The placeholder of the input (type `string`; optional)
- `type`: The type of the input element. (type `InputTypeHTMLAttribute`; optional)

#### Emits

Events for the Password component.

- `update:modelValue`: Emitted when the model value changes. (type `[value: string]`; parameters `value: string`)
- `clear`: Emitted when the clear button is clicked. (type `[event: PointerEvent]`; parameters `event: PointerEvent`)
- `update:visible`: Emitted when the visible state changes. (type `[visible: boolean]`; parameters `visible: boolean`)

#### Slots

Slots for the Password component.

- `leading`: Custom content for the leading slot. (type `((props: PasswordCompactSlotProps) => any) | undefined`)
- `trailing`: Custom content for the trailing slot. (type `((props: PasswordCompactSlotProps) => any) | undefined`)
- `clear`: Custom content for the clear slot. (type `((props: PasswordCompactSlotProps) => any) | undefined`)
- `visible`: Custom content for the visible slot. (type `((props: PasswordCompactSlotProps) => any) | undefined`)

### PasswordCompact

#### Props

Properties for the PasswordCompact component.

- `visible`: Controlled password visibility. (type `boolean`; optional)
- `visibleProps`: Properties forwarded to the visible element. (type `ButtonProps`; optional)
- `inputRef`: The function to set the input element. (type `((el: HTMLInputElement) => void)`; optional)
- `clearable`: Whether to show the clear trigger. (type `boolean`; default `false`; optional)
- `controlProps`: Properties forwarded to the control element. (type `InputControlProps`; optional)
- `clearProps`: Properties forwarded to the clear element. (type `InputClearProps`; optional)
- `defaultValue`: The default value of the input (type `string`; optional)
- `modelValue`: The controlled value of the input (type `string`; optional)
- `disabled`: When `true`, prevents the user from interacting with the input. (type `boolean`; optional)
- `readonly`: When `true`, the input is read-only. (type `boolean`; optional)
- `rootProps`: Properties forwarded to the root element (type `BaseProps`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
- `id`: Id of the input element (type `string`; optional)
- `autofocus`: When `true`, the input is auto-focused. (type `boolean`; optional)
- `autocomplete`: The autocomplete attribute of the input (type `'on' | 'off'`; optional)
- `maxlength`: The maximum number of characters allowed in the input (type `number`; optional)
- `minlength`: The minimum number of characters allowed in the input (type `number`; optional)
- `pattern`: The pattern attribute of the input (type `string`; optional)
- `placeholder`: The placeholder of the input (type `string`; optional)
- `type`: The type of the input element. (type `InputTypeHTMLAttribute`; optional)

#### Emits

Events for the PasswordCompact component.

- `update:modelValue`: Emitted when the model value changes. (type `[value: string]`; parameters `value: string`)
- `clear`: Emitted when the clear button is clicked. (type `[event: PointerEvent]`; parameters `event: PointerEvent`)
- `update:visible`: Emitted when the visible state changes. (type `[visible: boolean]`; parameters `visible: boolean`)

#### Slots

Slots for the PasswordCompact component.

- `leading`: Custom content for the leading slot. (type `((props: PasswordCompactSlotProps) => any) | undefined`)
- `trailing`: Custom content for the trailing slot. (type `((props: PasswordCompactSlotProps) => any) | undefined`)
- `clear`: Custom content for the clear slot. (type `((props: PasswordCompactSlotProps) => any) | undefined`)
- `visible`: Custom content for the visible slot. (type `((props: PasswordCompactSlotProps) => any) | undefined`)

#### Slot Props

Slot properties for the PasswordCompact component.

- `modelValue`: Current model value. (type `string`; optional)
- `clear`: Clear handler. (type `() => void`; required)
- `visible`: Whether the password is visible. (type `boolean`; required)
- `toggle`: Toggle password visibility. (type `() => void`; required)
