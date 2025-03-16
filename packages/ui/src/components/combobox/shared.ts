import type { AcceptableValue } from '@soybean-ui/primitives';
import type { ComboboxGroupOptionData, ComboboxOptionData } from './types';

export function isComboboxGroupOption<A extends AcceptableValue>(
  option: ComboboxOptionData<A> | ComboboxGroupOptionData<A>
): option is ComboboxGroupOptionData<A> {
  return Boolean((option as ComboboxGroupOptionData<A>).items);
}
