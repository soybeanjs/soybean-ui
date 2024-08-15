import type {
  DialogContentProps as $DialogContentProps,
  DialogOverlayProps as $DialogOverlayProps,
  DialogPortalProps,
  DialogRootProps
} from 'radix-vue';
import type { ClassValue } from '@soybean-unify/ui-variants';
import type { CardProps } from '../card/types';

export type DialogOverlayProps = $DialogOverlayProps & {
  class?: ClassValue;
};

export type DialogContentProps = $DialogContentProps & CardProps;

export type DialogProps = DialogRootProps &
  DialogContentProps & {
    portalProps?: DialogPortalProps;
    overlayProps?: DialogOverlayProps;
  };

export type { DialogRootProps, DialogPortalProps };
