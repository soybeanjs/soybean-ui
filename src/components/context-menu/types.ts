import type {
  AcceptableBooleanValue,
  DefinedValue,
  ContextMenuWrapperCompactProps,
  ContextMenuWrapperCompactEmits,
  ContextMenuCompactProps,
  ContextMenuCompactEmits,
  ContextMenuCompactSlots,
  ContextMenuCheckboxCompactProps,
  ContextMenuCheckboxCompactEmits,
  ContextMenuCheckboxCompactSlots,
  ContextMenuRadioCompactProps,
  ContextMenuRadioCompactEmits,
  ContextMenuRadioCompactSlots
} from '@soybeanjs/headless';
import type { MenuUiBaseProps } from '../menu/types';

export interface ContextMenuWrapperProps extends MenuUiBaseProps, ContextMenuWrapperCompactProps {}

export type ContextMenuWrapperEmits = ContextMenuWrapperCompactEmits;

// Menu
export type ContextMenuProps<T extends DefinedValue = DefinedValue> = Omit<MenuUiBaseProps, 'indicatorPosition'> &
  ContextMenuCompactProps<T>;

export type ContextMenuEmits<T extends DefinedValue = DefinedValue> = ContextMenuCompactEmits<T>;

export type ContextMenuSlots<T extends DefinedValue = DefinedValue> = ContextMenuCompactSlots<T>;

// Menu Checkbox
export type ContextMenuCheckboxProps<T extends DefinedValue = DefinedValue> = MenuUiBaseProps &
  ContextMenuCheckboxCompactProps<T>;

export type ContextMenuCheckboxEmits<T extends DefinedValue = DefinedValue> = ContextMenuCheckboxCompactEmits<T>;

export type ContextMenuCheckboxSlots<T extends DefinedValue = DefinedValue> = ContextMenuCheckboxCompactSlots<T>;

// Menu Radio
export type ContextMenuRadioProps<T extends AcceptableBooleanValue = AcceptableBooleanValue> = MenuUiBaseProps &
  ContextMenuRadioCompactProps<T>;

export type ContextMenuRadioEmits<T extends AcceptableBooleanValue = AcceptableBooleanValue> =
  ContextMenuRadioCompactEmits<T>;

export type ContextMenuRadioSlots<T extends AcceptableBooleanValue = AcceptableBooleanValue> =
  ContextMenuRadioCompactSlots<T>;
