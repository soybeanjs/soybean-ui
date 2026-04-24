import type { VNode, OlHTMLAttributes, LiHTMLAttributes, HTMLAttributes, ShallowRef, ComputedRef } from 'vue';
import type { Direction, Side, SwipeDirection, PropsToContext, UiClass } from '../../types';
import type { IconValue } from '../_icon/types';

export type ToastType = 'default' | 'success' | 'info' | 'warning' | 'error' | 'loading';

export type ToastIconType = Exclude<ToastType, 'default'> | 'close';

export type ToastPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';

export type ToastOffset = Partial<Record<Side, number>> | number;

export type ToastPromise<Data = any> = Promise<Data> | (() => Promise<Data>);

export interface ToastHeight {
  height: number;
  toastId: number | string;
  position: ToastPosition;
}

export interface ToastT {
  id: number | string;
  toasterId?: string;
  type?: ToastType;
  ui?: Partial<ToastUi>;
  richColor?: boolean;
  inverted?: boolean;
  position?: ToastPosition;
  duration?: number;
  dismissible?: boolean;
  title?: VNode | string;
  description?: VNode | string;
  icon?: IconValue;
  content?: VNode;
  action?: VNode | string;
  cancel?: VNode | string;
  onAction?: (event: MouseEvent) => void;
  onCancel?: (event: MouseEvent) => void;
  showClose?: boolean;
  delete?: boolean;
  custom?: VNode;
  promise?: ToastPromise;
  onDismiss?: (toast: ToastT) => void;
  onAutoClose?: (toast: ToastT) => void;
  testId?: string;
}

export interface ToastExternal extends Omit<
  ToastT,
  'id' | 'type' | 'title' | 'content' | 'custom' | 'promise' | 'delete'
> {
  id?: number | string;
}

export interface ToastCreateOptions extends Omit<ToastT, 'id' | 'delete' | 'title'> {
  id?: number | string;
  message?: VNode | string;
}

export interface ToastProps extends /** @vue-ignore */ LiHTMLAttributes {
  index: number;
  toast: ToastT;
  position: ToastPosition;
}

export interface ToastEmits {
  'update:height': [height: ToastHeight];
  remove: [toast: ToastT];
}

export interface ToasterProps extends /** @vue-ignore */ OlHTMLAttributes {
  id?: string;
  dir?: Direction;
  hotkey?: string[];
  customAriaLabel?: string;
  containerAriaLabel?: string;
  position?: ToastPosition;
  defaultExpanded?: boolean;
  /**
   * The duration (in milliseconds) before the toast automatically closes. Set to `0` or `Infinity` to disable auto-dismissal.
   *
   * [自动关闭前的持续时间（以毫秒为单位）。设置为 `0` 或 `Infinity` 可禁用自动关闭。]
   */
  duration?: number;
  gap?: number;
  /**
   *  The maximum number of visible toasts per position. [每个位置可见的最大吐司数量。]
   *
   * @default 3
   */
  offset?: ToastOffset;
  visibleCounts?: number;
  swipeDirections?: SwipeDirection[];
  showIcon?: boolean;
  /**
   * Whether to show the close button on the toast. [是否在吐司上显示关闭图标。]
   *
   * @default true
   */
  showClose?: boolean;
  icons?: Partial<Record<ToastIconType, IconValue>>;
  toastProps?: LiHTMLAttributes;
  wrapperProps?: HTMLAttributes;
  contentProps?: HTMLAttributes;
  titleProps?: HTMLAttributes;
  descriptionProps?: HTMLAttributes;
  iconProps?: HTMLAttributes;
  footerProps?: HTMLAttributes;
  actionProps?: HTMLAttributes;
  cancelProps?: HTMLAttributes;
  closeProps?: HTMLAttributes;
}

export interface ToastDismiss {
  id: number | string;
  dismiss: boolean;
}

export type ToastOrDismiss = ToastT | ToastDismiss;

export type ToastSubscriber = (toast: ToastOrDismiss) => void;

export interface ToastPromiseResult extends ToastExternal {
  message: VNode | string;
}

export type ToastPromiseResolver<Result, Data = any> = Result | ((data: Data) => Result | Promise<Result>);

export type ToastPromiseData<ToastData = any> = Omit<ToastExternal, 'description'> & {
  loading?: VNode | string;
  success?: ToastPromiseResolver<ToastPromiseResult | VNode | string, ToastData>;
  error?: ToastPromiseResolver<ToastPromiseResult | VNode | string>;
  description?: ToastPromiseResolver<VNode | string>;
  finally?: () => void | Promise<void>;
};

export interface ToasterContext extends PropsToContext<
  ToasterProps & Required<Pick<ToasterProps, 'gap' | 'duration' | 'visibleCounts'>>,
  | 'dir'
  | 'gap'
  | 'duration'
  | 'visibleCounts'
  | 'defaultExpanded'
  | 'swipeDirections'
  | 'showIcon'
  | 'showClose'
  | 'toastProps'
  | 'wrapperProps'
  | 'contentProps'
  | 'titleProps'
  | 'descriptionProps'
  | 'iconProps'
  | 'footerProps'
  | 'actionProps'
  | 'cancelProps'
  | 'closeProps'
> {
  icons: ComputedRef<Record<ToastIconType, IconValue>>;
  allToasts: ComputedRef<Record<ToastPosition, ToastT[]>>;
  allHeights: ComputedRef<Record<ToastPosition, ToastHeight[]>>;
  interactingPosition: ShallowRef<ToastPosition | null>;
  expandedPosition: ShallowRef<ToastPosition | null>;
}

export type ToastUiSlot =
  | 'toaster'
  | 'toast'
  | 'wrapper'
  | 'content'
  | 'title'
  | 'description'
  | 'icon'
  | 'footer'
  | 'action'
  | 'cancel'
  | 'close';

export type ToastUi = UiClass<ToastUiSlot>;
