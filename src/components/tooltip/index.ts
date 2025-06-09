import TooltipPortal from '../portal/portal.vue';
import { PopperArrow as TooltipArrow } from '../popper';
import TooltipRoot from './tooltip-root.vue';
import TooltipTrigger from './tooltip-trigger.vue';
import TooltipContent from './tooltip-content.vue';

export { TooltipRoot, TooltipTrigger, TooltipContent, TooltipPortal, TooltipArrow };

export type {
  TooltipProviderProps,
  TooltipRootProps,
  TooltipRootEmits,
  TooltipTriggerProps,
  TooltipContentProps,
  TooltipContentEmits,
  TooltipPortalProps,
  TooltipArrowProps
} from './types';
