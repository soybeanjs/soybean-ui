import { computed } from 'vue';
import { useContext } from '../../composables';
import { isNullish } from '../../shared';
import type { AcceptableBooleanValue } from '../../types';
import type { SwitchRootContextParams, SwitchThemeContextParams } from './types';

export const [provideSwitchRootContext, useSwitchRootContext] = useContext(
  'SwitchRoot',
  <T extends AcceptableBooleanValue = boolean>(params: SwitchRootContextParams<T>) => {
    const { modelValue, disabled, trueValue, falseValue } = params;

    function toggleCheck() {
      if (disabled.value) return;

      if (isNullish(modelValue.value)) {
        modelValue.value = trueValue.value as T;
      } else {
        modelValue.value = modelValue.value === trueValue.value ? (falseValue.value as T) : (trueValue.value as T);
      }
    }

    const dataState = computed(() => (modelValue?.value ? 'checked' : 'unchecked'));

    const dataDisabled = computed(() => (disabled.value ? '' : undefined));

    return {
      ...params,
      toggleCheck,
      dataState,
      dataDisabled
    };
  }
);

export const [provideSwitchThemeContext, useSwitchThemeContext] = useContext(
  'SwitchTheme',
  (params: SwitchThemeContextParams) => params
);
