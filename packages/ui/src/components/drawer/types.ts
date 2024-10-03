import type { DrawerPortalProps, DrawerRootEmits, DrawerRootProps } from 'vaul-vue';
import type { ClassValue, ClassValueProp } from '../../types';
import type { CardProps } from '../card/types';

export type DrawerOverlayProps = ClassValueProp;

export type DrawerContentProps = ClassValueProp &
  CardProps & {
    cardClass?: ClassValue;
    showClose?: boolean;
    closeClass?: ClassValue;
  };

export type DrawerTitleProps = ClassValueProp;

export type DrawerDescriptionProps = ClassValueProp;

export type DrawerKnobProps = ClassValueProp;

export type DrawerProps = DrawerRootProps &
  DrawerContentProps &
  Pick<DrawerPortalProps, 'to'> & {
    disabledPortal?: boolean;
    forceMountPortal?: boolean;
    overlayClass?: ClassValue;
  };

export type DrawerEmits = DrawerRootEmits;

export type { DrawerRootProps, DrawerPortalProps, DrawerRootEmits };
