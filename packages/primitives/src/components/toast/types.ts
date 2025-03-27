import type { Ref } from 'vue';
import type { ClassValueProp, PrimitiveProps, SwipeDirection, SwipeEvent } from '../../types';
import type { TeleportProps } from '../teleport';

// ToastProvider
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

export interface ToastProviderContext {
  label: Ref<string>;
  duration: Ref<number>;
  swipeDirection: Ref<SwipeDirection>;
  swipeThreshold: Ref<number>;
  toastCount: Ref<number>;
  viewport: Ref<HTMLElement | undefined>;
  onViewportChange: (viewport: HTMLElement) => void;
  onToastAdd: () => void;
  onToastRemove: () => void;
  isFocusedToastEscapeKeyDownRef: Ref<boolean>;
  isClosePausedRef: Ref<boolean>;
}

// ToastRootImpl
export interface ToastRootImplProps extends ClassValueProp {
  /**
   * Control the sensitivity of the toast for accessibility purposes.
   *
   * For toasts that are the result of a user action, choose `foreground`. Toasts generated from background tasks should
   * use `background`.
   */
  type?: 'foreground' | 'background';
  /** The controlled open state of the dialog. Can be bind as `v-model:open`. */
  open?: boolean;
  /** Time in milliseconds that toast should remain visible for. Overrides value given to `ToastProvider`. */
  duration?: number;
}
export type ToastRootImplPropsWithPrimitive = ToastRootImplProps & PrimitiveProps;

export type ToastRootImplEmits = {
  close: [];
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
  swipeCancel: [event: SwipeEvent];
  /** Event handler called at the end of a swipe interaction. It can be prevented by calling `event.preventDefault`. */
  swipeEnd: [event: SwipeEvent];
};

// ToastRoot
export interface ToastRootProps extends ToastRootImplProps {
  /** The open state of the dialog when it is initially rendered. Use when you do not need to control its open state. */
  defaultOpen?: boolean;
  /** Used to force mounting when more control is needed. Useful when controlling animation with Vue animation libraries. */
  forceMount?: boolean;
}
export type ToastRootPropsWithPrimitive = ToastRootProps & PrimitiveProps;

export type ToastRootEmits = Omit<ToastRootImplEmits, 'close'> & {
  /** Event handler called when the open state changes */
  'update:open': [value: boolean];
};

export interface ToastRootContext {
  onClose: () => void;
}

// ToastPortal
export interface ToastPortalProps extends TeleportProps {}

// ToastViewport
export interface ToastViewportProps extends ClassValueProp {
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
export type ToastViewportPropsWithPrimitive = ToastViewportProps & PrimitiveProps;

// ToastAction
export interface ToastActionProps extends ClassValueProp {
  /**
   * A short description for an alternate way to carry out the action. For screen reader users who will not be able to
   * navigate to the button easily/quickly.
   */
  altText: string;
}
export type ToastActionPropsWithPrimitive = ToastActionProps & PrimitiveProps;

// ToastClose
export interface ToastCloseProps extends ClassValueProp {}
export type ToastClosePropsWithPrimitive = ToastCloseProps & PrimitiveProps;

// ToastTitle
export interface ToastTitleProps extends ClassValueProp {}
export type ToastTitlePropsWithPrimitive = ToastTitleProps & PrimitiveProps;

// ToastDescription
export interface ToastDescriptionProps extends ClassValueProp {}
export type ToastDescriptionPropsWithPrimitive = ToastDescriptionProps & PrimitiveProps;

// ToastAnnounceExclude
export interface ToastAnnounceExcludeProps extends ClassValueProp {
  altText?: string;
}
export type ToastAnnounceExcludePropsWithPrimitive = ToastAnnounceExcludeProps & PrimitiveProps;

export type ToastFocusProxyEmits = {
  focusFromOutsideViewport: [void];
};
