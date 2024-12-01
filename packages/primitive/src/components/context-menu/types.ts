import type { Ref } from 'vue';
import type { ClassValueProp, Direction } from '../../types';
import type { PrimitiveProps } from '../primitive';
import type {
  MenuArrowProps,
  MenuCheckboxItemEmits,
  MenuCheckboxItemProps,
  MenuContentEmits,
  MenuContentProps,
  MenuGroupProps,
  MenuItemEmits,
  MenuItemIndicatorProps,
  MenuItemProps,
  MenuLabelProps,
  MenuPortalProps,
  MenuRadioGroupEmits,
  MenuRadioGroupProps,
  MenuRadioItemProps,
  MenuRootEmits,
  MenuRootProps,
  MenuSeparatorProps,
  MenuSubContentEmits,
  MenuSubContentProps,
  MenuSubEmits,
  MenuSubProps,
  MenuSubTriggerProps
} from '../menu';

// ContextMenuRoot
export interface ContextMenuRootProps extends Omit<MenuRootProps, 'open'> {}
export type ContextMenuRootEmits = MenuRootEmits;

export type ContextMenuRootContext = {
  open: Ref<boolean>;
  onOpenChange: (open: boolean) => void;
  modal: Ref<boolean>;
  dir: Ref<Direction>;
};

// ContextMenuPortal
export interface ContextMenuPortalProps extends MenuPortalProps {}

// ContextMenuContent
export type ContextMenuContentProps = Omit<
  MenuContentProps,
  'side' | 'sideOffset' | 'align' | 'arrowPadding' | 'updatePositionStrategy'
>;
export type ContextMenuContentPropsWithPrimitive = ContextMenuContentProps & PrimitiveProps;
export type ContextMenuContentEmits = MenuContentEmits;

// ContextMenuSub
export interface ContextMenuSubProps extends MenuSubProps {
  /** The open state of the submenu when it is initially rendered. Use when you do not need to control its open state. */
  defaultOpen?: boolean;
}
export type ContextMenuSubEmits = MenuSubEmits;

// ContextMenuSubContent
export interface ContextMenuSubContentProps extends MenuSubContentProps {}
export type ContextMenuSubContentPropsWithPrimitive = ContextMenuSubContentProps & PrimitiveProps;
export type ContextMenuSubContentEmits = MenuSubContentEmits;

// ContextMenuSubTrigger
export interface ContextMenuSubTriggerProps extends MenuSubTriggerProps {}
export type ContextMenuSubTriggerPropsWithPrimitive = ContextMenuSubTriggerProps & PrimitiveProps;

// ContextMenuTrigger
export interface ContextMenuTriggerProps extends ClassValueProp {
  /**
   * When `true`, the context menu would not open when right-clicking.
   *
   * Note that this will also restore the native context menu.
   */
  disabled?: boolean;
}
export type ContextMenuTriggerPropsWithPrimitive = ContextMenuTriggerProps & PrimitiveProps;

// ContextMenuGroup
export interface ContextMenuGroupProps extends MenuGroupProps {}
export type ContextMenuGroupPropsWithPrimitive = ContextMenuGroupProps & PrimitiveProps;

// ContextMenuItem
export interface ContextMenuItemProps extends MenuItemProps {}
export type ContextMenuItemPropsWithPrimitive = ContextMenuItemProps & PrimitiveProps;
export type ContextMenuItemEmits = MenuItemEmits;

// ContextMenuItemIndicator
export interface ContextMenuItemIndicatorProps extends MenuItemIndicatorProps {}
export type ContextMenuItemIndicatorPropsWithPrimitive = ContextMenuItemIndicatorProps & PrimitiveProps;

// ContextMenuLabel
export interface ContextMenuLabelProps extends MenuLabelProps {}
export type ContextMenuLabelPropsWithPrimitive = ContextMenuLabelProps & PrimitiveProps;

// ContextMenuSeparator
export interface ContextMenuSeparatorProps extends MenuSeparatorProps {}
export type ContextMenuSeparatorPropsWithPrimitive = ContextMenuSeparatorProps & PrimitiveProps;

// ContextMenuCheckboxItem
export interface ContextMenuCheckboxItemProps extends MenuCheckboxItemProps {}
export type ContextMenuCheckboxItemPropsWithPrimitive = ContextMenuCheckboxItemProps & PrimitiveProps;
export type ContextMenuCheckboxItemEmits = MenuCheckboxItemEmits;

// ContextMenuRadioGroup
export interface ContextMenuRadioGroupProps extends MenuRadioGroupProps {}
export type ContextMenuRadioGroupPropsWithPrimitive = ContextMenuRadioGroupProps & PrimitiveProps;
export type ContextMenuRadioGroupEmits = MenuRadioGroupEmits;

// ContextMenuRadioItem
export interface ContextMenuRadioItemProps extends MenuRadioItemProps {}
export type ContextMenuRadioItemPropsWithPrimitive = ContextMenuRadioItemProps & PrimitiveProps;
export type ContextMenuRadioItemEmits = MenuItemEmits;

// ContextMenuArrow
export interface ContextMenuArrowProps extends MenuArrowProps {}
export type ContextMenuArrowPropsWithPrimitive = ContextMenuArrowProps & PrimitiveProps;
