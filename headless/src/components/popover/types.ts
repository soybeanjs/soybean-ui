import type { ButtonHTMLAttributes, ShallowRef } from 'vue';
import type {
  DismissableLayerEmits,
  DismissableLayerProps,
  FocusScopeEmits,
  ForceMountProps,
  TrapFocusProps,
  MaybePromise,
  PropsToContext,
  UiClass
} from '../../types';
import type { PrimitiveProps } from '../primitive/types';
import type { DialogRootEmits, DialogBaseProps } from '../dialog/types';
import type { PopperPopupProps, PopperPositionerProps, PopperArrowProps, PopperUiSlot } from '../popper/types';
import type { PortalProps } from '../portal/types';

/**
 * Props for the popover root component.
 */
export interface PopoverRootProps extends DialogBaseProps {
  /**
   * Whether the component is disabled.
   */
  disabled?: boolean;
}

/**
 * Emits for the popover root component.
 */
export type PopoverRootEmits = DialogRootEmits;

/**
 * Props for the popover close component.
 */
export interface PopoverCloseProps extends PrimitiveProps, /** @vue-ignore */ ButtonHTMLAttributes {
  /**
   * Before close.
   */
  beforeClose?: () => MaybePromise<boolean | void>;
}
/**
 * Emits for the popover close component.
 */
export type PopoverCloseEmits = {
  /**
   * Emitted when close occurs.
   */
  close: [];
};

/**
 * Props for the popover positioner impl component.
 */
export interface PopoverPositionerImplProps extends PopperPositionerProps, TrapFocusProps, DismissableLayerProps {}
/**
 * Emits for the popover positioner impl component.
 */
export type PopoverPositionerImplEmits = DismissableLayerEmits & FocusScopeEmits;

/**
 * Props for the popover positioner component.
 */
export interface PopoverPositionerProps extends PopperPositionerProps, ForceMountProps {}
/**
 * Emits for the popover positioner component.
 */
export type PopoverPositionerEmits = PopoverPositionerImplEmits;

/**
 * Props for the popover popup component.
 */
export interface PopoverPopupProps extends PopperPopupProps {}

/**
 * Props for the popover trigger component.
 */
export interface PopoverTriggerProps extends PrimitiveProps, /** @vue-ignore */ ButtonHTMLAttributes {}

/**
 * Parameters used to create the popover root context.
 */
export interface PopoverRootContextParams extends PropsToContext<PopoverRootProps, 'modal' | 'disabled'> {
  /**
   * Whether the component is open.
   */
  open: ShallowRef<boolean | undefined>;
}

export type { PopperAnchorProps as PopoverAnchorProps } from '../popper/types';

/**
 * Props for the popover compact component.
 */
export interface PopoverCompactProps extends PopoverRootProps {
  /**
   * Placement.
   */
  placement?: PopperPositionerProps['placement'];
  /**
   * Whether to show an arrow.
   */
  showArrow?: boolean;
  /**
   * Props forwarded to the trigger element.
   */
  triggerProps?: PopoverTriggerProps;
  /**
   * Props forwarded to the portal element.
   */
  portalProps?: PortalProps;
  /**
   * Props forwarded to the positioner element.
   */
  positionerProps?: PopoverPositionerProps;
  /**
   * Props forwarded to the popup element.
   */
  popupProps?: PopoverPopupProps;
  /**
   * Props forwarded to the arrow element.
   */
  arrowProps?: PopperArrowProps;
  /**
   * Props forwarded to the close element.
   */
  closeProps?: PopoverCloseProps;
}

/**
 * Emits for the popover compact component.
 */
export type PopoverCompactEmits = PopoverRootEmits & PopoverPositionerEmits;

/**
 * Slots for the popover compact component.
 */
export interface PopoverCompactSlots {
  /**
   * Custom content for the default slot.
   */
  default?: () => any;
  /**
   * Custom content for the trigger slot.
   */
  trigger?: () => any;
  /**
   * Custom content for the close slot.
   */
  close?: () => any;
}

/**
 * Available UI slots for the popover component.
 */
export type PopoverUiSlot = PopperUiSlot | 'trigger';

/**
 * UI class overrides for the popover component.
 */
export type PopoverUi = UiClass<PopoverUiSlot>;
