import type { HTMLAttributes } from 'vue';
import type { ForceMountProps, PropsToContext, SwipeDirection, SwipeEvent, UiClass } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

export interface ToastProviderProps {
  /**
   * An author-localized label for each toast. Used to help screen reader users associate the interruption with a toast.
   *
   * @defaultValue 'Notification'
   */
  label?: string;
  /**
   * Time in milliseconds that each toast should remain visible for.
   *
   * @defaultValue 5000
   */
  duration?: number;
  /**
   * Direction of pointer swipe that should close the toast.
   *
   * @defaultValue 'right'
   */
  swipeDirection?: SwipeDirection;
  /**
   * Distance in pixels that the swipe must pass before a close is triggered.
   *
   * @defaultValue 50
   */
  swipeThreshold?: number;
}

export type ToastLiveType = 'foreground' | 'background';

export interface ToastRootProps
  extends ForceMountProps, PrimitiveProps, /** @vue-ignore */ Omit<HTMLAttributes, 'onPause'> {
  /**
   * Control the sensitivity of the toast for accessibility purposes.
   *
   * For toasts that are the result of a user action, choose `foreground`. Toasts generated from background tasks should
   * use `background`.
   */
  liveType?: ToastLiveType;
  /** The controlled open state of the dialog. Can be bind as `v-model:open`. */
  open?: boolean;
  /** The open state of the dialog when it is initially rendered. Use when you do not need to control its open state. */
  defaultOpen?: boolean;
  /** Time in milliseconds that toast should remain visible for. Overrides value given to `ToastProvider`. */
  duration?: number;
}

export type ToastRootEmits = {
  /** Event handler called when the escape key is down. It can be prevented by calling `event.preventDefault`. */
  escapeKeyDown: [event: KeyboardEvent];
  /**
   * Event handler called when the dismiss timer is paused. This occurs when the pointer is moved over the viewport, the
   * viewport is focused or when the window is blurred.
   */
  pause: [];
  /**
   * Event handler called when the dismiss timer is resumed. This occurs when the pointer is moved away from the
   * viewport, the viewport is blurred or when the window is focused.
   */
  resume: [];
  /** Event handler called when starting a swipe interaction. It can be prevented by calling `event.preventDefault`. */
  swipeStart: [event: SwipeEvent];
  /** Event handler called during a swipe interaction. It can be prevented by calling `event.preventDefault`. */
  swipeMove: [event: SwipeEvent];
  /** Event handler called when swipe interaction is cancelled. It can be prevented by calling `event.preventDefault`. */
  swipeCancel: [event: SwipeEvent];
  /** Event handler called at the end of a swipe interaction. It can be prevented by calling `event.preventDefault`. */
  swipeEnd: [event: SwipeEvent];
  /** Event handler called when the open state of the toast changes. */
  'update:open': [value: boolean];
};

export interface ToastViewportProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  /**
   * The keys to use as the keyboard shortcut that will move focus to the toast viewport.
   *
   * @defaultValue ['F8']
   */
  hotkey?: string[];
  /**
   * An author-localized label for the toast viewport to provide context for screen reader users when navigating page
   * landmarks. The available `{hotkey}` placeholder will be replaced for you. Alternatively, you can pass in a custom
   * function to generate the label.
   *
   * @defaultValue 'Notifications ({hotkey})'
   */
  label?: string | ((hotkey: string) => string);
}

export interface ToastCloseProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

export interface ToastActionProps extends ToastCloseProps {
  /**
   * A short description for an alternate way to carry out the action. For screen reader users who will not be able to
   * navigate to the button easily/quickly.
   */
  altText: string;
}

export interface ToastTitleProps extends /** @vue-ignore */ HTMLAttributes {}

export interface ToastDescriptionProps extends /** @vue-ignore */ HTMLAttributes {}

export interface ToastAnnounceExcludeProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  altText?: string;
}

export type ToastFocusProxyEmits = {
  focusFromOutsideViewport: [void];
};

export type TabbingDirection = 'forwards' | 'backwards';

export interface ToastProviderContextParams extends PropsToContext<ToastProviderProps> {}

export interface ToastRootContextParams {
  onClose: () => void;
}

export type ToastUiSlot = 'root' | 'title' | 'description' | 'action' | 'close';

export type ToastUi = UiClass<ToastUiSlot>;
