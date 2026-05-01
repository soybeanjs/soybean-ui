import type {
  ClassValue,
  Placement,
  TooltipArrowProps,
  TooltipPopupProps,
  TooltipPortalProps,
  TooltipPositionerEmits,
  TooltipPositionerProps,
  TooltipRootEmits,
  TooltipRootProps,
  TooltipTriggerProps,
  TooltipUi
} from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

/**
 * Props for the tooltip component.
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
   * Props forwarded to the popup element.
   */
  popupProps?: TooltipPopupProps;
  /**
   * Props forwarded to the positioner element.
   */
  positionerProps?: TooltipPositionerProps;
  /**
   * Props forwarded to the trigger element.
   */
  triggerProps?: TooltipTriggerProps;
  /**
   * Props forwarded to the portal element.
   */
  portalProps?: TooltipPortalProps;
  /**
   * Props forwarded to the arrow element.
   */
  arrowProps?: TooltipArrowProps;
}

/**
 * Emits for the tooltip component.
 */
export type TooltipEmits = TooltipRootEmits & TooltipPositionerEmits;
