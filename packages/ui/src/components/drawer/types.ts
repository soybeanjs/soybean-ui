import type { DrawerPortalProps, DrawerRootEmits, DrawerRootProps } from 'vaul-vue';
import type { ClassValue } from '../../types';
import type { CardProps } from '../card/types';

export type DrawerOverlayProps = {
  class?: ClassValue;
};

export type DrawerContentProps = CardProps & {
  class?: ClassValue;
  cardClass?: ClassValue;
  showClose?: boolean;
  closeClass?: ClassValue;
};
export type DrawerTitleProps = {
  class?: ClassValue;
};
export type DrawerDescriptionProps = {
  class?: ClassValue;
};

export type DrawerKnobProps = {
  class?: ClassValue;
};

export type DrawerProps = DrawerRootProps &
  DrawerContentProps &
  Pick<DrawerPortalProps, 'to'> & {
    disabledPortal?: boolean;
    forceMountPortal?: boolean;
    overlayClass?: ClassValue;
  };

export type DrawerEmits = DrawerRootEmits;

export type { DrawerRootProps, DrawerPortalProps, DrawerRootEmits };
