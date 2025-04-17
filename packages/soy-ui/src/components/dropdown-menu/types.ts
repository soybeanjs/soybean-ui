import type { AcceptableValue, DropdownMenuRootEmits, DropdownMenuRootProps } from '@soybean-ui/primitives';
import type {
  MenuCheckboxEmits,
  MenuCheckboxProps,
  MenuEmits,
  MenuProps,
  MenuRadioEmits,
  MenuRadioProps
} from '../menu/types';

// DropdownMenu
export interface DropdownMenuProps<T extends AcceptableValue = AcceptableValue>
  extends DropdownMenuRootProps,
    MenuProps<T> {
  disabledTrigger?: boolean;
}
export type DropdownMenuEmits<T extends AcceptableValue = AcceptableValue> = DropdownMenuRootEmits & MenuEmits<T>;

// Checkbox
export interface DropdownMenuCheckboxProps<T extends AcceptableValue = AcceptableValue>
  extends DropdownMenuRootProps,
    MenuCheckboxProps<T> {
  disabledTrigger?: boolean;
}
export type DropdownMenuCheckboxEmits<T extends AcceptableValue = AcceptableValue> = DropdownMenuRootEmits &
  MenuCheckboxEmits<T>;

// Radio
export interface DropdownMenuRadioProps<T extends AcceptableValue = AcceptableValue>
  extends DropdownMenuRootProps,
    MenuRadioProps<T> {
  disabledTrigger?: boolean;
}
export type DropdownMenuRadioEmits<T extends AcceptableValue = AcceptableValue> = DropdownMenuRootEmits &
  MenuRadioEmits<T>;
