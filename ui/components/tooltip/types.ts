import type {
  ClassValue,
  Placement,
  PopperThemeSlot,
  TooltipArrowProps,
  TooltipContentEmits,
  TooltipContentProps,
  TooltipPortalProps,
  TooltipRootEmits,
  TooltipRootProps,
  TooltipTriggerProps
} from '@headless';
import type { ThemeSize } from '@theme';

export type TooltipUi = Partial<Record<PopperThemeSlot, ClassValue>>;

export interface TooltipProps extends TooltipRootProps {
  size?: ThemeSize;
  ui?: TooltipUi;
  content?: string;
  placement?: Placement;
  showArrow?: boolean;
  contentProps?: TooltipContentProps;
  triggerProps?: TooltipTriggerProps;
  portalProps?: TooltipPortalProps;
  arrowProps?: TooltipArrowProps;
}

export type TooltipEmits = TooltipRootEmits & TooltipContentEmits;
