import type {
  Align,
  ClassValue,
  PopoverAnchorProps,
  PopoverArrowProps,
  PopoverContentEmits,
  PopoverContentProps,
  PopoverPortalProps,
  PopoverRootEmits,
  PopoverRootProps,
  Side
} from '@soybean-ui/primitives';

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

export type PopoverSide = Side;

export type PopoverAlign = Align;

export type {
  PopoverAnchorProps,
  PopoverPortalProps,
  PopoverRootProps,
  PopoverRootEmits,
  PopoverContentEmits,
  PopoverArrowProps,
  PopoverContentProps
};
