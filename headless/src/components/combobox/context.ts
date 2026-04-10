import { computed } from 'vue';
import { useContext, useUiContext } from '../../composables';
import { provideListboxUi } from '../listbox/context';
import { providePopperUi } from '../popper/context';
import type { ComboboxRootContext, ComboboxUiSlot } from './types';

export const [provideComboboxRootContext, useComboboxRootContext] = useContext<ComboboxRootContext>('ComboboxRoot');

export const [provideComboboxUi, useComboboxUi] = useUiContext<ComboboxUiSlot>('ComboboxUi', ui => {
  const popperUi = computed(() => ({
    positioner: ui.value?.positioner,
    popup: ui.value?.popup
  }));

  const listboxUi = computed(() => ({
    root: '',
    content: ui.value?.viewport,
    filterRoot: ui.value?.inputRoot,
    filterControl: ui.value?.inputControl,
    item: ui.value?.item,
    itemIndicator: ui.value?.itemIndicator,
    group: ui.value?.group,
    groupLabel: ui.value?.groupLabel,
    virtualizer: ''
  }));

  providePopperUi(popperUi);
  provideListboxUi(listboxUi);

  return ui;
});
