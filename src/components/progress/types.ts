import type {
  ProgressProviderProps,
  ProgressIndicatorProps,
  ProgressRootEmits,
  ProgressRootProps,
  ProgressState,
  ProgressUi
} from '@soybeanjs/headless/progress';
import type { ClassValue } from '@soybeanjs/headless/types';
import type { ThemeColor, ThemeSize } from '@/theme';

/**
 * Properties for the Progress component.
 */
export interface ProgressProps extends ProgressRootProps {
  /**
   * Additional class names applied to the root element.
   */
  class?: ClassValue;
  /**
   * Theme color of the component.
   */
  color?: ThemeColor;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<ProgressUi>;
  /**
   * Properties forwarded to the indicator element.
   */
  indicatorProps?: ProgressIndicatorProps;
}

/**
 * Properties for the ProgressCircle component.
 */
export interface ProgressCircleProps extends ProgressRootProps {
  /**
   * Additional class names applied to the root element.
   */
  class?: ClassValue;
  /**
   * Theme color of the component.
   */
  color?: ThemeColor;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<ProgressUi>;
  /**
   * Stroke width.
   */
  strokeWidth?: number;
}

/**
 * Events for the Progress component.
 */
export type ProgressEmits = ProgressRootEmits;
/**
 * Events for the ProgressCircle component.
 */
export type ProgressCircleEmits = ProgressRootEmits;

export type { ProgressState, ProgressProviderProps };
