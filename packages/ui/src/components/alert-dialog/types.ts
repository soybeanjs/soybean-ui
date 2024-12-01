import type {
  AlertDialogContentEmits,
  AlertDialogOverlayProps,
  AlertDialogPortalProps,
  AlertDialogRootProps,
  ClassValue,
  AlertDialogContentProps as _AlertDialogContentProps,
  AlertDialogRootEmits as _AlertDialogRootEmits
} from '@soybean-ui/primitive';
import type { ThemeColor } from '@soybean-ui/variants';
import type { CardProps } from '../card/types';

export type AlertType = Extract<ThemeColor, 'destructive' | 'success' | 'warning' | 'info'>;

export type AlertDialogContentProps = CardProps &
  _AlertDialogContentProps & {
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

export type AlertDialogRootEmits = _AlertDialogRootEmits;

export type AlertDialogEmits = AlertDialogRootEmits & AlertDialogContentEmits;

export type { AlertDialogPortalProps, AlertDialogContentEmits, AlertDialogOverlayProps };
