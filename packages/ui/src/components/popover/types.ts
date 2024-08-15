import type {
  PopoverContentProps as $PopoverContentProps,
  PopoverAnchorProps,
  PopoverPortalProps,
  PopoverRootProps
} from 'radix-vue';
import type { ClassValue } from '@soybean-unify/ui-variants';

export type PopoverContentProps = $PopoverContentProps & {
  class?: ClassValue;
};

export type PopoverArrowProps = {
  class?: ClassValue;
};

export type PopoverProps = PopoverRootProps & {
  portalProps?: PopoverPortalProps;
  contentProps?: PopoverContentProps;
  showArrow?: boolean;
  arrowProps?: PopoverArrowProps;
};

export type PopoverSide = NonNullable<PopoverContentProps['side']>;

export type PopoverAlign = NonNullable<PopoverContentProps['align']>;

export type { PopoverAnchorProps, PopoverPortalProps, PopoverRootProps };
