import { computed, shallowRef } from 'vue';
import { isNullish, isValueEqualOrExist } from '../../shared';
import { useContext, useControllableState } from '../../composables';
import type { AcceptableValue, CheckedState } from '../../types';
import { getCheckedState, isIndeterminate } from './shared';
import type { CheckboxGroupRootContextParams, CheckboxRootContextParams } from './types';

export const [provideCheckboxGroupRootContext, useCheckboxGroupRootContext] = useContext(
  'CheckboxGroupRoot',
  (params: CheckboxGroupRootContextParams) => {
    const modelValue = useControllableState(
      () => params.modelValue.value,
      value => {
        if (value) {
          params.onUpdateModelValue?.(value as NonNullable<AcceptableValue>[]);
        }
      },
      params.defaultValue.value
    );

    return {
      ...params,
      modelValue
    };
  }
);

export const [provideCheckboxRootContext, useCheckboxRootContext] = useContext(
  'CheckboxRoot',
  (params: CheckboxRootContextParams) => {
    const modelValue = useControllableState(
      () => params.modelValue.value,
      value => {
        if (!isNullish(value)) {
          params.onUpdateModelValue?.(value);
        }
      },
      params.defaultValue.value
    );

    const state = computed<CheckedState>(() => {
      if (!isNullish(params.groupModelValue?.value)) {
        return isValueEqualOrExist(params.groupModelValue.value, params.value.value);
      }

      if (isNullish(modelValue.value)) {
        return false;
      }

      return modelValue.value === 'indeterminate' ? 'indeterminate' : modelValue.value;
    });

    const ariaChecked = computed(() => {
      if (isIndeterminate(state.value)) {
        return 'mixed';
      }
      return state.value;
    });

    const dataDisabled = computed(() => (params.disabled.value ? '' : undefined));
    const dataState = computed(() => getCheckedState(state.value));

    const controlId = shallowRef('');

    const initControlId = (id: string) => {
      controlId.value = id;
    };

    return {
      ...params,
      modelValue,
      state,
      ariaChecked,
      dataDisabled,
      dataState,
      controlId,
      initControlId
    };
  }
);
