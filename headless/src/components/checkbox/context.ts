import { computed, shallowRef } from 'vue';
import { useContext } from '../../composables';
import { getCheckedState, isIndeterminate } from '../../shared';
import type { CheckboxGroupRootContextParams, CheckboxRootContextParams, CheckboxThemeContextParams } from './types';

export const [provideCheckboxGroupRootContext, useCheckboxGroupRootContext] = useContext(
  'CheckboxGroupRoot',
  (params: CheckboxGroupRootContextParams) => params
);

export const [provideCheckboxRootContext, useCheckboxRootContext] = useContext(
  'CheckboxRoot',
  (params: CheckboxRootContextParams) => {
    const { modelValue, state } = params;

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

export const [provideCheckboxThemeContext, useCheckboxThemeContext] = useContext(
  'CheckboxTheme',
  (params: CheckboxThemeContextParams) => params
);
