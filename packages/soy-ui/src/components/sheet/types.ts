import type {
  ClassValue,
  DialogContentProps,
  DialogContentEmits as SheetContentEmits,
  DialogOverlayProps as SheetOverlayProps,
  DialogPortalProps as SheetPortalProps,
  DialogRootEmits as SheetRootEmits,
  DialogRootProps as SheetRootProps
} from '@soybean-ui/primitives';
import type { SheetSide, DialogSlots as SheetSlots } from '@soybean-ui/variants';

export interface SheetContentProps extends DialogContentProps {
  side?: SheetSide;
}

export type SheetUi = Partial<Record<SheetSlots, ClassValue>>;

export type SheetProps = SheetRootProps &
  SheetContentProps &
  Pick<SheetPortalProps, 'to' | 'defer'> & {
    ui?: SheetUi;
    disabledPortal?: boolean;
    forceMountPortal?: boolean;
    forceMountOverlay?: boolean;
    title?: string;
    description?: string;
    showClose?: boolean;
  };

export type SheetEmits = SheetRootEmits & SheetContentEmits;

export type { SheetRootProps, SheetPortalProps, SheetOverlayProps, SheetContentEmits, SheetSide };
