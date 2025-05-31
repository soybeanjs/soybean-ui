import PopoverPortal from '../portal/portal.vue';
import { PopperArrow as PopoverArrow } from '../popper';
import PopoverRoot from './popover-root.vue';
import PopoverAnchor from './popover-anchor.vue';
import PopoverClose from './popover-close.vue';
import PopoverContent from './popover-content.vue';
import PopoverTrigger from './popover-trigger.vue';

export { PopoverRoot, PopoverAnchor, PopoverArrow, PopoverClose, PopoverContent, PopoverPortal, PopoverTrigger };

export type {
  PopoverRootProps,
  PopoverRootEmits,
  PopoverAnchorProps,
  PopoverArrowProps,
  PopoverCloseProps,
  PopoverContentProps,
  PopoverContentEmits,
  PopoverPortalProps,
  PopoverTriggerProps
} from './types';
