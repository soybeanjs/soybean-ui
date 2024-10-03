import type {
  TooltipContentEmits,
  TooltipPortalProps,
  TooltipRootEmits,
  TooltipRootProps,
  TooltipArrowProps as _TooltipArrowProps,
  TooltipContentProps as _TooltipContentProps
} from 'radix-vue';
import type { ClassValue, ClassValueProp } from '../../types';

export type TooltipArrowProps = ClassValueProp & Pick<_TooltipArrowProps, 'width' | 'height'>;

export type TooltipContentProps = ClassValueProp & Omit<_TooltipContentProps, 'as' | 'asChild'>;

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

export type TooltipSide = NonNullable<TooltipContentProps['side']>;

export type TooltipAlign = NonNullable<TooltipContentProps['align']>;

export type TooltipEmits = TooltipRootEmits & TooltipContentEmits;

export { TooltipPortalProps, TooltipRootEmits, TooltipContentEmits };
