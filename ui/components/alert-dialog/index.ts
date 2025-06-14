import {
  AlertDialogContent as SAlertDialogContent,
  AlertDialogDescription as SAlertDialogDescription,
  AlertDialogFooter as SAlertDialogFooter,
  AlertDialogHeader as SAlertDialogHeader,
  AlertDialogOverlay as SAlertDialogOverlay,
  AlertDialogPortal as SAlertDialogPortal,
  AlertDialogRoot as SAlertDialogRoot,
  AlertDialogTitle as SAlertDialogTitle,
  AlertDialogTrigger as SAlertDialogTrigger
} from '@headless';
import SAlertDialog from './alert-dialog.vue';
import SAlertDialogCancel from './alert-dialog-cancel.vue';
import SAlertDialogAction from './alert-dialog-action.vue';

export {
  SAlertDialog,
  SAlertDialogRoot,
  SAlertDialogTrigger,
  SAlertDialogPortal,
  SAlertDialogOverlay,
  SAlertDialogContent,
  SAlertDialogHeader,
  SAlertDialogFooter,
  SAlertDialogTitle,
  SAlertDialogDescription,
  SAlertDialogCancel,
  SAlertDialogAction
};

export type {
  AlertDialogProps,
  AlertDialogEmits,
  AlertDialogCancelProps,
  AlertDialogActionProps,
  AlertDialogContentEmits,
  AlertDialogContentProps,
  AlertDialogDescriptionProps,
  AlertDialogFooterProps,
  AlertDialogHeaderProps,
  AlertDialogOverlayProps,
  AlertDialogPortalProps,
  AlertDialogRootEmits,
  AlertDialogRootProps,
  AlertDialogTitleProps,
  AlertDialogTriggerProps
} from './types';
