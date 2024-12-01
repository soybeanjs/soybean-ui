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
} from '@soybean-ui/primitive';

export type TooltipProps = TooltipRootProps &
  Pick<TooltipPortalProps, 'to'> &
  Omit<TooltipContentProps, 'class' | 'forceMount'> & {
    disabledPortal?: boolean;
    forceMountPortal?: boolean;
    contentClass?: ClassValue;
    forceMountContent?: boolean;
    showArrow?: boolean;
    arrowClass?: ClassValue;
    arrowWidth?: number;
    arrowHeight?: number;
  };

export type TooltipSide = Side;

export type TooltipAlign = Align;

export type TooltipEmits = TooltipRootEmits & TooltipContentEmits;

export type { TooltipPortalProps, TooltipRootEmits, TooltipContentProps, TooltipContentEmits, TooltipArrowProps };
