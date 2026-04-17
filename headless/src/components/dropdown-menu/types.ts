import type { ComputedRef, ShallowRef } from 'vue';
import type { AcceptableBooleanValue, DefinedValue, Placement, PropsToContext } from '../../types';
import type {
  MenuContentEmits,
  MenuContentProps,
  MenuRootEmits,
  MenuRootProps,
  MenuTriggerProps,
  MenuPopupProps,
  MenuPortalProps,
  MenuArrowProps,
  MenuOptionsCompactProps,
  MenuOptionsCompactEmits,
  MenuOptionsCompactSlots,
  MenuCheckboxOptionsCompactProps,
  MenuCheckboxOptionsCompactEmits,
  MenuCheckboxOptionsCompactSlots,
  MenuRadioOptionsCompactProps,
  MenuRadioOptionsCompactEmits,
  MenuRadioOptionsCompactSlots
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
export type DropdownMenuRootEmits = MenuRootEmits;

// Context
export interface DropdownMenuRootContextParams extends PropsToContext<DropdownMenuRootProps, 'dir' | 'modal'> {
  open: ShallowRef<boolean | undefined>;
}

export interface DropdownMenuHoverContextParams extends PropsToContext<
  DropdownMenuRootProps,
  'delayDuration' | 'skipDelayDuration'
> {
  hoverable: ComputedRef<boolean>;
  open: ShallowRef<boolean | undefined>;
}

export interface DropdownMenuContentProps extends MenuContentProps {}

export type DropdownMenuContentEmits = MenuContentEmits;

export interface DropdownMenuTriggerProps extends MenuTriggerProps {}

export interface DropdownMenuWrapperCompactProps extends DropdownMenuRootProps {
  disabled?: boolean;
  placement?: Placement;
  showArrow?: boolean;
  triggerProps?: DropdownMenuTriggerProps;
  portalProps?: MenuPortalProps;
  contentProps?: DropdownMenuContentProps;
  popupProps?: MenuPopupProps;
  arrowProps?: MenuArrowProps;
}

export type DropdownMenuWrapperCompactEmits = MenuRootEmits & MenuContentEmits;

export interface DropdownMenuCompactProps<T extends DefinedValue = DefinedValue>
  extends DropdownMenuWrapperCompactProps, MenuOptionsCompactProps<T> {}

export type DropdownMenuCompactEmits<T extends DefinedValue = DefinedValue> = DropdownMenuWrapperCompactEmits &
  MenuOptionsCompactEmits<T>;

export type DropdownMenuCompactSlots<T extends DefinedValue = DefinedValue> = MenuOptionsCompactSlots<T> & {
  trigger: () => any;
};

// Menu Checkbox
export interface DropdownMenuCheckboxCompactProps<T extends DefinedValue = DefinedValue>
  extends DropdownMenuWrapperCompactProps, MenuCheckboxOptionsCompactProps<T> {}

export type DropdownMenuCheckboxCompactEmits<T extends DefinedValue = DefinedValue> = DropdownMenuWrapperCompactEmits &
  MenuCheckboxOptionsCompactEmits<T>;

export type DropdownMenuCheckboxCompactSlots<T extends DefinedValue = DefinedValue> =
  MenuCheckboxOptionsCompactSlots<T> & {
    trigger: () => any;
  };

// Menu Radio
export interface DropdownMenuRadioCompactProps<T extends AcceptableBooleanValue = AcceptableBooleanValue>
  extends DropdownMenuWrapperCompactProps, MenuRadioOptionsCompactProps<T> {}

export type DropdownMenuRadioCompactEmits<T extends AcceptableBooleanValue = AcceptableBooleanValue> =
  DropdownMenuWrapperCompactEmits & MenuRadioOptionsCompactEmits<T>;

export type DropdownMenuRadioCompactSlots<T extends AcceptableBooleanValue = AcceptableBooleanValue> =
  MenuRadioOptionsCompactSlots<T> & {
    trigger: () => any;
  };
