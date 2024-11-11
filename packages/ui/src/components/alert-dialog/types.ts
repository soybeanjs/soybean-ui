import type {
  AlertDialogContentEmits,
  AlertDialogPortalProps,
  AlertDialogContentProps as _AlertDialogContentProps,
  AlertDialogEmits as _AlertDialogEmits,
  AlertDialogOverlayProps as _AlertDialogOverlayProps,
  AlertDialogProps as _AlertDialogProps
} from 'reka-ui';
import type { ThemeColor } from '@soybean-ui/variants';
import type { ClassValue, ClassValueProp } from '../../types';
import type { CardProps } from '../card/types';

export type AlertDialogOverlayProps = ClassValueProp & Pick<_AlertDialogOverlayProps, 'forceMount'>;

export type AlertType = Extract<ThemeColor, 'destructive' | 'success' | 'warning' | 'info'>;

export type AlertDialogContentProps = CardProps &
  Pick<_AlertDialogContentProps, 'forceMount' | 'trapFocus' | 'disableOutsidePointerEvents'> & {
    type?: AlertType;
  };

export type AlertDialogRootProps = Pick<_AlertDialogProps, 'open' | 'defaultOpen'>;

export type AlertDialogProps = AlertDialogRootProps &
  AlertDialogContentProps &
  Pick<AlertDialogPortalProps, 'to'> & {
    disabledPortal?: boolean;
    forceMountPortal?: boolean;
    overlayClass?: ClassValue;
    forceMountOverlay?: boolean;
  };

export type AlertDialogRootEmits = _AlertDialogEmits;

export type AlertDialogEmits = AlertDialogRootEmits & AlertDialogContentEmits;

export type { AlertDialogPortalProps, AlertDialogContentEmits };
