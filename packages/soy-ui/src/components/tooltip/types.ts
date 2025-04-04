import type {
  Align,
  ClassValue,
  Side,
  TooltipContentEmits,
  TooltipPortalProps,
  TooltipRootEmits,
  TooltipRootProps,
  TooltipArrowProps as _TooltipArrowProps,
  TooltipContentProps as _TooltipContentProps
} from '@soybean-ui/primitives';
import type { ThemeSize, TooltipSlots } from '@soybean-ui/variants';

export type TooltipUi = Partial<Record<TooltipSlots, ClassValue>>;

export interface TooltipContentProps extends _TooltipContentProps {
  size?: ThemeSize;
}

export interface TooltipArrowProps extends _TooltipArrowProps {
  size?: ThemeSize;
}

export type TooltipProps = TooltipRootProps &
  Pick<TooltipPortalProps, 'to' | 'defer'> &
  Omit<TooltipContentProps, 'forceMount'> & {
    ui?: TooltipUi;
    disabledPortal?: boolean;
    forceMountPortal?: boolean;
    forceMountContent?: boolean;
    showArrow?: boolean;
    arrowWidth?: number;
    arrowHeight?: number;
    arrowRounded?: boolean;
  };

export type TooltipSide = Side;

export type TooltipAlign = Align;

export type TooltipEmits = TooltipRootEmits & TooltipContentEmits;

export type { TooltipPortalProps, TooltipRootEmits, TooltipContentEmits };
