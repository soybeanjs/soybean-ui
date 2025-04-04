import type {
  Align,
  ClassValue,
  PopoverAnchorProps,
  PopoverContentEmits,
  PopoverPortalProps,
  PopoverRootEmits,
  PopoverRootProps,
  Side,
  PopoverArrowProps as _PopoverArrowProps,
  PopoverContentProps as _PopoverContentProps
} from '@soybean-ui/primitives';
import type { PopoverSlots, ThemeSize } from '@soybean-ui/variants';

export type PopoverUi = Partial<Record<PopoverSlots, ClassValue>>;

export interface PopoverContentProps extends _PopoverContentProps {
  size?: ThemeSize;
}

export interface PopoverArrowProps extends _PopoverArrowProps {
  size?: ThemeSize;
}

export type PopoverProps = PopoverRootProps &
  Pick<PopoverPortalProps, 'to' | 'defer'> &
  Omit<PopoverContentProps, 'forceMount'> & {
    ui?: PopoverUi;
    disabledPortal?: boolean;
    forceMountPortal?: boolean;
    forceMountContent?: boolean;
    showArrow?: boolean;
    arrowWidth?: number;
    arrowHeight?: number;
    arrowRounded?: boolean;
  };

export type PopoverEmits = PopoverRootEmits & PopoverContentEmits;

export type PopoverSide = Side;

export type PopoverAlign = Align;

export type { PopoverAnchorProps, PopoverPortalProps, PopoverRootProps, PopoverRootEmits, PopoverContentEmits };
