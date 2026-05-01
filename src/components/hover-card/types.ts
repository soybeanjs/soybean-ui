import type {
  ClassValue,
  HoverCardArrowProps,
  HoverCardPopupProps,
  HoverCardPortalProps,
  HoverCardPositionerEmits,
  HoverCardPositionerProps,
  HoverCardRootEmits,
  HoverCardRootProps,
  HoverCardTriggerProps,
  HoverCardUi,
  Placement
} from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

/**
 * Props for the hover card component.
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
   * Props forwarded to the positioner element.
   */
  positionerProps?: HoverCardPositionerProps;
  /**
   * Props forwarded to the popup element.
   */
  popupProps?: HoverCardPopupProps;
  /**
   * Props forwarded to the trigger element.
   */
  triggerProps?: HoverCardTriggerProps;
  /**
   * Props forwarded to the portal element.
   */
  portalProps?: HoverCardPortalProps;
  /**
   * Props forwarded to the arrow element.
   */
  arrowProps?: HoverCardArrowProps;
}

/**
 * Emits for the hover card component.
 */
export type HoverCardEmits = HoverCardRootEmits & HoverCardPositionerEmits;
