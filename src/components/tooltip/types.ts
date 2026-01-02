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

export interface TooltipProps extends TooltipRootProps {
  /**
   * class of popup
   */
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<TooltipUi>;
  content?: string;
  placement?: Placement;
  showArrow?: boolean;
  popupProps?: TooltipPopupProps;
  positionerProps?: TooltipPositionerProps;
  triggerProps?: TooltipTriggerProps;
  portalProps?: TooltipPortalProps;
  arrowProps?: TooltipArrowProps;
}

export type TooltipEmits = TooltipRootEmits & TooltipPositionerEmits;
