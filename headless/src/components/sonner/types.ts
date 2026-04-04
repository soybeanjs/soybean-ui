import type { HTMLAttributes, VNode } from 'vue';
import type { UiClass } from '../../types';

export type SonnerToastType = 'default' | 'success' | 'info' | 'warning' | 'error' | 'loading';

export type SonnerPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface SonnerAction {
  label: string;
  onClick: (event: MouseEvent) => void;
}

export interface SonnerToastOptions {
  id?: string | number;
  type?: SonnerToastType;
  description?: string | VNode;
  duration?: number;
  action?: SonnerAction;
  cancel?: SonnerAction;
  onDismiss?: (toast: SonnerToastT) => void;
  onAutoClose?: (toast: SonnerToastT) => void;
  dismissible?: boolean;
  icon?: VNode;
  richColors?: boolean;
}

export interface SonnerToastT extends SonnerToastOptions {
  id: string | number;
  title?: string | VNode;
  createdAt: number;
  delete?: boolean;
  promise?: Promise<unknown>;
}

export interface SonnerToasterProps extends /** @vue-ignore */ HTMLAttributes {
  /**
   * The position of the toasts.
   *
   * @defaultValue 'bottom-right'
   */
  position?: SonnerPosition;
  /**
   * The default duration in milliseconds that a toast remains visible.
   *
   * @defaultValue 4000
   */
  duration?: number;
  /**
   * The maximum number of toasts visible at the same time.
   *
   * @defaultValue 3
   */
  visibleToasts?: number;
  /**
   * Whether to expand all toasts by default.
   *
   * @defaultValue false
   */
  expand?: boolean;
  /**
   * The gap between toasts in pixels.
   *
   * @defaultValue 14
   */
  gap?: number;
  /**
   * Whether to show a close button on each toast.
   *
   * @defaultValue false
   */
  closeButton?: boolean;
  /**
   * Whether to use rich colors for typed toasts.
   *
   * @defaultValue false
   */
  richColors?: boolean;
}

export type SonnerUiSlot = 'toaster' | 'toast' | 'title' | 'description' | 'icon' | 'close' | 'action' | 'cancel';

export type SonnerUi = UiClass<SonnerUiSlot>;

export interface SonnerHeightT {
  toastId: string | number;
  height: number;
}

export interface UseSonnerReturn {
  (title: string | VNode, options?: SonnerToastOptions): string | number;
  success: (title: string | VNode, options?: Omit<SonnerToastOptions, 'type'>) => string | number;
  error: (title: string | VNode, options?: Omit<SonnerToastOptions, 'type'>) => string | number;
  info: (title: string | VNode, options?: Omit<SonnerToastOptions, 'type'>) => string | number;
  warning: (title: string | VNode, options?: Omit<SonnerToastOptions, 'type'>) => string | number;
  loading: (title: string | VNode, options?: Omit<SonnerToastOptions, 'type'>) => string | number;
  promise: <T>(
    promise: Promise<T>,
    data: {
      loading?: string | VNode;
      success?: string | VNode | ((data: T) => string | VNode);
      error?: string | VNode | ((error: unknown) => string | VNode);
      description?: string | VNode;
      duration?: number;
    }
  ) => string | number;
  dismiss: (id?: string | number) => string | number | undefined;
}
