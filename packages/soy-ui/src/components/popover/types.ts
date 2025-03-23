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
import type { PopoverSlots } from '@soybean-ui/variants';

export type PopoverUi = Partial<Record<PopoverSlots, ClassValue>>;

export type PopoverProps = PopoverRootProps &
  Pick<PopoverPortalProps, 'to' | 'defer'> &
  Omit<PopoverContentProps, 'forceMount' | 'class'> & {
    ui?: PopoverUi;
    disabledPortal?: boolean;
    forceMountPortal?: boolean;
    forceMountContent?: boolean;
    showArrow?: boolean;
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
