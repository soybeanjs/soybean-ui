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
 * Properties for the popover root component.
 */
export interface PopoverRootProps extends DialogBaseProps {
  /**
   * Whether the component is disabled.
   */
  disabled?: boolean;
}

/**
 * Events for the popover root component.
 */
export type PopoverRootEmits = DialogRootEmits;

/**
 * Properties for the popover close component.
 */
export interface PopoverCloseProps extends PrimitiveProps, /** @vue-ignore */ ButtonHTMLAttributes {
  /**
   * Before close.
   */
  beforeClose?: () => MaybePromise<boolean | void>;
}
/**
 * Events for the popover close component.
 */
export type PopoverCloseEmits = {
  /**
   * Emitted when close occurs.
   */
  close: [];
};

/**
 * Properties for the popover positioner impl component.
 */
export interface PopoverPositionerImplProps extends PopperPositionerProps, TrapFocusProps, DismissableLayerProps {}
/**
 * Events for the popover positioner impl component.
 */
export type PopoverPositionerImplEmits = DismissableLayerEmits & FocusScopeEmits;

/**
 * Properties for the popover positioner component.
 */
export interface PopoverPositionerProps extends PopperPositionerProps, ForceMountProps {}
/**
 * Events for the popover positioner component.
 */
export type PopoverPositionerEmits = PopoverPositionerImplEmits;

/**
 * Properties for the popover popup component.
 */
export interface PopoverPopupProps extends PopperPopupProps {}

/**
 * Properties for the popover trigger component.
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
 * Properties for the popover compact component.
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
   * Properties forwarded to the trigger element.
   */
  triggerProps?: PopoverTriggerProps;
  /**
   * Properties forwarded to the portal element.
   */
  portalProps?: PortalProps;
  /**
   * Properties forwarded to the positioner element.
   */
  positionerProps?: PopoverPositionerProps;
  /**
   * Properties forwarded to the popup element.
   */
  popupProps?: PopoverPopupProps;
  /**
   * Properties forwarded to the arrow element.
   */
  arrowProps?: PopperArrowProps;
  /**
   * Properties forwarded to the close element.
   */
  closeProps?: PopoverCloseProps;
}

/**
 * Events for the popover compact component.
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
