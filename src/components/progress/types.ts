import type {
  ClassValue,
  ProgressIndicatorProps,
  ProgressRootEmits,
  ProgressRootProps,
  ProgressState,
  ProgressUi
} from '@soybeanjs/headless';
import type { ThemeColor, ThemeSize } from '@/theme';

export interface ProgressProps extends ProgressRootProps {
  class?: ClassValue;
  color?: ThemeColor;
  size?: ThemeSize;
  ui?: Partial<ProgressUi>;
  indicatorProps?: ProgressIndicatorProps;
}

export type ProgressEmits = ProgressRootEmits;

export type { ProgressState };
