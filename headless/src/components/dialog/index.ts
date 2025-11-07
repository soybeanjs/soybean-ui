export { default as DialogPortal } from '../portal/portal.vue';
export { default as DialogRoot } from './dialog-root.vue';
export { default as DialogTrigger } from './dialog-trigger.vue';
export { default as DialogOverlay } from './dialog-overlay.vue';
export { default as DialogContent } from './dialog-content.vue';
export { default as DialogHeader } from './dialog-header.vue';
export { default as DialogFooter } from './dialog-footer.vue';
export { default as DialogTitle } from './dialog-title.vue';
export { default as DialogDescription } from './dialog-description.vue';
export { default as DialogClose } from './dialog-close.vue';

export { provideDialogThemeContext } from './context';

export type {
  DialogRootProps,
  DialogRootEmits,
  DialogTriggerProps,
  DialogOverlayProps,
  DialogContentProps,
  DialogContentEmits,
  DialogHeaderProps,
  DialogFooterProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogCloseProps,
  DialogThemeSlot,
  DialogUi
} from './types';
export type { PortalProps as DialogPortalProps } from '../portal/types';
