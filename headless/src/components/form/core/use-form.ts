import { klona } from 'klona/full';
import type { StandardSchemaV1 } from '@standard-schema/spec';
import { isNullish, keysOf } from '../../../shared';
import type { Path, PathValue } from '../../../types';
import { updateFormState } from './shared';
import { useFormState } from './use-form-state';
import { useRegisterFieldArray } from './use-field-array';
import type { FormContext, FormRegisterOptions, FormValues, InferStandardSchemaInput, UseFormOptions } from './types';

export function useForm<S extends StandardSchemaV1<FormValues, FormValues>>(options: UseFormOptions<S>) {
  type Values = InferStandardSchemaInput<S>;

  const { onSubmit = () => Promise.resolve(), onInvalid } = options;

  const { formState, submitHelper, ...rest } = useFormState<S>(options);
  const { resetForm, validateForm, registerField } = rest;

  function useFieldArray<Name extends Path<Values>>(name: Name, opts?: FormRegisterOptions<PathValue<Values, Name>>) {
    const { getFieldState, getFieldValue, setFieldValue, setFieldArrayValue, registerFieldArray } = rest;

    return useRegisterFieldArray<Values, Name>(
      name,
      {
        getFieldState,
        getFieldValue,
        setFieldValue,
        setFieldArrayValue,
        registerFieldArray
      },
      opts?.validate
    );
  }

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

  function handleReset(event?: Event) {
    event?.preventDefault();

    resetForm();
  }

  const context: Readonly<FormContext<Values>> = {
    ...formState,
    handleSubmit,
    handleReset,
    useField: registerField,
    useFieldArray,
    ...rest
  };

  return context;
}
