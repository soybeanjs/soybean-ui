import type {
  Align,
  ClassValue,
  Side,
  TooltipArrowProps,
  TooltipContentEmits,
  TooltipContentProps,
  TooltipPortalProps,
  TooltipRootEmits,
  TooltipRootProps
} from '@soybean-ui/primitives';
import type { TooltipSlots } from '@soybean-ui/variants';

export type TooltipUi = Partial<Record<TooltipSlots, ClassValue>>;

export type TooltipProps = TooltipRootProps &
  Pick<TooltipPortalProps, 'to' | 'defer'> &
  Omit<TooltipContentProps, 'class' | 'forceMount'> & {
    ui?: TooltipUi;
    disabledPortal?: boolean;
    forceMountPortal?: boolean;
    forceMountContent?: boolean;
    showArrow?: boolean;
    arrowWidth?: number;
    arrowHeight?: number;
  };

export type TooltipSide = Side;

export type TooltipAlign = Align;

export type TooltipEmits = TooltipRootEmits & TooltipContentEmits;

export type { TooltipPortalProps, TooltipRootEmits, TooltipContentProps, TooltipContentEmits, TooltipArrowProps };
