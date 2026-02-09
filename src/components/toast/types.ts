import type { VNode } from 'vue';
import type {
  ClassValue,
  PropsToContext,
  ToastDescriptionProps,
  ToastRootEmits,
  ToastRootProps,
  ToastTitleProps,
  ToastUi,
  ToastViewportProps,
  ToastProviderProps as _ToastProviderProps
} from '@soybeanjs/headless';
import type { ThemeColor, ThemeSize } from '@/theme';
import type { ToastPosition } from './variants';

type ToastExtraSlot = 'viewport';

type ToastExtendedTheme = ToastUi & Record<ToastExtraSlot, ClassValue>;

export interface ToastProviderProps extends _ToastProviderProps {
  ui?: Partial<ToastExtendedTheme>;
  /**
   * The maximum number of toasts that can be displayed at the same time.
   *
   * @defaultValue 3
   */
  limits?: number;
  /**
   * The delay time before removing the toast.
   *
   * @defaultValue 5000 (ms)
   */
  removeDelay?: number;
  /**
   * The position of the toast.
   *
   * @defaultValue 'top-right'
   */
  position?: ToastPosition;
  viewportProps?: ToastViewportProps;
}

export type ToastColor = 'default' | ThemeColor;

export type ToastType = Extract<ThemeColor, 'destructive' | 'success' | 'warning' | 'info'>;

export interface ToastProps extends ToastRootProps {
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<ToastUi>;
  type?: ToastType;
  color?: ToastColor;
  /**
   * The position of the toast.
   *
   * @defaultValue 'top-right'
   */
  position?: ToastPosition;
  showIcon?: boolean;
  titleProps?: ToastTitleProps;
  descriptionProps?: ToastDescriptionProps;
}

export type ToastEmits = ToastRootEmits;

export interface UseToastOptions extends Pick<
  ToastProps,
  'size' | 'ui' | 'type' | 'color' | 'showIcon' | 'duration' | 'forceMount' | 'liveType' | 'position'
> {
  title?: string | VNode;
  description?: string | VNode;
  content?: VNode;
  onClose?: () => void;
}

export interface ToastState extends Omit<UseToastOptions, 'onClose'> {
  id: number;
  onClose: (open?: boolean) => void;
}

export interface ToastStateWithVisible extends ToastState {
  visible: boolean;
}

export interface UseToastReturn extends Record<ToastType, (options: Omit<UseToastOptions, 'type'>) => void> {
  (options: UseToastOptions): void;
  clear: () => void;
}

export interface ToastProviderContextParams extends PropsToContext<
  Required<Pick<ToastProviderProps, 'ui' | 'limits' | 'removeDelay' | 'position'>>
> {}

export type { ToastPosition };
