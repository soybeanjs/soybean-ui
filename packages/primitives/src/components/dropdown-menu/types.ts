import type { Ref } from 'vue';
import type { ClassValueProp, Direction } from '../../types';
import type { PrimitiveProps } from '../primitive';
import type {
  MenuArrowProps,
  MenuCheckboxItemEmits,
  MenuCheckboxItemProps,
  MenuContentEmits,
  MenuContentProps,
  MenuContentPropsWithPrimitive,
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

// DropdownMenuRoot
export interface DropdownMenuRootProps extends MenuRootProps {}
export type DropdownMenuRootEmits = MenuRootEmits;

export interface DropdownMenuRootContextParams {
  open: Ref<boolean>;
  modal: Ref<boolean>;
  dir: Ref<Direction>;
}

export interface DropdownMenuRootContext extends DropdownMenuRootContextParams {
  onOpenChange: (open: boolean) => void;
  onOpenToggle: () => void;
  triggerElement: Ref<HTMLElement | undefined>;
  setTriggerElement: (elRef: Ref<HTMLElement | undefined>) => void;
  triggerId: string;
  initTriggerId: () => void;
  contentId: string;
  initContentId: () => void;
}

// DropdownMenuPortal
export interface DropdownMenuPortalProps extends MenuPortalProps {}

// DropdownMenuContent
export interface DropdownMenuContentProps extends MenuContentProps {}
export type DropdownMenuContentPropsWithPrimitive = MenuContentPropsWithPrimitive;
export type DropdownMenuContentEmits = MenuContentEmits;

// DropdownMenuSub
export interface DropdownMenuSubProps extends MenuSubProps {}
export type DropdownMenuSubEmits = MenuSubEmits;

// DropdownMenuSubContent
export interface DropdownMenuSubContentProps extends MenuSubContentProps {}
export type DropdownMenuSubContentPropsWithPrimitive = DropdownMenuSubContentProps & PrimitiveProps;
export type DropdownMenuSubContentEmits = MenuSubContentEmits;

// DropdownMenuSubTrigger
export interface DropdownMenuSubTriggerProps extends MenuSubTriggerProps {}
export type DropdownMenuSubTriggerPropsWithPrimitive = DropdownMenuSubTriggerProps & PrimitiveProps;

// DropdownMenuTrigger
export interface DropdownMenuTriggerProps extends ClassValueProp {
  /**
   * When `true`, the context menu would not open when right-clicking.
   *
   * Note that this will also restore the native context menu.
   */
  disabled?: boolean;
}
export type DropdownMenuTriggerPropsWithPrimitive = DropdownMenuTriggerProps & PrimitiveProps;

// DropdownMenuGroup
export interface DropdownMenuGroupProps extends MenuGroupProps {}
export type DropdownMenuGroupPropsWithPrimitive = DropdownMenuGroupProps & PrimitiveProps;

// DropdownMenuItem
export interface DropdownMenuItemProps extends MenuItemProps {}
export type DropdownMenuItemPropsWithPrimitive = DropdownMenuItemProps & PrimitiveProps;
export type DropdownMenuItemEmits = MenuItemEmits;

// DropdownMenuItemIndicator
export interface DropdownMenuItemIndicatorProps extends MenuItemIndicatorProps {}
export type DropdownMenuItemIndicatorPropsWithPrimitive = DropdownMenuItemIndicatorProps & PrimitiveProps;

// DropdownMenuLabel
export interface DropdownMenuLabelProps extends MenuLabelProps {}
export type DropdownMenuLabelPropsWithPrimitive = DropdownMenuLabelProps & PrimitiveProps;

// DropdownMenuSeparator
export interface DropdownMenuSeparatorProps extends MenuSeparatorProps {}
export type DropdownMenuSeparatorPropsWithPrimitive = DropdownMenuSeparatorProps & PrimitiveProps;

// DropdownMenuCheckboxItem
export interface DropdownMenuCheckboxItemProps extends MenuCheckboxItemProps {}
export type DropdownMenuCheckboxItemPropsWithPrimitive = DropdownMenuCheckboxItemProps & PrimitiveProps;
export type DropdownMenuCheckboxItemEmits = MenuCheckboxItemEmits;

// DropdownMenuRadioGroup
export interface DropdownMenuRadioGroupProps extends MenuRadioGroupProps {}
export type DropdownMenuRadioGroupPropsWithPrimitive = DropdownMenuRadioGroupProps & PrimitiveProps;
export type DropdownMenuRadioGroupEmits = MenuRadioGroupEmits;

// DropdownMenuRadioItem
export interface DropdownMenuRadioItemProps extends MenuRadioItemProps {}
export type DropdownMenuRadioItemPropsWithPrimitive = DropdownMenuRadioItemProps & PrimitiveProps;
export type DropdownMenuRadioItemEmits = MenuItemEmits;

// DropdownMenuArrow
export interface DropdownMenuArrowProps extends MenuArrowProps {}
export type DropdownMenuArrowPropsWithPrimitive = DropdownMenuArrowProps & PrimitiveProps;
