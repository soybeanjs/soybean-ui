import type { Component, ComputedRef, Ref } from 'vue';
import type {
  StringOrVNode,
  ToastCloseProps,
  ToastDescriptionProps,
  ToastRootEmits,
  ToastTitleProps,
  ToastViewportProps,
  ToastActionProps as _ToastActionProps,
  ToastProviderProps as _ToastProviderProps,
  ToastRootProps as _ToastRootProps
} from '@soybean-ui/primitives';
import type { ThemeColor } from '../../types';
import type { ButtonProps } from '../button';

export interface ToastProviderProps extends _ToastProviderProps {
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

export interface ToastRootProps extends _ToastRootProps {
  iconType?: ToastIconType;
  richColor?: ThemeColor;
}

export interface ToastActionProps extends _ToastActionProps, ButtonProps {}

export interface ToastState extends ToastRootProps {
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

export type { ToastViewportProps, ToastTitleProps, ToastDescriptionProps, ToastCloseProps, ToastRootEmits };
