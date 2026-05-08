export { default as PopconfirmCompact } from './popconfirm-compact.vue';
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
