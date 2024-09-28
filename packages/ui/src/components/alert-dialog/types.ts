import type {
  AlertDialogContentProps as $AlertDialogContentProps,
  AlertDialogEmits as $AlertDialogEmits,
  AlertDialogOverlayProps as $AlertDialogOverlayProps,
  AlertDialogContentEmits,
  AlertDialogPortalProps,
  AlertDialogProps as AlertDialogRootProps
} from 'radix-vue';
import type { ThemeColor } from '@soybean-ui/variants';
import type { ClassValue } from '../../types';
import type { CardProps } from '../card/types';

export type AlertDialogOverlayProps = Pick<$AlertDialogOverlayProps, 'forceMount'> & {
  class?: ClassValue;
};

export type AlertType = Extract<ThemeColor, 'destructive' | 'success' | 'warning' | 'info'>;

export type AlertDialogContentProps = Pick<
  $AlertDialogContentProps,
  'forceMount' | 'trapFocus' | 'disableOutsidePointerEvents'
> &
  CardProps & {
    type?: AlertType;
  };

export type AlertDialogProps = AlertDialogRootProps &
  AlertDialogContentProps &
  Pick<AlertDialogPortalProps, 'to'> & {
    disabledPortal?: boolean;
    forceMountPortal?: boolean;
    overlayClass?: ClassValue;
    forceMountOverlay?: boolean;
  };

export type AlertDialogRootEmits = $AlertDialogEmits;

export type AlertDialogEmits = AlertDialogRootEmits & AlertDialogContentEmits;

export type { AlertDialogRootProps, AlertDialogPortalProps, AlertDialogContentEmits };
