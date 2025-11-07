import type {
  AcceptableBooleanValue,
  DefinedValue,
  DropdownMenuArrowProps,
  DropdownMenuContentEmits,
  DropdownMenuContentProps,
  DropdownMenuPortalProps,
  DropdownMenuRootEmits,
  DropdownMenuRootProps,
  DropdownMenuTriggerProps
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
export interface DropdownMenuWrapperProps extends DropdownMenuRootProps {
  size?: ThemeSize;
  ui?: Partial<MenuExtendedUi>;
  disabled?: boolean;
  showArrow?: boolean;
  triggerProps?: DropdownMenuTriggerProps;
  portalProps?: DropdownMenuPortalProps;
  contentProps?: DropdownMenuContentProps;
  arrowProps?: DropdownMenuArrowProps;
}

export type DropdownMenuWrapperEmits = DropdownMenuRootEmits & DropdownMenuContentEmits;

// Menu
export interface DropdownMenuProps<
  T extends DefinedValue = DefinedValue,
  S extends MenuOptionData<T> = MenuOptionData<T>
> extends DropdownMenuWrapperProps,
    MenuOptionsProps<T, S> {}
export type DropdownMenuEmits<T extends MenuOptionData = MenuOptionData> = DropdownMenuWrapperEmits &
  MenuOptionsEmits<T>;

// Menu Checkbox
export interface DropdownMenuCheckboxProps<
  T extends DefinedValue = DefinedValue,
  S extends MenuCheckboxOptionData<T> = MenuCheckboxOptionData<T>
> extends DropdownMenuWrapperProps,
    MenuCheckboxOptionsProps<T, S> {}

export type DropdownMenuCheckboxEmits<
  T extends DefinedValue = DefinedValue,
  S extends MenuCheckboxOptionData<T> = MenuCheckboxOptionData<T>
> = DropdownMenuWrapperEmits & MenuCheckboxOptionsEmits<T, S>;

// Menu Radio
export interface DropdownMenuRadioProps<
  T extends AcceptableBooleanValue = AcceptableBooleanValue,
  S extends MenuRadioOptionData<T> = MenuRadioOptionData<T>
> extends DropdownMenuWrapperProps,
    MenuRadioOptionsProps<T, S> {}

export type DropdownMenuRadioEmits<
  T extends AcceptableBooleanValue = AcceptableBooleanValue,
  S extends MenuRadioOptionData<T> = MenuRadioOptionData<T>
> = DropdownMenuWrapperEmits & MenuRadioOptionsEmits<T, S>;
