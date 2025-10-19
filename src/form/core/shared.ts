import deepmerge from 'deepmerge';
import type { ArrayMergeOptions } from 'deepmerge';
import { klona } from 'klona/full';
import { keysOf, setValue } from '../../shared';
import type { FormErrors, FormMessage, FormState, FormValues } from './types';

export function updateFormState<Values extends FormValues>(state: FormState<Values>, message: FormMessage<Values>) {
  switch (message.type) {
    case 'SubmitAttempt':
      state.isSubmitting.value = true;
      state.submitCount.value += 1;
      break;
    case 'SubmitSuccess':
      state.isSubmitting.value = false;
      break;
    case 'SubmitFailure':
      state.isSubmitting.value = false;
      break;
    case 'SetValues':
      Object.keys(state.values).forEach(key => {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete state.values[key];
      });
      Object.keys(message.payload).forEach(path => {
        // @ts-expect-error ignore type error
        state.values[path] = message.payload[path];
      });
      break;
    case 'SetFieldValue':
      setValue(state.values, message.payload.path, klona(message.payload.value));
      break;
    case 'SetTouched':
      setValue(state.touched.value, message.payload.path, message.payload.touched);
      break;
    case 'SetErrors':
      state.errors.value = message.payload;
      break;
    case 'SetFieldError':
      setValue(state.errors.value, message.payload.path, message.payload.error);
      break;
    case 'SetIsSubmitting':
      state.isSubmitting.value = message.payload;
      break;
    case 'SetIsValidating':
      state.isValidating.value = message.payload;
      break;
    case 'ResetForm':
      updateFormState(state, {
        type: 'SetValues',
        payload: message.payload.values
      });
      state.touched.value = message.payload.touched;
      state.errors.value = message.payload.errors;
      state.submitCount.value = message.payload.submitCount;
      break;
    default:
  }
}

/**
 * deepmerge array merging algorithm
 * https://github.com/TehShrike/deepmerge#arraymerge-example-combine-arrays
 */
export function arrayMerge<T extends any[]>(target: T, source: T, options: ArrayMergeOptions) {
  const destination = [...target];

  source.forEach((item, index) => {
    if (typeof destination[index] === 'undefined') {
      destination[index] = options.cloneUnlessOtherwiseSpecified(item, options);
    } else if (options.isMergeableObject(item)) {
      destination[index] = deepmerge(target[index], item, options);
    } else if (!target.includes(item)) {
      destination.push(item);
    }
  });
  return destination;
}

export function toNestError<Values>(errors: Record<string, string>) {
  const fieldErrors: FormErrors<Values> = {};

  keysOf(errors).forEach(path => {
    setValue(fieldErrors, path, errors[path]);
  });

  return fieldErrors;
}
