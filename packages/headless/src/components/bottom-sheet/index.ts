export { DialogPortal as BottomSheetPortal } from '../dialog';
export { default as BottomSheetCompact } from './bottom-sheet-compact.vue';
export { default as BottomSheetRoot } from './bottom-sheet-root.vue';
export { default as BottomSheetRootNested } from './bottom-sheet-root-nested.vue';
export { default as BottomSheetTrigger } from './bottom-sheet-trigger.vue';
export { default as BottomSheetPopup } from './bottom-sheet-popup.vue';
export { default as BottomSheetOverlay } from './bottom-sheet-overlay.vue';
export { default as BottomSheetHandle } from './bottom-sheet-handle.vue';
export { default as BottomSheetHeader } from './bottom-sheet-header.vue';
export { default as BottomSheetContent } from './bottom-sheet-content.vue';
export { default as BottomSheetFooter } from './bottom-sheet-footer.vue';
export { default as BottomSheetTitle } from './bottom-sheet-title.vue';
export { default as BottomSheetDescription } from './bottom-sheet-description.vue';
export { default as BottomSheetClose } from './bottom-sheet-close.vue';
export { default as BottomSheetCancel } from './bottom-sheet-cancel.vue';
export { default as BottomSheetConfirm } from './bottom-sheet-confirm.vue';

export { provideBottomSheetUi } from './context';

export type {
  DialogOverlayProps as BottomSheetOverlayProps,
  DialogPortalProps as BottomSheetPortalProps,
  DialogPopupProps as BottomSheetPopupProps,
  DialogPopupEmits as BottomSheetPopupEmits
} from '../dialog';
export type {
  BottomSheetCompactProps,
  BottomSheetCompactEmits,
  BottomSheetCompactSlots,
  BottomSheetRootProps,
  BottomSheetRootEmits,
  BottomSheetTriggerProps,
  BottomSheetTriggerEmits,
  BottomSheetHeaderProps,
  BottomSheetContentProps,
  BottomSheetFooterProps,
  BottomSheetTitleProps,
  BottomSheetDescriptionProps,
  BottomSheetCloseProps,
  BottomSheetCloseEmits,
  BottomSheetCancelProps,
  BottomSheetCancelEmits,
  BottomSheetConfirmProps,
  BottomSheetConfirmEmits,
  BottomSheetUiSlot,
  BottomSheetUi
} from './types';
