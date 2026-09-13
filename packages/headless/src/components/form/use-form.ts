import { computed, inject, provide, watch } from 'vue';
import type { ComputedRef } from 'vue';
import { useField as useTanStackField, useForm as useTanStackForm } from '@tanstack/vue-form';
import type { DeepKeys, DeepValue, StandardSchemaV1 } from '@tanstack/vue-form';
import { klona } from '../../shared';
import type {
  FormErrors,
  FormFieldArrayStates,
  FormFieldMeta,
  FormFieldRegisterOptions,
  FormFieldState,
  FormFieldValidator,
  FormValidateMode,
  FormValues,
  FormValuesSchema,
  InferStandardSchemaInput,
  UseFormOptions,
  UseFormReturn
} from './types';

const USE_FORM_CONTEXT_KEY = Symbol('UseFormContext');
const USE_FORM_SUB_CONTEXT_KEY = Symbol('UseFormSubContext');

type FormContext = UseFormReturn<FormValues>;

type FormValidator = StandardSchemaV1<FormValues, unknown> | undefined;

type FieldErrorResult = string | undefined | Promise<string | undefined>;

type FieldValidatorAdapter<Value> = (props: { value: Value }) => FieldErrorResult;

/**
 * TanStack's array ops are typed against resolved `DeepValue` paths; with the open
 * `FormValues` record the element type can't be resolved, so the ops go through this
 * structural shape.
 */
interface ArrayValueOps {
  pushFieldValue: (field: string, value: unknown) => void;
  insertFieldValue: (field: string, index: number, value: unknown) => Promise<void> | void;
  removeFieldValue: (field: string, index: number) => Promise<void> | void;
  swapFieldValues: (field: string, indexA: number, indexB: number) => void;
  moveFieldValues: (field: string, index1: number, index2: number) => void;
  replaceFieldValue: (field: string, index: number, value: unknown) => Promise<void> | void;
  setFieldValue: (field: string, value: unknown) => void;
}

function toValidatorKey(mode: FormValidateMode): 'onChange' | 'onBlur' | 'onSubmit' {
  if (mode === 'blur') return 'onBlur';
  if (mode === 'submit') return 'onSubmit';
  return 'onChange';
}

function toErrorMessage(error: unknown): string {
  if (typeof error === 'string') return error;
  if (error && typeof error === 'object' && 'message' in error) {
    const message = (error as { message?: unknown }).message;
    return typeof message === 'string' ? message : '';
  }
  return '';
}

function firstErrorMessage(errors: readonly unknown[] | undefined): string | undefined {
  if (!errors) return undefined;
  for (const error of errors) {
    const message = toErrorMessage(error);
    if (message) return message;
  }
  return undefined;
}

function toFieldMeta(meta: { isDirty: boolean; isTouched: boolean; errors: readonly unknown[] }): FormFieldMeta {
  return {
    dirty: meta.isDirty,
    error: firstErrorMessage(meta.errors),
    touched: meta.isTouched
  };
}

function buildFieldValidators<Value>(mode: FormValidateMode, validate?: FormFieldValidator<Value>) {
  const validators: Partial<
    Record<
      'onChange' | 'onChangeAsync' | 'onBlur' | 'onBlurAsync' | 'onSubmit' | 'onSubmitAsync',
      FieldValidatorAdapter<Value>
    >
  > = {};
  if (!validate) return validators;

  const key = toValidatorKey(mode);

  // A validator may return a promise; sync slots must stay sync, so the same adapter is
  // registered on the matching async slots where TanStack awaits the result.
  const syncAdapter: FieldValidatorAdapter<Value> = props => {
    const result = validate(props.value);
    if (result && typeof (result as PromiseLike<unknown>).then === 'function') return undefined;
    return result;
  };
  const asyncAdapter: FieldValidatorAdapter<Value> = props => Promise.resolve(validate(props.value));

  // Submit-cause validators are always attached so `handleSubmit` awaits field validation.
  validators.onSubmit = syncAdapter;
  validators.onSubmitAsync = asyncAdapter;
  if (key !== 'onSubmit') {
    validators[key] = syncAdapter;
    validators[`${key}Async`] = asyncAdapter;
  }

  return validators;
}

export function useForm<S extends FormValuesSchema, Values extends FormValues = InferStandardSchemaInput<S>>(
  options: UseFormOptions<S, Values>
): UseFormReturn<Values> {
  const { schema, validateMode = 'submit', reValidateMode = 'change', validateOnMounted = false } = options;

  const defaultValues = klona(options.initialValues ?? {}) as FormValues;

  const buildSchemaValidators = (mode: FormValidateMode, includeMount: boolean) => {
    const key = toValidatorKey(mode);
    const validators: Partial<
      Record<'onMount' | 'onChange' | 'onBlur' | 'onSubmit', StandardSchemaV1<FormValues, unknown>>
    > = {
      onSubmit: schema
    };
    if (key !== 'onSubmit') validators[key] = schema;
    if (includeMount) validators.onMount = schema;
    return validators;
  };

  // `FormApi.update` replaces the whole options object, so keep one reference around to
  // re-apply `onSubmit` / `onInvalid` when the validation timing switches.
  const tanStackOptions = {
    defaultValues,
    validators: buildSchemaValidators(validateMode, validateOnMounted),
    onSubmit: ({ value }: { value: FormValues }) => options.onSubmit?.(value as Values),
    onSubmitInvalid: () => options.onInvalid?.(collectErrors())
  };

  const form = useTanStackForm<
    FormValues,
    FormValidator,
    FormValidator,
    undefined,
    FormValidator,
    undefined,
    FormValidator,
    undefined,
    undefined,
    undefined,
    undefined,
    never
  >(tanStackOptions);

  function collectErrors(): FormErrors {
    const errors: FormErrors = {};
    const fieldMeta = form.state.fieldMeta as Record<string, { errors?: readonly unknown[] } | undefined>;
    Object.keys(fieldMeta).forEach(name => {
      const message = firstErrorMessage(fieldMeta[name]?.errors);
      if (message) {
        errors[name] = message;
      }
    });
    return errors;
  }

  // `form.state` is a plain TanStack Store snapshot without Vue reactivity; reactive
  // reads must go through `useSelector`.
  const submissionAttempts = form.useSelector(state => state.submissionAttempts);
  const validateTiming = computed<FormValidateMode>(() =>
    submissionAttempts.value > 0 ? reValidateMode : validateMode
  );

  watch(validateTiming, timing => {
    form.update({ ...tanStackOptions, validators: buildSchemaValidators(timing, false) });
  });

  const resetCallbacks: (() => void)[] = [];

  function useField<Name extends DeepKeys<FormValues>>(
    name: Name,
    opts?: FormFieldRegisterOptions<DeepValue<FormValues, Name>>
  ): ComputedRef<FormFieldState<FormValues, Name>> {
    const validators = computed(() => buildFieldValidators(validateTiming.value, opts?.validate));

    const field = useTanStackField({ form, name, validators: validators.value });

    watch(validators, value => {
      field.api.update({ form, name, validators: value });
    });

    if (opts?.reset) {
      resetCallbacks.push(opts.reset);
    }

    return computed<FormFieldState<FormValues, Name>>(() => ({
      name,
      value: field.state.value,
      meta: toFieldMeta(field.state.meta),
      handleChange: value => field.api.handleChange(value),
      onBlur: () => field.api.handleBlur()
    }));
  }

  function useFieldArray<Name extends DeepKeys<FormValues>>(
    name: Name,
    opts?: FormFieldRegisterOptions<DeepValue<FormValues, Name>>
  ): ComputedRef<FormFieldArrayStates<FormValues, Name>> {
    const validators = computed(() => buildFieldValidators(validateTiming.value, opts?.validate));

    const field = useTanStackField({ form, name, mode: 'array', validators: validators.value });

    watch(validators, value => {
      field.api.update({ form, name, validators: value });
    });

    if (opts?.reset) {
      resetCallbacks.push(opts.reset);
    }

    const arrayOps = form as unknown as ArrayValueOps;

    return computed<FormFieldArrayStates<FormValues, Name>>(() => {
      const value: unknown = field.state.value;
      const items = Array.isArray(value) ? [...value] : [];
      const entryOf = (item: unknown, index: number) => ({ key: `${String(name)}-${index}`, name, value: item });

      return {
        name,
        fields: items.map(entryOf),
        meta: toFieldMeta(field.state.meta),
        append: item => arrayOps.pushFieldValue(name, item),
        prepend: item => arrayOps.insertFieldValue(name, 0, item),
        insert: (index, item) => arrayOps.insertFieldValue(name, index, item),
        remove: index => arrayOps.removeFieldValue(name, index ?? Math.max(items.length - 1, 0)),
        swap: (indexA, indexB) => arrayOps.swapFieldValues(name, indexA, indexB),
        move: (from, to) => arrayOps.moveFieldValues(name, from, to),
        update: (index, item) => arrayOps.replaceFieldValue(name, index, item),
        replace: nextItems => arrayOps.setFieldValue(name, nextItems)
      };
    });
  }

  function handleSubmit(event?: Event) {
    event?.preventDefault();
    return form.handleSubmit();
  }

  function handleReset(event?: Event) {
    event?.preventDefault();
    form.reset();
    resetCallbacks.forEach(reset => reset());
  }

  const context: UseFormReturn<FormValues> = {
    form,
    state: form.state,
    isSubmitting: form.useSelector(state => state.isSubmitting),
    validateTiming,
    handleSubmit,
    handleReset,
    useField,
    useFieldArray
  };

  provide(USE_FORM_CONTEXT_KEY, context);

  // The engine runs on the open `FormValues` record while the public surface re-types the
  // context with the schema-inferred values; this is the single variance bridge.
  return context as unknown as UseFormReturn<Values>;
}

export function useFormSub(): FormContext {
  const context = inject<FormContext | undefined>(USE_FORM_SUB_CONTEXT_KEY);
  if (!context) {
    throw new Error('useFormSub must be used within a useForm provider');
  }
  return context;
}

export function provideFormSub(): FormContext {
  const parentContext = inject<FormContext | null>(USE_FORM_CONTEXT_KEY, null);

  if (!parentContext) {
    throw new Error('useFormSub must be used within a useForm provider');
  }

  provide(USE_FORM_SUB_CONTEXT_KEY, parentContext);

  return parentContext;
}
