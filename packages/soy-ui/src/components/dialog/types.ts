import type {
  ClassValue,
  ClassValueProp,
  DialogCloseProps,
  DialogContentEmits,
  DialogOverlayProps,
  DialogPortalProps,
  DialogRootEmits,
  DialogRootProps,
  DialogContentProps as _DialogContentProps,
  DialogDescriptionProps as _DialogDescriptionProps,
  DialogTitleProps as _DialogTitleProps
} from '@soybean-ui/primitives';
import type { DialogSlots, ThemeSize } from '@soybean-ui/variants';

export interface DialogHeaderProps extends ClassValueProp {
  size?: ThemeSize;
}

export type DialogContentProps = _DialogContentProps & {
  size?: ThemeSize;
};

export type DialogTitleProps = _DialogTitleProps & {
  size?: ThemeSize;
};

export type DialogDescriptionProps = _DialogDescriptionProps & {
  size?: ThemeSize;
};

export type DialogCloseIconProps = DialogCloseProps & {
  size?: ThemeSize;
};

export interface DialogFooterProps extends ClassValueProp {
  size?: ThemeSize;
}

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
  DialogContentEmits,
  DialogOverlayProps,
  DialogCloseProps
};
