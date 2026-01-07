import { computed } from 'vue';
import { isNullish } from '../shared';
import type { DefinedValue, SelectionProps } from '../types';
import { useControllableState } from './use-controllable-state';

export function useSelection<M extends boolean = false, N extends DefinedValue = string>(
  props: SelectionProps<M, N>,
  onUpdateModelValue: (value: NonNullable<SelectionProps<M, N>['modelValue']>) => void
) {
  // @ts-expect-error ignore type: Vue props Boolean Casting [https://vuejs.org/guide/components/props.html#boolean-casting]
  const isMultiple = computed(() => Boolean(props.multiple) || props.multiple === '');

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

    return (isMultiple.value ? [] : undefined) as SelectionProps<M, N>['modelValue'];
  }

  const isEmptyModelValue = computed(() => {
    if (isMultiple.value && Array.isArray(modelValue.value)) {
      return modelValue.value?.length === 0;
    }
    return isNullish(modelValue.value);
  });

  const onModelValueChange = (value: N) => {
    if (!isMultiple.value) {
      const updated = modelValue.value === value ? undefined : value;

      modelValue.value = updated as SelectionProps<M, N>['modelValue'];

      if (updated === undefined) {
        // @ts-expect-error ignore type
        onUpdateModelValue(updated);
      }
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
