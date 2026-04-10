import type { PropsToContext, ClassValue, ProgressIndicatorProps, ProgressRootEmits, ProgressRootProps, ProgressState, ProgressUi } from '@soybeanjs/headless';
import type { ShallowRef } from 'vue';
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

export interface UseLoadingBarReturn {
  start: () => void;
  finish: () => void;
  error: () => void;
  set: (value: number) => void;
  clear: () => void;
}

export interface LoadingBarProviderContext extends Pick<UseLoadingBarReturn, 'clear'> {
  useLoadingBar: UseLoadingBarReturn;
  visible: ShallowRef<boolean>;
  modelValue: ShallowRef<number>;
  color: ShallowRef<ThemeColor>;
}

export interface LoadingBarProviderContextParams
  extends PropsToContext<Required<Pick<LoadingBarProviderProps, 'color' | 'errorColor'>>> {}

export type { ProgressState };
