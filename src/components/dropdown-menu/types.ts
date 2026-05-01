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

/**
 * Props for the dropdown menu wrapper component.
 */
export interface DropdownMenuWrapperProps extends MenuUiBaseProps, DropdownMenuWrapperCompactProps {}

/**
 * Emits for the dropdown menu wrapper component.
 */
export type DropdownMenuWrapperEmits = DropdownMenuWrapperCompactEmits;

// Menu
/**
 * Props for the dropdown menu component.
 */
export type DropdownMenuProps<T extends DefinedValue = DefinedValue> = Omit<MenuUiBaseProps, 'indicatorPosition'> &
  DropdownMenuCompactProps<T>;

/**
 * Emits for the dropdown menu component.
 */
export type DropdownMenuEmits<T extends DefinedValue = DefinedValue> = DropdownMenuCompactEmits<T>;

/**
 * Slots for the dropdown menu component.
 */
export type DropdownMenuSlots<T extends DefinedValue = DefinedValue> = DropdownMenuCompactSlots<T>;

// Menu Checkbox
/**
 * Props for the dropdown menu checkbox component.
 */
export type DropdownMenuCheckboxProps<T extends DefinedValue = DefinedValue> = MenuUiBaseProps &
  DropdownMenuCheckboxCompactProps<T>;

/**
 * Emits for the dropdown menu checkbox component.
 */
export type DropdownMenuCheckboxEmits<T extends DefinedValue = DefinedValue> = DropdownMenuCheckboxCompactEmits<T>;

/**
 * Slots for the dropdown menu checkbox component.
 */
export type DropdownMenuCheckboxSlots<T extends DefinedValue = DefinedValue> = DropdownMenuCheckboxCompactSlots<T>;

// Menu Radio
/**
 * Props for the dropdown menu radio component.
 */
export type DropdownMenuRadioProps<T extends AcceptableBooleanValue = AcceptableBooleanValue> = MenuUiBaseProps &
  DropdownMenuRadioCompactProps<T>;

/**
 * Emits for the dropdown menu radio component.
 */
export type DropdownMenuRadioEmits<T extends AcceptableBooleanValue = AcceptableBooleanValue> =
  DropdownMenuRadioCompactEmits<T>;

/**
 * Slots for the dropdown menu radio component.
 */
export type DropdownMenuRadioSlots<T extends AcceptableBooleanValue = AcceptableBooleanValue> =
  DropdownMenuRadioCompactSlots<T>;
