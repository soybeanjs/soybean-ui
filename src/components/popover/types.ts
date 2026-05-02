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
 * Props for the popover component.
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
   * Props forwarded to the positioner element.
   */
  positionerProps?: PopoverPositionerProps;
  /**
   * Props forwarded to the popup element.
   */
  popupProps?: PopoverPopupProps;
  /**
   * Props forwarded to the trigger element.
   */
  triggerProps?: PopoverTriggerProps;
  /**
   * Props forwarded to the close element.
   */
  closeProps?: PopoverCloseProps;
  /**
   * Props forwarded to the portal element.
   */
  portalProps?: PopoverPortalProps;
  /**
   * Props forwarded to the arrow element.
   */
  arrowProps?: PopoverArrowProps;
}

/**
 * Emits for the popover component.
 */
export type PopoverEmits = PopoverRootEmits & PopoverPositionerEmits;
