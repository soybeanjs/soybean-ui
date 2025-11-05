import TooltipPortal from '../portal/portal.vue';
import TooltipArrow from '../popper/popper-arrow.vue';
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
