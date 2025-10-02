import type { CheckedState, DefinedValue, SingleOrMultipleProps, SingleOrMultipleValue } from '../types';
import { isNullish } from './guard';

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

/**
 * The function `roundToStepPrecision` rounds a number to a specified precision step.
 *
 * @param {number} value - The `value` parameter is the number that you want to round to a specific precision based on
 *   the `step` parameter.
 * @param {number} step - The `step` parameter in the `roundToStepPrecision` function represents the interval at which
 *   you want to round the `value`. For example, if `step` is 0.5, the `value` will be rounded to the nearest half.
 * @returns the `roundedValue` after rounding it to the precision specified by the `step`.
 */
export function roundToStepPrecision(value: number, step: number) {
  let roundedValue = value;
  const stepString = step.toString();
  const pointIndex = stepString.indexOf('.');
  const precision = pointIndex >= 0 ? stepString.length - pointIndex : 0;
  if (precision > 0) {
    const pow = 10 ** precision;
    roundedValue = Math.round(roundedValue * pow) / pow;
  }
  return roundedValue;
}

/**
 * The function `snapValueToStep` snaps a given value to the nearest step within a specified range.
 *
 * @param {number} value - The `value` parameter represents the number that you want to snap to the nearest step value.
 * @param {number | undefined} min - The `min` parameter represents the minimum value that the `value` should be snapped
 *   to. If `value` is less than `min`, it will be snapped to `min`. If `min` is not provided (undefined), then the
 *   snapping will not consider a minimum value.
 * @param {number | undefined} max - The `max` parameter represents the maximum value that the `value` should be snapped
 *   to. It ensures that the snapped value does not exceed this maximum value.
 * @param {number} step - The `step` parameter in the `snapValueToStep` function represents the interval at which the
 *   `value` should be snapped to. It determines the granularity of the snapping operation. For example, if `step` is 5,
 *   the `value` will be snapped to the nearest multiple of
 * @returns a number that has been snapped to the nearest step value within the specified range of minimum and maximum
 *   values.
 */
export function snapValueToStep(value: number, min: number | undefined, max: number | undefined, step: number): number {
  const minValue = Number(min);
  const maxValue = Number(max);
  const remainder = (value - (Number.isNaN(minValue) ? 0 : minValue)) % step;
  let snappedValue = roundToStepPrecision(
    Math.abs(remainder) * 2 >= step ? value + Math.sign(remainder) * (step - Math.abs(remainder)) : value - remainder,
    step
  );

  if (!Number.isNaN(minValue)) {
    if (snappedValue < minValue) snappedValue = minValue;
    else if (!Number.isNaN(maxValue) && snappedValue > maxValue)
      snappedValue = minValue + Math.floor(roundToStepPrecision((maxValue - minValue) / step, step)) * step;
  } else if (!Number.isNaN(maxValue) && snappedValue > maxValue) {
    snappedValue = Math.floor(roundToStepPrecision(maxValue / step, step)) * step;
  }

  // correct floating point behavior by rounding to step precision
  snappedValue = roundToStepPrecision(snappedValue, step);

  return snappedValue;
}

/**
 * Validates the props and it makes sure that the types are coherent with each other
 *
 * 1. If multiple is defined, return it.
 * 2. If modelValue and defaultValue are defined and not of the same type, throw an error.
 * 3. If multiple is not defined: a. If modelValue is an array, return true. b. If modelValue is not an array, return
 *    false.
 * 4. Return true if modelValue is an array, else return false.
 */
export function getIsMultiple(props: SingleOrMultipleProps) {
  const { modelValue, defaultValue, multiple } = props;

  if (!isNullish(multiple)) {
    return multiple;
  }

  const value = isNullish(modelValue) ? defaultValue : modelValue;
  const canTypeBeInferred = !isNullish(modelValue) || !isNullish(defaultValue);

  if (canTypeBeInferred) {
    return Boolean(Array.isArray(value));
  }

  // always fallback to false
  return multiple ?? false;
}

export function getSingleOrMultipleDefaultValue(props: SingleOrMultipleProps) {
  if (!isNullish(props.defaultValue)) {
    return props.defaultValue;
  }

  return props.multiple ? [] : undefined;
}
