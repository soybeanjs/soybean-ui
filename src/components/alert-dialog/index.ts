import {
  DialogDescription as AlertDialogDescription,
  DialogOverlay as AlertDialogOverlay,
  DialogPortal as AlertDialogPortal,
  DialogTitle as AlertDialogTitle,
  DialogTrigger as AlertDialogTrigger
} from '../dialog';
import AlertDialogRoot from './alert-dialog-root.vue';
import AlertDialogContent from './alert-dialog-content.vue';
import AlertDialogCancel from './alert-dialog-cancel.vue';

export {
  AlertDialogRoot,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel
};

export type {
  DialogTriggerProps as AlertDialogTriggerProps,
  DialogPortalProps as AlertDialogPortalProps,
  DialogOverlayProps as AlertDialogOverlayProps,
  DialogTitleProps as AlertDialogTitleProps,
  DialogDescriptionProps as AlertDialogDescriptionProps
} from '../dialog';
export type { AlertDialogRootProps, AlertDialogContentProps, AlertDialogCancelProps } from './types';
