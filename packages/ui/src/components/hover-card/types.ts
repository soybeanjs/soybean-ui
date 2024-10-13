import type {
  HoverCardPortalProps,
  HoverCardRootEmits,
  HoverCardRootProps,
  HoverCardArrowProps as _HoverCardArrowProps,
  HoverCardContentProps as _HoverCardContentProps
} from 'radix-vue';
import type { ClassValue, ClassValueProp } from '../../types';

export type HoverCardContentProps = ClassValueProp & Omit<_HoverCardContentProps, 'as' | 'asChild'>;

export type HoverCardArrowProps = ClassValueProp & Pick<_HoverCardArrowProps, 'width' | 'height'>;

export type HoverCardProps = HoverCardRootProps &
  Pick<HoverCardPortalProps, 'to'> &
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

export type { HoverCardRootProps };
