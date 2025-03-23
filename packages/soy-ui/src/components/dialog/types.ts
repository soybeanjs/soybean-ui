import type {
  ClassValue,
  ClassValueProp,
  DialogCloseProps,
  DialogContentEmits,
  DialogContentProps,
  DialogDescriptionProps,
  DialogOverlayProps,
  DialogPortalProps,
  DialogRootEmits,
  DialogRootProps,
  DialogTitleProps
} from '@soybean-ui/primitives';
import type { DialogSlots } from '@soybean-ui/variants';

export interface DialogHeaderProps extends ClassValueProp {}

export interface DialogFooterProps extends ClassValueProp {}

export type DialogUi = Partial<Record<DialogSlots, ClassValue>>;

export interface DialogProps extends DialogRootProps, DialogContentProps, Pick<DialogPortalProps, 'to' | 'defer'> {
  ui?: DialogUi;
  disabledPortal?: boolean;
  forceMountPortal?: boolean;
  forceMountOverlay?: boolean;
  title?: string;
  description?: string;
  showClose?: boolean;
}

export type DialogEmits = DialogRootEmits & DialogContentEmits;

export type {
  DialogRootProps,
  DialogPortalProps,
  DialogRootEmits,
  DialogContentProps,
  DialogContentEmits,
  DialogOverlayProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogCloseProps
};
