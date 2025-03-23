import type {
  ClassValue,
  ClassValueProp,
  ProgressRootEmits,
  ProgressRootProps as _ProgressRootProps
} from '@soybean-ui/primitives';
import type { ProgressSlots, ThemeColor, ThemeSize } from '@soybean-ui/variants';

export interface ProgressRootProps extends _ProgressRootProps {
  color?: ThemeColor;
  size?: ThemeSize;
}

export interface ProgressIndicatorProps extends ClassValueProp {
  modelValue?: number | null;
  color?: ThemeColor;
}

export type ProgressUi = Partial<Record<ProgressSlots, ClassValue>>;

export interface ProgressProps extends ProgressRootProps {
  ui?: ProgressUi;
}

export type ProgressEmits = ProgressRootEmits;

export type { ProgressRootEmits };
