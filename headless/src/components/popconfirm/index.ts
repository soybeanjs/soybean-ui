export { default as PopconfirmCompact } from './popconfirm-compact.vue';
export { default as PopconfirmRoot } from '../popover/popover-root.vue';
export { default as PopconfirmTrigger } from '../popover/popover-trigger.vue';
export { default as PopconfirmPortal } from '../portal/portal.vue';
export { default as PopconfirmPositioner } from '../popover/popover-positioner.vue';
export { default as PopconfirmPopup } from '../popover/popover-popup.vue';
export { default as PopconfirmArrow } from '../popper/popper-arrow.vue';
export { default as PopconfirmClose } from '../popover/popover-close.vue';
export { default as PopconfirmHeader } from './popconfirm-header.vue';
export { default as PopconfirmTitle } from './popconfirm-title.vue';
export { default as PopconfirmDescription } from './popconfirm-description.vue';
export { default as PopconfirmContent } from './popconfirm-content.vue';
export { default as PopconfirmFooter } from './popconfirm-footer.vue';
export { default as PopconfirmConfirm } from './popconfirm-confirm.vue';
export { default as PopconfirmCancel } from './popconfirm-cancel.vue';

export { providePopconfirmUi } from './context';

export type {
  PopconfirmCompactProps,
  PopconfirmCompactEmits,
  PopconfirmCompactSlots,
  PopconfirmCompactBaseSlotProps,
  PopconfirmConfirmProps,
  PopconfirmConfirmEmits,
  PopconfirmCancelProps,
  PopconfirmCancelEmits,
  PopconfirmHeaderProps,
  PopconfirmTitleProps,
  PopconfirmDescriptionProps,
  PopconfirmContentProps,
  PopconfirmFooterProps,
  PopconfirmType,
  PopconfirmUiSlot,
  PopconfirmUi
} from './types';
export type {
  PopoverAnchorProps as PopconfirmAnchorProps,
  PopoverCloseProps as PopconfirmCloseProps,
  PopoverPopupProps as PopconfirmPopupProps,
  PopoverPositionerEmits as PopconfirmPositionerEmits,
  PopoverPositionerProps as PopconfirmPositionerProps,
  PopoverRootEmits as PopconfirmRootEmits,
  PopoverRootProps as PopconfirmRootProps,
  PopoverTriggerProps as PopconfirmTriggerProps
} from '../popover/types';
export type { PopperArrowProps as PopconfirmArrowProps } from '../popper/types';
export type { PortalProps as PopconfirmPortalProps } from '../portal/types';
