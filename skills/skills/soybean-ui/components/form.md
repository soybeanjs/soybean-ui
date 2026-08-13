# Form

Source URL: https://ui.soybeanjs.cn/components/form
Markdown URL: https://ui.soybeanjs.cn/components/form.md
Category: Forms
Description: A form composition layer for building validated forms with a headless core and styled wrappers. The `useForm` composable owns the values, touched/meta state, and validation pipeline (Standard Schema v1 — Zod, Valibot, ArkType, Yup, etc.), and returns a tuple of `[formState, SFormField, SFormFieldArray]` used to render the form. Fields register through slots, so any SoybeanUI input (`SInput`, `SSelect`, `SCheckbox`, `SSwitch`, `SRadioGroup`, …) or a plain custom control works without a per-control API.

## Overview

A form composition layer for building validated forms with a headless core and styled wrappers. The `useForm` composable owns the values, touched/meta state, and validation pipeline (Standard Schema v1 — Zod, Valibot, ArkType, Yup, etc.), and returns a tuple of `[formState, SFormField, SFormFieldArray]` used to render the form. Fields register through slots, so any SoybeanUI input (`SInput`, `SSelect`, `SCheckbox`, `SSwitch`, `SRadioGroup`, …) or a plain custom control works without a per-control API.

## Usage

Usage examples for form are rendered on the site.

## Features

- 📜 Schema validation — Standard Schema v1 (`@standard-schema/spec`): bring Zod, Valibot, ArkType, or Yup and get typed values + field errors
- ✅ Field-level rules — sync or async `validate` per field, merged with schema errors (`fieldErrors` wins over `schemaErrors` via `defu`)
- 🔁 Validate timing — `validateMode` controls the first submit's timing, `reValidateMode` the subsequent ones (`blur` | `input` | `change` | `submit`); `validateOnMounted` optional
- 📦 Field arrays — `append` / `remove` / `insert` / `swap` / `move` / `update` with nested path registration (`social.0.name`), plus per-item meta
- 🧩 Headless/styled split — `useForm`/`FormCompact` in `@soybeanjs/headless` (zero styles); `SForm*` wrappers inject `formVariants` classes (6 slots: field/fieldArray/label/control/description/error)
- ♿ Accessible by default — label `<label :for>` association, `aria-invalid` on error, `aria-describedby` linking description + error to the control
- 🎨 Composable layout — `label` / `control` / `description` / `error` slots plus `*Props` passthrough; `SFormFieldBase` for custom rows
- 🚦 Submit UX — `isSubmitting` / `submitCount` state for async submit, `handleSubmit` / `handleReset` / `onInvalid` hooks
- 🧰 Control-agnostic — fields receive `model-value` + a11y attributes via slot forwarding, so any value-aware control integrates

## Component family

- `useForm` (styled) — the entry composable; returns `[form, SFormField, SFormFieldArray]` where `form` carries `handleSubmit`/`handleReset`/`errors`/`isSubmitting`/`submitCount`
- `SForm` / `FormCompact` (headless) — the `<form>` element owner; forwards `orientation`/`fieldProps`/`fieldArrayProps`/`labelProps`/`controlProps`/`descriptionProps`/`errorProps` to descendants via context
- `SFormField` / `FormFieldCompact` (headless) — registers one field by `name`; owns the field's error/meta and renders label + description + control + error
- `SFormFieldArray` / `FormFieldArrayCompact` (headless) — registers a field array; default slot receives `fields`/`append`/`remove`/`insert`/`swap`/`move`/`update`
- `SFormFieldBase` / `FormFieldBaseCompact` (headless) — layout wrapper for custom rows; provides `formFieldId` / `ariaDescribedBy` / `ariaInvalid` to its slot
- `FormField` / `FormLabel` / `FormControl` / `FormDescription` / `FormError` (headless) — low-level primitives used internally by the compact (also exported for custom compositions)
- Core machinery — `useHeadlessForm` (submit/reset), `useFormState` (registration + validation pipeline), `useFieldArray` (array mutation)

## Demos

Interactive demos for form are rendered on the site.

- 01 Basic — schema-driven form (Valibot) with radio/checkbox/switch/select and a nested field array
- 02 Horizontal — horizontal `orientation` layout
- 03 Schema — Zod schema validation with required/min rules
- 04 Rules — field-level `validate` rules next to the schema
- 05 Async — async field-level validation (e.g. uniqueness check)
- 06 Array — dynamic list with append/remove/move controls
- 07 Disabled — field-level `disabled` on input/select/checkbox

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

## Notes

### Architecture and benchmark differences

`useFormState` keeps a flat `values`/`errors`/`touched` map keyed by registered field names and runs the validation pipeline on demand: schema via Standard Schema v1 plus per-field `validate` callbacks, merged with `defu(fieldErrors, schemaErrors)` so explicit field rules can refine schema messages. `useFieldArray` stores array entries as a single registered path and exposes mutation helpers that write back through the same pipeline, so nested fields (`social.0.name`) register naturally. `FormFieldBaseCompact` merges `fieldProps`/`labelProps`/`controlProps`/`descriptionProps`/`errorProps` from the form context and injects a11y state (`aria-invalid`, `aria-describedby`) into the control slot. Most benchmark libraries couple the schema validator to a framework-specific rule object; the Standard Schema interface plus the tuple-based headless/styled split are the differentiators.

| Capability                          | SoybeanUI | Ant Design | Element Plus | Mantine | Naive UI | React Hook Form |
| :---------------------------------- | :-------: | :--------: | :----------: | :-----: | :------: | :-------------: |
| headless/styled split               |    ✅     |     —      |      —       |    —    |    —     |        —        |
| Standard Schema (Zod/Valibot…)      |    ✅     |     ⚠️     |      —       |   ✅    |    —     |       ✅        |
| Field-level sync/async rules        |    ✅     |     ✅     |      ✅      |   ✅    |    ✅    |       ✅        |
| `validateMode` / `reValidateMode`   |    ✅     |     ⚠️     |      ✅      |    —    |    ✅    |        —        |
| Field array (append/remove/move)    |    ✅     |     ✅     |      —       |   ✅    |    —     |       ✅        |
| Nested path registration            |    ✅     |     ✅     |      —       |    —    |    —     |       ✅        |
| Submitting state (`isSubmitting`)   |    ✅     |     —      |      —       |   ✅    |    —     |       ✅        |
| `aria-invalid` + `aria-describedby` |    ✅     |     —      |      —       |   ✅    |    —     |        —        |
| Per-part slots + `*Props`           |    ✅     |     ⚠️     |      —       |    —    |    —     |        —        |

`⚠️` = partial (Ant Design covers most rules via `rules`/`validateTrigger` but has no Standard Schema; its `required`/`colon`/`labelAlign`/`labelWidth`/`layout` are style-level conveniences that SoybeanUI keeps out of the core).

### Cautions

- `useForm` returns a tuple — destructure by position: `const [form, SFormField, SFormFieldArray] = useForm({...})`, or `const { handleSubmit, SFormField } = useForm({...})`.
- Validation timing depends on `submitCount`: the first submit uses `validateMode`, later submits use `reValidateMode`; with the default `submit` mode errors appear after the first submit attempt.
- Array item errors are stored under dotted keys (`emails.0`) and do not bubble to the array root — validate the whole array (e.g. `min(1)`) at the array level, or render per-item errors with nested `SFormField`s.
- With Zod v4, `z.number()` does not coerce string values — a text input reports `"Invalid input: expected number"`. Use `z.coerce.number()` (or parse the value) when the control is an `<input type="text">`.
- The control slot is value-agnostic: fields forward `model-value` (and `aria-invalid`/`aria-describedby`). Custom controls must accept and emit `modelValue`.
- The form element itself renders only `data-soybean-form`/`data-orientation` — validation styles live on the field/control/error parts, so style it with the `SForm` `ui`/`class` props.
- Field-level `validate` replaces nothing — it merges with the schema (`fieldErrors` take precedence). Return `undefined` to signal "valid".
- Disabling is control-level: `disabled` on the input blocks interaction but the field still validates on submit unless you also gate the value.

## FAQ

### How do I switch between Zod and Valibot?

You don't — pass the schema directly. Standard Schema v1 accepts both: `useForm({ schema: zodSchema })` or `useForm({ schema: valibotSchema })` behave identically, and the inferred values come from `InferStandardSchemaInput`.

### How do I validate on input instead of on submit?

Set `validateMode: 'input'` (and optionally `reValidateMode: 'input'`). The first submit keeps using `validateMode`; after the first submit, `reValidateMode` takes over, which is the standard "validate on first submit, then live" pattern.

### How do I build a dynamic list of fields?

Use `SFormFieldArray`:

```vue
<template #default="{ fields, append, remove, move }">
  <div v-for="(field, index) in fields" :key="index">
    <SFormField :name="`${field.name}.${index}.name`" label="Name">
      <SInput />
    </SFormField>
    <SButtonIcon icon="lucide:minus" @click="remove(index)" />
  </div>
  <SButtonIcon icon="lucide:plus" @click="append({ name: '', url: '' })" />
</template>
```

### How do I show a loading state while submitting?

`form.isSubmitting` flips to `true` during the async `onSubmit` and back after it resolves — disable the submit button or show a spinner:

```vue
<SButton type="submit" :loading="isSubmitting">Submit</SButton>
```

### Why does my number input report "Invalid input: expected number"?

The input value is a string. With Zod v4 use `z.coerce.number()` (then `.min(...)`), or write a field-level `validate` that parses first.

### How do I reset the form to initial values?

Bind `on-reset` on `SForm` to `handleReset` (returned by `useForm`). Reset restores `initialValues`, clears errors/touched, and keeps the field values in sync with the controls.
