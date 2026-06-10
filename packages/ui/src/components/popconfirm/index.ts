export { default as SPopconfirm } from './popconfirm.vue';
export {
  PopconfirmConfirm as SPopconfirmConfirm,
  PopconfirmCancel as SPopconfirmCancel
} from '@soybeanjs/headless/popconfirm';

export type {
  PopconfirmRootProps,
  PopconfirmRootEmits,
  PopconfirmAnchorProps,
  PopconfirmCloseProps,
  PopconfirmPositionerProps,
  PopconfirmPositionerEmits,
  PopconfirmPopupProps,
  PopconfirmTriggerProps,
  PopconfirmPortalProps,
  PopconfirmArrowProps
} from '@soybeanjs/headless/popconfirm';

export type * from './types';
