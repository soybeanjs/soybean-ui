import type { ComboboxGroupOptionData, ComboboxOptionData, ComboboxSingleOptionData } from './types';

export function isGroupOption(item: ComboboxOptionData): item is ComboboxGroupOptionData {
  return 'items' in item;
}

export function getFlatOptions(items: ComboboxOptionData[]) {
  return items.flatMap(item => (isGroupOption(item) ? item.items : item));
}

export function getSelectedLabels(modelValue: string | string[] | undefined, items: ComboboxOptionData[]) {
  const values = Array.isArray(modelValue) ? modelValue : modelValue ? [modelValue] : [];
  const labels = new Map<string, string>();

  getFlatOptions(items).forEach((item: ComboboxSingleOptionData) => {
    labels.set(item.value, item.label);
  });

  return values.map(value => labels.get(value) ?? value);
}
