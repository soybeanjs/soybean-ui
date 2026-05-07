import { computed } from 'vue';
import { useUiContext } from '../../composables';
import { provideInputUi } from '../input/context';
import type { PasswordUiSlot } from './types';

export const [providePasswordUi, usePasswordUi] = useUiContext<PasswordUiSlot>('PasswordUi', ui => {
  const inputUi = computed(() => ({
    root: ui.value?.root,
    control: ui.value?.control,
    clearable: ui.value?.clearable
  }));

  provideInputUi(inputUi);

  return ui;
});
