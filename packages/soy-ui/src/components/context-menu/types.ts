import type {
  AcceptableValue,
  ClassValue,
  ContextMenuContentEmits,
  ContextMenuRootEmits,
  ContextMenuRootProps,
  ContextMenuContentProps as _ContextMenuContentProps,
  ContextMenuSubContentProps as _ContextMenuSubContentProps
} from '@soybean-ui/primitives';
import type { MenuSlots, ThemeSize } from '@soybean-ui/variants';
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

export type ContextMenuUi = Partial<Record<MenuSlots, ClassValue>>;

export interface ContextMenuContentProps extends _ContextMenuContentProps {
  size?: ThemeSize;
}

export interface ContextMenuSubContentProps extends _ContextMenuSubContentProps {
  size?: ThemeSize;
}

export interface ContextMenuPortalContentProps
  extends Pick<MenuPortalProps, 'to' | 'defer'>,
    Omit<ContextMenuContentProps, 'class' | 'forceMount'> {
  ui?: ContextMenuUi;
  disabledPortal?: boolean;
  forceMountPortal?: boolean;
  forceMountContent?: boolean;
  showArrow?: boolean;
}
export type ContextMenuPortalContentEmits = ContextMenuContentEmits;

// ContextMenu
export interface ContextMenuProps<T extends AcceptableValue = AcceptableValue>
  extends ContextMenuRootProps,
    Omit<ContextMenuOptionProps, 'item'> {
  ui?: ContextMenuUi;
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
  ContextMenuContentEmits,
  ContextMenuOptionProps,
  ContextMenuOptionEmits,
  ContextMenuSubContentEmits
};
