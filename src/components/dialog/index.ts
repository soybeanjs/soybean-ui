import DialogPortal from '../portal/portal.vue';
import DialogRoot from './dialog-root.vue';
import DialogTrigger from './dialog-trigger.vue';
import DialogOverlay from './dialog-overlay.vue';
import DialogContent from './dialog-content.vue';
import DialogHeader from './dialog-header.vue';
import DialogFooter from './dialog-footer.vue';
import DialogTitle from './dialog-title.vue';
import DialogDescription from './dialog-description.vue';
import DialogClose from './dialog-close.vue';

export {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose
};

export { provideDialogThemeContext } from './context';

export type {
  DialogRootProps,
  DialogRootEmits,
  DialogTriggerProps,
  DialogOverlayProps,
  DialogContentProps,
  DialogContentEmits,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogCloseProps,
  DialogHeaderProps,
  DialogFooterProps,
  DialogPortalProps,
  DialogSlot
} from './types';
