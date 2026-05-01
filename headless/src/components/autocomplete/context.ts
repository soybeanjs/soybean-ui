import { useContext, useUiContext } from '../../composables';
import { provideComboboxUi } from '../combobox/context';
import type { AutocompleteRootContext, AutocompleteUiSlot } from './types';

export const [provideAutocompleteRootContext, useAutocompleteRootContext] =
  useContext<AutocompleteRootContext>('AutocompleteRoot');

export const [provideAutocompleteUi, useAutocompleteUi] = useUiContext<AutocompleteUiSlot>('AutocompleteUi', ui => {
  provideComboboxUi(ui);

  return ui;
});
