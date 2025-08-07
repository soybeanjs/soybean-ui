import type { AcceptableValue, DefinedValue, DropdownMenuRootProps, DropdownMenuTriggerProps } from '@headless';
import type {
  MenuCheckboxOptionData,
  MenuCheckboxOptionsEmits,
  MenuCheckboxOptionsProps,
  MenuEmits,
  MenuOptionData,
  MenuProps,
  MenuRadioOptionData,
  MenuRadioOptionsEmits,
  MenuRadioOptionsProps,
  MenuWrapperEmits,
  MenuWrapperProps
} from '../menu/types';

interface DropdownMenuCommonProps
  extends Pick<DropdownMenuRootProps, 'trigger' | 'delayDuration' | 'skipDelayDuration'> {
  disabled?: boolean;
  triggerProps?: DropdownMenuTriggerProps;
}

export interface DropdownMenuProps<
  T extends DefinedValue = DefinedValue,
  S extends MenuOptionData<T> = MenuOptionData<T>
> extends MenuProps<T, S>,
    DropdownMenuCommonProps {}

export type DropdownMenuEmits<T extends MenuOptionData = MenuOptionData> = MenuEmits<T>;

export interface DropdownMenuCheckboxProps<
  T extends DefinedValue = DefinedValue,
  S extends MenuCheckboxOptionData<T> = MenuCheckboxOptionData<T>
> extends MenuWrapperProps,
    MenuCheckboxOptionsProps<T, S>,
    DropdownMenuCommonProps {}

export type DropdownMenuCheckboxEmits<
  T extends DefinedValue = DefinedValue,
  S extends MenuCheckboxOptionData<T> = MenuCheckboxOptionData<T>
> = MenuWrapperEmits & MenuCheckboxOptionsEmits<T, S>;

export interface DropdownMenuRadioProps<
  T extends AcceptableValue = AcceptableValue,
  S extends MenuRadioOptionData<NonNullable<T>> = MenuRadioOptionData<NonNullable<T>>
> extends MenuWrapperProps,
    MenuRadioOptionsProps<T, S>,
    DropdownMenuCommonProps {}

export type DropdownMenuRadioEmits<
  T extends DefinedValue = DefinedValue,
  S extends MenuRadioOptionData<T> = MenuRadioOptionData<T>
> = MenuWrapperEmits & MenuRadioOptionsEmits<T, S>;
