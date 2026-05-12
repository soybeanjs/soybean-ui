# Form

Source URL: https://ui.soybeanjs.cn/components/form
Markdown URL: https://ui.soybeanjs.cn/components/form.md
Category: Forms
Description: Building forms with validation and error handling. Supports schema validation via Zod, Valibot, etc.

## Overview

Building forms with validation and error handling. Supports schema validation via Zod, Valibot, etc.

## Usage

Usage examples for form are rendered on the site.

## Demos

Interactive demos for form are rendered on the site.

## API

Structured API summary generated from build-time component metadata.

- Exported symbols (10): Form, FormCompact, FormControl, FormDescription, FormError, FormField, FormFieldArrayCompact, FormFieldBaseCompact, FormFieldCompact, FormLabel.

### Form

#### Props

Properties for the FormCompact component.

- `class`: Additional class names applied to the form element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<FormUi>`; optional)
- `fieldProps`: No description. (type `FormFieldProps`; optional)
- `fieldArrayProps`: No description. (type `FormFieldProps`; optional)
- `orientation`: Orientation of the form field. (type `DataOrientation`; default `'vertical'`; optional)
- `labelProps`: Properties forwarded to the label element. (type `FormLabelProps`; optional)
- `controlProps`: Properties forwarded to the control element. (type `FormControlProps`; optional)
- `descriptionProps`: Properties forwarded to the description element. (type `FormDescriptionProps`; optional)
- `errorProps`: Properties forwarded to the error element. (type `FormErrorProps`; optional)

### FormCompact

#### Props

Properties for the FormCompact component.

- `fieldProps`: No description. (type `FormFieldProps`; optional)
- `fieldArrayProps`: No description. (type `FormFieldProps`; optional)
- `orientation`: Orientation of the form field. (type `DataOrientation`; default `'vertical'`; optional)
- `labelProps`: Properties forwarded to the label element. (type `FormLabelProps`; optional)
- `controlProps`: Properties forwarded to the control element. (type `FormControlProps`; optional)
- `descriptionProps`: Properties forwarded to the description element. (type `FormDescriptionProps`; optional)
- `errorProps`: Properties forwarded to the error element. (type `FormErrorProps`; optional)

### FormControl

- No documented props, emits, slots, or slot props were available.

### FormDescription

- No documented props, emits, slots, or slot props were available.

### FormError

- No documented props, emits, slots, or slot props were available.

### FormField

#### Props

Properties for the FormField component.

- `error`: Error. (type `string`; optional)
- `isFieldArray`: Whether the field is an array. (type `boolean`; optional)

#### Slots

Slots for the FormField component.

- `default`: Custom content for the default slot. (type `((props: FormFieldState<any, any>) => any) | undefined`)
- `label`: Custom content for the label slot. (type `((props: FormFieldState<any, any>) => any) | undefined`)
- `description`: Custom content for the description slot. (type `((props: FormFieldState<any, any>) => any) | undefined`)

### FormFieldArrayCompact

#### Slots

Slots for the FormFieldArrayCompact component.

- `default`: Custom content for the default slot. (type `((props: FormFieldArrayStates<Values, Name>) => any) | undefined`)
- `label`: Custom content for the label slot. (type `((props: FormFieldArrayStates<Values, Name>) => any) | undefined`)
- `description`: Custom content for the description slot. (type `((props: FormFieldArrayStates<Values, Name>) => any) | undefined`)

### FormFieldBaseCompact

#### Props

Properties for the FormFieldBaseCompact component.

- `error`: Error. (type `string`; optional)
- `isFieldArray`: Whether the field is an array. (type `boolean`; optional)
- `orientation`: Orientation of the form field. (type `DataOrientation`; default `'vertical'`; optional)
- `label`: Label text rendered by the component. (type `string`; optional)
- `description`: Description text rendered by the component. (type `string`; optional)
- `labelProps`: Properties forwarded to the label element. (type `FormLabelProps`; optional)
- `controlProps`: Properties forwarded to the control element. (type `FormControlProps`; optional)
- `descriptionProps`: Properties forwarded to the description element. (type `FormDescriptionProps`; optional)
- `errorProps`: Properties forwarded to the error element. (type `FormErrorProps`; optional)

#### Slots

Slots for the FormFieldBaseCompact component.

- `default`: Custom content for the default slot. (type `(() => any) | undefined`)
- `label`: Custom content for the label slot. (type `(() => any) | undefined`)
- `description`: Custom content for the description slot. (type `(() => any) | undefined`)

### FormFieldCompact

#### Props

State and methods provided by the form field context.

- `name`: The name of the form field, used for registration and value retrieval. (type `Name`; required)
- `orientation`: Orientation of the form field. (type `DataOrientation`; default `'vertical'`; optional)
- `label`: Label text rendered by the component. (type `string`; optional)
- `description`: Description text rendered by the component. (type `string`; optional)
- `labelProps`: Properties forwarded to the label element. (type `FormLabelProps`; optional)
- `controlProps`: Properties forwarded to the control element. (type `FormControlProps`; optional)
- `descriptionProps`: Properties forwarded to the description element. (type `FormDescriptionProps`; optional)
- `errorProps`: Properties forwarded to the error element. (type `FormErrorProps`; optional)
- `validate`: Validate. (type `FormFieldValidator<PathValue<Values, Name>>`; optional)
- `reset`: Reset. (type `(() => void)`; optional)

#### Slots

Slots for the FormFieldCompact component.

- `default`: Custom content for the default slot. (type `((props: FormFieldState<Values, Name>) => any) | undefined`)
- `label`: Custom content for the label slot. (type `((props: FormFieldState<Values, Name>) => any) | undefined`)
- `description`: Custom content for the description slot. (type `((props: FormFieldState<Values, Name>) => any) | undefined`)

### FormLabel

#### Props

Properties for the FormLabel component.

- `for`: The id of the element the label is associated with. (type `string`; optional)
