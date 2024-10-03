import type {
  DialogContentEmits,
  DialogPortalProps,
  DialogRootEmits,
  DialogRootProps,
  DialogContentProps as _DialogContentProps,
  DialogOverlayProps as _DialogOverlayProps
} from 'radix-vue';
import type { ClassValue, ClassValueProp } from '../../types';
import type { CardProps } from '../card/types';

export type DialogOverlayProps = ClassValueProp & Pick<_DialogOverlayProps, 'forceMount'>;

export type DialogContentProps = CardProps &
  Pick<_DialogContentProps, 'forceMount' | 'trapFocus' | 'disableOutsidePointerEvents'> & {
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
