import type {
  ClassValue,
  HoverCardContentEmits,
  HoverCardPortalProps,
  HoverCardRootEmits,
  HoverCardRootProps,
  HoverCardArrowProps as _HoverCardArrowProps,
  HoverCardContentProps as _HoverCardContentProps
} from '@soybean-ui/primitives';
import type { PopoverSlots as HoverCardSlots, ThemeSize } from '@soybean-ui/variants';

export type HoverCardUi = Partial<Record<HoverCardSlots, ClassValue>>;

export interface HoverCardContentProps extends _HoverCardContentProps {
  size?: ThemeSize;
}

export interface HoverCardArrowProps extends _HoverCardArrowProps {
  size?: ThemeSize;
}

export type HoverCardProps = HoverCardRootProps &
  Pick<HoverCardPortalProps, 'to' | 'defer'> &
  Omit<HoverCardContentProps, 'forceMount'> & {
    ui?: HoverCardUi;
    disabledPortal?: boolean;
    forceMountPortal?: boolean;
    showArrow?: boolean;
    forceMountContent?: boolean;
    arrowWidth?: number;
    arrowHeight?: number;
    arrowRounded?: boolean;
  };

export type HoverCardEmits = HoverCardRootEmits & HoverCardContentEmits;

export type { HoverCardRootProps, HoverCardContentEmits };
