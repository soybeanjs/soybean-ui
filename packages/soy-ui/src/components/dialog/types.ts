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

export interface DialogHeaderProps extends ClassValueProp {}

export interface DialogFooterProps extends ClassValueProp {}

export interface DialogProps extends DialogRootProps, DialogContentProps, Pick<DialogPortalProps, 'to' | 'defer'> {
  disabledPortal?: boolean;
  forceMountPortal?: boolean;
  overlayClass?: ClassValue;
  forceMountOverlay?: boolean;
  headerClass?: ClassValue;
  title?: string;
  titleClass?: ClassValue;
  description?: string;
  descriptionClass?: ClassValue;
  showClose?: boolean;
  closeClass?: ClassValue;
  footerClass?: ClassValue;
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
