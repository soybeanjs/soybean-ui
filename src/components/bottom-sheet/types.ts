import type {
  ClassValue,
  DialogPopupEmits,
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

export type BottomSheetExtraUiSlot = 'handle' | 'handleIndicator' | 'main';

export type BottomSheetExtendedUiSlot = DialogUiSlot | BottomSheetExtraUiSlot;

export type BottomSheetExtendedUi = UiClass<BottomSheetExtendedUiSlot>;

export interface BottomSheetProps extends DialogRootProps {
  /**
   * the content class of the bottom sheet
   */
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<BottomSheetExtendedUi>;
  title?: string;
  description?: string;
  showHandle?: boolean;
  handleOnly?: boolean;
  closeThreshold?: number;
  triggerProps?: DialogTriggerProps;
  contentProps?: DialogContentProps;
  headerProps?: DialogHeaderProps;
  footerProps?: DialogFooterProps;
  titleProps?: DialogTitleProps;
  descriptionProps?: DialogDescriptionProps;
  overlayProps?: DialogOverlayProps;
  portalProps?: DialogPortalProps;
}

export type BottomSheetEmits = DialogRootEmits & DialogPopupEmits;
