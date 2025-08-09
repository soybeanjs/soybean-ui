import type {
  AcceptableBooleanValue,
  ContextMenuArrowProps,
  ContextMenuContentEmits,
  ContextMenuContentProps,
  ContextMenuPortalProps,
  ContextMenuRootEmits,
  ContextMenuRootProps,
  ContextMenuTriggerProps,
  DefinedValue
} from '@headless';
import type { ThemeSize } from '@theme';
import type {
  MenuCheckboxOptionData,
  MenuCheckboxOptionsEmits,
  MenuCheckboxOptionsProps,
  MenuOptionData,
  MenuOptionsEmits,
  MenuOptionsProps,
  MenuRadioOptionData,
  MenuRadioOptionsEmits,
  MenuRadioOptionsProps,
  MenuUi
} from '../menu/types';

// Menu Wrapper
export interface ContextMenuWrapperProps extends ContextMenuRootProps {
  size?: ThemeSize;
  ui?: MenuUi;
  disabled?: boolean;
  showArrow?: boolean;
  triggerProps?: ContextMenuTriggerProps;
  portalProps?: ContextMenuPortalProps;
  contentProps?: ContextMenuContentProps;
  arrowProps?: ContextMenuArrowProps;
}

export type ContextMenuWrapperEmits = ContextMenuRootEmits & ContextMenuContentEmits;

// Menu
export interface ContextMenuProps<
  T extends DefinedValue = DefinedValue,
  S extends MenuOptionData<T> = MenuOptionData<T>
> extends ContextMenuWrapperProps,
    MenuOptionsProps<T, S> {}
export type ContextMenuEmits<T extends MenuOptionData = MenuOptionData> = ContextMenuWrapperEmits & MenuOptionsEmits<T>;

// Menu Checkbox
export interface ContextMenuCheckboxProps<
  T extends DefinedValue = DefinedValue,
  S extends MenuCheckboxOptionData<T> = MenuCheckboxOptionData<T>
> extends ContextMenuWrapperProps,
    MenuCheckboxOptionsProps<T, S> {}

export type ContextMenuCheckboxEmits<
  T extends DefinedValue = DefinedValue,
  S extends MenuCheckboxOptionData<T> = MenuCheckboxOptionData<T>
> = ContextMenuWrapperEmits & MenuCheckboxOptionsEmits<T, S>;

// Menu Radio
export interface ContextMenuRadioProps<
  T extends AcceptableBooleanValue = AcceptableBooleanValue,
  S extends MenuRadioOptionData<T> = MenuRadioOptionData<T>
> extends ContextMenuWrapperProps,
    MenuRadioOptionsProps<T, S> {}

export type ContextMenuRadioEmits<
  T extends AcceptableBooleanValue = AcceptableBooleanValue,
  S extends MenuRadioOptionData<T> = MenuRadioOptionData<T>
> = ContextMenuWrapperEmits & MenuRadioOptionsEmits<T, S>;
