import type {
  AcceptableValue,
  ClassValue,
  ContextMenuContentEmits,
  ContextMenuContentProps,
  ContextMenuRootEmits,
  ContextMenuRootProps,
  ContextMenuSubContentProps
} from '@soybean-ui/primitive';
import type {
  MenuOptionEmits as ContextMenuOptionEmits,
  MenuOptionProps as ContextMenuOptionProps,
  MenuSubContentEmits as ContextMenuSubContentEmits,
  MenuCheckboxEmits,
  MenuCheckboxProps,
  MenuEmits,
  MenuOptionData,
  MenuPortalProps,
  MenuRadioEmits,
  MenuRadioProps
} from '../menu/types';

export interface ContextMenuPortalContentProps
  extends Pick<MenuPortalProps, 'to'>,
    Omit<ContextMenuContentProps, 'class' | 'forceMount'> {
  disabledPortal?: boolean;
  forceMountPortal?: boolean;
  contentClass?: ClassValue;
  forceMountContent?: boolean;
  showArrow?: boolean;
}
export type ContextMenuPortalContentEmits = ContextMenuContentEmits;

// ContextMenu
export interface ContextMenuProps<T extends AcceptableValue = AcceptableValue>
  extends ContextMenuRootProps,
    Omit<ContextMenuOptionProps, 'item'> {
  items?: MenuOptionData<T>[];
}
export type ContextMenuEmits<T extends AcceptableValue = AcceptableValue> = ContextMenuRootEmits & MenuEmits<T>;

// Checkbox
export interface ContextMenuCheckboxProps<T extends AcceptableValue = AcceptableValue>
  extends ContextMenuRootProps,
    MenuCheckboxProps<T> {}
export type ContextMenuCheckboxEmits<T extends AcceptableValue = AcceptableValue> = ContextMenuRootEmits &
  MenuCheckboxEmits<T>;

// Radio
export interface ContextMenuRadioProps<T extends AcceptableValue = AcceptableValue>
  extends ContextMenuRootProps,
    MenuRadioProps<T> {}
export type ContextMenuRadioEmits<T extends AcceptableValue = AcceptableValue> = ContextMenuRootEmits &
  MenuRadioEmits<T>;

export type {
  ContextMenuRootProps,
  ContextMenuRootEmits,
  ContextMenuContentProps,
  ContextMenuContentEmits,
  ContextMenuOptionProps,
  ContextMenuOptionEmits,
  ContextMenuSubContentProps,
  ContextMenuSubContentEmits
};
