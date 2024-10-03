import type {
  PopoverAnchorProps,
  PopoverContentEmits,
  PopoverPortalProps,
  PopoverRootEmits,
  PopoverRootProps,
  PopoverArrowProps as _PopoverArrowProps,
  PopoverContentProps as _PopoverContentProps
} from 'radix-vue';
import type { ClassValue, ClassValueProp } from '../../types';

export type PopoverContentProps = ClassValueProp & Omit<_PopoverContentProps, 'as' | 'asChild'>;

export type PopoverArrowProps = ClassValueProp & Pick<_PopoverArrowProps, 'width' | 'height'>;

export type PopoverProps = PopoverRootProps &
  Pick<PopoverPortalProps, 'to'> &
  Omit<PopoverContentProps, 'forceMount' | 'class'> & {
    disabledPortal?: boolean;
    forceMountPortal?: boolean;
    contentClass?: ClassValue;
    forceMountContent?: boolean;
    showArrow?: boolean;
    arrowClass?: ClassValue;
    arrowWidth?: number;
    arrowHeight?: number;
  };

export type PopoverEmits = PopoverRootEmits & PopoverContentEmits;

export type PopoverSide = NonNullable<PopoverContentProps['side']>;

export type PopoverAlign = NonNullable<PopoverContentProps['align']>;

export type { PopoverAnchorProps, PopoverPortalProps, PopoverRootProps, PopoverRootEmits, PopoverContentEmits };
