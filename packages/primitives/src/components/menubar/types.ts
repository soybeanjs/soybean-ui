import type { Ref } from 'vue';
import type { ClassValueProp, Direction, PrimitiveProps } from '../../types';
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
  MenuSeparatorProps,
  MenuSubContentEmits,
  MenuSubContentProps,
  MenuSubEmits,
  MenuSubProps,
  MenuSubTriggerProps
} from '../menu';

// MenubarRoot
export interface MenubarRootProps extends ClassValueProp {
  /** The controlled value of the menu to open. Can be used as `v-model`. */
  modelValue?: string;
  /**
   * The value of the menu that should be open when initially rendered. Use when you do not need to control the value
   * state.
   */
  defaultValue?: string;
  /**
   * The reading direction of the combobox when applicable.
   *
   * If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode.
   */
  dir?: Direction;
  /** When `true`, keyboard navigation will loop from last item to first, and vice versa. */
  loop?: boolean;
}
export type MenubarRootEmits = {
  /** Event handler called when the value changes. */
  'update:modelValue': [value: boolean];
};

export interface MenubarRootContext {
  modelValue: Ref<string>;
  dir: Ref<Direction>;
  loop: Ref<boolean>;
  onMenuOpen: (value: string) => void;
  onMenuClose: () => void;
  onMenuToggle: (value: string) => void;
  setTriggerLink: () => void;
}

// MenubarMenu
export interface MenubarMenuProps {
  /**
   * A unique value that associates the item with an active value when the navigation menu is controlled.
   *
   * This prop is managed automatically when uncontrolled.
   */
  value?: string;
}

export type MenubarMenuContext = {
  value: string;
  triggerId: string;
  triggerElement: Ref<HTMLElement | undefined>;
  contentId: string;
  wasKeyboardTriggerOpenRef: Ref<boolean>;
};

// MenubarPortal
export interface MenubarPortalProps extends MenuPortalProps {}

// MenubarContent
export interface MenubarContentProps extends MenuContentProps {}
export type MenubarContentPropsWithPrimitive = MenubarContentProps & PrimitiveProps;
export type MenubarContentEmits = MenuContentEmits;

// MenubarSub
export interface MenubarSubProps extends MenuSubProps {
  /** The open state of the submenu when it is initially rendered. Use when you do not need to control its open state. */
  defaultOpen?: boolean;
}
export type MenubarSubEmits = MenuSubEmits;

// MenubarSubContent
export interface MenubarSubContentProps extends MenuSubContentProps {}
export type MenubarSubContentPropsWithPrimitive = MenubarSubContentProps & PrimitiveProps;
export type MenubarSubContentEmits = MenuSubContentEmits;

// MenubarSubTrigger
export interface MenubarSubTriggerProps extends MenuSubTriggerProps {}
export type MenubarSubTriggerPropsWithPrimitive = MenubarSubTriggerProps & PrimitiveProps;

// MenubarTrigger
export interface MenubarTriggerProps extends ClassValueProp {
  /**
   * When `true`, the context menu would not open when right-clicking.
   *
   * Note that this will also restore the native context menu.
   */
  disabled?: boolean;
}
export type MenubarTriggerPropsWithPrimitive = MenubarTriggerProps & PrimitiveProps;

// MenubarGroup
export interface MenubarGroupProps extends MenuGroupProps {}
export type MenubarGroupPropsWithPrimitive = MenubarGroupProps & PrimitiveProps;

// MenubarItem
export interface MenubarItemProps extends MenuItemProps {}
export type MenubarItemPropsWithPrimitive = MenubarItemProps & PrimitiveProps;
export type MenubarItemEmits = MenuItemEmits;

// MenubarItemIndicator
export interface MenubarItemIndicatorProps extends MenuItemIndicatorProps {}
export type MenubarItemIndicatorPropsWithPrimitive = MenubarItemIndicatorProps & PrimitiveProps;

// MenubarLabel
export interface MenubarLabelProps extends MenuLabelProps {}
export type MenubarLabelPropsWithPrimitive = MenubarLabelProps & PrimitiveProps;

// MenubarSeparator
export interface MenubarSeparatorProps extends MenuSeparatorProps {}
export type MenubarSeparatorPropsWithPrimitive = MenubarSeparatorProps & PrimitiveProps;

// MenubarCheckboxItem
export interface MenubarCheckboxItemProps extends MenuCheckboxItemProps {}
export type MenubarCheckboxItemPropsWithPrimitive = MenubarCheckboxItemProps & PrimitiveProps;
export type MenubarCheckboxItemEmits = MenuCheckboxItemEmits;

// MenubarRadioGroup
export interface MenubarRadioGroupProps extends MenuRadioGroupProps {}
export type MenubarRadioGroupPropsWithPrimitive = MenubarRadioGroupProps & PrimitiveProps;
export type MenubarRadioGroupEmits = MenuRadioGroupEmits;

// MenubarRadioItem
export interface MenubarRadioItemProps extends MenuRadioItemProps {}
export type MenubarRadioItemPropsWithPrimitive = MenubarRadioItemProps & PrimitiveProps;
export type MenubarRadioItemEmits = MenuItemEmits;

// MenubarArrow
export interface MenubarArrowProps extends MenuArrowProps {}
export type MenubarArrowPropsWithPrimitive = MenubarArrowProps & PrimitiveProps;
