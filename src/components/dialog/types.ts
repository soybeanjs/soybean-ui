import type {
  ClassValue,
  DialogContentEmits,
  DialogContentProps,
  DialogDescriptionProps,
  DialogFooterProps,
  DialogHeaderProps,
  DialogOverlayProps,
  DialogPortalProps,
  DialogRootEmits,
  DialogRootProps,
  DialogTitleProps,
  DialogTriggerProps,
  DialogUi
} from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

export type DialogExtraThemeSlot = 'closable';

export type DialogExtendedUi = DialogUi & Record<DialogExtraThemeSlot, ClassValue>;

export interface DialogProps extends DialogRootProps {
  size?: ThemeSize;
  ui?: Partial<DialogExtendedUi>;
  title?: string;
  description?: string;
  closable?: boolean;
  triggerProps?: DialogTriggerProps;
  contentProps?: DialogContentProps;
  headerProps?: DialogHeaderProps;
  footerProps?: DialogFooterProps;
  titleProps?: DialogTitleProps;
  descriptionProps?: DialogDescriptionProps;
  overlayProps?: DialogOverlayProps;
  portalProps?: DialogPortalProps;
}

export type DialogEmits = DialogRootEmits & DialogContentEmits;

export interface DialogPureProps extends DialogRootProps {
  size?: ThemeSize;
  ui?: Partial<DialogExtendedUi>;
  closable?: boolean;
  triggerProps?: DialogTriggerProps;
  contentProps?: DialogContentProps;
  overlayProps?: DialogOverlayProps;
  portalProps?: DialogPortalProps;
}

export type DialogPureEmits = DialogEmits;
