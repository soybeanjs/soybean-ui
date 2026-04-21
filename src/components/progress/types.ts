import type {
  ProgressProviderProps,
  ProgressIndicatorProps,
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

export type ProgressEmits = ProgressRootEmits;
export type ProgressCircleEmits = ProgressRootEmits;

export type { ProgressState, ProgressProviderProps };
