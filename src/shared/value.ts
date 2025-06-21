import type { CheckedState, DefinedValue, SingleOrMultipleValue } from '../types';

export function isIndeterminate(checked?: CheckedState | null): checked is 'indeterminate' {
  return checked === 'indeterminate';
}

export function getCheckedState(checked?: CheckedState | null) {
  if (isIndeterminate(checked)) {
    return 'indeterminate';
  }
  return checked ? 'checked' : 'unchecked';
}

export function getBinaryCheckedState(checked?: CheckedState | null) {
  return checked === true ? 'checked' : 'unchecked';
}

/**
 * Check if value is enabled based on single or multiple selection mode
 *
 * @param value - The value to check
 * @param modelValue - The model value (can be a single value or array)
 * @param isSingle - Whether it's single selection mode
 * @returns Whether it's enabled
 */
export function getOpenFromSingleOrMultiple(
  value: DefinedValue,
  modelValue: SingleOrMultipleValue,
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

/**
 * The `clamp` function restricts a number within a specified range by returning the value itself if it falls within the
 * range, or the closest boundary value if it exceeds the range.
 *
 * @param {number} value - The `value` parameter represents the number that you want to clamp within the specified range
 *   defined by `min` and `max` values.
 * @param {number} min - If the `value` parameter is less than the `min` value, the function will return the `min`
 *   value.
 * @param {number} max - If the `value` parameter is greater than the `max` value, the function will return `max`.
 * @returns The `clamp` function returns the value of `value` constrained within the range defined by `min` and `max`.
 */
export function clamp(
  value: number,
  min: number = Number.NEGATIVE_INFINITY,
  max: number = Number.POSITIVE_INFINITY
): number {
  return Math.min(max, Math.max(min, value));
}
