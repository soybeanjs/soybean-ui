import { useForm as _useForm } from '@soybeanjs/headless/form';
import type { StandardSchemaV1, FormValues, InferStandardSchemaInput } from '@soybeanjs/headless/form';
import FormFieldArray from './form-field-array.vue';
import FormField from './form-field.vue';
import type { UseFormOptions, FormFieldExtraProps, UseFormReturn } from './types.js';

export function useForm<S extends StandardSchemaV1<FormValues, FormValues>>(options: UseFormOptions<S>) {
  const [context, SFormField, SFormFieldArray] = _useForm<S, FormFieldExtraProps, FormFieldExtraProps>(
    options,
    // @ts-expect-error - ignore
    FormField,
    FormFieldArray
  );

  return {
    ...context,
    SFormField,
    SFormFieldArray
  } as UseFormReturn<InferStandardSchemaInput<S>>;
}
