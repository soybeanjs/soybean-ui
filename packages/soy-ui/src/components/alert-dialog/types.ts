import type {
  AlertDialogContentEmits,
  AlertDialogContentProps,
  AlertDialogDescriptionProps,
  AlertDialogOverlayProps,
  AlertDialogPortalProps,
  AlertDialogRootEmits,
  AlertDialogRootProps,
  AlertDialogTitleProps,
  ClassValue,
  ClassValueProp
} from '@soybean-ui/primitives';
import type { AlertDialogSlots, ThemeColor } from '@soybean-ui/variants';

export type AlertType = Extract<ThemeColor, 'destructive' | 'success' | 'warning' | 'info'>;

export interface AlertDialogHeaderProps extends ClassValueProp {}

export interface AlertDialogFooterProps extends ClassValueProp {}

export type AlertDialogUi = Partial<Record<AlertDialogSlots, ClassValue>>;

export type AlertDialogProps = AlertDialogRootProps &
  AlertDialogContentProps &
  Pick<AlertDialogPortalProps, 'to' | 'defer'> & {
    ui?: AlertDialogUi;
    type?: AlertType;
    disabledPortal?: boolean;
    forceMountPortal?: boolean;
    forceMountOverlay?: boolean;
    title?: string;
    description?: string;
  };

export type AlertDialogEmits = AlertDialogRootEmits & AlertDialogContentEmits;

export type {
  AlertDialogRootProps,
  AlertDialogRootEmits,
  AlertDialogPortalProps,
  AlertDialogContentProps,
  AlertDialogContentEmits,
  AlertDialogOverlayProps,
  AlertDialogTitleProps,
  AlertDialogDescriptionProps
};
