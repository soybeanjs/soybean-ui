import {
  DialogDescription as AlertDialogDescription,
  DialogFooter as AlertDialogFooter,
  DialogHeader as AlertDialogHeader,
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
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel
};

export type {
  AlertDialogRootProps,
  AlertDialogRootEmits,
  AlertDialogContentProps,
  AlertDialogContentEmits,
  AlertDialogCancelProps,
  AlertDialogTriggerProps,
  AlertDialogPortalProps,
  AlertDialogOverlayProps,
  AlertDialogTitleProps,
  AlertDialogDescriptionProps,
  AlertDialogHeaderProps,
  AlertDialogFooterProps
} from './types';
