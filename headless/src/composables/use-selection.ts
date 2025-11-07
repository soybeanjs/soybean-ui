import { computed } from 'vue';
import { isNullish } from '../shared';
import type { DefinedValue, SelectionProps } from '../types';
import { useControllableState } from './use-controllable-state';

export function useSelection<M extends boolean = false, N extends DefinedValue = string>(
  props: SelectionProps<M, N>,
  onUpdateModelValue: (value: NonNullable<SelectionProps<M, N>['modelValue']>) => void
) {
  const isMultiple = computed(() => Boolean(props.multiple));

  const modelValue = useControllableState(
    () => props.modelValue,
    value => {
      onUpdateModelValue(value!);
    },
    getSelectionDefaultValue()
  );

  function getSelectionDefaultValue() {
    if (!isNullish(props.defaultValue)) {
      return props.defaultValue;
    }

    return (props.multiple ? [] : undefined) as SelectionProps<M, N>['modelValue'];
  }

  const isEmptyModelValue = computed(() => {
    if (isMultiple.value && Array.isArray(modelValue.value)) {
      return modelValue.value?.length === 0;
    }
    return isNullish(modelValue.value);
  });

  const onModelValueChange = (value: N) => {
    if (!props.multiple) {
      const updated = modelValue.value === value ? undefined : value;

      modelValue.value = updated as SelectionProps<M, N>['modelValue'];
      return;
    }

    let values = [...((modelValue.value ?? []) as N[])];

    if (values.includes(value)) {
      values = values.filter(v => v !== value);
    } else {
      values = [...values, value];
    }

    modelValue.value = values as SelectionProps<M, N>['modelValue'];
  };

  return {
    modelValue,
    onModelValueChange,
    isMultiple,
    isEmptyModelValue
  };
}
