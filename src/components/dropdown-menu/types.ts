import type { ComputedRef, ShallowRef } from 'vue';
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
  MenuGroupLabelProps as DropdownMenuGroupLabelProps,
  MenuGroupProps as DropdownMenuGroupProps,
  MenuItemEmits as DropdownMenuItemEmits,
  MenuItemIndicatorProps as DropdownMenuItemIndicatorProps,
  MenuItemProps as DropdownMenuItemProps,
  MenuPortalProps as DropdownMenuPortalProps,
  MenuRadioGroupEmits as DropdownMenuRadioGroupEmits,
  MenuRadioGroupProps as DropdownMenuRadioGroupProps,
  MenuRadioItemEmits as DropdownMenuRadioItemEmits,
  MenuRadioItemProps as DropdownMenuRadioItemProps,
  MenuRootEmits as DropdownMenuRootEmits,
  MenuSeparatorProps as DropdownMenuSeparatorProps,
  MenuSubContentEmits as DropdownMenuSubContentEmits,
  MenuSubContentProps as DropdownMenuSubContentProps,
  MenuSubEmits as DropdownMenuSubEmits,
  MenuSubProps as DropdownMenuSubProps,
  MenuSubTriggerProps as DropdownMenuSubTriggerProps,
  MenuTriggerProps as DropdownMenuTriggerProps,
  MenuRootProps
} from '../menu';

export type DropdownMenuTriggerType = 'click' | 'hover';

export interface DropdownMenuRootProps extends MenuRootProps {
  /**
   * The trigger type of the dropdown menu.
   *
   * - `click`: The dropdown menu will be opened when the trigger is clicked.
   * - `hover`: The dropdown menu will be opened when the trigger is hovered.
   *
   * @defaultValue 'click'
   */
  trigger?: DropdownMenuTriggerType;
  /**
   * The duration from when the pointer enters the trigger until the dropdown menu gets opened.
   *
   * @defaultValue 150
   */
  delayDuration?: number;
  /**
   * How much time a user has to enter another trigger without incurring a delay again.
   *
   * @defaultValue 300
   */
  skipDelayDuration?: number;
}

// Context
export interface DropdownMenuRootContextParams extends PropsToContext<DropdownMenuRootProps, 'dir' | 'modal'> {
  open: ShallowRef<boolean | undefined>;
}

export interface DropdownMenuHoverContextParams
  extends PropsToContext<DropdownMenuRootProps, 'delayDuration' | 'skipDelayDuration'> {
  hoverable: ComputedRef<boolean>;
  open: ShallowRef<boolean | undefined>;
}

export type {
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
  DropdownMenuGroupLabelProps,
  DropdownMenuSeparatorProps
};
