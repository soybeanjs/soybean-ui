import type { UiClass } from '../../types';
import type { ButtonProps } from '../button/types';
import type { DialogRootEmits } from '../dialog/types';
import type {
  PopperV2RootProps,
  PopperV2PositionerProps,
  PopperV2PositionerEmits,
  PopperV2PopupProps,
  PopperV2ArrowProps,
  PopperV2PortalProps,
  PopperV2UiSlot
} from '../popper-v2/types';

/**
 * Properties for the PopoverRoot component.
 */
export interface PopoverRootProps extends PopperV2RootProps {}

/**
 * Events for the PopoverRoot component.
 */
export type PopoverRootEmits = DialogRootEmits;

/**
 * Properties for the PopoverClose component.
 */
export interface PopoverCloseProps extends ButtonProps {}
/**
 * Events for the PopoverClose component.
 */
export type PopoverCloseEmits = {
  /**
   * Emitted when close occurs.
   */
  close: [PointerEvent];
};

/**
 * Properties for the PopoverPositioner component.
 */
export interface PopoverPositionerProps extends PopperV2PositionerProps {}
/**
 * Events for the PopoverPositioner component.
 */
export type PopoverPositionerEmits = PopperV2PositionerEmits;

/**
 * Properties for the PopoverPopup component.
 */
export interface PopoverPopupProps extends PopperV2PopupProps {}

/**
 * Properties for the PopoverTrigger component.
 */
export interface PopoverTriggerProps extends ButtonProps {}

export type { PopperV2AnchorProps as PopoverAnchorProps } from '../popper-v2/types';

/**
 * Properties for the PopoverCompact component.
 */
export interface PopoverCompactProps extends PopoverRootProps {
  /**
   * Placement.
   */
  placement?: PopperV2PositionerProps['placement'];
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
  portalProps?: PopperV2PortalProps;
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
  arrowProps?: PopperV2ArrowProps;
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
export type PopoverCompactSlots = {
  /**
   * Custom content for the default slot.
   */
  default?: (props: { open: boolean; close: () => void }) => any;
  /**
   * Custom content for the trigger slot.
   */
  trigger?: () => any;
  /**
   * Custom content for the close slot.
   */
  close?: () => any;
};

/**
 * Available UI slots for the Popover component.
 */
export type PopoverUiSlot = PopperV2UiSlot | 'close';

/**
 * UI class overrides for the Popover component.
 */
export type PopoverUi = UiClass<PopoverUiSlot>;
