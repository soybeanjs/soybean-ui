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
 * Properties for the PopoverRoot component.
 */
export interface PopoverRootProps extends DialogBaseProps {
  /**
   * Whether the component is disabled.
   */
  disabled?: boolean;
}

/**
 * Events for the PopoverRoot component.
 */
export type PopoverRootEmits = DialogRootEmits;

/**
 * Properties for the PopoverClose component.
 */
export interface PopoverCloseProps extends PrimitiveProps, /** @vue-ignore */ ButtonHTMLAttributes {
  /**
   * Before close.
   */
  beforeClose?: () => MaybePromise<boolean | void>;
}
/**
 * Events for the PopoverClose component.
 */
export type PopoverCloseEmits = {
  /**
   * Emitted when close occurs.
   */
  close: [];
};

/**
 * Properties for the PopoverPositionerImpl component.
 */
export interface PopoverPositionerImplProps extends PopperPositionerProps, TrapFocusProps, DismissableLayerProps {}
/**
 * Events for the PopoverPositionerImpl component.
 */
export type PopoverPositionerImplEmits = DismissableLayerEmits & FocusScopeEmits;

/**
 * Properties for the PopoverPositioner component.
 */
export interface PopoverPositionerProps extends PopperPositionerProps, ForceMountProps {}
/**
 * Events for the PopoverPositioner component.
 */
export type PopoverPositionerEmits = PopoverPositionerImplEmits;

/**
 * Properties for the PopoverPopup component.
 */
export interface PopoverPopupProps extends PopperPopupProps {}

/**
 * Properties for the PopoverTrigger component.
 */
export interface PopoverTriggerProps extends PrimitiveProps, /** @vue-ignore */ ButtonHTMLAttributes {}

/**
 * Parameters used to create the PopoverRoot context.
 */
export interface PopoverRootContextParams extends PropsToContext<PopoverRootProps, 'modal' | 'disabled'> {
  /**
   * Whether the component is open.
   */
  open: ShallowRef<boolean | undefined>;
}

export type { PopperAnchorProps as PopoverAnchorProps } from '../popper/types';

/**
 * Properties for the PopoverCompact component.
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
 * Events for the PopoverCompact component.
 */
export type PopoverCompactEmits = PopoverRootEmits & PopoverPositionerEmits;

/**
 * Slots for the PopoverCompact component.
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
 * Available UI slots for the Popover component.
 */
export type PopoverUiSlot = PopperUiSlot | 'trigger';

/**
 * UI class overrides for the Popover component.
 */
export type PopoverUi = UiClass<PopoverUiSlot>;
