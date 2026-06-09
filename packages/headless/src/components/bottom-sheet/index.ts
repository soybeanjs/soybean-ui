export {
  DialogTrigger as BottomSheetTrigger,
  DialogPortal as BottomSheetPortal,
  DialogHeader as BottomSheetHeader,
  DialogContent as BottomSheetContent,
  DialogFooter as BottomSheetFooter,
  DialogTitle as BottomSheetTitle,
  DialogDescription as BottomSheetDescription,
  DialogClose as BottomSheetClose,
  DialogCancel as BottomSheetCancel,
  DialogConfirm as BottomSheetConfirm
} from '../dialog';
export { default as BottomSheetCompact } from './bottom-sheet-compact.vue';
export { default as BottomSheetRoot } from './bottom-sheet-root.vue';
export { default as BottomSheetRootNested } from './bottom-sheet-root-nested.vue';
export { default as BottomSheetPopup } from './bottom-sheet-popup.vue';
export { default as BottomSheetOverlay } from './bottom-sheet-overlay.vue';
export { default as BottomSheetHandle } from './bottom-sheet-handle.vue';

export { provideBottomSheetUi } from './context';

export type {
  DialogTriggerProps as BottomSheetTriggerProps,
  DialogOverlayProps as BottomSheetOverlayProps,
  DialogPortalProps as BottomSheetPortalProps,
  DialogPopupProps as BottomSheetPopupProps,
  DialogPopupEmits as BottomSheetPopupEmits,
  DialogHeaderProps as BottomSheetHeaderProps,
  DialogContentProps as BottomSheetContentProps,
  DialogFooterProps as BottomSheetFooterProps,
  DialogTitleProps as BottomSheetTitleProps,
  DialogDescriptionProps as BottomSheetDescriptionProps,
  DialogCloseProps as BottomSheetCloseProps,
  DialogCloseEmits as BottomSheetCloseEmits,
  DialogConfirmProps as BottomSheetConfirmProps,
  DialogConfirmEmits as BottomSheetConfirmEmits,
  DialogCancelProps as BottomSheetCancelProps,
  DialogCancelEmits as BottomSheetCancelEmits
} from '../dialog';
export type {
  BottomSheetCompactProps,
  BottomSheetCompactEmits,
  BottomSheetCompactSlots,
  BottomSheetRootProps,
  BottomSheetRootEmits,
  BottomSheetUiSlot,
  BottomSheetUi
} from './types';
