import type {
  PopoverArrowProps,
  PopoverCloseProps,
  PopoverPopupProps,
  PopoverPortalProps,
  PopoverPositionerEmits,
  PopoverPositionerProps,
  PopoverRootEmits,
  PopoverRootProps,
  PopoverTriggerProps,
  PopoverUi
} from '@soybeanjs/headless/popover';
import type { ClassValue, Placement } from '@soybeanjs/headless/types';
import type { ThemeSize } from '@/theme';

/**
 * Properties for the Popover component.
 */
export interface PopoverProps extends PopoverRootProps {
  /**
   * class of popup
   */
  class?: ClassValue;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<PopoverUi>;
  /**
   * Placement.
   */
  placement?: Placement;
  /**
   * Whether to show an arrow.
   */
  showArrow?: boolean;
  /**
   * Properties forwarded to the positioner element.
   */
  positionerProps?: PopoverPositionerProps;
  /**
   * Properties forwarded to the popup element.
   */
  popupProps?: PopoverPopupProps;
  /**
   * Properties forwarded to the trigger element.
   */
  triggerProps?: PopoverTriggerProps;
  /**
   * Properties forwarded to the close element.
   */
  closeProps?: PopoverCloseProps;
  /**
   * Properties forwarded to the portal element.
   */
  portalProps?: PopoverPortalProps;
  /**
   * Properties forwarded to the arrow element.
   */
  arrowProps?: PopoverArrowProps;
}

/**
 * Events for the Popover component.
 */
export type PopoverEmits = PopoverRootEmits & PopoverPositionerEmits;
