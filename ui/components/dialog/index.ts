import {
  DialogContent as SDialogContent,
  DialogDescription as SDialogDescription,
  DialogFooter as SDialogFooter,
  DialogHeader as SDialogHeader,
  DialogOverlay as SDialogOverlay,
  DialogPortal as SDialogPortal,
  DialogRoot as SDialogRoot,
  DialogTitle as SDialogTitle,
  DialogTrigger as SDialogTrigger
} from '@headless';
import SDialog from './dialog.vue';
import SDialogClose from './dialog-close.vue';

export {
  SDialog,
  SDialogRoot,
  SDialogTrigger,
  SDialogPortal,
  SDialogOverlay,
  SDialogContent,
  SDialogHeader,
  SDialogFooter,
  SDialogTitle,
  SDialogDescription,
  SDialogClose
};

export type {
  DialogProps,
  DialogEmits,
  DialogContentEmits,
  DialogContentProps,
  DialogDescriptionProps,
  DialogFooterProps,
  DialogHeaderProps,
  DialogOverlayProps,
  DialogPortalProps,
  DialogRootEmits,
  DialogRootProps,
  DialogSlot,
  DialogTitleProps,
  DialogTriggerProps,
  DialogCloseProps
} from './types';
