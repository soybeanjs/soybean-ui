import { isNullish } from '../../shared';

export const DEFAULT_MAX = 100;

export function getValueLabel(value: number | null | undefined, max: number): string | undefined {
  if (typeof value !== 'number') {
    return undefined;
  }

  const safeMax = typeof max === 'number' && max > 0 ? max : DEFAULT_MAX;

  return `${Math.round((value / safeMax) * 100)}%`;
}

export function getValidMax(value: number | undefined) {
  if (typeof value === 'number' && !Number.isNaN(value) && value > 0) {
    return value;
  }

  return DEFAULT_MAX;
}

export function getValidModelValue(value: number | null | undefined, maxValue: number) {
  if (isNullish(value)) {
    return value;
  }

  if (typeof value !== 'number' || Number.isNaN(value) || value < 0 || value > maxValue) {
    return null;
  }

  return value;
}
