import { computed } from 'vue';
import type { ShallowRef } from 'vue';
import { getIsMultiple, getSingleOrMultipleDefaultValue, isEqual, isNullish, isValueEqualOrExist } from '../shared';
import type { DefinedValue, SingleOrMultipleProps } from '../types';
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
    getSingleOrMultipleDefaultValue(props)
  ) as ShallowRef<P['modelValue']>;

  const isEmptyModelValue = computed(() => {
    if (isMultiple.value && Array.isArray(modelValue.value)) {
      return modelValue.value?.length === 0;
    }
    return isNullish(modelValue.value);
  });

  function onModelValueChange(value: DefinedValue) {
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
