import type { Component, ComputedRef, Ref } from 'vue';
import type {
  ClassValue,
  ClassValueProp,
  StringOrVNode,
  ToastDescriptionProps,
  ToastRootEmits,
  ToastActionProps as _ToastActionProps,
  ToastCloseProps as _ToastCloseProps,
  ToastProviderProps as _ToastProviderProps,
  ToastRootProps as _ToastRootProps,
  ToastTitleProps as _ToastTitleProps,
  ToastViewportProps as _ToastViewportProps
} from '@soybean-ui/primitives';
import type { ThemeColor, ThemeSize, ToastSlots } from '@soybean-ui/variants';
import type { ButtonProps } from '../button';

export type ToastUi = Partial<Record<ToastSlots, ClassValue>>;

export interface ToastProviderProps extends _ToastProviderProps {
  ui?: ToastUi;
  /**
   * The maximum number of toasts that can be displayed at the same time.
   *
   * @defaultValue 1
   */
  toastLimit?: number;
  /**
   * The delay time before removing the toast.
   *
   * @defaultValue 1000 * 1000 (ms)
   */
  toastRemoveDelay?: number;
}

export type ToastIconType = Extract<ThemeColor, 'destructive' | 'success' | 'warning' | 'info'>;

export interface ToastViewportProps extends _ToastViewportProps {
  size?: ThemeSize;
}

export interface ToastRootProps extends _ToastRootProps {
  size?: ThemeSize;
  iconType?: ToastIconType;
  richColor?: ThemeColor;
}

export interface ToastTitleProps extends _ToastTitleProps {
  size?: ThemeSize;
}

export interface ToastCloseProps extends _ToastCloseProps {
  size?: ThemeSize;
}

export interface ToastActionProps extends _ToastActionProps, ButtonProps {}

export interface ToastProps extends ClassValueProp {
  size?: ThemeSize;
  ui?: ToastUi;
}

export interface ToastState extends Omit<ToastRootProps, 'class'> {
  id: string;
  title?: string;
  description?: StringOrVNode;
  action?: Component;
  onOpenChange?: (value: boolean) => void;
}

export type ActionType = 'add' | 'update' | 'dismiss' | 'remove';

export type Action =
  | {
      type: 'add';
      toast: ToastState;
    }
  | {
      type: 'update';
      toast: Partial<ToastState>;
    }
  | {
      type: 'dismiss';
      toastId?: ToastState['id'];
    }
  | {
      type: 'remove';
      toastId?: ToastState['id'];
    };

export interface ToastReturn {
  id: string;
  dismiss: () => void;
  update: (props: ToastState) => void;
}

export type ToastContextParams = ComputedRef<Pick<ToastProviderProps, 'toastLimit' | 'toastRemoveDelay'>>;

export interface ToastContext {
  toasts: Ref<ToastState[]>;
  toastTimeouts: Map<string, ReturnType<typeof setTimeout>>;
  addToRemoveQueue(toastId: string): void;
  dispatch(action: Action): void;
  toast(props: Omit<ToastState, 'id'>): ToastReturn;
}

export type { ToastDescriptionProps, ToastRootEmits };
