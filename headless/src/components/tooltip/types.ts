import type { Ref, ShallowRef } from 'vue';
import type { DismissableLayerEmits, ForceMountProps, PropsToContext } from '../../types';
import type { PopperPopupProps, PopperPositionerProps } from '../popper/types';

/**
 * Properties for the tooltip provider component.
 */
export interface TooltipProviderProps {
  /**
   * The duration from when the pointer enters the trigger until the tooltip gets opened.
   *
   * @defaultValue 150
   */
  delayDuration?: number;

  /**
   * How much time a user has to enter another trigger without incurring a delay again.
   *
   * @defaultValue 300
   */
  skipDelayDuration?: number;

  /**
   * When `true`, trying to hover the content will result in the tooltip closing as the pointer leaves the trigger.
   *
   * @defaultValue false
   */
  disableHoverableContent?: boolean;

  /**
   * When `true`, clicking on trigger will not close the content.
   *
   * @defaultValue false
   */
  disableClosingTrigger?: boolean;

  /**
   * When `true`, disable tooltip
   *
   * @defaultValue false
   */
  disabled?: boolean;

  /**
   * Prevent the tooltip from opening if the focus did not come from the keyboard by matching against the
   * `:focus-visible` selector. This is useful if you want to avoid opening it when switching browser tabs or closing a
   * dialog.
   *
   * @defaultValue false
   */
  ignoreNonKeyboardFocus?: boolean;
  /**
   * Props to be passed down to the positioner. Useful when you need to control the positioner, such as disabling it when the trigger is disabled.
   */
  positionerProps?: TooltipPositionerProps;
}

/**
 * Parameters used to create the tooltip open delayed context.
 */
export type TooltipOpenDelayedContextParams = PropsToContext<TooltipProviderProps, 'skipDelayDuration'>;

/**
 * Properties for the tooltip root component.
 */
export interface TooltipRootProps extends TooltipProviderProps {
  /** The open state of the tooltip when it is initially rendered. Use when you do not need to control its open state. */
  defaultOpen?: boolean;
  /** The controlled open state of the tooltip. */
  open?: boolean;
}
/**
 * Events for the tooltip root component.
 */
export interface TooltipRootEmits {
  /** Event handler called when the open state of the tooltip changes. */
  'update:open': [value: boolean];
}

/**
 * State values for the tooltip component.
 */
export type TooltipDataState = 'closed' | 'delayed-open' | 'instant-open';

/**
 * Properties for the tooltip positioner impl component.
 */
export interface TooltipPositionerImplProps extends PopperPositionerProps {}
/**
 * Events for the tooltip positioner impl component.
 */
export type TooltipPositionerImplEmits = Pick<DismissableLayerEmits, 'escapeKeyDown' | 'pointerDownOutside'>;

/**
 * Properties for the tooltip positioner component.
 */
export interface TooltipPositionerProps extends TooltipPositionerImplProps, ForceMountProps {}
/**
 * Events for the tooltip positioner component.
 */
export type TooltipPositionerEmits = TooltipPositionerImplEmits;

/**
 * Properties for the tooltip popup component.
 */
export interface TooltipPopupProps extends PopperPopupProps {
  /**
   * By default, screen readers will announce the content inside the component.
   *
   * If this is not descriptive enough, or you have content that cannot be announced, use `aria-label` as a more
   * descriptive label.
   */
  ariaLabel?: string;
}

/**
 * Parameters used to create the tooltip root context.
 */
export interface TooltipRootContextParams extends PropsToContext<
  TooltipProviderProps,
  | 'delayDuration'
  | 'disableHoverableContent'
  | 'disableClosingTrigger'
  | 'disabled'
  | 'ignoreNonKeyboardFocus'
  | 'positionerProps'
> {
  /**
   * Whether the component is open.
   */
  open: ShallowRef<boolean | undefined>;
  /**
   * Whether opening is delayed.
   */
  isOpenDelayed: Ref<boolean>;
}

export type { PopperAnchorProps as TooltipTriggerProps } from '../popper/types';
