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

export interface HoverCardProps extends HoverCardRootProps {
  /**
   * class of popup
   */
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<HoverCardUi>;
  placement?: Placement;
  showArrow?: boolean;
  positionerProps?: HoverCardPositionerProps;
  popupProps?: HoverCardPopupProps;
  triggerProps?: HoverCardTriggerProps;
  portalProps?: HoverCardPortalProps;
  arrowProps?: HoverCardArrowProps;
}

export type HoverCardEmits = HoverCardRootEmits & HoverCardPositionerEmits;
