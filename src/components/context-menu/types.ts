import type {
  AcceptableBooleanValue,
  ClassValue,
  ContextMenuArrowProps,
  ContextMenuContentEmits,
  ContextMenuContentProps,
  ContextMenuPopupProps,
  ContextMenuPortalProps,
  ContextMenuRootEmits,
  ContextMenuRootProps,
  ContextMenuTriggerProps,
  DefinedValue
} from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';
import type {
  MenuCheckboxOptionData,
  MenuCheckboxOptionsEmits,
  MenuCheckboxOptionsProps,
  MenuExtendedUi,
  MenuOptionData,
  MenuOptionsEmits,
  MenuOptionsProps,
  MenuRadioOptionData,
  MenuRadioOptionsEmits,
  MenuRadioOptionsProps
} from '../menu/types';

// Menu Wrapper
export interface ContextMenuWrapperProps extends ContextMenuRootProps {
  /**
   * class of menu popup
   */
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<MenuExtendedUi>;
  disabled?: boolean;
  indicatorPosition?: 'start' | 'end';
  showArrow?: boolean;
  triggerProps?: ContextMenuTriggerProps;
  portalProps?: ContextMenuPortalProps;
  contentProps?: ContextMenuContentProps;
  popupProps?: ContextMenuPopupProps;
  arrowProps?: ContextMenuArrowProps;
}

export type ContextMenuWrapperEmits = ContextMenuRootEmits & ContextMenuContentEmits;

// Menu
export interface ContextMenuProps<
  T extends DefinedValue = DefinedValue,
  S extends MenuOptionData<T> = MenuOptionData<T>
>
  extends Omit<ContextMenuWrapperProps, 'indicatorPosition'>, MenuOptionsProps<T, S> {
  /**
   * class of menu popup
   */
  class?: ClassValue;
}
export type ContextMenuEmits<T extends MenuOptionData = MenuOptionData> = ContextMenuWrapperEmits & MenuOptionsEmits<T>;

// Menu Checkbox
export interface ContextMenuCheckboxProps<
  T extends DefinedValue = DefinedValue,
  S extends MenuCheckboxOptionData<T> = MenuCheckboxOptionData<T>
>
  extends ContextMenuWrapperProps, MenuCheckboxOptionsProps<T, S> {
  /**
   * class of menu popup
   */
  class?: ClassValue;
}

export type ContextMenuCheckboxEmits<
  T extends DefinedValue = DefinedValue,
  S extends MenuCheckboxOptionData<T> = MenuCheckboxOptionData<T>
> = ContextMenuWrapperEmits & MenuCheckboxOptionsEmits<T, S>;

// Menu Radio
export interface ContextMenuRadioProps<
  T extends AcceptableBooleanValue = AcceptableBooleanValue,
  S extends MenuRadioOptionData<T> = MenuRadioOptionData<T>
>
  extends ContextMenuWrapperProps, MenuRadioOptionsProps<T, S> {
  /**
   * class of menu popup
   */
  class?: ClassValue;
}

export type ContextMenuRadioEmits<
  T extends AcceptableBooleanValue = AcceptableBooleanValue,
  S extends MenuRadioOptionData<T> = MenuRadioOptionData<T>
> = ContextMenuWrapperEmits & MenuRadioOptionsEmits<T, S>;
