import { computed, onMounted, reactive, ref, shallowRef, toValue } from 'vue';
import type { MaybeRefOrGetter } from 'vue';
import { klona } from 'klona/full';
import { defu } from 'defu';
import { isEqual } from 'ohash';
import { getValue, isFunction, isNullish, isPromise, isString, keysOf, setValue } from '../../shared';
import type { Path, PathValue } from '../../types';
import { updateFormState } from './shared';
import { provideFormContext, provideFormFieldContext } from './context';
import type {
  FormContext,
  FormErrors,
  FormEventHandler,
  FormFieldArrayRegistry,
  FormFieldAttrs,
  FormFieldContext,
  FormFieldError,
  FormFieldMeta,
  FormFieldRegistry,
  FormRegisterOptions,
  FormResetState,
  FormState,
  FormSubmitHelper,
  FormTouched,
  FormValidateFn,
  FormValues,
  UseFormOptions
} from './types';

export function useForm<Vn extends FormValidateFn<any>>(options: UseFormOptions<Vn>) {
  type Values = Parameters<Vn>[0];

  const {
    validateOnMounted = false,
    validateMode = 'submit',
    reValidateMode = 'change',
    onSubmit = () => Promise.resolve(),
    onInvalid
  } = options;

  let initialValues = klona(options.initialValues || {}) as Values;
  let initialErrors = klona(options.initialErrors || {});
  let initialTouched = klona(options.initialTouched || {});

  const formState: FormState<Values> = {
    values: reactive(klona(initialValues)),
    touched: ref(klona(initialTouched)),
    errors: ref(klona(initialErrors)),
    submitCount: shallowRef(0),
    isSubmitting: shallowRef(false),
    isValidating: shallowRef(false)
  };

  const fieldRegistry: FormFieldRegistry<Values> = {};
  const fieldArrayRegistry: FormFieldArrayRegistry = {};

  const dirty = computed(() => !isEqual(formState.values, initialValues));
  const validateTiming = computed(() => (formState.submitCount.value === 0 ? validateMode : reValidateMode));

  function registerField<Name extends Path<Values>>(name: MaybeRefOrGetter<Name>, opts?: FormRegisterOptions<Values>) {
    const key = toValue(name);
    if (!(key in formState.values)) {
      setValue(formState.values, key, undefined);
    }

    const { validate } = opts || {};
    if (validate) {
      fieldRegistry[key] = {
        validate
      };
    }
  }

  function registerFieldArray<Name extends Path<Values>>(
    name: MaybeRefOrGetter<Name>,
    opts?: FormRegisterOptions<Values>
  ) {
    registerField(name, opts);

    const key = toValue(name);
    const { reset } = opts || {};
    if (reset) {
      fieldArrayRegistry[key] = {
        reset
      };
    }
  }

  function setFieldTouched<Name extends Path<Values>>(name: Name, touched: boolean) {
    updateFormState(formState, {
      type: 'SetTouched',
      payload: {
        path: name,
        touched
      }
    });
  }

  function setValues(values: Values, shouldValidate = true) {
    updateFormState(formState, { type: 'SetValues', payload: values });

    const willValidate = isNullish(shouldValidate) ? validateTiming.value === 'change' : shouldValidate;

    if (willValidate) {
      return validateForm(formState.values);
    }

    return Promise.resolve();
  }

  function setFieldValue<Name extends Path<Values>>(
    name: MaybeRefOrGetter<Name>,
    value: PathValue<Values, Name>,
    shouldValidate = true
  ) {
    updateFormState(formState, { type: 'SetFieldValue', payload: { path: toValue(name), value } });

    if (shouldValidate) {
      return validateForm(formState.values);
    }

    return Promise.resolve();
  }

  function setFieldArrayValue<Name extends Path<Values>, Method extends (...args: any) => any>(
    name: Name,
    value: PathValue<Values, Name>,
    method: Method,
    args?: Partial<{
      argA: Parameters<Method>[1];
      argB: Parameters<Method>[2];
    }>,
    shouldSetValue = true
  ) {
    if (method && args) {
      if (keysOf(formState.errors.value).length && Array.isArray(getValue(formState.errors.value, name))) {
        const error = method(getValue(formState.errors.value, name), args.argA, args.argB);

        if (shouldSetValue) {
          setFieldError(name, error);
        }
      }

      if (keysOf(formState.touched.value).length && Array.isArray(getValue(formState.touched.value, name))) {
        const touched = method(getValue(formState.touched.value, name), args.argA, args.argB);

        if (shouldSetValue) {
          updateFormState(formState, {
            type: 'SetTouched',
            payload: {
              path: name,
              touched
            }
          });
        }
      }
    }

    return setFieldValue(name, value);
  }

  function setErrors(errors: FormErrors<Values>) {
    updateFormState(formState, { type: 'SetErrors', payload: errors });
  }

  function setFieldError<Name extends Path<Values>>(name: Name, error: FormFieldError<PathValue<Values, Name>>) {
    updateFormState(formState, { type: 'SetFieldError', payload: { path: toValue(name), error } });
  }

  function validateForm(values: Values = formState.values) {
    updateFormState(formState, { type: 'SetIsValidating', payload: true });

    return Promise.all([runFieldValidateHandler(values), runValidateHandler(values)])
      .then(([fieldErrors, validateErrors]) => {
        const errors = defu(fieldErrors, validateErrors);

        setErrors(errors);

        return errors;
      })
      .finally(() => {
        updateFormState(formState, { type: 'SetIsValidating', payload: false });
      });
  }

  function runValidateHandler(values: Values) {
    return new Promise<FormErrors<Values>>(resolve => {
      const maybePromise = options.validate(values);
      if (isNullish(maybePromise)) {
        resolve({});
      } else if (isPromise(maybePromise)) {
        maybePromise.then(error => {
          resolve(error || {});
        });
      } else {
        resolve(maybePromise);
      }
    });
  }

  function runFieldValidateHandler(values: Values) {
    const fieldKeysWithValidation = Object.keys(fieldRegistry).filter(
      field => typeof fieldRegistry?.[field]?.validate === 'function'
    ) as Path<Values>[];

    const fieldValidatePromise = fieldKeysWithValidation.map(field =>
      runSingleFieldValidateHandler(field, getValue(values, field))
    );

    return Promise.all(fieldValidatePromise).then(errors =>
      errors.reduce((prev: FormErrors<Values>, curr, index) => {
        if (curr) {
          setValue(prev, fieldKeysWithValidation[index]!, curr);
        }
        return prev;
      }, {})
    );
  }

  function runSingleFieldValidateHandler<Name extends Path<Values>, Value extends PathValue<Values, Name>>(
    name: Name,
    value: Value
  ) {
    return Promise.resolve(fieldRegistry[name]?.validate?.(value));
  }

  function getFieldValue<Name extends Path<Values>>(name: MaybeRefOrGetter<Name>) {
    return computed<PathValue<Values, Name>>({
      get() {
        return getValue(formState.values, toValue(name));
      },
      set(value) {
        setFieldValue(name, value);
      }
    });
  }

  function getFieldMeta<Name extends Path<Values>, Value = PathValue<Values, Name>>(
    name: MaybeRefOrGetter<Name>
  ): FormFieldMeta<Value> {
    const error = computed(() => getFieldError(name));
    const touched = computed(() => getFieldTouched(name));
    const $dirty = computed(() => getFieldDirty(name));

    return {
      dirty: $dirty,
      error,
      touched
    };
  }

  function getFieldError<Name extends Path<Values>, Value = PathValue<Values, Name>>(
    name: MaybeRefOrGetter<Name>
  ): FormFieldError<Value> {
    const $name = toValue(name);
    return getValue(formState.errors.value, $name);
  }

  function getFieldTouched<Name extends Path<Values>>(name: MaybeRefOrGetter<Name>): FormTouched<boolean> {
    return getValue(formState.touched.value, toValue(name), false);
  }

  function getFieldDirty<Name extends Path<Values>>(name: MaybeRefOrGetter<Name>): boolean {
    return !isEqual(getValue(initialValues, toValue(name)), getValue(formState.values, toValue(name)));
  }

  const handleBlur: FormEventHandler<Path<Values>>['handleBlur'] = (eventOrName, path) => {
    const isPath = (value: any): value is Path<Values> => isString(value);

    if (isPath(eventOrName)) {
      setFieldTouched(eventOrName, true);

      return;
    }

    const { name, id } = eventOrName.target as HTMLInputElement;
    const field = path ?? ((name || id) as Path<Values>);

    if (field) {
      setFieldTouched(field, true);
    }
  };

  const handleChange: FormEventHandler['handleChange'] = () => {
    if (validateTiming.value === 'change') {
      validateForm(formState.values);
    }
  };

  const handleInput: FormEventHandler['handleInput'] = () => {
    if (validateTiming.value === 'input') {
      validateForm(formState.values);
    }
  };

  function getFieldAttrs<Name extends Path<Values>>(name: MaybeRefOrGetter<Name>) {
    return computed<FormFieldAttrs>(() => ({
      name: toValue(name),
      onBlur: handleBlur,
      onChange: handleChange,
      onInput: handleInput
    }));
  }

  function setSubmitting(isSubmitting: boolean) {
    updateFormState(formState, { type: 'SetIsSubmitting', payload: isSubmitting });
  }

  const submitHelper: FormSubmitHelper<Values> = {
    setSubmitting,
    get initialValues() {
      return klona(initialValues || {}) as Values;
    }
  };

  function handleSubmit(event?: Event) {
    event?.preventDefault();

    updateFormState(formState, { type: 'SubmitAttempt' });

    validateForm().then(errors => {
      const isValid = keysOf(errors).length === 0;

      if (isValid) {
        const maybePromise = onSubmit(klona(formState.values), submitHelper);
        if (isNullish(maybePromise)) {
          return;
        }

        maybePromise
          .then(result => {
            updateFormState(formState, { type: 'SubmitSuccess' });
            return result;
          })
          .catch(() => {
            updateFormState(formState, { type: 'SubmitFailure' });
          });
      } else {
        updateFormState(formState, { type: 'SubmitFailure' });
        onInvalid?.(errors);
      }
    });
  }

  function resetForm(nextState?: FormResetState<Values>) {
    const values = klona(nextState?.values || initialValues);
    const errors = klona(nextState?.errors || initialErrors);
    const touched = klona(nextState?.touched || initialTouched);

    initialValues = klona(values);
    initialErrors = klona(errors);
    initialTouched = klona(touched);

    updateFormState(formState, {
      type: 'ResetForm',
      payload: {
        values,
        touched,
        errors,
        submitCount: typeof nextState?.submitCount === 'number' ? nextState.submitCount : 0
      }
    });

    // reset `fields` of `useFieldArray`
    Object.values(fieldArrayRegistry).forEach(field => {
      field?.reset?.();
    });
  }

  function handleReset(event?: Event) {
    event?.preventDefault();

    resetForm();
  }

  function register<Name extends Path<Values>>(name: MaybeRefOrGetter<Name>, opts?: FormRegisterOptions<Values>) {
    registerField(name, opts);

    return {
      value: getFieldValue(name),
      attrs: getFieldAttrs(name),
      ...getFieldMeta(name)
    };
  }

  async function validateField<Name extends Path<Values>>(name: Name) {
    if (fieldRegistry[name] && isFunction(fieldRegistry[name].validate)) {
      updateFormState(formState, { type: 'SetIsValidating', payload: true });

      const value = getValue(formState.values, name) as PathValue<Values, typeof name>;
      const error = (await runSingleFieldValidateHandler(name, value)) as FormFieldError<PathValue<Values, Name>>;

      setFieldError(name, error);
      updateFormState(formState, { type: 'SetIsValidating', payload: false });

      return error;
    }

    return Promise.resolve();
  }

  const context: FormContext<Values> = {
    values: formState.values,
    touched: computed(() => formState.touched.value),
    errors: computed(() => formState.errors.value),
    submitCount: computed(() => formState.submitCount.value),
    isSubmitting: formState.isSubmitting,
    isValidating: computed(() => formState.isValidating.value),
    dirty,
    register,
    setValues,
    setFieldValue,
    setErrors,
    setFieldError,
    setFieldTouched,
    handleSubmit,
    handleReset,
    resetForm,
    validateForm,
    validateField
  };

  provideFormContext(context as FormContext<FormValues>);
  provideFormFieldContext({
    register,
    getFieldValue,
    setFieldValue,
    getFieldError,
    getFieldTouched,
    getFieldDirty,
    getFieldAttrs,
    registerFieldArray,
    setFieldArrayValue,
    setFieldTouched
  } as FormFieldContext<FormValues>);

  onMounted(() => {
    if (!validateOnMounted) return;
    validateForm(initialValues);
  });

  return context;
}
