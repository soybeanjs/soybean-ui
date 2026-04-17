import type {
  AcceptableBooleanValue,
  DefinedValue,
  DropdownMenuWrapperCompactProps,
  DropdownMenuWrapperCompactEmits,
  DropdownMenuCompactProps,
  DropdownMenuCompactEmits,
  DropdownMenuCompactSlots,
  DropdownMenuCheckboxCompactProps,
  DropdownMenuCheckboxCompactEmits,
  DropdownMenuCheckboxCompactSlots,
  DropdownMenuRadioCompactProps,
  DropdownMenuRadioCompactEmits,
  DropdownMenuRadioCompactSlots
} from '@soybeanjs/headless';
import type { MenuUiBaseProps } from '../menu/types';

export interface DropdownMenuWrapperProps extends MenuUiBaseProps, DropdownMenuWrapperCompactProps {}

export type DropdownMenuWrapperEmits = DropdownMenuWrapperCompactEmits;

// Menu
export type DropdownMenuProps<T extends DefinedValue = DefinedValue> = Omit<MenuUiBaseProps, 'indicatorPosition'> &
  DropdownMenuCompactProps<T>;

export type DropdownMenuEmits<T extends DefinedValue = DefinedValue> = DropdownMenuCompactEmits<T>;

export type DropdownMenuSlots<T extends DefinedValue = DefinedValue> = DropdownMenuCompactSlots<T>;

// Menu Checkbox
export type DropdownMenuCheckboxProps<T extends DefinedValue = DefinedValue> = MenuUiBaseProps &
  DropdownMenuCheckboxCompactProps<T>;

export type DropdownMenuCheckboxEmits<T extends DefinedValue = DefinedValue> = DropdownMenuCheckboxCompactEmits<T>;

export type DropdownMenuCheckboxSlots<T extends DefinedValue = DefinedValue> = DropdownMenuCheckboxCompactSlots<T>;

// Menu Radio
export type DropdownMenuRadioProps<T extends AcceptableBooleanValue = AcceptableBooleanValue> = MenuUiBaseProps &
  DropdownMenuRadioCompactProps<T>;

export type DropdownMenuRadioEmits<T extends AcceptableBooleanValue = AcceptableBooleanValue> =
  DropdownMenuRadioCompactEmits<T>;

export type DropdownMenuRadioSlots<T extends AcceptableBooleanValue = AcceptableBooleanValue> =
  DropdownMenuRadioCompactSlots<T>;
