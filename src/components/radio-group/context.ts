import { useContext, useControllableState } from '../../composables';
import type { RadioGroupItemContextParams, RadioGroupRootContextParams } from './types';

export const [provideRadioGroupRootContext, useRadioGroupRootContext] = useContext(
  'RadioGroupRoot',
  (params: RadioGroupRootContextParams) => {
    const modelValue = useControllableState(
      () => params.modelValue.value,
      value => {
        params.onUpdateModelValue?.(value);
      },
      params.defaultValue.value
    );

    return {
      ...params,
      modelValue
    };
  }
);

export const [provideRadioGroupItemContext, useRadioGroupItemContext] = useContext(
  'RadioGroupItem',
  (params: RadioGroupItemContextParams) => params
);
