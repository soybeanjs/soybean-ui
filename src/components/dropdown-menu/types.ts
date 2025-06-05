import type { ShallowRef } from 'vue';
import type { PropsToContext } from '../../types';
import type {
  MenuAnchorProps as DropdownMenuAnchorProps,
  MenuArrowProps as DropdownMenuArrowProps,
  MenuCheckboxGroupEmits as DropdownMenuCheckboxGroupEmits,
  MenuCheckboxGroupProps as DropdownMenuCheckboxGroupProps,
  MenuCheckboxItemEmits as DropdownMenuCheckboxItemEmits,
  MenuCheckboxItemProps as DropdownMenuCheckboxItemProps,
  MenuContentEmits as DropdownMenuContentEmits,
  MenuContentProps as DropdownMenuContentProps,
  MenuGroupProps as DropdownMenuGroupProps,
  MenuItemEmits as DropdownMenuItemEmits,
  MenuItemIndicatorProps as DropdownMenuItemIndicatorProps,
  MenuItemProps as DropdownMenuItemProps,
  MenuLabelProps as DropdownMenuLabelProps,
  MenuPortalProps as DropdownMenuPortalProps,
  MenuRadioGroupEmits as DropdownMenuRadioGroupEmits,
  MenuRadioGroupProps as DropdownMenuRadioGroupProps,
  MenuRadioItemEmits as DropdownMenuRadioItemEmits,
  MenuRadioItemProps as DropdownMenuRadioItemProps,
  MenuRootEmits as DropdownMenuRootEmits,
  MenuRootProps as DropdownMenuRootProps,
  MenuSeparatorProps as DropdownMenuSeparatorProps,
  MenuSubContentEmits as DropdownMenuSubContentEmits,
  MenuSubContentProps as DropdownMenuSubContentProps,
  MenuSubEmits as DropdownMenuSubEmits,
  MenuSubProps as DropdownMenuSubProps,
  MenuSubTriggerProps as DropdownMenuSubTriggerProps,
  MenuTriggerProps as DropdownMenuTriggerProps
} from '../menu';

// Context
export interface DropdownMenuRootContextParams extends PropsToContext<DropdownMenuRootProps, 'dir' | 'modal'> {
  open: ShallowRef<boolean | undefined>;
}

export type {
  DropdownMenuRootProps,
  DropdownMenuRootEmits,
  DropdownMenuPortalProps,
  DropdownMenuContentProps,
  DropdownMenuContentEmits,
  DropdownMenuTriggerProps,
  DropdownMenuSubEmits,
  DropdownMenuSubProps,
  DropdownMenuSubContentProps,
  DropdownMenuSubContentEmits,
  DropdownMenuSubTriggerProps,
  DropdownMenuAnchorProps,
  DropdownMenuArrowProps,
  DropdownMenuGroupProps,
  DropdownMenuItemProps,
  DropdownMenuItemEmits,
  DropdownMenuCheckboxGroupProps,
  DropdownMenuCheckboxGroupEmits,
  DropdownMenuCheckboxItemProps,
  DropdownMenuCheckboxItemEmits,
  DropdownMenuRadioGroupProps,
  DropdownMenuRadioGroupEmits,
  DropdownMenuRadioItemProps,
  DropdownMenuRadioItemEmits,
  DropdownMenuItemIndicatorProps,
  DropdownMenuLabelProps,
  DropdownMenuSeparatorProps
};
