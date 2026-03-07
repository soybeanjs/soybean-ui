export { default as SAlertDialog } from './alert-dialog.vue';
export { default as SAlertDialogCancel } from './alert-dialog-cancel.vue';
export { default as SAlertDialogConfirm } from './alert-dialog-confirm.vue';

export { useDialog } from './context';

export type {
  AlertDialogRootProps,
  AlertDialogRootEmits,
  AlertDialogCloseProps,
  AlertDialogContentProps,
  AlertDialogContentEmits,
  AlertDialogDescriptionProps,
  AlertDialogFooterProps,
  AlertDialogHeaderProps,
  AlertDialogOverlayProps,
  AlertDialogPortalProps,
  AlertDialogTitleProps,
  AlertDialogTriggerProps
} from '@soybeanjs/headless/alert-dialog';
export type * from './types';
