export { default as PopoverCompact } from './popover-compact.vue';
export { default as PopoverRoot } from './popover-root.vue';
export { default as PopoverTrigger } from './popover-trigger.vue';
export { default as PopoverAnchor } from './popover-anchor.vue';
export { default as PopoverPositioner } from './popover-positioner.vue';
export { default as PopoverPopup } from './popover-popup.vue';
export { default as PopoverClose } from './popover-close.vue';
export { PopperV2Arrow as PopoverArrow } from '../popper-v2';
export { PopperV2Portal as PopoverPortal } from '../popper-v2';

export { providePopoverUi } from './context';

export type {
  PopoverCompactProps,
  PopoverCompactEmits,
  PopoverCompactSlots,
  PopoverRootProps,
  PopoverRootEmits,
  PopoverAnchorProps,
  PopoverCloseProps,
  PopoverCloseEmits,
  PopoverPositionerProps,
  PopoverPositionerEmits,
  PopoverPopupProps,
  PopoverTriggerProps,
  PopoverUiSlot,
  PopoverUi
} from './types';
export type { PopperV2ArrowProps as PopoverArrowProps } from '../popper-v2/types';
export type { PopperV2PortalProps as PopoverPortalProps } from '../popper-v2/types';
