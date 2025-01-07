import { useContext } from '../../composables';
import type { AcceptableValue } from '../../types';
import type { CheckboxGroupRootContext, CheckboxGroupRootContextParams, CheckboxRootContext } from './types';

export const [provideCheckboxRootContext, injectCheckboxRootContext] = useContext(
  'CheckboxRoot',
  (params: CheckboxRootContext) => params
);

export const [provideCheckboxGroupRootContext, injectCheckboxGroupRootContext] = useContext(
  'CheckboxGroupRoot',
  (params: CheckboxGroupRootContextParams) => {
    const context: CheckboxGroupRootContext = {
      ...params,
      updateModelValue: (value: AcceptableValue[]) => {
        params.modelValue.value = value;
      }
    };

    return context;
  }
);
