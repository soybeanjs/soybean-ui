export { default as FormCompact } from './form-compact.vue';
export { default as FormFieldCompact } from './form-field-compact.vue';
export { default as FormFieldArrayCompact } from './form-field-array-compact.vue';
export { default as FormFieldBaseCompact } from './form-field-base-compact.vue';
export { default as FormField } from './form-field.vue';
export { default as FormLabel } from './form-label.vue';
export { default as FormControl } from './form-control.vue';
export { default as FormDescription } from './form-description.vue';
export { default as FormError } from './form-error.vue';

export { provideFormUi, provideFormFieldUi } from './context.js';
export { useForm } from './use-form.js';

export type { StandardSchemaV1 } from '@standard-schema/spec';
export type {
  FormCompactProps,
  FormFieldCompactProps,
  FormFieldCompactSlots,
  FormFieldArrayCompactSlots,
  FormFieldBaseCompactProps,
  FormFieldBaseCompactSlots,
  FormFieldProps,
  FormLabelProps,
  FormControlProps,
  FormDescriptionProps,
  FormErrorProps,
  FormFieldUiSlot,
  FormFieldUi,
  FormUiSlot,
  FormUi,
  FormFieldComponent,
  FormFieldArrayComponent,
  UseFormReturn
} from './types.js';
export type {
  InferStandardSchemaInput,
  FormValues,
  FormFieldArrayState,
  FormFieldState,
  FormRegisterOptions,
  FormResetState,
  FormValidateMode,
  FormErrors,
  FormTouched,
  FormFieldMeta,
  FormMessage,
  FormState,
  FormFieldArrayStates,
  FormSubmitHelper,
  FormFieldValidator,
  FormEventHandler,
  UseFormStateReturn,
  UseRegisterFieldArrayOptions,
  UseHeadlessFormOptions,
  UseHeadlessFormReturn
} from './core/types.js';
