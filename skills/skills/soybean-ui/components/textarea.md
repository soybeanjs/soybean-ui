# Textarea

Source URL: https://ui.soybeanjs.cn/components/textarea
Markdown URL: https://ui.soybeanjs.cn/components/textarea.md
Category: Forms
Description: Multi-line text input field. Supports auto-resizing and character count.

## Overview

Multi-line text input field. Supports auto-resizing and character count.

## Usage

Usage examples for textarea are rendered on the site.

## Demos

Interactive demos for textarea are rendered on the site.

## API

Structured API summary generated from build-time component metadata.

- Exported symbols (6): Textarea, TextareaClear, TextareaCompact, TextareaControl, TextareaCounter, TextareaRoot.

### Textarea

#### Props

Properties for the Textarea component.

- `class`: Additional class names applied to the root element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<TextareaUi>`; optional)
- `resize`: The resize of the textarea if autosize is true, the resize will be ignored (type `TextareaResize`; optional)
- `textareaRef`: The function to set the textarea element. (type `((el: HTMLTextAreaElement) => void)`; optional)
- `clearable`: Whether to show the clear trigger. (type `boolean`; default `false`; optional)
- `showCounter`: Whether to show the counter. (type `boolean`; default `false`; optional)
- `controlProps`: Properties forwarded to the control element. (type `TextareaControlProps`; optional)
- `clearProps`: Properties forwarded to the clear element. (type `TextareaClearProps`; optional)
- `counterProps`: Properties forwarded to the counter element. (type `TextareaCounterProps`; optional)
- `defaultValue`: The default value of the textarea (type `string`; optional)
- `modelValue`: The controlled value of the textarea (type `string`; optional)
- `autosize`: When `true` or an options object, enables auto-resizing based on content (type `boolean | TextareaAutosizeOptions`; optional)
- `id`: Id of the textarea element (type `string`; optional)
- `autofocus`: When `true`, the textarea is auto-focused. (type `boolean`; optional)
- `disabled`: When `true`, prevents the user from interacting with the textarea. (type `boolean`; optional)
- `maxlength`: The maximum number of characters allowed in the textarea (type `number`; optional)
- `minlength`: The minimum number of characters allowed in the textarea (type `number`; optional)
- `placeholder`: The placeholder of the textarea (type `string`; optional)
- `readonly`: When `true`, the textarea is read-only. (type `boolean`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)

#### Emits

Events for the Textarea component.

- `update:modelValue`: Emitted when the model value changes. (type `[value: string]`; parameters `value: string`)
- `clear`: Emitted when the clear button is clicked. (type `[event: PointerEvent]`; parameters `event: PointerEvent`)

#### Slots

Slots for the Textarea component.

- `clear`: Custom content for the clear slot. (type `((props: TextareaCompactSlotProps) => any) | undefined`)
- `counter`: Custom content for the counter slot. (type `((props: TextareaCompactSlotProps) => any) | undefined`)
- `footer`: Custom content for the footer slot. (type `((props: TextareaCompactSlotProps) => any) | undefined`)

### TextareaClear

#### Props

Properties for the TextareaClear component.

- `type`: The type of the button element. Can be one of 'button', 'submit', or 'reset'. (type `ButtonType`; default `'button'`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

#### Emits

Events for the TextareaClear component.

- `clear`: Emitted when the clear button is clicked. (type `[event: PointerEvent]`; parameters `event: PointerEvent`)

### TextareaCompact

#### Props

Properties for the TextareaCompact component.

- `textareaRef`: The function to set the textarea element. (type `((el: HTMLTextAreaElement) => void)`; optional)
- `clearable`: Whether to show the clear trigger. (type `boolean`; default `false`; optional)
- `showCounter`: Whether to show the counter. (type `boolean`; default `false`; optional)
- `controlProps`: Properties forwarded to the control element. (type `TextareaControlProps`; optional)
- `clearProps`: Properties forwarded to the clear element. (type `TextareaClearProps`; optional)
- `counterProps`: Properties forwarded to the counter element. (type `TextareaCounterProps`; optional)
- `defaultValue`: The default value of the textarea (type `string`; optional)
- `modelValue`: The controlled value of the textarea (type `string`; optional)
- `autosize`: When `true` or an options object, enables auto-resizing based on content (type `boolean | TextareaAutosizeOptions`; optional)
- `id`: Id of the textarea element (type `string`; optional)
- `autofocus`: When `true`, the textarea is auto-focused. (type `boolean`; optional)
- `disabled`: When `true`, prevents the user from interacting with the textarea. (type `boolean`; optional)
- `maxlength`: The maximum number of characters allowed in the textarea (type `number`; optional)
- `minlength`: The minimum number of characters allowed in the textarea (type `number`; optional)
- `placeholder`: The placeholder of the textarea (type `string`; optional)
- `readonly`: When `true`, the textarea is read-only. (type `boolean`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)

#### Emits

Events for the TextareaCompact component.

- `update:modelValue`: Emitted when the model value changes. (type `[value: string]`; parameters `value: string`)
- `clear`: Emitted when the clear button is clicked. (type `[event: PointerEvent]`; parameters `event: PointerEvent`)

#### Slots

Slots for the TextareaCompact component.

- `clear`: Custom content for the clear slot. (type `((props: TextareaCompactSlotProps) => any) | undefined`)
- `counter`: Custom content for the counter slot. (type `((props: TextareaCompactSlotProps) => any) | undefined`)
- `footer`: Custom content for the footer slot. (type `((props: TextareaCompactSlotProps) => any) | undefined`)

#### Slot Props

Slot properties for the TextareaCompact component.

- `modelValue`: Current model value. (type `string`; optional)
- `clear`: Clear handler. (type `() => void`; required)
- `count`: Current character count. (type `number`; required)
- `maxlength`: Current maxlength. (type `number`; optional)

### TextareaControl

- No documented props, emits, slots, or slot props were available.

### TextareaCounter

- No documented props, emits, slots, or slot props were available.

### TextareaRoot

#### Props

Properties for the TextareaRoot component.

- `defaultValue`: The default value of the textarea (type `string`; optional)
- `modelValue`: The controlled value of the textarea (type `string`; optional)
- `autosize`: When `true` or an options object, enables auto-resizing based on content (type `boolean | TextareaAutosizeOptions`; optional)
- `id`: Id of the textarea element (type `string`; optional)
- `autofocus`: When `true`, the textarea is auto-focused. (type `boolean`; optional)
- `disabled`: When `true`, prevents the user from interacting with the textarea. (type `boolean`; optional)
- `maxlength`: The maximum number of characters allowed in the textarea (type `number`; optional)
- `minlength`: The minimum number of characters allowed in the textarea (type `number`; optional)
- `placeholder`: The placeholder of the textarea (type `string`; optional)
- `readonly`: When `true`, the textarea is read-only. (type `boolean`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)

#### Emits

Events for the TextareaRoot component.

- `update:modelValue`: Emitted when the model value changes. (type `[value: string]`; parameters `value: string`)
