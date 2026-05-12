# Switch

Source URL: https://ui.soybeanjs.cn/components/switch
Markdown URL: https://ui.soybeanjs.cn/components/switch.md
Category: Forms
Description: A control that allows the user to toggle between checked and not checked.

## Overview

A control that allows the user to toggle between checked and not checked.

## Usage

Usage examples for switch are rendered on the site.

## Demos

Interactive demos for switch are rendered on the site.

## API

Structured API summary generated from build-time component metadata.

- Exported symbols (5): Switch, SwitchCompact, SwitchControl, SwitchRoot, SwitchThumb.

### Switch

#### Props

Properties for the Switch component.

- `class`: Additional class names applied to the root element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<SwitchUi>`; optional)
- `color`: Theme color of the component. (type `ThemeColor`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `shape`: Shape of the component. (type `SwitchShape`; optional)
- `controlProps`: Properties forwarded to the control element. (type `SwitchControlProps`; optional)
- `thumbProps`: Properties forwarded to the thumb element. (type `SwitchThumbProps`; optional)
- `defaultValue`: The state of the switch when it is initially rendered. Use when you do not need to control its state. (type `NonNullable<T>`; optional)
- `modelValue`: The controlled state of the switch. Can be bind as `v-model`. (type `T`; optional)
- `disabled`: When `true`, prevents the user from interacting with the switch. (type `boolean`; optional)
- `value`: The value given as data when submitted with a `name`. (type `string`; optional)
- `dir`: The direction the switch should animate towards when changing state. (type `Direction`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
- `trueValue`: The value given as data when submitted with a `name`. (type `NonNullable<T>`; default `true`; optional)
- `falseValue`: The value given as data when submitted with a `name`. (type `NonNullable<T>`; default `false`; optional)

#### Emits

Events for the Switch component.

- `update:modelValue`: Event handler called when the value of the switch changes. (type `[payload: NonNullable<T>]`; parameters `payload: NonNullable<T>`)

#### Slots

Slots for the Switch component.

- `default`: Custom content for the default slot. (type `((props: SwitchCompactSlotProps<T>) => any) | undefined`)
- `leading`: Custom content for the leading slot. (type `((props: SwitchCompactSlotProps<T>) => any) | undefined`)
- `trailing`: Custom content for the trailing slot. (type `((props: SwitchCompactSlotProps<T>) => any) | undefined`)

### SwitchCompact

#### Props

Properties for the SwitchCompact component.

- `controlProps`: Properties forwarded to the control element. (type `SwitchControlProps`; optional)
- `thumbProps`: Properties forwarded to the thumb element. (type `SwitchThumbProps`; optional)
- `defaultValue`: The state of the switch when it is initially rendered. Use when you do not need to control its state. (type `NonNullable<T>`; optional)
- `modelValue`: The controlled state of the switch. Can be bind as `v-model`. (type `T`; optional)
- `disabled`: When `true`, prevents the user from interacting with the switch. (type `boolean`; optional)
- `value`: The value given as data when submitted with a `name`. (type `string`; optional)
- `dir`: The direction the switch should animate towards when changing state. (type `Direction`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
- `trueValue`: The value given as data when submitted with a `name`. (type `NonNullable<T>`; default `true`; optional)
- `falseValue`: The value given as data when submitted with a `name`. (type `NonNullable<T>`; default `false`; optional)

#### Emits

Events for the SwitchCompact component.

- `update:modelValue`: Event handler called when the value of the switch changes. (type `[payload: NonNullable<T>]`; parameters `payload: NonNullable<T>`)

#### Slots

Slots for the SwitchCompact component.

- `default`: Custom content for the default slot. (type `((props: SwitchCompactSlotProps<T>) => any) | undefined`)
- `leading`: Custom content for the leading slot. (type `((props: SwitchCompactSlotProps<T>) => any) | undefined`)
- `trailing`: Custom content for the trailing slot. (type `((props: SwitchCompactSlotProps<T>) => any) | undefined`)

#### Slot Props

Slot properties for the SwitchCompact component.

- `modelValue`: Current model value. (type `T | undefined`; required)

### SwitchControl

#### Props

Properties for the SwitchControl component.

- `id`: Id of the element (type `string`; optional)
- `type`: The type of the button element. Can be one of 'button', 'submit', or 'reset'. (type `ButtonType`; default `'button'`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### SwitchRoot

#### Props

Properties for the SwitchRoot component.

- `defaultValue`: The state of the switch when it is initially rendered. Use when you do not need to control its state. (type `NonNullable<T>`; optional)
- `modelValue`: The controlled state of the switch. Can be bind as `v-model`. (type `T`; optional)
- `disabled`: When `true`, prevents the user from interacting with the switch. (type `boolean`; optional)
- `value`: The value given as data when submitted with a `name`. (type `string`; optional)
- `dir`: The direction the switch should animate towards when changing state. (type `Direction`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
- `trueValue`: The value given as data when submitted with a `name`. (type `NonNullable<T>`; default `true`; optional)
- `falseValue`: The value given as data when submitted with a `name`. (type `NonNullable<T>`; default `false`; optional)

#### Emits

Events for the SwitchRoot component.

- `update:modelValue`: Event handler called when the value of the switch changes. (type `[payload: NonNullable<T>]`; parameters `payload: NonNullable<T>`)

### SwitchThumb

#### Props

Properties for the SwitchThumb component.

- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
