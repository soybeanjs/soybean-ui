import type { AcceptableValue } from '../types';

/**
 * Check if value is enabled based on single or multiple selection mode
 *
 * @param value - The value to check
 * @param modelValue - The model value (can be a single value or array)
 * @param isSingle - Whether it's single selection mode
 * @returns Whether it's enabled
 */
export function getOpenFromSingleOrMultiple(
  value: NonNullable<AcceptableValue>,
  modelValue: AcceptableValue | NonNullable<AcceptableValue>[],
  isMultiple: boolean
) {
  if (!isMultiple) {
    return value === modelValue;
  }

  return Array.isArray(modelValue) && modelValue.includes(value);
}

/**
 * Return corresponding string based on open state
 *
 * @param open - Whether it's open
 * @returns 'open' or 'closed'
 */
export function getDisclosureState(open?: boolean) {
  return open ? 'open' : 'closed';
}
