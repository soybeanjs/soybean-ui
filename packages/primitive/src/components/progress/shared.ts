import { isNullish } from '../../shared';

export const DEFAULT_MAX = 100;

export function isNumber(v: any): v is number {
  return typeof v === 'number';
}

export function validateValue(value: any, max: number): number | null {
  const isValidValueError = isNullish(value) || (isNumber(value) && !Number.isNaN(value) && value <= max && value >= 0);

  if (isValidValueError) return value;

  console.error(`Invalid prop \`value\` of value \`${value}\` supplied to \`ProgressRoot\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\`  or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`);
  return null;
}

export function validateMax(max: number): number {
  const isValidMaxError = isNumber(max) && !Number.isNaN(max) && max > 0;

  if (isValidMaxError) return max;

  console.error(
    `Invalid prop \`max\` of value \`${max}\` supplied to \`ProgressRoot\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`
  );
  return DEFAULT_MAX;
}
