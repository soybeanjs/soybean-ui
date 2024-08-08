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
  closeProps?: PopoverCloseProps;
};

export type { PopoverAnchorProps, PopoverCloseProps, PopoverPortalProps, PopoverRootProps, PopoverTriggerProps };
