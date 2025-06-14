import type { Side } from '@headless';
import type {
  DialogProps,
  DialogCloseProps as DrawerCloseProps,
  DialogContentEmits as DrawerContentEmits,
  DialogContentProps as DrawerContentProps,
  DialogDescriptionProps as DrawerDescriptionProps,
  DialogEmits as DrawerEmits,
  DialogFooterProps as DrawerFooterProps,
  DialogHeaderProps as DrawerHeaderProps,
  DialogOverlayProps as DrawerOverlayProps,
  DialogPortalProps as DrawerPortalProps,
  DialogRootEmits as DrawerRootEmits,
  DialogRootProps as DrawerRootProps,
  DialogSizeContextParams as DrawerSizeContextParams,
  DialogSlot as DrawerSlot,
  DialogTitleProps as DrawerTitleProps,
  DialogTriggerProps as DrawerTriggerProps,
  DialogUi as DrawerUi
} from '../dialog/types';

export interface DrawerProps extends DialogProps {
  side?: Side;
}

export type {
  DrawerEmits,
  DrawerRootProps,
  DrawerRootEmits,
  DrawerTriggerProps,
  DrawerPortalProps,
  DrawerContentProps,
  DrawerContentEmits,
  DrawerOverlayProps,
  DrawerHeaderProps,
  DrawerFooterProps,
  DrawerTitleProps,
  DrawerDescriptionProps,
  DrawerCloseProps,
  DrawerSlot,
  DrawerUi,
  DrawerSizeContextParams
};
