import type {
  ClassValue,
  HoverCardArrowProps,
  HoverCardContentProps,
  HoverCardPortalProps,
  HoverCardRootEmits,
  HoverCardRootProps
} from '@soybean-ui/primitives';
import type { HoverCardSlots } from '@soybean-ui/variants';

export type HoverCardUi = Partial<Record<HoverCardSlots, ClassValue>>;

export type HoverCardProps = HoverCardRootProps &
  Pick<HoverCardPortalProps, 'to' | 'defer'> &
  Omit<HoverCardContentProps, 'forceMount' | 'class'> & {
    ui?: HoverCardUi;
    disabledPortal?: boolean;
    forceMountPortal?: boolean;
    showArrow?: boolean;
    forceMountContent?: boolean;
    arrowWidth?: number;
    arrowHeight?: number;
  };

export type HoverCardEmits = HoverCardRootEmits;

export type { HoverCardRootProps, HoverCardContentProps, HoverCardArrowProps };
