# InputNumber

Source URL: https://ui.soybeanjs.cn/components/input-number
Markdown URL: https://ui.soybeanjs.cn/components/input-number.md
Category: Forms
Description: A text input field that only accepts numeric input. Supports increment/decrement controls.

## Overview

A text input field that only accepts numeric input. Supports increment/decrement controls.

## Usage

Usage examples for input-number are rendered on the site.

## Demos

Interactive demos for input-number are rendered on the site.

## API

Structured API summary generated from build-time component metadata.
- Exported symbols (6): InputNumber, InputNumberCompact, InputNumberControl, InputNumberDecrement, InputNumberIncrement, InputNumberRoot.

### InputNumber

#### Props
Properties for the InputNumber component.
- `class`: Additional class names applied to the root element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<InputNumberUi>`; optional)
- `center`: Whether to center the input. (type `boolean`; default `false`; optional)
- `clearable`: Whether to show the clear trigger. (type `boolean`; default `false`; optional)
- `inputRef`: The function to set the input element. (type `((el: HTMLInputElement) => void)`; optional)
- `controlProps`: Properties forwarded to the control element. (type `InputNumberControlProps`; optional)
- `incrementProps`: Properties forwarded to the increment element. (type `InputNumberIncrementProps`; optional)
- `decrementProps`: Properties forwarded to the decrement element. (type `InputNumberDecrementProps`; optional)
- `clearProps`: Properties forwarded to the clear element. (type `ButtonProps`; optional)
- `defaultValue`: The default value of the input (type `number`; optional)
- `modelValue`: The controlled value of the input (type `number | null`; optional)
- `min`: The smallest value allowed for the input. (type `number`; optional)
- `max`: The largest value allowed for the input. (type `number`; optional)
- `step`: The amount that the input value changes with each increment or decrement "tick". (type `number`; optional)
- `stepSnapping`: When `false`, prevents the value from snapping to the nearest increment of the step value (type `boolean`; optional)
- `focusOnChange`: When `true`, the input will be focused when the value changes. (type `boolean`; optional)
- `formatOptions`: Formatting options for the value displayed in the number field. This also affects what characters are allowed to be typed by the user. (type `Intl.NumberFormatOptions`; optional)
- `locale`: The locale to use for formatting dates (type `string`; optional)
- `disableWheelChange`: When `true`, prevents the value from changing on wheel scroll. (type `boolean`; optional)
- `invertWheelChange`: When `true`, inverts the direction of the wheel change. (type `boolean`; optional)
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
Events for the InputNumber component.
- `update:modelValue`: Emitted when the model value changes. (type `[val: number | null]`; parameters `val: number | null`)
- `clear`: Emitted when the clear button is clicked. (type `[event: PointerEvent]`; parameters `event: PointerEvent`)
#### Slots
Slots for the InputNumber component.
- `leading`: Custom content for the leading slot. (type `((props: InputNumberCompactSlotProps) => any) | undefined`)
- `trailing`: Custom content for the trailing slot. (type `((props: InputNumberCompactSlotProps) => any) | undefined`)
- `clear`: Custom content for the clear slot. (type `((props: InputNumberCompactSlotProps) => any) | undefined`)
- `decrement`: Custom content for the decrement slot. (type `((props: InputNumberCompactSlotProps) => any) | undefined`)
- `increment`: Custom content for the increment slot. (type `((props: InputNumberCompactSlotProps) => any) | undefined`)

### InputNumberCompact

#### Props
Properties for the InputNumberCompact component.
- `clearable`: Whether to show the clear trigger. (type `boolean`; default `false`; optional)
- `inputRef`: The function to set the input element. (type `((el: HTMLInputElement) => void)`; optional)
- `controlProps`: Properties forwarded to the control element. (type `InputNumberControlProps`; optional)
- `incrementProps`: Properties forwarded to the increment element. (type `InputNumberIncrementProps`; optional)
- `decrementProps`: Properties forwarded to the decrement element. (type `InputNumberDecrementProps`; optional)
- `clearProps`: Properties forwarded to the clear element. (type `ButtonProps`; optional)
- `defaultValue`: The default value of the input (type `number`; optional)
- `modelValue`: The controlled value of the input (type `number | null`; optional)
- `min`: The smallest value allowed for the input. (type `number`; optional)
- `max`: The largest value allowed for the input. (type `number`; optional)
- `step`: The amount that the input value changes with each increment or decrement "tick". (type `number`; optional)
- `stepSnapping`: When `false`, prevents the value from snapping to the nearest increment of the step value (type `boolean`; optional)
- `focusOnChange`: When `true`, the input will be focused when the value changes. (type `boolean`; optional)
- `formatOptions`: Formatting options for the value displayed in the number field. This also affects what characters are allowed to be typed by the user. (type `Intl.NumberFormatOptions`; optional)
- `locale`: The locale to use for formatting dates (type `string`; optional)
- `disableWheelChange`: When `true`, prevents the value from changing on wheel scroll. (type `boolean`; optional)
- `invertWheelChange`: When `true`, inverts the direction of the wheel change. (type `boolean`; optional)
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
Events for the InputNumberCompact component.
- `update:modelValue`: Emitted when the model value changes. (type `[val: number | null]`; parameters `val: number | null`)
- `clear`: Emitted when the clear button is clicked. (type `[event: PointerEvent]`; parameters `event: PointerEvent`)
#### Slots
Slots for the InputNumberCompact component.
- `leading`: Custom content for the leading slot. (type `((props: InputNumberCompactSlotProps) => any) | undefined`)
- `trailing`: Custom content for the trailing slot. (type `((props: InputNumberCompactSlotProps) => any) | undefined`)
- `clear`: Custom content for the clear slot. (type `((props: InputNumberCompactSlotProps) => any) | undefined`)
- `decrement`: Custom content for the decrement slot. (type `((props: InputNumberCompactSlotProps) => any) | undefined`)
- `increment`: Custom content for the increment slot. (type `((props: InputNumberCompactSlotProps) => any) | undefined`)
#### Slot Props
Slot properties for the InputNumberCompact component.
- `modelValue`: Current model value. (type `number | null`; optional)
- `clear`: Clear handler. (type `() => void`; required)

### InputNumberControl

- No documented props, emits, slots, or slot props were available.

### InputNumberDecrement

#### Props
Properties for the InputNumberDecrement component.
- `type`: The type of the button element. Can be one of 'button', 'submit', or 'reset'. (type `ButtonType`; default `'button'`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### InputNumberIncrement

#### Props
Properties for the InputNumberIncrement component.
- `type`: The type of the button element. Can be one of 'button', 'submit', or 'reset'. (type `ButtonType`; default `'button'`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### InputNumberRoot

#### Props
Properties for the InputNumberRoot component.
- `defaultValue`: The default value of the input (type `number`; optional)
- `modelValue`: The controlled value of the input (type `number | null`; optional)
- `min`: The smallest value allowed for the input. (type `number`; optional)
- `max`: The largest value allowed for the input. (type `number`; optional)
- `step`: The amount that the input value changes with each increment or decrement "tick". (type `number`; optional)
- `stepSnapping`: When `false`, prevents the value from snapping to the nearest increment of the step value (type `boolean`; optional)
- `focusOnChange`: When `true`, the input will be focused when the value changes. (type `boolean`; optional)
- `formatOptions`: Formatting options for the value displayed in the number field. This also affects what characters are allowed to be typed by the user. (type `Intl.NumberFormatOptions`; optional)
- `locale`: The locale to use for formatting dates (type `string`; optional)
- `disableWheelChange`: When `true`, prevents the value from changing on wheel scroll. (type `boolean`; optional)
- `invertWheelChange`: When `true`, inverts the direction of the wheel change. (type `boolean`; optional)
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
Events for the InputNumberRoot component.
- `update:modelValue`: Emitted when the model value changes. (type `[val: number | null]`; parameters `val: number | null`)
