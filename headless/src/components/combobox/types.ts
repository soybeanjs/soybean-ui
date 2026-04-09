import type { ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type {
  Direction,
  ForceMountProps,
  PropsToContext,
  SelectEvent,
  SelectionEmits,
  SelectionProps,
  UiClass
} from '../../types';
import type { ListboxFilterEmits, ListboxFilterProps, ListboxRootEmits, ListboxRootProps } from '../listbox/types';
import type { PrimitiveProps } from '../primitive/types';
import type { PopoverPositionerProps, PopoverPositionerEmits, PopoverPopupProps } from '../popover/types';

export interface ComboboxRootProps<M extends boolean = false>
  extends Omit<ListboxRootProps<M>, 'orientation'>,
    SelectionProps<M>,
    /** @vue-ignore */ HTMLAttributes {
  open?: boolean;
  defaultOpen?: boolean;
  dir?: Direction;
  ignoreFilter?: boolean;
  resetSearchTermOnBlur?: boolean;
  resetSearchTermOnSelect?: boolean;
}

export type ComboboxRootEmits<M extends boolean = false> = ListboxRootEmits<M> &
  SelectionEmits<M> & {
    'update:open': [value: boolean];
  };

export interface ComboboxTriggerProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  disabled?: boolean;
}

export interface ComboboxContentProps extends PopoverPositionerProps, ForceMountProps {
  popupProps?: PopoverPopupProps;
}

export type ComboboxContentEmits = PopoverPositionerEmits;

export interface ComboboxInputProps extends Omit<ListboxFilterProps, 'modelValue' | 'defaultValue'> {}

export type ComboboxInputEmits = ListboxFilterEmits;

export interface ComboboxViewportProps extends /** @vue-ignore */ HTMLAttributes {
  nonce?: string;
}

export interface ComboboxGroupProps extends /** @vue-ignore */ HTMLAttributes {}

export interface ComboboxGroupLabelProps extends /** @vue-ignore */ HTMLAttributes {}

export interface ComboboxItemProps extends PrimitiveProps, /** @vue-ignore */ Omit<HTMLAttributes, 'onSelect'> {
  value: string;
  disabled?: boolean;
  textValue?: string;
}

export type ComboboxItemEmits = {
  select: [event: SelectEvent<string>];
};

export interface ComboboxItemIndicatorProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

export interface ComboboxEmptyProps extends /** @vue-ignore */ HTMLAttributes {}

export interface ComboboxSeparatorProps extends /** @vue-ignore */ HTMLAttributes {}

export interface ComboboxRootContext extends PropsToContext<
  ComboboxRootProps,
  'dir' | 'ignoreFilter' | 'resetSearchTermOnBlur' | 'resetSearchTermOnSelect'
> {
  open: ShallowRef<boolean | undefined>;
  onOpenChange: (value: boolean) => void;
  inputElement: ShallowRef<HTMLInputElement | undefined>;
  onInputElementChange: (node: HTMLInputElement) => void;
  filterSearch: ShallowRef<string>;
  allItems: ShallowRef<Map<string, string>>;
  allGroups: ShallowRef<Map<string, Set<string>>>;
  filterState: ComputedRef<{
    count: number;
    items: Map<string, boolean>;
    groups: Set<string>;
  }>;
}

export type ComboboxUiSlot =
  | 'trigger'
  | 'triggerIcon'
  | 'positioner'
  | 'popup'
  | 'viewport'
  | 'inputRoot'
  | 'inputControl'
  | 'group'
  | 'groupLabel'
  | 'item'
  | 'itemIndicator'
  | 'empty'
  | 'separator';

export type ComboboxUi = UiClass<ComboboxUiSlot>;
