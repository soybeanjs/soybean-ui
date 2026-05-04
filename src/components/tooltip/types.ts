import type {
  TooltipArrowProps,
  TooltipPopupProps,
  TooltipPortalProps,
  TooltipPositionerEmits,
  TooltipPositionerProps,
  TooltipRootEmits,
  TooltipRootProps,
  TooltipTriggerProps,
  TooltipUi
} from '@soybeanjs/headless/tooltip';
import type { ClassValue, Placement } from '@soybeanjs/headless/types';
import type { ThemeSize } from '@/theme';

/**
 * Properties for the tooltip component.
 */
export interface TooltipProps extends TooltipRootProps {
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
  ui?: Partial<TooltipUi>;
  /**
   * Content.
   */
  content?: string;
  /**
   * Placement.
   */
  placement?: Placement;
  /**
   * Whether to show an arrow.
   */
  showArrow?: boolean;
  /**
   * Properties forwarded to the popup element.
   */
  popupProps?: TooltipPopupProps;
  /**
   * Properties forwarded to the positioner element.
   */
  positionerProps?: TooltipPositionerProps;
  /**
   * Properties forwarded to the trigger element.
   */
  triggerProps?: TooltipTriggerProps;
  /**
   * Properties forwarded to the portal element.
   */
  portalProps?: TooltipPortalProps;
  /**
   * Properties forwarded to the arrow element.
   */
  arrowProps?: TooltipArrowProps;
}

/**
 * Events for the tooltip component.
 */
export type TooltipEmits = TooltipRootEmits & TooltipPositionerEmits;
