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
import type { ThemeColor } from '@soybean-ui/variants';

export type AlertType = Extract<ThemeColor, 'destructive' | 'success' | 'warning' | 'info'>;

export interface AlertDialogHeaderProps extends ClassValueProp {}

export interface AlertDialogFooterProps extends ClassValueProp {}

export type AlertDialogProps = AlertDialogRootProps &
  AlertDialogContentProps &
  Pick<AlertDialogPortalProps, 'to'> & {
    type?: AlertType;
    disabledPortal?: boolean;
    forceMountPortal?: boolean;
    overlayClass?: ClassValue;
    forceMountOverlay?: boolean;
    headerClass?: ClassValue;
    title?: string;
    titleClass?: ClassValue;
    description?: string;
    descriptionClass?: ClassValue;
    footerClass?: ClassValue;
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
