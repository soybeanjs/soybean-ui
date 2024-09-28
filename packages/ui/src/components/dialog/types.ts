import type {
  DialogContentProps as $DialogContentProps,
  DialogOverlayProps as $DialogOverlayProps,
  DialogContentEmits,
  DialogPortalProps,
  DialogRootEmits,
  DialogRootProps
} from 'radix-vue';
import type { ClassValue } from '../../types';
import type { CardProps } from '../card/types';

export type DialogOverlayProps = Pick<$DialogOverlayProps, 'forceMount'> & {
  class?: ClassValue;
};

export type DialogContentProps = Pick<$DialogContentProps, 'forceMount' | 'trapFocus' | 'disableOutsidePointerEvents'> &
  CardProps & {
    showClose?: boolean;
  };

export type DialogProps = DialogRootProps &
  DialogContentProps &
  Pick<DialogPortalProps, 'to'> & {
    disabledPortal?: boolean;
    forceMountPortal?: boolean;
    overlayClass?: ClassValue;
    forceMountOverlay?: boolean;
  };

export type DialogEmits = DialogRootEmits & DialogContentEmits;

export type { DialogRootProps, DialogPortalProps, DialogRootEmits, DialogContentEmits };
