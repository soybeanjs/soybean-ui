import { ref } from 'vue';
import { useContext } from '../../composables';
import type { AcceptableValue, DataOrientation, Direction } from '../../types';
import type { CheckedState } from './shared';

export const [provideCheckboxRootContext, useCheckboxRootContext] = useContext('CheckboxRoot', () => {
  const disabled = ref(false);
  const state = ref<CheckedState>(false);

  return {
    disabled,
    state
  };
});

export const [provideCheckboxGroupRootContext, useCheckboxGroupRootContext] = useContext('CheckboxGroupRoot', () => {
  const modelValue = ref<AcceptableValue[]>([]);
  const rovingFocus = ref(true);
  const disabled = ref(false);
  const dir = ref<Direction>('ltr');
  const orientation = ref<DataOrientation>('vertical');
  const loop = ref(false);

  return {
    modelValue,
    rovingFocus,
    disabled,
    dir,
    orientation,
    loop
  };
});
