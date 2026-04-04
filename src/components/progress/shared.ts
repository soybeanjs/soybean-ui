import type { ProgressState } from '@soybeanjs/headless';

export function getProgressIndicatorStyle(valuePercent: number | null, direction: 'ltr' | 'rtl' = 'ltr') {
  if (valuePercent === null) {
    return undefined;
  }

  return {
    transform: `translateX(${direction === 'rtl' ? 100 - valuePercent : -(100 - valuePercent)}%)`
  };
}

export const CIRCLE_PROGRESS_VIEWBOX_SIZE = 100;

export const CIRCLE_PROGRESS_CENTER = CIRCLE_PROGRESS_VIEWBOX_SIZE / 2;

export const DEFAULT_CIRCLE_PROGRESS_STROKE_WIDTH = 8;

const INDETERMINATE_CIRCLE_PROGRESS_RATIO = 0.35;

const MAX_CIRCLE_PROGRESS_STROKE_WIDTH = CIRCLE_PROGRESS_VIEWBOX_SIZE / 4;

export function getValidCircleProgressStrokeWidth(value: number | undefined) {
  if (typeof value !== 'number' || Number.isNaN(value) || value <= 0 || value > MAX_CIRCLE_PROGRESS_STROKE_WIDTH) {
    return DEFAULT_CIRCLE_PROGRESS_STROKE_WIDTH;
  }

  return value;
}

export function getCircleProgressRadius(strokeWidth: number) {
  return (CIRCLE_PROGRESS_VIEWBOX_SIZE - strokeWidth) / 2;
}

export function getCircleProgressDasharray(circumference: number, progressState: ProgressState) {
  if (progressState === 'indeterminate') {
    return `${circumference * INDETERMINATE_CIRCLE_PROGRESS_RATIO} ${circumference}`;
  }

  return `${circumference} ${circumference}`;
}

export function getCircleProgressDashoffset(
  valuePercent: number | null,
  circumference: number,
  progressState: ProgressState
) {
  if (progressState === 'indeterminate') {
    return circumference * 0.25;
  }

  if (valuePercent === null) {
    return circumference;
  }

  return circumference * (1 - valuePercent / 100);
}
