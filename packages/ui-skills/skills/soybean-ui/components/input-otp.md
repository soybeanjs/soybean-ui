# InputOtp

Source URL: https://ui.soybeanjs.cn/components/input-otp
Markdown URL: https://ui.soybeanjs.cn/components/input-otp.md
Category: Forms
Description: InputOtp is a one-time-password input built around a real native input. It keeps the robust selection, paste, and mobile autofill behavior from vue-input-otp while exposing a default SoybeanUI presentation and a fully custom scoped slot.

## Overview

InputOtp is a one-time-password input built around a real native input. It keeps the robust selection, paste, and mobile autofill behavior from vue-input-otp while exposing a default SoybeanUI presentation and a fully custom scoped slot.

## Usage

Usage examples for input-otp are rendered on the site.

## Demo

Interactive demos for input-otp are rendered on the site.

## API

Structured API summary generated from build-time component metadata.

- Exported symbols (5): InputOtp, InputOtpCompact, InputOtpInput, InputOtpPositioner, InputOtpRoot.

### InputOtp

#### Props

Properties for the InputOtp component.

- `class`: Root class. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `align`: Align. (type `Align`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<InputOtpUi>`; optional)
- `id`: The id of the native input element. (type `string`; optional)
- `autocomplete`: Autocomplete hint passed to the native input. (type `string`; optional)
- `autofocus`: Whether the input should be focused on mount. (type `boolean`; optional)
- `disabled`: Whether the input is disabled. (type `boolean`; optional)
- `minlength`: Minimum length forwarded to the native input. (type `number`; optional)
- `placeholder`: Placeholder characters used by the visual slots. (type `string`; optional)
- `readonly`: Whether the input is readonly. (type `boolean`; optional)
- `aria-label`: Accessible label forwarded to the native input. (type `string`; optional)
- `modelValue`: The controlled value of the OTP input. (type `string`; optional)
- `defaultValue`: The uncontrolled default value of the OTP input. (type `string`; optional)
- `maxlength`: The number of OTP slots. (type `number`; required)
- `inputmode`: Virtual keyboard mode for mobile devices. (type `InputOtpInputMode`; optional)
- `pattern`: Pattern used to validate the whole OTP value. (type `string | RegExp`; optional)
- `pushPasswordManagerStrategy`: Strategy used to avoid overlapping password manager badges. (type `InputOtpPushPasswordManagerStrategy`; optional)
- `pasteTransformer`: Transform pasted content before it is inserted. (type `((pasted: string) => string)`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)

#### Emits

Events for the InputOtp component.

- `update:modelValue`: Emitted when the model value changes. (type `[value: string]`; parameters `value: string`)
- `complete`: Emitted when complete occurs. (type `[value: string]`; parameters `value: string`)
- `input`: Emitted when input occurs. (type `[value: string]`; parameters `value: string`)
- `change`: Emitted when change occurs. (type `[event: Event]`; parameters `event: Event`)
- `select`: Emitted when select occurs. (type `[event: Event]`; parameters `event: Event`)
- `focus`: Emitted when focus occurs. (type `[event: FocusEvent]`; parameters `event: FocusEvent`)
- `blur`: Emitted when blur occurs. (type `[event: FocusEvent]`; parameters `event: FocusEvent`)
- `mouseover`: Emitted when mouseover occurs. (type `[event: MouseEvent]`; parameters `event: MouseEvent`)
- `mouseleave`: Emitted when mouseleave occurs. (type `[event: MouseEvent]`; parameters `event: MouseEvent`)
- `paste`: Emitted when paste occurs. (type `[event: ClipboardEvent]`; parameters `event: ClipboardEvent`)

#### Slots

Slots for the InputOtp component.

- `default`: Custom content for the default slot. (type `((props: InputOtpRootSlotProps) => any) | undefined`)

#### Slot Props

Slot properties for the InputOtp component.

- `char`: The typed character at the current slot. (type `string | null`; required)
- `placeholderChar`: Placeholder character rendered when the slot is empty. (type `string | null`; required)
- `isActive`: Whether the slot is covered by the current selection or caret. (type `boolean`; required)
- `hasFakeCaret`: Whether the slot should render a fake caret. (type `boolean`; required)

### InputOtpCompact

#### Props

Properties for the InputOtpCompact component.

- `id`: The id of the native input element. (type `string`; optional)
- `autocomplete`: Autocomplete hint passed to the native input. (type `string`; optional)
- `autofocus`: Whether the input should be focused on mount. (type `boolean`; optional)
- `disabled`: Whether the input is disabled. (type `boolean`; optional)
- `minlength`: Minimum length forwarded to the native input. (type `number`; optional)
- `placeholder`: Placeholder characters used by the visual slots. (type `string`; optional)
- `readonly`: Whether the input is readonly. (type `boolean`; optional)
- `aria-label`: Accessible label forwarded to the native input. (type `string`; optional)
- `modelValue`: The controlled value of the OTP input. (type `string`; optional)
- `defaultValue`: The uncontrolled default value of the OTP input. (type `string`; optional)
- `maxlength`: The number of OTP slots. (type `number`; required)
- `inputmode`: Virtual keyboard mode for mobile devices. (type `InputOtpInputMode`; optional)
- `pattern`: Pattern used to validate the whole OTP value. (type `string | RegExp`; optional)
- `pushPasswordManagerStrategy`: Strategy used to avoid overlapping password manager badges. (type `InputOtpPushPasswordManagerStrategy`; optional)
- `pasteTransformer`: Transform pasted content before it is inserted. (type `((pasted: string) => string)`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)

#### Emits

Events for the InputOtpCompact component.

- `update:modelValue`: Emitted when the model value changes. (type `[value: string]`; parameters `value: string`)
- `complete`: Emitted when complete occurs. (type `[value: string]`; parameters `value: string`)
- `input`: Emitted when input occurs. (type `[value: string]`; parameters `value: string`)
- `change`: Emitted when change occurs. (type `[event: Event]`; parameters `event: Event`)
- `select`: Emitted when select occurs. (type `[event: Event]`; parameters `event: Event`)
- `focus`: Emitted when focus occurs. (type `[event: FocusEvent]`; parameters `event: FocusEvent`)
- `blur`: Emitted when blur occurs. (type `[event: FocusEvent]`; parameters `event: FocusEvent`)
- `mouseover`: Emitted when mouseover occurs. (type `[event: MouseEvent]`; parameters `event: MouseEvent`)
- `mouseleave`: Emitted when mouseleave occurs. (type `[event: MouseEvent]`; parameters `event: MouseEvent`)
- `paste`: Emitted when paste occurs. (type `[event: ClipboardEvent]`; parameters `event: ClipboardEvent`)

#### Slots

Slots for the InputOtpCompact component.

- `default`: Custom content for the default slot. (type `((props: InputOtpRootSlotProps) => any) | undefined`)

### InputOtpInput

- No documented props, emits, slots, or slot props were available.

### InputOtpPositioner

- No documented props, emits, slots, or slot props were available.

### InputOtpRoot

#### Props

Properties for the InputOtpRoot component.

- `id`: The id of the native input element. (type `string`; optional)
- `autocomplete`: Autocomplete hint passed to the native input. (type `string`; optional)
- `autofocus`: Whether the input should be focused on mount. (type `boolean`; optional)
- `disabled`: Whether the input is disabled. (type `boolean`; optional)
- `minlength`: Minimum length forwarded to the native input. (type `number`; optional)
- `placeholder`: Placeholder characters used by the visual slots. (type `string`; optional)
- `readonly`: Whether the input is readonly. (type `boolean`; optional)
- `aria-label`: Accessible label forwarded to the native input. (type `string`; optional)
- `modelValue`: The controlled value of the OTP input. (type `string`; optional)
- `defaultValue`: The uncontrolled default value of the OTP input. (type `string`; optional)
- `maxlength`: The number of OTP slots. (type `number`; required)
- `inputmode`: Virtual keyboard mode for mobile devices. (type `InputOtpInputMode`; optional)
- `pattern`: Pattern used to validate the whole OTP value. (type `string | RegExp`; optional)
- `pushPasswordManagerStrategy`: Strategy used to avoid overlapping password manager badges. (type `InputOtpPushPasswordManagerStrategy`; optional)
- `pasteTransformer`: Transform pasted content before it is inserted. (type `((pasted: string) => string)`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)

#### Emits

Events for the InputOtpRoot component.

- `update:modelValue`: Emitted when the model value changes. (type `[value: string]`; parameters `value: string`)
- `complete`: Emitted when complete occurs. (type `[value: string]`; parameters `value: string`)
- `input`: Emitted when input occurs. (type `[value: string]`; parameters `value: string`)
- `change`: Emitted when change occurs. (type `[event: Event]`; parameters `event: Event`)
- `select`: Emitted when select occurs. (type `[event: Event]`; parameters `event: Event`)
- `focus`: Emitted when focus occurs. (type `[event: FocusEvent]`; parameters `event: FocusEvent`)
- `blur`: Emitted when blur occurs. (type `[event: FocusEvent]`; parameters `event: FocusEvent`)
- `mouseover`: Emitted when mouseover occurs. (type `[event: MouseEvent]`; parameters `event: MouseEvent`)
- `mouseleave`: Emitted when mouseleave occurs. (type `[event: MouseEvent]`; parameters `event: MouseEvent`)
- `paste`: Emitted when paste occurs. (type `[event: ClipboardEvent]`; parameters `event: ClipboardEvent`)

#### Slot Props

Slot properties for the InputOtpRoot component.

- `slots`: Slots exposed in the slot scope. (type `InputOtpSlotProps[]`; required)
- `isFocused`: Whether the item is focused. (type `boolean`; required)
- `isHovering`: Whether the item is hovered. (type `boolean`; required)
