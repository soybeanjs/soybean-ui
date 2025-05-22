import type { AcceptableValue, StringOrNumber } from '../types';

export function getOpenFromSingleOrMultiple(
  value: StringOrNumber,
  modelValue: AcceptableValue | AcceptableValue[],
  isSingle: boolean
) {
  if (isSingle) {
    return value === modelValue;
  }

  return Array.isArray(modelValue) && modelValue.includes(value);
}
