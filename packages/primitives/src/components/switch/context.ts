import { useContext } from '../../composables';
import type { SwitchRootContext, SwitchRootContextParams } from './types';

export const [provideSwitchRootContext, injectSwitchRootContext] = useContext(
  'SwitchRoot',
  (params: SwitchRootContextParams) => {
    const context: SwitchRootContext = {
      modelValue: params.modelValue,
      disabled: params.disabled,
      toggleCheck: () => {
        if (params.disabled.value) return;
        if (params.modelValue === undefined) return;

        params.modelValue.value = !params.modelValue.value;
      }
    };

    return context;
  }
);
