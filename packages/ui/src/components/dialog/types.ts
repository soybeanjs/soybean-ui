import type {
  DialogContentProps as $DialogContentProps,
  DialogOverlayProps as $DialogOverlayProps,
  DialogPortalProps,
  DialogRootProps
} from 'radix-vue';
import type { ClassValue } from '../../types';
import type { CardProps } from '../card/types';

export type DialogOverlayProps = $DialogOverlayProps & {
  class?: ClassValue;
};

export type DialogContentProps = $DialogContentProps &
  CardProps & {
    showClose?: boolean;
  };

export type DialogProps = DialogRootProps &
  Omit<DialogContentProps, 'as' | 'asChild'> &
  Pick<DialogPortalProps, 'to'> & {
    disabledPortal?: boolean;
    forceMountPortal?: boolean;
    overlayClass?: ClassValue;
    forceMountOverlay?: boolean;
  };

export type { DialogRootProps, DialogPortalProps };
