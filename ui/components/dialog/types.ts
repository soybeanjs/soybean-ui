import type { ComputedRef } from 'vue';
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
  DialogThemeSlot,
  DialogTitleProps,
  DialogTriggerProps
} from '@headless';
import type { ThemeSize } from '@theme';

export type DialogUi = Partial<Record<DialogThemeSlot | 'closeIcon', ClassValue>>;

export interface DialogProps extends DialogRootProps {
  size?: ThemeSize;
  ui?: DialogUi;
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
  ui?: DialogUi;
  closable?: boolean;
  triggerProps?: DialogTriggerProps;
  contentProps?: DialogContentProps;
  overlayProps?: DialogOverlayProps;
  portalProps?: DialogPortalProps;
}

export type DialogPureEmits = DialogEmits;

export type DialogSizeContextParams = {
  size: ComputedRef<ThemeSize>;
};
