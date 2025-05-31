import { computed, shallowRef } from 'vue';
import { getCheckedState } from '../checkbox/shared';
import { useContext } from '../../composables';
import type { RadioGroupItemContextParams, RadioGroupRootContextParams } from './types';

export const [provideRadioGroupRootContext, useRadioGroupRootContext] = useContext(
  'RadioGroupRoot',
  (params: RadioGroupRootContextParams) => params
);

export const [provideRadioGroupItemContext, useRadioGroupItemContext] = useContext(
  'RadioGroupItem',
  (params: RadioGroupItemContextParams) => {
    const dataState = computed(() => getCheckedState(params.checked.value));

    const controlId = shallowRef('');

    const initControlId = (id: string) => {
      controlId.value = id;
    };

    return {
      ...params,
      dataState,
      controlId,
      initControlId
    };
  }
);
