import { useContext, useUiContext } from '../../composables';
import type { AutocompleteRootContext, AutocompleteUiSlot } from './types';

export const [provideAutocompleteRootContext, useAutocompleteRootContext] = useContext(
  'AutocompleteRoot',
  (params: AutocompleteRootContext) => params
);

export const [provideAutocompleteUi, useAutocompleteUi] = useUiContext<AutocompleteUiSlot>('AutocompleteUi');
