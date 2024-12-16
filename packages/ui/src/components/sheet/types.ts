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

export interface SheetContentProps extends DialogContentProps {
  side?: SheetSide;
}

export type SheetProps = SheetRootProps &
  SheetContentProps &
  Pick<SheetPortalProps, 'to'> & {
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
  };

export type SheetEmits = SheetRootEmits & SheetContentEmits;

export type { SheetRootProps, SheetPortalProps, SheetOverlayProps, SheetContentEmits, SheetSide };
