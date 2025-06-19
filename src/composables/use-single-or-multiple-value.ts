import { computed } from 'vue';
import type { ShallowRef } from 'vue';
import { isEqual, isNullish, isValueEqualOrExist } from '../shared';
import type { AcceptableValue, SingleOrMultipleProps } from '../types';
import { useControllableState } from './use-controllable-state';

export function useSingleOrMultipleValue<P extends SingleOrMultipleProps>(
  props: P,
  onUpdateModelValue: (value: P['modelValue']) => void
) {
  const isMultiple = computed(() => getIsMultiple(props));

  const modelValue = useControllableState(
    () => props.modelValue,
    value => {
      onUpdateModelValue(value);
    },
    getDefaultValue(props)
  ) as ShallowRef<P['modelValue']>;

  const isEmptyModelValue = computed(() => {
    if (isMultiple.value && Array.isArray(modelValue.value)) {
      return modelValue.value?.length === 0;
    }
    return isNullish(modelValue.value);
  });

  function onModelValueChange(value: NonNullable<AcceptableValue>) {
    if (!isMultiple.value) {
      modelValue.value = isEqual(value, modelValue.value) ? undefined : value;
      return;
    }

    const updated = Array.isArray(modelValue.value)
      ? [...modelValue.value]
      : [modelValue.value].filter(v => !isNullish(v));

    if (isValueEqualOrExist(updated, value)) {
      const index = updated.findIndex(v => isEqual(v, value));
      updated.splice(index, 1);
    } else {
      updated.push(value);
    }

    modelValue.value = updated;
  }

  return {
    modelValue,
    onModelValueChange,
    isMultiple,
    isEmptyModelValue
  };
}

/**
 * Validates the props and it makes sure that the types are coherent with each other
 *
 * 1. If multiple is defined, return it.
 * 2. If modelValue and defaultValue are defined and not of the same type, throw an error.
 * 3. If multiple is not defined: a. If modelValue is an array, return true. b. If modelValue is not an array, return
 *    false.
 * 4. Return true if modelValue is an array, else return false.
 */
function getIsMultiple(props: SingleOrMultipleProps) {
  const { modelValue, defaultValue, multiple } = props;

  if (!isNullish(multiple)) {
    return multiple;
  }

  const value = isNullish(modelValue) ? defaultValue : modelValue;
  const canTypeBeInferred = !isNullish(modelValue) || !isNullish(defaultValue);

  if (canTypeBeInferred) {
    return Boolean(Array.isArray(value));
  }

  // always fallback to false
  return multiple ?? false;
}

function getDefaultValue(props: SingleOrMultipleProps) {
  if (!isNullish(props.defaultValue)) {
    return props.defaultValue;
  }

  return props.multiple ? [] : undefined;
}
