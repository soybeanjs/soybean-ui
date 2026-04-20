import type { CSSProperties } from 'vue';
import { isNullish } from '../../shared';
import type { Direction } from '../../types';
import type { ProgressState } from './types';

export const DEFAULT_MAX = 100;
export const DEFAULT_PROGRESS_MINIMUM = 0.08;
export const DEFAULT_PROGRESS_MAXIMUM = 1;
export const DEFAULT_PROGRESS_SPEED = 200;
export const DEFAULT_PROGRESS_TRICKLE_SPEED = 200;
export const DEFAULT_PROGRESS_EASING = 'linear';

export const PROGRESS_CIRCLE_VIEWBOX_SIZE = 100;

export const PROGRESS_CIRCLE_CENTER = PROGRESS_CIRCLE_VIEWBOX_SIZE / 2;

export const DEFAULT_PROGRESS_CIRCLE_STROKE_WIDTH = 8;

const MIN_PROGRESS_CIRCLE_STROKE_WIDTH = 1;

const INDETERMINATE_PROGRESS_CIRCLE_RATIO = 0.35;

const INDETERMINATE_PROGRESS_CIRCLE_OFFSET_RATIO = 0.25;

const MAX_PROGRESS_CIRCLE_STROKE_WIDTH = PROGRESS_CIRCLE_VIEWBOX_SIZE / 4;

export const defaultProgressOptions = {
  minimum: DEFAULT_PROGRESS_MINIMUM,
  maximum: DEFAULT_PROGRESS_MAXIMUM,
  easing: DEFAULT_PROGRESS_EASING,
  speed: DEFAULT_PROGRESS_SPEED,
  trickle: true,
  trickleSpeed: DEFAULT_PROGRESS_TRICKLE_SPEED,
  direction: 'ltr',
  indeterminate: false
} as const;

function isValidPositiveNumber(value: number | undefined): value is number {
  return typeof value === 'number' && !Number.isNaN(value) && value > 0;
}

export function getValueLabel(value: number | null | undefined, max: number): string | undefined {
  if (typeof value !== 'number') {
    return undefined;
  }

  const safeMax = typeof max === 'number' && max > 0 ? max : DEFAULT_MAX;

  return `${Math.round((value / safeMax) * 100)}%`;
}

export function getValidMax(value: number | undefined) {
  if (isValidPositiveNumber(value)) {
    return value;
  }

  return DEFAULT_MAX;
}

export function getValidModelValue(value: number | null | undefined, maxValue: number) {
  if (isNullish(value)) {
    return value;
  }

  if (!isValidPositiveNumber(value) && value !== 0) {
    return null;
  }

  if (value < 0 || value > maxValue) {
    return null;
  }

  return value;
}

export function getValidProgressCircleStrokeWidth(value: number | undefined) {
  if (
    !isValidPositiveNumber(value) ||
    value < MIN_PROGRESS_CIRCLE_STROKE_WIDTH ||
    value > MAX_PROGRESS_CIRCLE_STROKE_WIDTH
  ) {
    return DEFAULT_PROGRESS_CIRCLE_STROKE_WIDTH;
  }

  return value;
}

export function getProgressCircleRadius(strokeWidth: number) {
  return (PROGRESS_CIRCLE_VIEWBOX_SIZE - strokeWidth) / 2;
}

export function getProgressCircleDasharray(circumference: number, progressState: ProgressState) {
  if (progressState === 'indeterminate') {
    return `${circumference * INDETERMINATE_PROGRESS_CIRCLE_RATIO} ${circumference}`;
  }

  return `${circumference} ${circumference}`;
}

export function getProgressCircleDashoffset(
  valuePercent: number | null,
  circumference: number,
  progressState: ProgressState
) {
  if (progressState === 'indeterminate') {
    return circumference * INDETERMINATE_PROGRESS_CIRCLE_OFFSET_RATIO;
  }

  if (valuePercent === null) {
    return circumference;
  }

  return circumference * (1 - valuePercent / 100);
}

export function clampProgressValue(value: number, minimum: number, maximum: number) {
  if (!Number.isFinite(value)) {
    return minimum;
  }

  return Math.min(maximum, Math.max(minimum, value));
}

export function getProgressIncrementAmount(value: number) {
  if (value < 0.2) {
    return 0.1;
  }

  if (value < 0.5) {
    return 0.04;
  }

  if (value < 0.8) {
    return 0.02;
  }

  if (value < 0.99) {
    return 0.005;
  }

  return 0;
}

export function getProgressDecrementAmount(value: number) {
  if (value > 0.8) {
    return 0.1;
  }

  if (value > 0.5) {
    return 0.05;
  }

  if (value > 0.2) {
    return 0.02;
  }

  return 0.01;
}

export function getProgressIndicatorStyle(
  valuePercent: number | null,
  direction: Direction = 'ltr',
  speed = DEFAULT_PROGRESS_SPEED,
  easing = DEFAULT_PROGRESS_EASING
): CSSProperties | undefined {
  if (valuePercent === null) {
    return undefined;
  }

  return {
    transform: `translateX(${direction === 'rtl' ? 100 - valuePercent : -(100 - valuePercent)}%)`,
    transition: `all ${speed}ms ${easing}`
  };
}
