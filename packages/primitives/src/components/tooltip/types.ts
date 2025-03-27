import type { Ref } from 'vue';
import type { ClassValueProp, PrimitiveProps } from '../../types';
import type { ArrowProps } from '../arrow';
import type { PopperAnchorProps, PopperContentProps } from '../popper';
import type { TeleportProps } from '../teleport';

// Root
export interface TooltipRootProps extends ClassValueProp {
  /** The open state of the tooltip when it is initially rendered. Use when you do not need to control its open state. */
  defaultOpen?: boolean;
  /** The controlled open state of the tooltip. */
  open?: boolean;
  /**
   * Override the duration given to the `Provider` to customize the open delay for a specific tooltip.
   *
   * @defaultValue 700
   */
  delayDuration?: number;
  /**
   * Prevents Tooltip.Content from remaining open when hovering. Disabling this has accessibility consequences. Inherits
   * from Tooltip.Provider.
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
   * Prevent the tooltip from opening if the focus did not come from the keyboard.
   *
   * @defaultValue false
   */
  ignoreNonKeyboardFocus?: boolean;
}
export type TooltipRootPropsWithPrimitive = TooltipRootProps & PrimitiveProps;

export type TooltipRootEmits = {
  /** Event handler called when the open state of the tooltip changes. */
  'update:open': [value: boolean];
};

export type TooltipRootContext = {
  contentId: string;
  open: Ref<boolean>;
  stateAttribute: Ref<'closed' | 'delayed-open' | 'instant-open'>;
  trigger: Ref<HTMLElement | undefined>;
  onTriggerChange: (trigger: HTMLElement | undefined) => void;
  onTriggerEnter: () => void;
  onTriggerLeave: () => void;
  onOpen: () => void;
  onClose: () => void;
  disableHoverableContent: Ref<boolean>;
  disableClosingTrigger: Ref<boolean>;
  disabled: Ref<boolean>;
  ignoreNonKeyboardFocus: Ref<boolean>;
};

// Provider
export interface TooltipProviderProps {
  /**
   * The duration from when the pointer enters the trigger until the tooltip gets opened.
   *
   * @defaultValue 700
   */
  delayDuration?: number;
  /**
   * How much time a user has to enter another trigger without incurring a delay again.
   *
   * @defaultValue 300
   */
  skipDelayDuration?: number;
  /**
   * When `true`, trying to hover the content will result in the tooltip closing.
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
   * Prevent the tooltip from opening if the focus did not come from the keyboard.
   *
   * @defaultValue false
   */
  ignoreNonKeyboardFocus?: boolean;
}

export type TooltipProviderContext = {
  isOpenDelayed: Ref<boolean>;
  delayDuration: Ref<number>;
  onOpen: () => void;
  onClose: () => void;
  isPointerInTransitRef: Ref<boolean>;
  disableHoverableContent: Ref<boolean>;
  disableClosingTrigger: Ref<boolean>;
  disabled: Ref<boolean>;
  ignoreNonKeyboardFocus: Ref<boolean>;
};

// ContentImpl
export interface TooltipContentImplProps
  extends ClassValueProp,
    PrimitiveProps,
    Pick<
      PopperContentProps,
      | 'side'
      | 'sideOffset'
      | 'align'
      | 'alignOffset'
      | 'avoidCollisions'
      | 'collisionBoundary'
      | 'collisionPadding'
      | 'arrowPadding'
      | 'sticky'
      | 'hideWhenDetached'
      | 'positionStrategy'
      | 'updatePositionStrategy'
    > {
  /**
   * By default, screenreaders will announce the content inside the component. If this is not descriptive enough, or you
   * have content that cannot be announced, use aria-label as a more descriptive label.
   *
   * @defaultValue String
   */
  ariaLabel?: string;
}

export type TooltipContentImplEmits = {
  /**
   * Event handler called when focus moves to the destructive action after opening. It can be prevented by calling
   * `event.preventDefault`
   */
  escapeKeyDown: [event: KeyboardEvent];
  /**
   * Event handler called when a pointer event occurs outside the bounds of the component. It can be prevented by
   * calling `event.preventDefault`.
   */
  pointerDownOutside: [event: Event];
};

// Content
export interface TooltipContentProps extends TooltipContentImplProps {
  /** Used to force mounting when more control is needed. Useful when controlling animation with Vue animation libraries. */
  forceMount?: boolean;
}
export type TooltipContentPropsWithPrimitive = TooltipContentProps & PrimitiveProps;

export type TooltipContentEmits = TooltipContentImplEmits;

// Arrow
export interface TooltipArrowProps extends ArrowProps {}
export type TooltipArrowPropsWithPrimitive = TooltipArrowProps & PrimitiveProps;

// Portal
export type TooltipPortalProps = TeleportProps;

// Trigger
export type TooltipTriggerDataState = 'closed' | 'delayed-open' | 'instant-open';

export interface TooltipTriggerProps extends PopperAnchorProps {}
export type TooltipTriggerPropsWithPrimitive = TooltipTriggerProps & PrimitiveProps;
