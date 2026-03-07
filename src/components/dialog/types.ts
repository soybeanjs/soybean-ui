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
  DialogUiSlot,
  UiClass
} from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

export type DialogExtraUiSlot = 'closable';

export type DialogExtendedUiSlot = DialogUiSlot | DialogExtraUiSlot;

export type DialogExtendedUi = UiClass<DialogExtendedUiSlot>;

export interface DialogProps extends DialogRootProps {
  /**
   * the content class of the dialog
   */
  class?: ClassValue;
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
  /**
   * the content class of the dialog
   */
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<DialogExtendedUi>;
  closable?: boolean;
  triggerProps?: DialogTriggerProps;
  contentProps?: DialogContentProps;
  overlayProps?: DialogOverlayProps;
  portalProps?: DialogPortalProps;
}

export type DialogPureEmits = DialogEmits;
