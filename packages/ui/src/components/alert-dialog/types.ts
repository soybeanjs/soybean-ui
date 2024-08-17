import type {
  AlertDialogContentProps as $AlertDialogContentProps,
  AlertDialogOverlayProps as $AlertDialogOverlayProps,
  AlertDialogProps as $AlertDialogProps,
  AlertDialogPortalProps
} from 'radix-vue';
import type { ClassValue, ThemeColor } from '@soybean-unify/ui-variants';
import type { CardProps } from '../card/types';

export type AlertDialogOverlayProps = $AlertDialogOverlayProps & {
  class?: ClassValue;
};

export type AlertType = Extract<ThemeColor, 'destructive' | 'success' | 'warning' | 'info'>;

export type AlertDialogContentProps = $AlertDialogContentProps &
  CardProps & {
    type?: AlertType;
  };

export type AlertDialogProps = $AlertDialogProps &
  AlertDialogContentProps & {
    portalProps?: AlertDialogPortalProps;
    overlayProps?: AlertDialogOverlayProps;
  };

export type { AlertDialogPortalProps };
