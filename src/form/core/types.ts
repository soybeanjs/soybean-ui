import type { ComputedRef, MaybeRefOrGetter, Ref, ShallowRef, WritableComputedRef } from 'vue';
import type { MaybePromise, Path, PathValue, PrimitiveType } from '../../types';

export type FormValidateMode = 'blur' | 'input' | 'change' | 'submit';

export type FormValues = Record<string, any>;

export type FormTouched<Values> = {
  [K in keyof Values]?: Values[K] extends any[]
    ? Values[K][number] extends object
      ? FormTouched<Values[K][number]>[] | boolean
      : boolean | boolean[]
    : Values[K] extends object
      ? FormTouched<Values[K]>
      : boolean;
};

export type FormErrors<Values> = {
  [K in keyof Values]?: Values[K] extends any[]
    ? Values[K][number] extends object
      ? FormErrors<Values[K][number]>[] | string | string[]
      : string | string[]
    : Values[K] extends object
      ? FormErrors<Values[K]> | string | string[]
      : string | string[];
};

export type FormFieldError<Value> = Value extends PrimitiveType
  ? string | string[] | undefined
  : string | string[] | FormErrors<Value> | undefined;

export type FormFieldMeta<Value> = {
  dirty: ComputedRef<boolean>;
  error: ComputedRef<FormFieldError<Value>>;
  touched: ComputedRef<boolean | undefined>;
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

export type FormMessage<Values extends FormValues> =
  | { type: 'SubmitAttempt' }
  | { type: 'SubmitSuccess' }
  | { type: 'SubmitFailure' }
  | { type: 'SetValues'; payload: Values }
  | { type: 'SetFieldValue'; payload: { path: string; value: any } }
  | {
      type: 'SetTouched';
      payload: { path: string; touched?: boolean };
    }
  | { type: 'SetErrors'; payload: FormErrors<Values> }
  | {
      type: 'SetFieldError';
      payload: {
        path: string;
        error: FormFieldError<PathValue<Values, Path<Values>>> | string | string[];
      };
    }
  | { type: 'SetIsSubmitting'; payload: boolean }
  | { type: 'SetIsValidating'; payload: boolean }
  | { type: 'ResetForm'; payload: FormResetState<Values> };

/**
 * The type of actions that can be performed on the form context.
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
export type FormActionType = FormMessage<FormValues>['type'];

export interface FormState<Values extends FormValues> {
  values: Values;
  touched: Ref<FormTouched<Values>>;
  errors: Ref<FormErrors<Values>>;
  submitCount: ShallowRef<number>;
  isSubmitting: ShallowRef<boolean>;
  isValidating: ShallowRef<boolean>;
}

export type FormValidateFn<Values extends FormValues = FormValues> = (
  values: Values
) => MaybePromise<FormErrors<Values>>;

export interface UseFormOptions<Vn extends FormValidateFn> {
  validate: Vn;
  initialValues?: Parameters<Vn>[0];
  initialErrors?: FormErrors<Parameters<Vn>[0]>;
  initialTouched?: FormTouched<Parameters<Vn>[0]>;
  validateMode?: FormValidateMode;
  reValidateMode?: FormValidateMode;
  validateOnMounted?: boolean;
  onSubmit?: (values: Parameters<Vn>[0], helper: FormSubmitHelper<Parameters<Vn>[0]>) => Promise<any>;
  onInvalid?: (errors: FormErrors<Parameters<Vn>[0]>) => void;
}

export type FormFieldValidator<Value> = (value: Value) => MaybePromise<FormFieldError<Value>>;

export interface FormRegisterOptions<Values extends FormValues = FormValues> {
  validate?: FormFieldValidator<Values>;
  reset?: () => void;
}

export interface FormFieldRegistry<Values extends FormValues = FormValues> {
  [field: string]: Pick<FormRegisterOptions<Values>, 'validate'>;
}

export interface FormFieldArrayRegistry {
  [field: string]: Pick<FormRegisterOptions, 'reset'>;
}

export interface FormEventHandler<S = string> {
  handleBlur: (event: Event | S, name?: S) => void;
  handleChange: () => void;
  handleInput: () => void;
}

export interface FormFieldAttrs {
  name: string;
  onBlur: (event: Event) => void;
  onChange: () => void;
  onInput: () => void;
}

export interface FormSubmitHelper<Values extends FormValues> {
  setSubmitting: (isSubmitting: boolean) => void;
  readonly initialValues: Values;
}

interface FormRegister<Values extends FormValues, Name extends Path<Values>>
  extends FormFieldMeta<PathValue<Values, Name>> {
  value: WritableComputedRef<PathValue<Values, Name>>;
  attrs: ComputedRef<FormFieldAttrs>;
}

export interface FormFieldEntry<Value> {
  key: number;
  value: Value;
  name: string;
  error: FormErrors<Value>;
  touched: Value extends PrimitiveType ? boolean : FormTouched<Value> | undefined;
  dirty: boolean;
  attrs: Omit<FormFieldAttrs, 'name'>;
}

export interface FormContext<Values extends FormValues> {
  values: Values;
  touched: ComputedRef<FormTouched<Values>>;
  errors: ComputedRef<FormErrors<Values>>;
  submitCount: ComputedRef<number>;
  isSubmitting: ShallowRef<boolean>;
  isValidating: ComputedRef<boolean>;
  dirty: ComputedRef<boolean>;
  register<Name extends Path<Values>>(
    name: MaybeRefOrGetter<Name>,
    opts?: FormRegisterOptions<Values>
  ): FormRegister<Values, Name>;
  setValues(values: Values, shouldValidate?: boolean): Promise<FormErrors<Values>> | Promise<void>;
  setFieldValue<Name extends Path<Values>>(
    name: MaybeRefOrGetter<Name>,
    value: PathValue<Values, Name>,
    shouldValidate?: boolean
  ): Promise<FormErrors<Values>> | Promise<void>;
  setErrors(errors: FormErrors<Values>): void;
  setFieldError<Name extends Path<Values>>(name: Name, error: FormFieldError<PathValue<Values, Name>>): void;
  setFieldTouched<Name extends Path<Values>>(name: Name, touched: boolean): void;
  handleSubmit(event?: Event): void;
  handleReset(event?: Event): void;
  resetForm(nextState?: FormResetState<Values>): void;
  validateForm(values?: Values): Promise<FormErrors<Values>>;
  validateField<Name extends Path<Values>>(name: Name): Promise<FormFieldError<PathValue<Values, Name>> | void>;
}

export interface FormFieldContext<Values extends FormValues>
  extends Pick<FormContext<Values>, 'register' | 'setFieldValue' | 'setFieldTouched'> {
  getFieldValue<Name extends Path<Values>>(
    name: MaybeRefOrGetter<Name>
  ): WritableComputedRef<PathValue<Values, Name>, PathValue<Values, Name>>;
  setFieldValue<Name extends Path<Values>>(
    name: MaybeRefOrGetter<Name>,
    value: PathValue<Values, Name>,
    shouldValidate?: boolean
  ): Promise<FormErrors<Values>> | Promise<void>;
  getFieldError<Name extends Path<Values>, Value = PathValue<Values, Name>>(
    name: MaybeRefOrGetter<Name>
  ): FormFieldError<Value>;
  getFieldTouched(name: MaybeRefOrGetter<string>): FormTouched<boolean>;
  getFieldDirty<Name extends Path<Values>>(name: MaybeRefOrGetter<Name>): boolean;
  getFieldAttrs<Name extends Path<Values>>(name: MaybeRefOrGetter<Name>): ComputedRef<FormFieldAttrs>;
  registerFieldArray<Name extends Path<Values>>(name: MaybeRefOrGetter<Name>, opts?: FormRegisterOptions<Values>): void;
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
}
