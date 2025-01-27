import type {
  ClassValue,
  HoverCardArrowProps,
  HoverCardContentProps,
  HoverCardPortalProps,
  HoverCardRootEmits,
  HoverCardRootProps
} from '@soybean-ui/primitives';

export type HoverCardProps = HoverCardRootProps &
  Pick<HoverCardPortalProps, 'to' | 'defer'> &
  Omit<HoverCardContentProps, 'forceMount' | 'class'> & {
    disabledPortal?: boolean;
    forceMountPortal?: boolean;
    contentClass?: ClassValue;
    forceMountContent?: boolean;
    showArrow?: boolean;
    arrowClass?: ClassValue;
    arrowWidth?: number;
    arrowHeight?: number;
  };

export type HoverCardEmits = HoverCardRootEmits;

export type { HoverCardRootProps, HoverCardContentProps, HoverCardArrowProps };
