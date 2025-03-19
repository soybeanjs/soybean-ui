import type { AcceptableValue } from '@soybean-ui/primitives';
import type { ComboboxGroupOptionData, ComboboxOptionData } from './types';

export function isComboboxGroupOption<A extends AcceptableValue>(
  option: ComboboxOptionData<A> | ComboboxGroupOptionData<A>
): option is ComboboxGroupOptionData<A> {
  return Boolean((option as ComboboxGroupOptionData<A>).items);
}

export function getComboboxOptionByValue<A extends AcceptableValue>(
  options: (ComboboxOptionData<A> | ComboboxGroupOptionData<A>)[],
  modelValue?: A | null
) {
  if (modelValue === null || modelValue === undefined) {
    return null;
  }

  const findItem = options.find(option => {
    if (isComboboxGroupOption(option)) {
      return option.items.find(item => item.value === modelValue);
    }

    return option.value === modelValue;
  });

  return findItem;
}
