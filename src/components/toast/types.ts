import type {
  ToastProviderProps as _ToastProviderProps,
  ToastUi,
  SwipeDirection,
  ToastPosition,
  ToastType
} from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

export interface ToastProviderProps extends _ToastProviderProps {
  size?: ThemeSize;
  ui?: ToastUi;
}

export type { SwipeDirection, ToastPosition, ToastType };
