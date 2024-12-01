import type {
  ClassValue,
  DialogContentEmits,
  DialogOverlayProps,
  DialogPortalProps,
  DialogRootEmits,
  DialogRootProps,
  DialogContentProps as _DialogContentProps
} from '@soybean-ui/primitive';
import type { CardProps } from '../card/types';

export interface DialogContentProps extends CardProps, _DialogContentProps {
  showClose?: boolean;
}

export interface DialogProps extends DialogRootProps, DialogContentProps, Pick<DialogPortalProps, 'to'> {
  disabledPortal?: boolean;
  forceMountPortal?: boolean;
  overlayClass?: ClassValue;
  forceMountOverlay?: boolean;
}

export interface DialogEmits extends DialogRootEmits, DialogContentEmits {}

export type { DialogRootProps, DialogPortalProps, DialogRootEmits, DialogContentEmits, DialogOverlayProps };
