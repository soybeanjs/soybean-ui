import type {
  DialogContentEmits,
  DialogContentProps,
  DialogOverlayProps,
  DialogPortalProps,
  DialogRootEmits,
  DialogRootProps
} from 'radix-vue';
import type { SheetSide } from '@soybean-ui/variants';
import type { ClassValue } from '../../types';
import type { CardProps } from '../card/types';

export type SheetRootProps = DialogRootProps;

export type SheetPortalProps = DialogPortalProps;

export type SheetOverlayProps = Pick<DialogOverlayProps, 'forceMount'> & {
  class?: ClassValue;
};

export type SheetContentProps = Pick<DialogContentProps, 'forceMount' | 'trapFocus' | 'disableOutsidePointerEvents'> &
  CardProps & {
    side?: SheetSide;
    showClose?: boolean;
  };

export type SheetProps = SheetRootProps &
  SheetContentProps &
  Pick<SheetPortalProps, 'to'> & {
    disabledPortal?: boolean;
    forceMountPortal?: boolean;
    overlayClass?: ClassValue;
    forceMountOverlay?: boolean;
  };

export type SheetRootEmits = DialogRootEmits;

export type SheetContentEmits = DialogContentEmits;

export type SheetEmits = SheetRootEmits & SheetContentEmits;

export type { SheetSide };
