import type {
  ClassValue,
  ProgressIndicatorProps,
  ProgressRootEmits,
  ProgressRootProps,
  ProgressState,
  ProgressUi,
  UseLoadingBarReturn
} from '@soybeanjs/headless';
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

export interface LoadingBarProviderProps {
  color?: ThemeColor;
  errorColor?: ThemeColor;
  size?: ThemeSize;
  ui?: Partial<ProgressUi>;
}

export type ProgressEmits = ProgressRootEmits;
export type ProgressCircleEmits = ProgressRootEmits;

export type { ProgressState };
export type { UseLoadingBarReturn };
