import { provide, inject } from 'vue';
import type { StandardSchemaV1 } from '@standard-schema/spec';
import { useHeadlessForm } from './core/use-form';
import type { InferStandardSchemaInput, UseHeadlessFormOptions, UseHeadlessFormReturn, FormValues } from './core/types';
import type { FormFieldComponent, FormFieldArrayComponent, UseFormReturn } from './types';

const USE_FORM_CONTEXT_KEY = Symbol('UseFormContext');

export function useForm<
  S extends StandardSchemaV1<FormValues, FormValues>,
  FieldExtraProps extends Record<string, any> = {},
  FieldArrayExtraProps extends Record<string, any> = {}
>(
  options: UseHeadlessFormOptions<S>,
  Field: FormFieldComponent<InferStandardSchemaInput<S>, FieldExtraProps>,
  FieldArray: FormFieldArrayComponent<InferStandardSchemaInput<S>, FieldArrayExtraProps>
): UseFormReturn<InferStandardSchemaInput<S>, FieldExtraProps, FieldArrayExtraProps> {
  const context = useHeadlessForm(options);

  provide(USE_FORM_CONTEXT_KEY, context);

  return [context, Field, FieldArray];
}

const USE_FORM_SUB_CONTEXT_KEY = Symbol('UseFormSubContext');

type FormContext = UseHeadlessFormReturn<Record<string, any>>;

export function useFormSub() {
  const context = inject<FormContext>(USE_FORM_SUB_CONTEXT_KEY);
  if (!context) {
    throw new Error('useFormContext must be used within a useForm provider');
  }
  return context;
}

export function provideFormSub() {
  const context = {} as FormContext;

  const parentContext = inject<FormContext | null>(USE_FORM_CONTEXT_KEY, null);

  if (parentContext) {
    Object.assign(context, parentContext);
  }

  provide(USE_FORM_SUB_CONTEXT_KEY, context);

  return context;
}
