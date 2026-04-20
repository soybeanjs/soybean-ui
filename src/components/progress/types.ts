import type {
  ProgressIndicatorProps,
  ProgressProviderProps as _ProgressProviderProps,
  ProgressRootEmits,
  ProgressRootProps,
  ProgressState,
  ProgressUi
} from '@soybeanjs/headless/progress';
import type { ClassValue } from '@soybeanjs/headless';
import type { ThemeColor, ThemeSize } from '@/theme';

export interface ProgressProps extends ProgressRootProps {
  class?: ClassValue;
  color?: ThemeColor;
  size?: ThemeSize;
  ui?: Partial<ProgressUi>;
  indicatorProps?: ProgressIndicatorProps;
}

export interface ProgressCircleProps extends ProgressRootProps {
  class?: ClassValue;
  color?: ThemeColor;
  size?: ThemeSize;
  ui?: Partial<ProgressUi>;
  strokeWidth?: number;
}

/**
 * Styled progress provider props.
 *
 * Inherits all headless provider props such as `minimum`, `maximum`, `speed`, `trickle`, and `direction`,
 * then adds UI-only styling props like `class`, `color`, `size`, and `ui`.
 */
export interface ProgressProviderProps extends _ProgressProviderProps {
  color?: ThemeColor;
  size?: ThemeSize;
  class?: ClassValue;
  ui?: Partial<ProgressUi>;
}

export type ProgressEmits = ProgressRootEmits;
export type ProgressCircleEmits = ProgressRootEmits;

export type { ProgressState };
