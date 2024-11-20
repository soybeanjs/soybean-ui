import type {
  DialogContentEmits,
  DialogContentProps,
  DialogOverlayProps,
  DialogPortalProps,
  DialogRootEmits,
  DialogRootProps
} from '@soybean-ui/primitive';
import type { SheetSide } from '@soybean-ui/variants';
import type { ClassValue, ClassValueProp } from '../../types';
import type { CardProps } from '../card/types';

export type SheetRootProps = DialogRootProps;

export type SheetPortalProps = DialogPortalProps;

export type SheetOverlayProps = ClassValueProp & Pick<DialogOverlayProps, 'forceMount'>;

export type SheetContentProps = CardProps &
  Pick<DialogContentProps, 'forceMount' | 'trapFocus' | 'disableOutsidePointerEvents'> & {
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
