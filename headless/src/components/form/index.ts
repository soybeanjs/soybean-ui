export { default as FormField } from './form-field.vue';
export { default as FormLabel } from './form-label.vue';
export { default as FormDescription } from './form-description.vue';
export { default as FormError } from './form-error.vue';

export { provideFormFieldUi } from './context';
export { useForm } from './core/use-form';

export type { StandardSchemaV1 } from '@standard-schema/spec';
export type {
  FormFieldProps,
  FormLabelProps,
  FormDescriptionProps,
  FormErrorProps,
  FormFieldUiSlot,
  FormFieldUi
} from './types';
export type {
  InferStandardSchemaInput,
  FormValues,
  FormFieldArrayState,
  FormFieldState,
  FormRegisterOptions,
  FormResetState,
  FormContext,
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
  UseFormOptions,
  UseFormStateReturn,
  UseRegisterFieldArrayOptions
} from './core/types';
