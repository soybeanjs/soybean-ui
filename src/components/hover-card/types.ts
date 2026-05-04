import type {
  HoverCardArrowProps,
  HoverCardPopupProps,
  HoverCardPortalProps,
  HoverCardPositionerEmits,
  HoverCardPositionerProps,
  HoverCardRootEmits,
  HoverCardRootProps,
  HoverCardTriggerProps,
  HoverCardUi
} from '@soybeanjs/headless/hover-card';
import type { ClassValue, Placement } from '@soybeanjs/headless/types';
import type { ThemeSize } from '@/theme';

/**
 * Properties for the HoverCard component.
 */
export interface HoverCardProps extends HoverCardRootProps {
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
  ui?: Partial<HoverCardUi>;
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
  positionerProps?: HoverCardPositionerProps;
  /**
   * Properties forwarded to the popup element.
   */
  popupProps?: HoverCardPopupProps;
  /**
   * Properties forwarded to the trigger element.
   */
  triggerProps?: HoverCardTriggerProps;
  /**
   * Properties forwarded to the portal element.
   */
  portalProps?: HoverCardPortalProps;
  /**
   * Properties forwarded to the arrow element.
   */
  arrowProps?: HoverCardArrowProps;
}

/**
 * Events for the HoverCard component.
 */
export type HoverCardEmits = HoverCardRootEmits & HoverCardPositionerEmits;
