import type {
  PopoverArrowProps as $PopoverArrowProps,
  PopoverContentProps as $PopoverContentProps,
  PopoverAnchorProps,
  PopoverCloseProps,
  PopoverPortalProps,
  PopoverRootProps,
  PopoverTriggerProps
} from 'radix-vue';
import type { ClassValue } from '@soybean-unify/ui-variants';

export type PopoverContentProps = $PopoverContentProps & {
  class?: ClassValue;
};

export type PopoverArrowProps = $PopoverArrowProps & {
  class?: ClassValue;
};

export type PopoverProps = PopoverRootProps & {
  portalProps?: PopoverPortalProps;
  triggerProps?: PopoverTriggerProps;
  contentProps?: PopoverContentProps;
  showArrow?: boolean;
  arrowProps?: PopoverArrowProps;
  closeProps?: PopoverCloseProps;
};

export type { PopoverAnchorProps, PopoverCloseProps, PopoverPortalProps, PopoverRootProps, PopoverTriggerProps };

export type PopoverSide = NonNullable<PopoverContentProps['side']>;

export type PopoverAlign = NonNullable<PopoverContentProps['align']>;
