import type { ComputedRef, Ref, ShallowRef, WritableComputedRef } from 'vue';
import type { StandardSchemaV1 } from '@standard-schema/spec';
import type { ArrayElement, MaybePromise, Path, PathValue } from '../../../types';

export type InferStandardSchemaInput<S extends StandardSchemaV1<FormValues, FormValues>> = NonNullable<
  S['~standard']['types']
>['input'];

export type FormValidateMode = 'blur' | 'input' | 'change' | 'submit';

export type FormValues = Record<string, any>;

export type FormErrors<Values extends FormValues> = {
  [K in keyof Path<Values>]?: string;
};

export type FormTouched<Values extends FormValues> = {
  [K in keyof Path<Values>]?: boolean;
};

export type FormFieldMeta = {
  dirty: boolean;
  error: string | undefined;
  touched: boolean | undefined;
};

export interface FormSubmitHelper<Values extends FormValues> {
  setSubmitting: (isSubmitting: boolean) => void;
  readonly initialValues: Values;
}

export interface FormResetState<Values extends FormValues = FormValues> {
  values: Values;
  touched: FormTouched<Values>;
  errors: FormErrors<Values>;
  submitCount: number;
}

export type FormMessage<Values extends FormValues = FormValues, Name extends Path<Values> = Path<Values>> =
  | { type: 'SubmitAttempt' }
  | { type: 'SubmitSuccess' }
  | { type: 'SubmitFailure' }
  | { type: 'SetValues'; payload: Values }
  | { type: 'SetFieldValue'; payload: { name: Name; value: PathValue<Values, Name> } }
  | {
      type: 'SetTouched';
      payload: { name: Name; touched?: boolean };
    }
  | { type: 'SetErrors'; payload: FormErrors<Values> }
  | {
      type: 'SetFieldError';
      payload: {
        name: Name;
        error: string | undefined;
      };
    }
  | { type: 'SetIsSubmitting'; payload: boolean }
  | { type: 'SetIsValidating'; payload: boolean }
  | { type: 'ResetForm'; payload: FormResetState<Values> };

/**
 * The type of messages that can be performed on the form context.
 *
 * - SubmitAttempt: The form is being submitted.
 * - SubmitSuccess: The form was submitted successfully.
 * - SubmitFailure: The form submission failed.
 * - SetValues: The form values have been set.
 * - SetFieldValue: The value of a field has been set.
 * - SetTouched: The touched state of a field has been set.
 * - SetErrors: The errors of a field have been set.
 * - SetFieldError: The error of a field has been set.
 * - SetIsSubmitting: The submitting state of the form has been set.
 * - SetIsValidating: The validating state of the form has been set.
 * - ResetForm: The form has been reset.
 */
export type FormMessageType = FormMessage['type'];

export interface FormState<Values extends FormValues> {
  values: Values;
  touched: Ref<FormTouched<Values>>;
  errors: Ref<FormErrors<Values>>;
  submitCount: ShallowRef<number>;
  isSubmitting: ShallowRef<boolean>;
  isValidating: ShallowRef<boolean>;
}

export interface UseFormOptions<S extends StandardSchemaV1<FormValues, FormValues>> {
  schema: S;
  initialValues?: InferStandardSchemaInput<S>;
  initialErrors?: FormErrors<InferStandardSchemaInput<S>>;
  initialTouched?: FormTouched<InferStandardSchemaInput<S>>;
  validateMode?: FormValidateMode;
  reValidateMode?: FormValidateMode;
  validateOnMounted?: boolean;
  onSubmit?: (
    values: InferStandardSchemaInput<S>,
    helper: FormSubmitHelper<InferStandardSchemaInput<S>>
  ) => Promise<any>;
  onInvalid?: (errors: FormErrors<InferStandardSchemaInput<S>>) => void;
}

export type FormFieldValidator<Value> = (value: Value) => MaybePromise<string | undefined>;

export interface FormRegisterOptions<Value> {
  validate?: FormFieldValidator<Value>;
  reset?: () => void;
}

export type FormFieldRegistry<Values> = {
  [K in Path<Values>]?: {
    validate?: FormFieldValidator<PathValue<Values, K>>;
  };
};

export type FormFieldArrayRegistry<Values> = {
  [K in Path<Values>]?: {
    reset?: () => void;
  };
};

export interface FormEventHandler<S = string> {
  onBlur: (event: Event | S, name?: S) => void;
  onChange: () => void;
  onInput: () => void;
}

export interface FormSubmitHelper<Values extends FormValues> {
  setSubmitting: (isSubmitting: boolean) => void;
  readonly initialValues: Values;
}

export interface FormFieldState<Values extends FormValues, Name extends Path<Values>> extends FormEventHandler<Name> {
  name: Name;
  value: PathValue<Values, Name>;
  meta: FormFieldMeta;
}

export interface FormFieldArrayState<
  Values extends FormValues,
  Name extends Path<Values>
> extends FormEventHandler<Name> {
  name: Name;
  value: ArrayElement<NonNullable<PathValue<Values, Name>>>;
  meta: FormFieldMeta;
}

export interface UseFormStateReturn<Values extends FormValues> {
  formState: FormState<Values>;
  dirty: ComputedRef<boolean>;
  submitHelper: FormSubmitHelper<Values>;
  setSubmitting: (isSubmitting: boolean) => void;
  registerField<Name extends Path<Values>>(
    name: Name,
    opts?: FormRegisterOptions<PathValue<Values, Name>>
  ): Ref<FormFieldState<Values, Name>>;
  registerFieldArray<Name extends Path<Values>>(
    name: Name,
    opts?: FormRegisterOptions<PathValue<Values, Name>>
  ): Ref<FormFieldState<Values, Name>>;
  validateField<Name extends Path<Values>>(name: Name): Promise<string | undefined | void>;
  getFieldValue<Name extends Path<Values>>(name: Name): WritableComputedRef<PathValue<Values, Name>>;
  getFieldMeta<Name extends Path<Values>>(name: Name): Ref<FormFieldMeta>;
  getFieldError<Name extends Path<Values>>(name: Name): string | undefined;
  getFieldTouched<Name extends Path<Values>>(name: Name): boolean | undefined;
  getFieldDirty<Name extends Path<Values>>(name: Name): boolean;
  getFieldState<Name extends Path<Values>>(name: Name): Ref<FormFieldState<Values, Name>>;
  setValues(values: Values, shouldValidate?: boolean): Promise<FormErrors<Values>> | Promise<void>;
  setErrors(errors: FormErrors<Values>): void;
  setFieldValue<Name extends Path<Values>>(
    name: Name,
    value: PathValue<Values, Name>,
    shouldValidate?: boolean
  ): Promise<FormErrors<Values>> | Promise<void>;
  setFieldTouched<Name extends Path<Values>>(name: Name, touched: boolean): void;
  setFieldError<Name extends Path<Values>>(name: Name, error: string | undefined): void;
  setFieldArrayValue<Name extends Path<Values>, Method extends (...args: any) => any>(
    name: Name,
    value: PathValue<Values, Name>,
    method: Method,
    args?: Partial<{
      argA: Parameters<Method>[1];
      argB: Parameters<Method>[2];
    }>,
    shouldSetValue?: boolean
  ): Promise<void> | Promise<FormErrors<Values>>;
  validateForm(values?: Values): Promise<FormErrors<Values>>;
  resetForm(nextState?: FormResetState<Values>): void;
}

export interface FormContext<Values extends FormValues>
  extends Omit<UseFormStateReturn<Values>, 'formState' | 'submitHelper'>, FormState<Values> {
  handleSubmit(event?: Event): void;
  handleReset(event?: Event): void;
  useFieldArray<Name extends Path<Values>>(
    name: Name,
    opts?: FormRegisterOptions<PathValue<Values, Name>>
  ): Ref<FormFieldArrayStates<Values, Name>>;
  useField<Name extends Path<Values>>(
    name: Name,
    opts?: FormRegisterOptions<PathValue<Values, Name>>
  ): Ref<FormFieldState<Values, Name>>;
}

export interface UseRegisterFieldArrayOptions<Values extends FormValues> extends Pick<
  UseFormStateReturn<Values>,
  'getFieldState' | 'getFieldValue' | 'setFieldValue' | 'setFieldArrayValue' | 'registerFieldArray'
> {}

export interface FormFieldArrayStates<Values extends FormValues, Name extends Path<Values>> {
  name: Name;
  fields: readonly FormFieldArrayState<Values, Name>[];
  meta: FormFieldMeta;
  append: (value: ArrayElement<NonNullable<PathValue<Values, Name>>>) => void;
  prepend: (value: ArrayElement<NonNullable<PathValue<Values, Name>>>) => void;
  remove: (index?: number) => void;
  swap: (indexA: number, indexB: number) => void;
  move: (from: number, to: number) => void;
  insert: (index: number, value: ArrayElement<NonNullable<PathValue<Values, Name>>>) => void;
  update: (index: number, value: ArrayElement<NonNullable<PathValue<Values, Name>>>) => void;
  replace: ($values: ArrayElement<NonNullable<PathValue<Values, Name>>>[]) => void;
}
