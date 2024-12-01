import type {
  ClassValue,
  DialogContentProps,
  DialogContentEmits as SheetContentEmits,
  DialogOverlayProps as SheetOverlayProps,
  DialogPortalProps as SheetPortalProps,
  DialogRootEmits as SheetRootEmits,
  DialogRootProps as SheetRootProps
} from '@soybean-ui/primitive';
import type { SheetSide } from '@soybean-ui/variants';
import type { CardProps } from '../card/types';

export interface SheetContentProps extends CardProps, DialogContentProps {
  side?: SheetSide;
  showClose?: boolean;
}

export type SheetProps = SheetRootProps &
  SheetContentProps &
  Pick<SheetPortalProps, 'to'> & {
    disabledPortal?: boolean;
    forceMountPortal?: boolean;
    overlayClass?: ClassValue;
    forceMountOverlay?: boolean;
  };

export type SheetEmits = SheetRootEmits & SheetContentEmits;

export type { SheetRootProps, SheetPortalProps, SheetOverlayProps, SheetContentEmits, SheetSide };
