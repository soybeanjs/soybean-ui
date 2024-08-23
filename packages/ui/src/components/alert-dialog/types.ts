import type {
  AlertDialogContentProps as $AlertDialogContentProps,
  AlertDialogOverlayProps as $AlertDialogOverlayProps,
  AlertDialogPortalProps,
  AlertDialogProps as AlertDialogRootProps
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

export type AlertDialogProps = AlertDialogRootProps &
  Omit<AlertDialogContentProps, 'as' | 'asChild'> &
  Pick<AlertDialogPortalProps, 'to'> & {
    disabledPortal?: boolean;
    forceMountPortal?: boolean;
    overlayClass?: ClassValue;
    forceMountOverlay?: boolean;
  };

export type { AlertDialogRootProps, AlertDialogPortalProps };
