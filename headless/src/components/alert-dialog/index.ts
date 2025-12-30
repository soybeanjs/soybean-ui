export {
  DialogTrigger as AlertDialogTrigger,
  DialogOverlay as AlertDialogOverlay,
  DialogHeader as AlertDialogHeader,
  DialogFooter as AlertDialogFooter,
  DialogTitle as AlertDialogTitle,
  DialogDescription as AlertDialogDescription
} from '../dialog';
export { default as AlertDialogPortal } from '../portal/portal.vue';
export { default as AlertDialogRoot } from './alert-dialog-root.vue';
export { default as AlertDialogPopup } from './alert-dialog-popup.vue';
export { default as AlertDialogClose } from './alert-dialog-close.vue';

export { provideDialogThemeContext as provideAlertDialogThemeContext } from '../dialog/context';

export type {
  AlertDialogRootProps,
  AlertDialogRootEmits,
  AlertDialogCloseProps,
  AlertDialogPopupProps,
  AlertDialogPopupEmits
} from './types';
export type {
  DialogDescriptionProps as AlertDialogDescriptionProps,
  DialogFooterProps as AlertDialogFooterProps,
  DialogHeaderProps as AlertDialogHeaderProps,
  DialogOverlayProps as AlertDialogOverlayProps,
  DialogPortalProps as AlertDialogPortalProps,
  DialogTitleProps as AlertDialogTitleProps,
  DialogTriggerProps as AlertDialogTriggerProps,
  DialogThemeSlot as AlertDialogThemeSlot,
  DialogUi as AlertDialogUi
} from '../dialog';
