import type { ComputedRef, Ref, ShallowRef, WritableComputedRef } from 'vue';
import type { StandardSchemaV1 } from '@standard-schema/spec';
import type { ArrayElement, MaybePromise, Path, PathValue } from '../../../types';

/**
 * Type information for the infer standard schema input component.
 */
export type InferStandardSchemaInput<S extends StandardSchemaV1<FormValues, FormValues>> = NonNullable<
  S['~standard']['types']
>['input'];

/**
 * Type information for the infer standard schema output component.
 */
export type InferStandardSchemaOutput<S extends StandardSchemaV1<FormValues, FormValues>> = NonNullable<
  S['~standard']['types']
>['output'];

/**
 * Type information for the form validate mode component.
 */
export type FormValidateMode = 'blur' | 'input' | 'change' | 'submit';

/**
 * Type information for the form values component.
 */
export type FormValues = Record<string, any>;

/**
 * Type information for the form errors component.
 */
export type FormErrors<Values extends FormValues> = {
  [K in keyof Path<Values>]?: string;
};

/**
 * Type information for the form touched component.
 */
export type FormTouched<Values extends FormValues> = {
  [K in keyof Path<Values>]?: boolean;
};

/**
 * Type information for the form field meta component.
 */
export type FormFieldMeta = {
  /**
   * Whether dirty.
   */
  dirty: boolean;
  /**
   * Error.
   */
  error: string | undefined;
  /**
   * Touched.
   */
  touched: boolean | undefined;
};

/**
 * Type information for the form submit helper component.
 */
export interface FormSubmitHelper<Values extends FormValues> {
  /**
   * Set submitting.
   */
  setSubmitting: (isSubmitting: boolean) => void;
  /**
   * Initial values.
   */
  readonly initialValues: Values;
}

/**
 * State values for the form core component.
 */
export interface FormResetState<Values extends FormValues = FormValues> {
  /**
   * Values.
   */
  values: Values;
  /**
   * Touched.
   */
  touched: FormTouched<Values>;
  /**
   * Errors.
   */
  errors: FormErrors<Values>;
  /**
   * Submit count.
   */
  submitCount: number;
}

/**
 * Type information for the form message component.
 */
export type FormMessage<Values extends FormValues = FormValues, Name extends Path<Values> = Path<Values>> =
  /**
   * Type.
   */
  /**
   * Type.
   */
  | { type: 'SubmitAttempt' }
  /**
   * Type.
   */
  /**
   * Type.
   */
  | { type: 'SubmitSuccess' }
  /**
   * Type.
   */
  /**
   * Type.
   */
  | { type: 'SubmitFailure' }
  /**
   * Payload.
   */
  /**
   * Type.
   */
  /**
   * Payload.
   */
  /**
   * Type.
   */
  | { type: 'SetValues'; payload: Values }
  /**
   * Payload.
   */
  /**
   * Type.
   */
  /**
   * Payload.
   */
  /**
   * Type.
   */
  | { type: 'SetFieldValue'; payload: { name: Name; value: PathValue<Values, Name> } }
  | {
      /**
       * Type.
       */
      type: 'SetTouched';
      /**
       * Payload.
       */
      payload: { name: Name; touched?: boolean };
    }
  /**
   * Payload.
   */
  /**
   * Type.
   */
  /**
   * Payload.
   */
  /**
   * Type.
   */
  | { type: 'SetErrors'; payload: FormErrors<Values> }
  | {
      /**
       * Type.
       */
      type: 'SetFieldError';
      /**
       * Payload.
       */
      payload: {
        name: Name;
        error: string | undefined;
      };
    }
  /**
   * Whether payload.
   */
  /**
   * Type.
   */
  /**
   * Whether payload.
   */
  /**
   * Type.
   */
  | { type: 'SetIsSubmitting'; payload: boolean }
  /**
   * Whether payload.
   */
  /**
   * Type.
   */
  /**
   * Whether payload.
   */
  /**
   * Type.
   */
  | { type: 'SetIsValidating'; payload: boolean }
  /**
   * Payload.
   */
  /**
   * Type.
   */
  /**
   * Payload.
   */
  /**
   * Type.
   */
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

/**
 * State values for the form core component.
 */
export interface FormState<Values extends FormValues> {
  /**
   * Values.
   */
  values: Values;
  /**
   * Touched.
   */
  touched: Ref<FormTouched<Values>>;
  /**
   * Errors.
   */
  errors: Ref<FormErrors<Values>>;
  /**
   * Submit count.
   */
  submitCount: ShallowRef<number>;
  /**
   * Whether a submitting.
   */
  isSubmitting: ShallowRef<boolean>;
  /**
   * Whether a validating.
   */
  isValidating: ShallowRef<boolean>;
}

/**
 * Type information for the use form options component.
 */
export interface UseFormOptions<S extends StandardSchemaV1<FormValues, FormValues>> {
  /**
   * Schema.
   */
  schema: S;
  /**
   * Initial values.
   */
  initialValues?: InferStandardSchemaInput<S>;
  /**
   * Initial errors.
   */
  initialErrors?: FormErrors<InferStandardSchemaInput<S>>;
  /**
   * Initial touched.
   */
  initialTouched?: FormTouched<InferStandardSchemaInput<S>>;
  /**
   * Validate mode.
   */
  validateMode?: FormValidateMode;
  /**
   * Re validate mode.
   */
  reValidateMode?: FormValidateMode;
  /**
   * Whether validate on mounted.
   */
  validateOnMounted?: boolean;
  /**
   * Callback invoked when the submit event fires.
   */
  onSubmit?: (
    values: InferStandardSchemaOutput<S>,
    helper: FormSubmitHelper<InferStandardSchemaOutput<S>>
  ) => Promise<any>;
  /**
   * Callback invoked when the invalid event fires.
   */
  onInvalid?: (errors: FormErrors<InferStandardSchemaOutput<S>>) => void;
}

/**
 * Type information for the form field validator component.
 */
export type FormFieldValidator<Value> = (value: Value) => MaybePromise<string | undefined>;

/**
 * Type information for the form register options component.
 */
export interface FormRegisterOptions<Value> {
  /**
   * Validate.
   */
  validate?: FormFieldValidator<Value>;
  /**
   * Reset.
   */
  reset?: () => void;
}

/**
 * Type information for the form field registry component.
 */
export type FormFieldRegistry<Values> = {
  [K in Path<Values>]?: {
    /**
     * Validate.
     */
    validate?: FormFieldValidator<PathValue<Values, K>>;
  };
};

/**
 * Type information for the form field array registry component.
 */
export type FormFieldArrayRegistry<Values> = {
  [K in Path<Values>]?: {
    /**
     * Reset.
     */
    reset?: () => void;
  };
};

/**
 * Type information for the form event handler component.
 */
export interface FormEventHandler<S = string> {
  /**
   * Callback invoked when the blur event fires.
   */
  onBlur: (event: Event | S, name?: S) => void;
  /**
   * Callback invoked when the change event fires.
   */
  onChange: () => void;
  /**
   * Callback invoked when the input event fires.
   */
  onInput: () => void;
}

/**
 * State values for the form core component.
 */
export interface FormFieldState<Values extends FormValues, Name extends Path<Values>> extends FormEventHandler<Name> {
  /**
   * Name.
   */
  name: Name;
  /**
   * Value associated with the current item.
   */
  value: PathValue<Values, Name>;
  /**
   * Meta.
   */
  meta: FormFieldMeta;
}

/**
 * State values for the form core component.
 */
export interface FormFieldArrayState<
  Values extends FormValues,
  Name extends Path<Values>
> extends FormEventHandler<Name> {
  /**
   * Name.
   */
  name: Name;
  /**
   * Value associated with the current item.
   */
  value: ArrayElement<NonNullable<PathValue<Values, Name>>>;
  /**
   * Meta.
   */
  meta: FormFieldMeta;
}

/**
 * Type information for the use form state return component.
 */
export interface UseFormStateReturn<Values extends FormValues> {
  /**
   * Form state.
   */
  formState: FormState<Values>;
  /**
   * Whether dirty.
   */
  dirty: ComputedRef<boolean>;
  /**
   * Submit helper.
   */
  submitHelper: FormSubmitHelper<Values>;
  /**
   * Set submitting.
   */
  setSubmitting: (isSubmitting: boolean) => void;
  /**
   * Register field.
   */
  registerField<Name extends Path<Values>>(
    name: Name,
    opts?: FormRegisterOptions<PathValue<Values, Name>>
  ): Ref<FormFieldState<Values, Name>>;
  /**
   * Register field array.
   */
  registerFieldArray<Name extends Path<Values>>(
    name: Name,
    opts?: FormRegisterOptions<PathValue<Values, Name>>
  ): Ref<FormFieldState<Values, Name>>;
  /**
   * Validate field.
   */
  validateField<Name extends Path<Values>>(name: Name): Promise<string | undefined | void>;
  /**
   * Get field value.
   */
  getFieldValue<Name extends Path<Values>>(name: Name): WritableComputedRef<PathValue<Values, Name>>;
  /**
   * Get field meta.
   */
  getFieldMeta<Name extends Path<Values>>(name: Name): Ref<FormFieldMeta>;
  /**
   * Get field error.
   */
  getFieldError<Name extends Path<Values>>(name: Name): string | undefined;
  /**
   * Get field touched.
   */
  getFieldTouched<Name extends Path<Values>>(name: Name): boolean | undefined;
  /**
   * Whether get field dirty.
   */
  getFieldDirty<Name extends Path<Values>>(name: Name): boolean;
  /**
   * Get field state.
   */
  getFieldState<Name extends Path<Values>>(name: Name): Ref<FormFieldState<Values, Name>>;
  /**
   * Set values.
   */
  setValues(values: Values, shouldValidate?: boolean): Promise<FormErrors<Values>> | Promise<void>;
  /**
   * Set errors.
   */
  setErrors(errors: FormErrors<Values>): void;
  /**
   * Set field value.
   */
  setFieldValue<Name extends Path<Values>>(
    name: Name,
    value: PathValue<Values, Name>,
    shouldValidate?: boolean
  ): Promise<FormErrors<Values>> | Promise<void>;
  /**
   * Set field touched.
   */
  setFieldTouched<Name extends Path<Values>>(name: Name, touched: boolean): void;
  /**
   * Set field error.
   */
  setFieldError<Name extends Path<Values>>(name: Name, error: string | undefined): void;
  /**
   * Set field array value.
   */
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
  /**
   * Validate form.
   */
  validateForm(values?: Values): Promise<FormErrors<Values>>;
  /**
   * Reset form.
   */
  resetForm(nextState?: FormResetState<Values>): void;
}

/**
 * Context for the form component.
 */
export interface FormContext<Values extends FormValues>
  extends Omit<UseFormStateReturn<Values>, 'formState' | 'submitHelper'>, FormState<Values> {
  /**
   * Handle submit used by the component context.
   */
  handleSubmit(event?: Event): void;
  /**
   * Handle reset used by the component context.
   */
  handleReset(event?: Event): void;
  /**
   * Use field array used by the component context.
   */
  useFieldArray<Name extends Path<Values>>(
    name: Name,
    opts?: FormRegisterOptions<PathValue<Values, Name>>
  ): Ref<FormFieldArrayStates<Values, Name>>;
  /**
   * Use field used by the component context.
   */
  useField<Name extends Path<Values>>(
    name: Name,
    opts?: FormRegisterOptions<PathValue<Values, Name>>
  ): Ref<FormFieldState<Values, Name>>;
}

/**
 * Type information for the use register field array options component.
 */
export interface UseRegisterFieldArrayOptions<Values extends FormValues> extends Pick<
  UseFormStateReturn<Values>,
  'getFieldState' | 'getFieldValue' | 'setFieldValue' | 'setFieldArrayValue' | 'registerFieldArray'
> {}

/**
 * Type information for the form field array states component.
 */
export interface FormFieldArrayStates<Values extends FormValues, Name extends Path<Values>> {
  /**
   * Name.
   */
  name: Name;
  /**
   * Fields.
   */
  fields: readonly FormFieldArrayState<Values, Name>[];
  /**
   * Meta.
   */
  meta: FormFieldMeta;
  /**
   * Append.
   */
  append: (value: ArrayElement<NonNullable<PathValue<Values, Name>>>) => void;
  /**
   * Prepend.
   */
  prepend: (value: ArrayElement<NonNullable<PathValue<Values, Name>>>) => void;
  /**
   * Remove.
   */
  remove: (index?: number) => void;
  /**
   * Swap.
   */
  swap: (indexA: number, indexB: number) => void;
  /**
   * Move.
   */
  move: (from: number, to: number) => void;
  /**
   * Insert.
   */
  insert: (index: number, value: ArrayElement<NonNullable<PathValue<Values, Name>>>) => void;
  /**
   * Update.
   */
  update: (index: number, value: ArrayElement<NonNullable<PathValue<Values, Name>>>) => void;
  /**
   * Replace.
   */
  replace: ($values: ArrayElement<NonNullable<PathValue<Values, Name>>>[]) => void;
}
