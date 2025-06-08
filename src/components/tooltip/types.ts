import type { Ref, ShallowRef } from 'vue';
import type { DismissableLayerEmits, ForceMountProps, PropsToContext } from '../../types';
import type { PopperContentProps, PopperAnchorProps as TooltipTriggerProps } from '../popper/types';
import type { PortalProps as TooltipPortalProps } from '../portal/types';
import type { ArrowProps as TooltipArrowProps } from '../arrow/types';

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
}

export type TooltipProviderContextParams = PropsToContext<
  TooltipProviderProps,
  | 'delayDuration'
  | 'skipDelayDuration'
  | 'disableHoverableContent'
  | 'disableClosingTrigger'
  | 'disabled'
  | 'ignoreNonKeyboardFocus'
>;

export interface TooltipRootProps
  extends Pick<
    TooltipProviderProps,
    'delayDuration' | 'disableHoverableContent' | 'disableClosingTrigger' | 'disabled' | 'ignoreNonKeyboardFocus'
  > {
  /** The open state of the tooltip when it is initially rendered. Use when you do not need to control its open state. */
  defaultOpen?: boolean;
  /** The controlled open state of the tooltip. */
  open?: boolean;
}
export interface TooltipRootEmits {
  /** Event handler called when the open state of the tooltip changes. */
  'update:open': [value: boolean];
}

export type TooltipDataState = 'closed' | 'delayed-open' | 'instant-open';

export interface TooltipContentImplProps extends PopperContentProps {
  /**
   * By default, screen readers will announce the content inside the component.
   *
   * If this is not descriptive enough, or you have content that cannot be announced, use `aria-label` as a more
   * descriptive label.
   */
  ariaLabel?: string;
}
export type TooltipContentImplEmits = Pick<DismissableLayerEmits, 'escapeKeyDown' | 'pointerDownOutside'>;

export interface TooltipContentProps extends TooltipContentImplProps, ForceMountProps {}
export type TooltipContentEmits = TooltipContentImplEmits;

export interface TooltipRootContextParams
  extends PropsToContext<
    TooltipProviderProps,
    'delayDuration' | 'disableHoverableContent' | 'disableClosingTrigger' | 'disabled' | 'ignoreNonKeyboardFocus'
  > {
  open: ShallowRef<boolean | undefined>;
  isOpenDelayed: Ref<boolean>;
}

export type { TooltipArrowProps, TooltipPortalProps, TooltipTriggerProps };
