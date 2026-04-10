import { useUiContext } from '@soybeanjs/headless/composables';
import type { AutocompleteExtraUiSlot } from './types';

export const [provideAutocompleteExtraUi, useAutocompleteExtraUi] = useUiContext<AutocompleteExtraUiSlot>(
  'AutocompleteExtraUi'
);
