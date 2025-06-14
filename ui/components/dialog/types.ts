import type { ComputedRef } from 'vue';
import type {
  ClassValue,
  DialogCloseProps,
  DialogContentEmits,
  DialogContentProps,
  DialogDescriptionProps,
  DialogFooterProps,
  DialogHeaderProps,
  DialogOverlayProps,
  DialogPortalProps,
  DialogRootEmits,
  DialogRootProps,
  DialogSlot,
  DialogTitleProps,
  DialogTriggerProps
} from '@headless';
import type { ThemeSize } from '@theme';

export type DialogUi = Partial<Record<DialogSlot | 'closeIcon', ClassValue>>;

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

export type DialogSizeContextParams = {
  size: ComputedRef<ThemeSize>;
};

export type {
  DialogRootProps,
  DialogRootEmits,
  DialogTriggerProps,
  DialogPortalProps,
  DialogContentProps,
  DialogContentEmits,
  DialogOverlayProps,
  DialogHeaderProps,
  DialogFooterProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogCloseProps,
  DialogSlot
};
