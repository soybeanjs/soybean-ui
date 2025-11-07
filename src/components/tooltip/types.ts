import type {
  Placement,
  TooltipArrowProps,
  TooltipContentEmits,
  TooltipContentProps,
  TooltipPortalProps,
  TooltipRootEmits,
  TooltipRootProps,
  TooltipTriggerProps,
  TooltipUi
} from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

export interface TooltipProps extends TooltipRootProps {
  size?: ThemeSize;
  ui?: Partial<TooltipUi>;
  content?: string;
  placement?: Placement;
  showArrow?: boolean;
  contentProps?: TooltipContentProps;
  triggerProps?: TooltipTriggerProps;
  portalProps?: TooltipPortalProps;
  arrowProps?: TooltipArrowProps;
}

export type TooltipEmits = TooltipRootEmits & TooltipContentEmits;
