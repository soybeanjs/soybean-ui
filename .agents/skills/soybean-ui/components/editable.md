# Editable

Source URL: https://ui.soybeanjs.cn/components/editable
Markdown URL: https://ui.soybeanjs.cn/components/editable.md
Category: Forms
Description: An inline text editor that switches between preview and edit states.

## Overview

An inline text editor that switches between preview and edit states.

## Usage

Usage examples for editable are rendered on the site.

## Demo

Interactive demos for editable are rendered on the site.

## API

Structured API summary generated from build-time component metadata.
- Exported symbols (9): Editable, EditableArea, EditableCancelTrigger, EditableCompact, EditableEditTrigger, EditableInput, EditablePreview, EditableRoot, EditableSubmitTrigger.

### Editable

#### Props
Properties for the Editable component.
- `class`: Additional class names applied to the root element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<EditableUi>`; optional)
- `areaProps`: Properties forwarded to the area element. (type `EditableAreaProps`; optional)
- `previewProps`: Properties forwarded to the preview element. (type `EditablePreviewProps`; optional)
- `inputProps`: Properties forwarded to the input element. (type `EditableInputProps`; optional)
- `editTriggerProps`: Properties forwarded to the edit trigger element. (type `EditableEditTriggerProps`; optional)
- `submitTriggerProps`: Properties forwarded to the submit trigger element. (type `EditableSubmitTriggerProps`; optional)
- `cancelTriggerProps`: Properties forwarded to the cancel trigger element. (type `EditableCancelTriggerProps`; optional)
- `defaultValue`: The default value of the editable field. (type `string`; optional)
- `modelValue`: The controlled value of the editable field. (type `string`; optional)
- `placeholder`: The placeholder for the editable field. (type `string | EditablePlaceholder`; optional)
- `dir`: The reading direction of the editable field when applicable. (type `Direction`; optional)
- `disabled`: When `true`, prevents the user from interacting with the editable field. (type `boolean`; optional)
- `readonly`: When `true`, prevents the user from editing the value. (type `boolean`; optional)
- `activationMode`: The activation event of the editable field. (type `EditableActivationMode`; optional)
- `selectOnFocus`: Whether to select the text in the input when it is focused. (type `boolean`; optional)
- `submitMode`: The submit event of the editable field. (type `EditableSubmitMode`; optional)
- `startWithEditMode`: Whether to start with the edit mode active. (type `boolean`; optional)
- `maxLength`: The maximum number of characters allowed. (type `number`; optional)
- `autoResize`: Whether the editable field should auto resize. (type `boolean`; optional)
- `id`: The id of the field. (type `string`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
#### Emits
Events for the Editable component.
- `update:modelValue`: Event handler called whenever the model value changes. (type `[value: string]`; parameters `value: string`)
- `submit`: Event handler called when a value is submitted. (type `[value: string]`; parameters `value: string`)
- `update:state`: Event handler called when the editable field changes state. (type `[state: EditableEventState]`; parameters `state: EditableEventState`)
#### Slots
Slot properties for the Editable component.
- `default`: Custom content for the default slot. (type `((props: EditableCompactSlotProps) => any) | undefined`)
- `preview`: Custom content for the preview slot. (type `((props: EditableCompactSlotProps) => any) | undefined`)
- `input`: Custom content for the input slot. (type `((props: EditableCompactSlotProps) => any) | undefined`)
- `edit-trigger`: Custom content for the edit trigger slot. (type `((props: EditableCompactSlotProps) => any) | undefined`)
- `submit-trigger`: Custom content for the submit trigger slot. (type `((props: EditableCompactSlotProps) => any) | undefined`)
- `cancel-trigger`: Custom content for the cancel trigger slot. (type `((props: EditableCompactSlotProps) => any) | undefined`)

### EditableArea

#### Props
Properties for the EditableArea component.
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### EditableCancelTrigger

#### Props
Properties for the EditableCancelTrigger component.
- `type`: The type of the button element. Can be one of 'button', 'submit', or 'reset'. (type `ButtonType`; default `'button'`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### EditableCompact

#### Props
Properties for the EditableCompact component.
- `areaProps`: Properties forwarded to the area element. (type `EditableAreaProps`; optional)
- `previewProps`: Properties forwarded to the preview element. (type `EditablePreviewProps`; optional)
- `inputProps`: Properties forwarded to the input element. (type `EditableInputProps`; optional)
- `editTriggerProps`: Properties forwarded to the edit trigger element. (type `EditableEditTriggerProps`; optional)
- `submitTriggerProps`: Properties forwarded to the submit trigger element. (type `EditableSubmitTriggerProps`; optional)
- `cancelTriggerProps`: Properties forwarded to the cancel trigger element. (type `EditableCancelTriggerProps`; optional)
- `defaultValue`: The default value of the editable field. (type `string`; optional)
- `modelValue`: The controlled value of the editable field. (type `string`; optional)
- `placeholder`: The placeholder for the editable field. (type `string | EditablePlaceholder`; optional)
- `dir`: The reading direction of the editable field when applicable. (type `Direction`; optional)
- `disabled`: When `true`, prevents the user from interacting with the editable field. (type `boolean`; optional)
- `readonly`: When `true`, prevents the user from editing the value. (type `boolean`; optional)
- `activationMode`: The activation event of the editable field. (type `EditableActivationMode`; optional)
- `selectOnFocus`: Whether to select the text in the input when it is focused. (type `boolean`; optional)
- `submitMode`: The submit event of the editable field. (type `EditableSubmitMode`; optional)
- `startWithEditMode`: Whether to start with the edit mode active. (type `boolean`; optional)
- `maxLength`: The maximum number of characters allowed. (type `number`; optional)
- `autoResize`: Whether the editable field should auto resize. (type `boolean`; optional)
- `id`: The id of the field. (type `string`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
#### Emits
Events for the EditableCompact component.
- `update:modelValue`: Event handler called whenever the model value changes. (type `[value: string]`; parameters `value: string`)
- `submit`: Event handler called when a value is submitted. (type `[value: string]`; parameters `value: string`)
- `update:state`: Event handler called when the editable field changes state. (type `[state: EditableEventState]`; parameters `state: EditableEventState`)
#### Slots
Slots for the EditableCompact component.
- `default`: Custom content for the default slot. (type `((props: EditableCompactSlotProps) => any) | undefined`)
- `preview`: Custom content for the preview slot. (type `((props: EditableCompactSlotProps) => any) | undefined`)
- `input`: Custom content for the input slot. (type `((props: EditableCompactSlotProps) => any) | undefined`)
- `edit-trigger`: Custom content for the edit trigger slot. (type `((props: EditableCompactSlotProps) => any) | undefined`)
- `submit-trigger`: Custom content for the submit trigger slot. (type `((props: EditableCompactSlotProps) => any) | undefined`)
- `cancel-trigger`: Custom content for the cancel trigger slot. (type `((props: EditableCompactSlotProps) => any) | undefined`)
#### Slot Props
Slot properties for the EditableCompact component.
- `modelValue`: Current model value. (type `string | undefined`; required)
- `inputValue`: Input value exposed in the slot scope. (type `string`; required)
- `isEditing`: Whether an editing. (type `boolean`; required)
- `isEmpty`: Whether an empty. (type `boolean`; required)
- `edit`: Edit exposed in the slot scope. (type `() => void`; required)
- `cancel`: Whether the component can cel. (type `() => void`; required)
- `submit`: Submit exposed in the slot scope. (type `() => void`; required)

### EditableEditTrigger

#### Props
Properties for the EditableEditTrigger component.
- `type`: The type of the button element. Can be one of 'button', 'submit', or 'reset'. (type `ButtonType`; default `'button'`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### EditableInput

#### Props
Properties for the EditableInput component.
- `id`: Id. (type `string`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### EditablePreview

#### Props
Properties for the EditablePreview component.
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### EditableRoot

#### Props
Properties for the EditableRoot component.
- `defaultValue`: The default value of the editable field. (type `string`; optional)
- `modelValue`: The controlled value of the editable field. (type `string`; optional)
- `placeholder`: The placeholder for the editable field. (type `string | EditablePlaceholder`; optional)
- `dir`: The reading direction of the editable field when applicable. (type `Direction`; optional)
- `disabled`: When `true`, prevents the user from interacting with the editable field. (type `boolean`; optional)
- `readonly`: When `true`, prevents the user from editing the value. (type `boolean`; optional)
- `activationMode`: The activation event of the editable field. (type `EditableActivationMode`; optional)
- `selectOnFocus`: Whether to select the text in the input when it is focused. (type `boolean`; optional)
- `submitMode`: The submit event of the editable field. (type `EditableSubmitMode`; optional)
- `startWithEditMode`: Whether to start with the edit mode active. (type `boolean`; optional)
- `maxLength`: The maximum number of characters allowed. (type `number`; optional)
- `autoResize`: Whether the editable field should auto resize. (type `boolean`; optional)
- `id`: The id of the field. (type `string`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
#### Emits
Events for the EditableRoot component.
- `update:modelValue`: Event handler called whenever the model value changes. (type `[value: string]`; parameters `value: string`)
- `submit`: Event handler called when a value is submitted. (type `[value: string]`; parameters `value: string`)
- `update:state`: Event handler called when the editable field changes state. (type `[state: EditableEventState]`; parameters `state: EditableEventState`)

### EditableSubmitTrigger

#### Props
Properties for the EditableSubmitTrigger component.
- `type`: The type of the button element. Can be one of 'button', 'submit', or 'reset'. (type `ButtonType`; default `'button'`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
