---
head:
  title: Form
  description: 'A form composition layer for building validated forms with a headless core and styled wrappers. The useForm composable is backed by the TanStack Form engine (@tanstack/vue-form) for field-level subscriptions, field arrays, and the submit lifecycle, accepts any Standard Schema validator (Zod, Valibot, ArkType, Yup, …), and returns a context with SFormField / SFormFieldArray used to render the form. Fields register through slots, so any SoybeanUI input (SInput, SSelect, SCheckbox, SSwitch, SRadioGroup, …) or a plain custom control works without a per-control API.'
---

# Form

## Overview

A form composition layer for building validated forms with a headless core and styled wrappers. The `useForm` composable is backed by the **TanStack Form engine** (`@tanstack/vue-form`) — field-level subscriptions, field arrays, and the submit lifecycle come from the engine — and accepts any **Standard Schema** validator (Zod, Valibot, ArkType, Yup, …). It returns a context object with `SFormField` / `SFormFieldArray` used to render the form. Fields register through slots, so any SoybeanUI input (`SInput`, `SSelect`, `SCheckbox`, `SSwitch`, `SRadioGroup`, …) or a plain custom control works without a per-control API.

## Usage

<UsageCode component="form" />

## Features

- 📜 Schema validation — pass any Standard Schema validator directly (Zod, Valibot, ArkType, Yup); the library has no runtime dependency on `@standard-schema/spec`
- 🏎️ TanStack engine — field-level subscriptions, array fields, and the submit lifecycle (`isSubmitting` / `isSubmitted` / `submissionAttempts`) are powered by `@tanstack/vue-form`; the full `FormApi` is exposed as `form` for advanced usage (`Subscribe`, `setFieldValue`, `pushFieldValue`, …)
- ✅ Field-level rules — sync or async `validate` per field, merged with schema errors by the engine
- 🔁 Validate timing — `validateMode` controls the timing before the first submit attempt, `reValidateMode` the timing after (`blur` | `input` | `change` | `submit`); `validateOnMounted` optional
- 📦 Field arrays — `append` / `prepend` / `remove` / `insert` / `swap` / `move` / `update` / `replace` with nested path registration (`social[0].name`, TanStack canonical format)
- 🧩 Headless/styled split — `useForm`/`FormCompact` in `@soybeanjs/headless` (zero styles); `SForm*` wrappers inject `formVariants` classes (6 slots: field/fieldArray/label/control/description/error); the error enter/leave animation lives in the UI layer
- ♿ Accessible by default — label `<label :for>` association, `aria-invalid` on error, `aria-describedby` linking description + error to the control
- 🎨 Composable layout — `label` / `control` / `description` / `error` slots plus `*Props` passthrough; `SFormFieldBase` for custom rows
- 🧰 Control-agnostic — fields receive `model-value` + a11y attributes via slot forwarding, so any value-aware control integrates

## Component family

- `useForm` (styled) — the entry composable; returns a context with `form` (TanStack `FormApi`), `state`, `isSubmitting`, `handleSubmit`/`handleReset`, plus the bound `SFormField` / `SFormFieldArray` components
- `SForm` / `FormCompact` (headless) — the `<form>` element owner; forwards `orientation`/`fieldProps`/`fieldArrayProps`/`labelProps`/`controlProps`/`descriptionProps`/`errorProps` to descendants via context
- `SFormField` / `FormFieldCompact` (headless) — registers one field by `name`; owns the field's error/meta and renders label + description + control + error
- `SFormFieldArray` / `FormFieldArrayCompact` (headless) — registers a field array; default slot receives `fields`/`append`/`prepend`/`remove`/`insert`/`swap`/`move`/`update`/`replace`
- `SFormFieldBase` / `FormFieldBaseCompact` (headless) — layout wrapper for custom rows; provides `formFieldId` / `ariaDescribedBy` / `ariaInvalid` to its slot
- `FormField` / `FormLabel` / `FormControl` / `FormDescription` / `FormError` (headless) — low-level primitives used internally by the compact (also exported for custom compositions)
- Core engine — `@tanstack/vue-form` (`FormApi` + Vue `Field` / `Subscribe` / `useSelector`); the former `useHeadlessForm` / `useFormState` / `useFieldArray` self-built engine was retired in v0.50.0

## Demos

<PlaygroundGallery component="form" />

- 01 Basic — schema-driven form (Zod) with radio/checkbox/switch/select and a nested field array
- 02 Horizontal — horizontal `orientation` layout
- 03 Schema — Zod schema validation with required/min rules
- 04 Rules — field-level `validate` rules next to the schema
- 05 Async — async field-level validation (e.g. uniqueness check)
- 06 Array — dynamic list with append/remove/move controls
- 07 Disabled — field-level `disabled` on input/select/checkbox

## API

<ComponentApi component="form" />

## Notes

### Architecture and benchmark differences

`useForm` wraps TanStack's `useForm`: the schema is registered as a form-level validator and each field-level `validate` as a field validator, and the engine owns values, field meta, error distribution by path, and the submit lifecycle. `validateMode`/`reValidateMode` map onto TanStack validator timings (`onChange` / `onBlur` / `onSubmit` / `onMount`); after the first submit attempt the timing switches from `validateMode` to `reValidateMode`. `useFieldArray` exposes mutation helpers built on the engine's array operations (`pushFieldValue`, `insertFieldValue`, `removeFieldValue`, `swapFieldValues`, `moveFieldValues`, `replaceFieldValue`). `FormFieldBaseCompact` merges `fieldProps`/`labelProps`/`controlProps`/`descriptionProps`/`errorProps` from the form context and injects a11y state (`aria-invalid`, `aria-describedby`) into the control slot; the error enter/leave height-collapse animation is composed in the UI layer. Most benchmark libraries couple the schema validator to a framework-specific rule object; the Standard Schema interface plus the headless/styled split on top of a mainstream engine are the differentiators.

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

### Migration from v0.4x (`useHeadlessForm` → TanStack Form)

v0.50.0 replaces the self-built `useHeadlessForm` engine with `@tanstack/vue-form`. The component surface (`SForm` / `SFormField` / `SFormFieldArray` / `SFormFieldBase`, label/description/error wiring, a11y attributes) is unchanged; the hook surface changed:

| v0.4x                                                                                                      | v0.50.0                                                                                                                                                                |
| :--------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `useForm(options, Field, FieldArray)` returning a tuple                                                    | `useForm(options)` returning a context object; styled components come back as `SFormField` / `SFormFieldArray` properties                                              |
| `initialValues`                                                                                            | still `initialValues`; reset restores them (TanStack `defaultValues` internally)                                                                                       |
| `onSubmit(values, helper)`                                                                                 | `onSubmit(values)` — the `FormSubmitHelper` was removed; TanStack owns the submitting lifecycle                                                                        |
| `initialErrors` / `initialTouched` / `resetForm(nextState)`                                                | removed; use `form.setFieldMeta` / `form.reset()` from the exposed TanStack `FormApi`                                                                                  |
| `formState.values` / `errors` / `touched` refs                                                             | `form.state` (TanStack `FormState`: `values`, `errorMap`, `fieldMeta`, `isSubmitting`, `submissionAttempts`, …); for reactive reads use `form.useSelector(state => …)` |
| `setValues` / `setFieldValue` / `setFieldTouched` / `getFieldValue` / `validateForm` / `validateField`     | TanStack `FormApi` methods on `form`: `setFieldValue`, `getFieldValue`, `validate`, `resetField`, …                                                                    |
| `useField(name)` returning `Ref<FormFieldState>`                                                           | `useField(name)` returning a computed of `{ name, value, meta: { dirty, error, touched }, handleChange, onBlur }`                                                      |
| `useFieldArray(name)` returning `{ fields, append, prepend, remove, swap, move, insert, update, replace }` | same shape; `fields` entries are `{ key, name, value }`                                                                                                                |
| Field-array nested paths `social.0.name`                                                                   | TanStack canonical format `social[0].name` (array segments bracketed)                                                                                                  |
| `errors` keyed by dotted paths                                                                             | `onInvalid` errors (and `form.state.fieldMeta`) are keyed by the canonical TanStack path (bracketed array segments)                                                    |

### Cautions

- `useForm` returns a context object — destructure by name: `const { handleSubmit, SFormField, SFormFieldArray, isSubmitting } = useForm({...})`.
- For reactive form-state reads use `form.useSelector(state => …)`; `form.state` itself is a TanStack Store snapshot without Vue reactivity.
- Validation timing: before the first submit attempt the `validateMode` timing applies, afterwards `reValidateMode`; with the default `submit` mode errors appear after the first submit attempt.
- Array item errors are stored under bracketed keys (`emails[0]`) and do not bubble to the array root — validate the whole array (e.g. `min(1)`) at the array level, or render per-item errors with nested `SFormField`s using the bracketed path.
- With Zod v4, `z.number()` does not coerce string values — a text input reports `"Invalid input: expected number"`. Use `z.coerce.number()` (or parse the value) when the control is an `<input type="text">`.
- The control slot is value-agnostic: fields forward `model-value` (and `aria-invalid`/`aria-describedby`). Custom controls must accept and emit `modelValue`.
- The form element itself renders only `data-soybean-form`/`data-orientation` — validation styles live on the field/control/error parts, so style it with the `SForm` `ui`/`class` props.
- Field-level `validate` merges with the schema in the engine's error map. Return `undefined` to signal "valid".
- Disabling is control-level: `disabled` on the input blocks interaction but the field still validates on submit unless you also gate the value.

## FAQ

### How do I switch between Zod and Valibot?

You don't — pass the schema directly. Standard Schema validators are accepted as-is: `useForm({ schema: zodSchema })` or `useForm({ schema: valibotSchema })` behave identically.

### How do I validate on input instead of on submit?

Set `validateMode: 'input'` (and optionally `reValidateMode: 'input'`). Before the first submit the `validateMode` timing applies; afterwards `reValidateMode` takes over, which is the standard "validate on first submit, then live" pattern.

### How do I build a dynamic list of fields?

Use `SFormFieldArray`:

```vue
<SFormFieldArray name="social" label="Social">
  <template #default="{ fields, append, remove, move }">
    <div v-for="(field, index) in fields" :key="index">
      <SFormField :name="`${field.name}[${index}].name`" label="Name">
        <SInput />
      </SFormField>
      <SButtonIcon icon="lucide:minus" @click="remove(index)" />
    </div>
    <SButtonIcon icon="lucide:plus" @click="append({ name: '', url: '' })" />
  </template>
</SFormFieldArray>
```

### How do I show a loading state while submitting?

`isSubmitting` flips to `true` during the async `onSubmit` and back after it resolves — disable the submit button or show a spinner:

```vue
<SFormFieldBase>
  <SButton type="submit" :loading="isSubmitting">Submit</SButton>
</SFormFieldBase>
```

### Why does my number input report "Invalid input: expected number"?

The input value is a string. With Zod v4 use `z.coerce.number()` (then `.min(...)`), or write a field-level `validate` that parses first.

### How do I reset the form to initial values?

Bind `on-reset` on `SForm` to `handleReset` (returned by `useForm`). Reset restores `initialValues`, clears errors/touched, and keeps the field values in sync with the controls.
