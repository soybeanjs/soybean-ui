import type { DrawerPortalProps, DrawerRootProps } from 'vaul-vue';
import type { ClassValue } from '../../types';

export type DrawerOverlayProps = {
  class?: ClassValue;
};

export type DrawerContentProps = {
  class?: ClassValue;
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
  Pick<DrawerPortalProps, 'to'> & {
    disabledPortal?: boolean;
    forceMountPortal?: boolean;
    overlayClass?: ClassValue;
    contentClass?: ClassValue;
  };

export type { DrawerRootProps, DrawerPortalProps };
