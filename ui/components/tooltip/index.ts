import {
  TooltipArrow as STooltipArrow,
  TooltipContent as STooltipContent,
  TooltipPortal as STooltipPortal,
  TooltipRoot as STooltipRoot,
  TooltipTrigger as STooltipTrigger
} from '@headless';
import STooltip from './tooltip.vue';

export { STooltip, STooltipRoot, STooltipArrow, STooltipContent, STooltipPortal, STooltipTrigger };

export type {
  TooltipProps,
  TooltipEmits,
  TooltipRootProps,
  TooltipRootEmits,
  TooltipArrowProps,
  TooltipContentProps,
  TooltipContentEmits,
  TooltipPortalProps,
  TooltipTriggerProps
} from './types';
