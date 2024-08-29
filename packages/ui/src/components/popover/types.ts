import type {
  PopoverArrowProps as $PopoverArrowProps,
  PopoverContentProps as $PopoverContentProps,
  PopoverAnchorProps,
  PopoverPortalProps,
  PopoverRootProps
} from 'radix-vue';
import type { ClassValue } from '@soybean-ui/variants';

export type PopoverContentProps = $PopoverContentProps & {
  class?: ClassValue;
};

export type PopoverArrowProps = $PopoverArrowProps & {
  class?: ClassValue;
};

export type PopoverProps = PopoverRootProps &
  Pick<PopoverPortalProps, 'to'> &
  Omit<PopoverContentProps, 'as' | 'asChild' | 'forceMount' | 'class'> & {
    disabledPortal?: boolean;
    forceMountPortal?: boolean;
    contentClass?: ClassValue;
    forceMountContent?: boolean;
    showArrow?: boolean;
    arrowClass?: ClassValue;
    arrowWidth?: number;
    arrowHeight?: number;
  };

export type PopoverSide = NonNullable<PopoverContentProps['side']>;

export type PopoverAlign = NonNullable<PopoverContentProps['align']>;

export type { PopoverAnchorProps, PopoverPortalProps, PopoverRootProps };
