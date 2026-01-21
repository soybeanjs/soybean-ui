export { default as AlertDialogRoot } from './alert-dialog-root.vue';
export { DialogTrigger as AlertDialogTrigger } from '../dialog';
export { default as AlertDialogPortal } from '../portal/portal.vue';
export { DialogOverlay as AlertDialogOverlay } from '../dialog';
export { default as AlertDialogContent } from './alert-dialog-content.vue';
export { DialogHeader as AlertDialogHeader } from '../dialog';
export { DialogTitle as AlertDialogTitle } from '../dialog';
export { DialogDescription as AlertDialogDescription } from '../dialog';
export { DialogFooter as AlertDialogFooter } from '../dialog';
export { default as AlertDialogClose } from './alert-dialog-close.vue';

export { provideDialogUi as provideAlertDialogUi } from '../dialog/context';

export type {
  AlertDialogRootProps,
  AlertDialogRootEmits,
  AlertDialogCloseProps,
  AlertDialogContentProps,
  AlertDialogContentEmits
} from './types';
export type {
  DialogDescriptionProps as AlertDialogDescriptionProps,
  DialogFooterProps as AlertDialogFooterProps,
  DialogHeaderProps as AlertDialogHeaderProps,
  DialogOverlayProps as AlertDialogOverlayProps,
  DialogPortalProps as AlertDialogPortalProps,
  DialogTitleProps as AlertDialogTitleProps,
  DialogTriggerProps as AlertDialogTriggerProps,
  DialogUiSlot as AlertDialogUiSlot,
  DialogUi as AlertDialogUi
} from '../dialog';
