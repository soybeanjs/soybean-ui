import type {
  ToasterProps as _ToasterProps,
  ToastUi,
  SwipeDirection,
  ToastPosition,
  ToastType
} from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

export interface ToasterProps extends _ToasterProps {
  size?: ThemeSize;
  ui?: ToastUi;
}

export type { SwipeDirection, ToastPosition, ToastType };
