import type {
  TooltipArrowProps as $TooltipArrowProps,
  TooltipContentProps as $TooltipContentProps,
  TooltipPortalProps,
  TooltipRootProps
} from 'radix-vue';
import type { ClassValue } from '../../types';

export type TooltipArrowProps = $TooltipArrowProps & {
  class?: ClassValue;
};

export type TooltipContentProps = $TooltipContentProps & {
  class?: ClassValue;
};

export type TooltipProps = TooltipRootProps &
  Pick<TooltipPortalProps, 'to'> &
  Omit<TooltipContentProps, 'as' | 'asChild' | 'forceMount' | 'class'> & {
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

export { TooltipPortalProps };
