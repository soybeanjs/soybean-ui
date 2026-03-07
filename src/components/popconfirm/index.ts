export { default as SPopconfirm } from './popconfirm.vue';
export { default as SPopconfirmConfirm } from './popconfirm-confirm.vue';
export { default as SPopconfirmCancel } from './popconfirm-cancel.vue';

export type {
  PopoverRootProps as PopconfirmRootProps,
  PopoverRootEmits as PopconfirmRootEmits,
  PopoverAnchorProps as PopconfirmAnchorProps,
  PopoverCloseProps as PopconfirmCloseProps,
  PopoverPositionerProps as PopconfirmPositionerProps,
  PopoverPositionerEmits as PopconfirmPositionerEmits,
  PopoverPopupProps as PopconfirmPopupProps,
  PopoverTriggerProps as PopconfirmTriggerProps,
  PopoverPortalProps as PopconfirmPortalProps,
  PopoverArrowProps as PopconfirmArrowProps
} from '@soybeanjs/headless/popover';

export type * from './types';
