import type {
  ClassValue,
  ClassValueProp,
  DialogPortalProps as DrawerPortalProps,
  DrawerRootEmits,
  DrawerRootProps
} from '@soybean-ui/primitive';
import type { CardProps } from '../card/types';

export interface DrawerOverlayProps extends ClassValueProp {}

export interface DrawerContentProps extends CardProps {
  cardClass?: ClassValue;
  showClose?: boolean;
  closeClass?: ClassValue;
}

export interface DrawerTitleProps extends ClassValueProp {}

export interface DrawerDescriptionProps extends ClassValueProp {}

export interface DrawerKnobProps extends ClassValueProp {}

export type DrawerProps = DrawerRootProps &
  DrawerContentProps &
  Pick<DrawerPortalProps, 'to'> & {
    disabledPortal?: boolean;
    forceMountPortal?: boolean;
    overlayClass?: ClassValue;
  };

export type DrawerEmits = DrawerRootEmits;

export type { DrawerRootProps, DrawerPortalProps, DrawerRootEmits };
