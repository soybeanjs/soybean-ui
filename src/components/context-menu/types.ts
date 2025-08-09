import type { ShallowRef } from 'vue';
import type { PropsToContext } from '../../types';
import type {
  MenuAnchorProps as ContextMenuAnchorProps,
  MenuArrowProps as ContextMenuArrowProps,
  MenuCheckboxGroupEmits as ContextMenuCheckboxGroupEmits,
  MenuCheckboxGroupProps as ContextMenuCheckboxGroupProps,
  MenuCheckboxItemEmits as ContextMenuCheckboxItemEmits,
  MenuCheckboxItemProps as ContextMenuCheckboxItemProps,
  MenuGroupLabelProps as ContextMenuGroupLabelProps,
  MenuGroupProps as ContextMenuGroupProps,
  MenuItemEmits as ContextMenuItemEmits,
  MenuItemIndicatorProps as ContextMenuItemIndicatorProps,
  MenuItemProps as ContextMenuItemProps,
  MenuPortalProps as ContextMenuPortalProps,
  MenuRadioGroupEmits as ContextMenuRadioGroupEmits,
  MenuRadioGroupProps as ContextMenuRadioGroupProps,
  MenuRadioItemEmits as ContextMenuRadioItemEmits,
  MenuRadioItemProps as ContextMenuRadioItemProps,
  MenuSeparatorProps as ContextMenuSeparatorProps,
  MenuSubContentEmits as ContextMenuSubContentEmits,
  MenuSubContentProps as ContextMenuSubContentProps,
  MenuSubEmits as ContextMenuSubEmits,
  MenuSubProps as ContextMenuSubProps,
  MenuSubTriggerProps as ContextMenuSubTriggerProps,
  MenuTriggerProps as ContextMenuTriggerProps,
  MenuContentEmits,
  MenuContentProps,
  MenuRootEmits,
  MenuRootProps
} from '../menu/types';

export interface ContextMenuRootProps extends Omit<MenuRootProps, 'open' | 'defaultOpen'> {}
export type ContextMenuRootEmits = MenuRootEmits;

export type ContextMenuContentProps = Omit<
  MenuContentProps,
  'side' | 'sideOffset' | 'align' | 'arrowPadding' | 'updatePositionStrategy'
>;
export type ContextMenuContentEmits = MenuContentEmits;

export interface ContextMenuRootContextParams extends PropsToContext<ContextMenuRootProps, 'dir' | 'modal'> {
  open: ShallowRef<boolean | undefined>;
}

export type {
  ContextMenuPortalProps,
  ContextMenuTriggerProps,
  ContextMenuSubEmits,
  ContextMenuSubProps,
  ContextMenuSubContentProps,
  ContextMenuSubContentEmits,
  ContextMenuSubTriggerProps,
  ContextMenuAnchorProps,
  ContextMenuArrowProps,
  ContextMenuGroupProps,
  ContextMenuItemProps,
  ContextMenuItemEmits,
  ContextMenuCheckboxGroupProps,
  ContextMenuCheckboxGroupEmits,
  ContextMenuCheckboxItemProps,
  ContextMenuCheckboxItemEmits,
  ContextMenuRadioGroupProps,
  ContextMenuRadioGroupEmits,
  ContextMenuRadioItemProps,
  ContextMenuRadioItemEmits,
  ContextMenuItemIndicatorProps,
  ContextMenuGroupLabelProps,
  ContextMenuSeparatorProps
};
