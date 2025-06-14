import {
  DialogContent as SDrawerContent,
  DialogDescription as SDrawerDescription,
  DialogFooter as SDrawerFooter,
  DialogHeader as SDrawerHeader,
  DialogOverlay as SDrawerOverlay,
  DialogPortal as SDrawerPortal,
  DialogRoot as SDrawerRoot,
  DialogTitle as SDrawerTitle,
  DialogTrigger as SDrawerTrigger
} from '@headless';
import SDrawer from './drawer.vue';
import SDrawerClose from './drawer-close.vue';

export {
  SDrawer,
  SDrawerRoot,
  SDrawerTrigger,
  SDrawerPortal,
  SDrawerOverlay,
  SDrawerContent,
  SDrawerHeader,
  SDrawerFooter,
  SDrawerTitle,
  SDrawerDescription,
  SDrawerClose
};

export type {
  DrawerProps,
  DrawerEmits,
  DrawerContentEmits,
  DrawerContentProps,
  DrawerDescriptionProps,
  DrawerFooterProps,
  DrawerHeaderProps,
  DrawerOverlayProps,
  DrawerPortalProps,
  DrawerRootEmits,
  DrawerRootProps,
  DrawerSlot,
  DrawerTitleProps,
  DrawerTriggerProps,
  DrawerCloseProps
} from './types';
