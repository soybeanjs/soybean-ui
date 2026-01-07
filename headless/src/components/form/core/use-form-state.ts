import { computed, onMounted, reactive, ref, shallowRef, toRef } from 'vue';
import type { Ref } from 'vue';
import { klona } from 'klona/full';
import type { StandardSchemaV1 } from '@standard-schema/spec';
import { defu } from 'defu';
import { isEqual } from 'ohash';
import { getValue, isFunction, isNullish, isString, keysOf, setValue } from '../../../shared';
import type { Path, PathValue } from '../../../types';
import { updateFormState } from './shared';
import { validateStandardSchema } from './standard';
import type {
  FormErrors,
  FormEventHandler,
  FormFieldArrayRegistry,
  FormFieldMeta,
  FormFieldRegistry,
  FormFieldState,
  FormRegisterOptions,
  FormResetState,
  FormState,
  FormSubmitHelper,
  FormValues,
  InferStandardSchemaInput,
  UseFormOptions,
  UseFormStateReturn
} from './types';

export function useFormState<S extends StandardSchemaV1<FormValues, FormValues>>(options: UseFormOptions<S>) {
  type Values = InferStandardSchemaInput<S>;

  const { validateOnMounted = false, validateMode = 'submit', reValidateMode = 'change' } = options;

  let initialValues = klona(options.initialValues || {});
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

  const dirty = computed(() => !isEqual(formState.values, initialValues));

  const fieldRegistry: FormFieldRegistry<Values> = {};
  const fieldArrayRegistry: FormFieldArrayRegistry<Values> = {};

  const validateTiming = computed(() => (formState.submitCount.value === 0 ? validateMode : reValidateMode));

  function registerField<Name extends Path<Values>>(
    name: Name,
    opts?: FormRegisterOptions<PathValue<Values, Name>>,
    isArray?: boolean
  ) {
    const key = name;
    if (!(key in formState.values)) {
      setValue(formState.values, key, isArray ? [] : undefined);
    }

    const { validate } = opts || {};
    if (validate) {
      fieldRegistry[key] = {
        validate
      };
    }

    const state = getFieldState(name);

    return state;
  }

  function registerFieldArray<Name extends Path<Values>>(
    name: Name,
    opts?: FormRegisterOptions<PathValue<Values, Name>>
  ) {
    const state = registerField(name, opts, true);

    const key = name;
    const { reset } = opts || {};
    if (reset) {
      fieldArrayRegistry[key] = {
        reset
      };
    }

    return state;
  }

  function setValues(values: Values, shouldValidate = true) {
    updateFormState(formState, { type: 'SetValues', payload: values });

    const willValidate = isNullish(shouldValidate) ? validateTiming.value === 'change' : shouldValidate;

    if (willValidate) {
      return validateForm(formState.values);
    }

    return Promise.resolve();
  }

  function setErrors(errors: FormErrors<Values>) {
    updateFormState(formState, { type: 'SetErrors', payload: errors });
  }

  function setFieldValue<Name extends Path<Values>>(name: Name, value: PathValue<Values, Name>, shouldValidate = true) {
    updateFormState(formState, { type: 'SetFieldValue', payload: { name, value } });

    if (shouldValidate) {
      return validateForm(formState.values);
    }

    return Promise.resolve();
  }

  function setFieldTouched<Name extends Path<Values>>(name: Name, touched: boolean) {
    updateFormState(formState, {
      type: 'SetTouched',
      payload: {
        name,
        touched
      }
    });
  }

  function setFieldError<Name extends Path<Values>>(name: Name, error: string | undefined) {
    updateFormState(formState, { type: 'SetFieldError', payload: { name, error } });
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
              name,
              touched
            }
          });
        }
      }
    }

    return setFieldValue(name, value);
  }

  function getFieldValue<Name extends Path<Values>>(name: Name) {
    return computed<PathValue<Values, Name>>({
      get() {
        return getValue(formState.values, name);
      },
      set(value) {
        setFieldValue(name, value);
      }
    });
  }

  function getFieldMeta<Name extends Path<Values>>(name: Name): Ref<FormFieldMeta> {
    const meta = {
      dirty: computed(() => getFieldDirty(name)),
      error: computed(() => getFieldError(name)),
      touched: computed(() => getFieldTouched(name))
    };

    return toRef(meta);
  }

  function getFieldError<Name extends Path<Values>>(name: Name): string | undefined {
    return getValue(formState.errors.value, name);
  }

  function getFieldTouched<Name extends Path<Values>>(name: Name): boolean | undefined {
    return getValue(formState.touched.value, name, false);
  }

  function getFieldDirty<Name extends Path<Values>>(name: Name): boolean {
    return !isEqual(getValue(initialValues, name), getValue(formState.values, name));
  }

  async function validateField<Name extends Path<Values>>(name: Name) {
    if (fieldRegistry[name] && isFunction(fieldRegistry[name].validate)) {
      updateFormState(formState, { type: 'SetIsValidating', payload: true });

      const value = getValue(formState.values, name) as PathValue<Values, typeof name>;
      const error = await runSingleFieldValidateHandler(name, value);

      setFieldError(name, error);
      updateFormState(formState, { type: 'SetIsValidating', payload: false });

      return error;
    }

    return Promise.resolve();
  }

  const onBlur: FormEventHandler<Path<Values>>['onBlur'] = (eventOrName, path) => {
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

  const onChange: FormEventHandler['onChange'] = () => {
    if (validateTiming.value === 'change') {
      validateForm(formState.values);
    }
  };

  const onInput: FormEventHandler['onInput'] = () => {
    if (validateTiming.value === 'input') {
      validateForm(formState.values);
    }
  };

  function getFieldState<Name extends Path<Values>>(name: Name) {
    const meta = getFieldMeta(name);

    const state = {
      name,
      value: getFieldValue(name),
      meta,
      onBlur,
      onChange,
      onInput
    };

    return toRef(state) as Ref<FormFieldState<Values, Name>>;
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

  async function runFieldValidateHandler(values: Values) {
    const fieldKeysWithValidation = keysOf(fieldRegistry).filter(field =>
      isFunction(fieldRegistry?.[field]?.validate)
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

  async function validateForm(values: Values = formState.values) {
    updateFormState(formState, { type: 'SetIsValidating', payload: true });

    return Promise.all([runFieldValidateHandler(values), validateStandardSchema(values, options.schema)])
      .then(([fieldErrors, schemaErrors]) => {
        const errors = defu(fieldErrors, schemaErrors) as FormErrors<Values>;

        setErrors(errors);

        return errors;
      })
      .finally(() => {
        updateFormState(formState, { type: 'SetIsValidating', payload: false });
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
      (field as { reset?: () => void })?.reset?.();
    });
  }

  onMounted(() => {
    if (!validateOnMounted) return;
    validateForm(initialValues);
  });

  const result: UseFormStateReturn<Values> = {
    formState,
    dirty,
    submitHelper,
    setSubmitting,
    registerField,
    registerFieldArray,
    validateField,
    getFieldValue,
    getFieldMeta,
    getFieldError,
    getFieldTouched,
    getFieldDirty,
    getFieldState,
    setValues,
    setErrors,
    setFieldValue,
    setFieldTouched,
    setFieldError,
    setFieldArrayValue,
    validateForm,
    resetForm
  };

  return result;
}
