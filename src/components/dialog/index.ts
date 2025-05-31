import DialogPortal from '../portal/portal.vue';
import DialogRoot from './dialog-root.vue';
import DialogTrigger from './dialog-trigger.vue';
import DialogOverlay from './dialog-overlay.vue';
import DialogContent from './dialog-content.vue';
import DialogTitle from './dialog-title.vue';
import DialogDescription from './dialog-description.vue';
import DialogClose from './dialog-close.vue';

export {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose
};

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
  DialogPortalProps
} from './types';
