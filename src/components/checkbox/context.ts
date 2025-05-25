import { computed } from 'vue';
import { useContext, useControllableState } from '../../composables';
import { getCheckedState } from './shared';
import type { CheckboxGroupRootContextParams, CheckboxRootContextParams } from './types';

export const [provideCheckboxGroupRootContext, useCheckboxGroupRootContext] = useContext(
  'CheckboxGroupRoot',
  (params: CheckboxGroupRootContextParams) => {
    const modelValue = useControllableState(
      () => params.modelValue.value,
      value => {
        if (value) {
          params.onUpdateModelValue?.(value);
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
    const dataDisabled = computed(() => (params.disabled.value ? '' : undefined));
    const dataState = computed(() => getCheckedState(params.state.value));

    return {
      ...params,
      dataDisabled,
      dataState
    };
  }
);
