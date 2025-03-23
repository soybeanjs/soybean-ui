import type {
  AlertDialogContentEmits,
  AlertDialogOverlayProps,
  AlertDialogPortalProps,
  AlertDialogRootEmits,
  AlertDialogRootProps,
  ClassValue,
  ClassValueProp,
  AlertDialogContentProps as _AlertDialogContentProps,
  AlertDialogDescriptionProps as _AlertDialogDescriptionProps,
  AlertDialogTitleProps as _AlertDialogTitleProps
} from '@soybean-ui/primitives';
import type { DialogSlots, ThemeColor, ThemeSize } from '@soybean-ui/variants';

export type AlertType = Extract<ThemeColor, 'destructive' | 'success' | 'warning' | 'info'>;

export interface AlertDialogHeaderProps extends ClassValueProp {
  size?: ThemeSize;
}

export type AlertDialogContentProps = _AlertDialogContentProps & {
  size?: ThemeSize;
};

export type AlertDialogTitleProps = _AlertDialogTitleProps & {
  size?: ThemeSize;
};

export type AlertDialogDescriptionProps = _AlertDialogDescriptionProps & {
  size?: ThemeSize;
};

export interface AlertDialogFooterProps extends ClassValueProp {
  size?: ThemeSize;
}

export type AlertDialogUi = Partial<Record<DialogSlots, ClassValue>>;

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
  AlertDialogContentEmits,
  AlertDialogOverlayProps
};
