import { computed } from 'vue';
import { useContext, useUiContext } from '../../composables';
import { isNullish } from '../../shared';
import type { AcceptableBooleanValue } from '../../types';
import type { SwitchRootContextParams, SwitchUiSlot } from './types';

export const [provideSwitchRootContext, useSwitchRootContext] = useContext(
  'SwitchRoot',
  <T extends AcceptableBooleanValue>(params: SwitchRootContextParams<T>) => {
    const { modelValue, disabled, trueValue, falseValue } = params;

    function toggleCheck() {
      if (disabled.value) return;

      if (isNullish(modelValue.value)) {
        modelValue.value = trueValue.value as T;
      } else {
        modelValue.value = modelValue.value === trueValue.value ? (falseValue.value as T) : (trueValue.value as T);
      }
    }

    const dataState = computed(() => (modelValue?.value === trueValue.value ? 'checked' : 'unchecked'));

    const dataDisabled = computed(() => (disabled.value ? '' : undefined));

    return {
      ...params,
      toggleCheck,
      dataState,
      dataDisabled
    };
  }
);

export const [provideSwitchUi, useSwitchUi] = useUiContext<SwitchUiSlot>('SwitchUi');
