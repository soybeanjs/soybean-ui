import {
  PopoverAnchor as SPopoverAnchor,
  PopoverArrow as SPopoverArrow,
  PopoverClose as SPopoverClose,
  PopoverContent as SPopoverContent,
  PopoverPortal as SPopoverPortal,
  PopoverRoot as SPopoverRoot,
  PopoverTrigger as SPopoverTrigger
} from '@headless';
import SPopover from './popover.vue';

export {
  SPopover,
  SPopoverRoot,
  SPopoverAnchor,
  SPopoverArrow,
  SPopoverClose,
  SPopoverContent,
  SPopoverPortal,
  SPopoverTrigger
};

export type {
  PopoverProps,
  PopoverEmits,
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
