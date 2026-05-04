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

/**
 * Supported dropdown menu trigger values.
 */
export type DropdownMenuTriggerType = 'click' | 'hover';

/**
 * Properties for the dropdown menu root component.
 */
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
/**
 * Events for the dropdown menu root component.
 */
export type DropdownMenuRootEmits = MenuRootEmits;

// Context
/**
 * Parameters used to create the dropdown menu root context.
 */
export interface DropdownMenuRootContextParams extends PropsToContext<DropdownMenuRootProps, 'dir' | 'modal'> {
  /**
   * Whether the component is open.
   */
  open: ShallowRef<boolean | undefined>;
}

/**
 * Parameters used to create the dropdown menu hover context.
 */
export interface DropdownMenuHoverContextParams extends PropsToContext<
  DropdownMenuRootProps,
  'delayDuration' | 'skipDelayDuration'
> {
  /**
   * Whether hoverable.
   */
  hoverable: ComputedRef<boolean>;
  /**
   * Whether the component is open.
   */
  open: ShallowRef<boolean | undefined>;
}

/**
 * Properties for the dropdown menu content component.
 */
export interface DropdownMenuContentProps extends MenuContentProps {}

/**
 * Events for the dropdown menu content component.
 */
export type DropdownMenuContentEmits = MenuContentEmits;

/**
 * Properties for the dropdown menu trigger component.
 */
export interface DropdownMenuTriggerProps extends MenuTriggerProps {}

/**
 * Properties for the dropdown menu wrapper compact component.
 */
export interface DropdownMenuWrapperCompactProps extends DropdownMenuRootProps {
  /**
   * Whether the component is disabled.
   */
  disabled?: boolean;
  /**
   * Placement.
   */
  placement?: Placement;
  /**
   * Whether to show an arrow.
   */
  showArrow?: boolean;
  /**
   * Properties forwarded to the trigger element.
   */
  triggerProps?: DropdownMenuTriggerProps;
  /**
   * Properties forwarded to the portal element.
   */
  portalProps?: MenuPortalProps;
  /**
   * Properties forwarded to the content element.
   */
  contentProps?: DropdownMenuContentProps;
  /**
   * Properties forwarded to the popup element.
   */
  popupProps?: MenuPopupProps;
  /**
   * Properties forwarded to the arrow element.
   */
  arrowProps?: MenuArrowProps;
}

/**
 * Events for the dropdown menu wrapper compact component.
 */
export type DropdownMenuWrapperCompactEmits = MenuRootEmits & MenuContentEmits;

/**
 * Properties for the dropdown menu compact component.
 */
export interface DropdownMenuCompactProps<T extends DefinedValue = DefinedValue>
  extends DropdownMenuWrapperCompactProps, MenuOptionsCompactProps<T> {}

/**
 * Events for the dropdown menu compact component.
 */
export type DropdownMenuCompactEmits<T extends DefinedValue = DefinedValue> = DropdownMenuWrapperCompactEmits &
  MenuOptionsCompactEmits<T>;

/**
 * Slots for the dropdown menu compact component.
 */
export type DropdownMenuCompactSlots<T extends DefinedValue = DefinedValue> = MenuOptionsCompactSlots<T> & {
  /**
   * Custom content for the trigger slot.
   */
  trigger: () => any;
};

// Menu Checkbox
/**
 * Properties for the dropdown menu checkbox compact component.
 */
export interface DropdownMenuCheckboxCompactProps<T extends DefinedValue = DefinedValue>
  extends DropdownMenuWrapperCompactProps, MenuCheckboxOptionsCompactProps<T> {}

/**
 * Events for the dropdown menu checkbox compact component.
 */
export type DropdownMenuCheckboxCompactEmits<T extends DefinedValue = DefinedValue> = DropdownMenuWrapperCompactEmits &
  MenuCheckboxOptionsCompactEmits<T>;

/**
 * Slots for the dropdown menu checkbox compact component.
 */
export type DropdownMenuCheckboxCompactSlots<T extends DefinedValue = DefinedValue> =
  MenuCheckboxOptionsCompactSlots<T> & {
    /**
     * Custom content for the trigger slot.
     */
    trigger: () => any;
  };

// Menu Radio
/**
 * Properties for the dropdown menu radio compact component.
 */
export interface DropdownMenuRadioCompactProps<T extends AcceptableBooleanValue = AcceptableBooleanValue>
  extends DropdownMenuWrapperCompactProps, MenuRadioOptionsCompactProps<T> {}

/**
 * Events for the dropdown menu radio compact component.
 */
export type DropdownMenuRadioCompactEmits<T extends AcceptableBooleanValue = AcceptableBooleanValue> =
  DropdownMenuWrapperCompactEmits & MenuRadioOptionsCompactEmits<T>;

/**
 * Slots for the dropdown menu radio compact component.
 */
export type DropdownMenuRadioCompactSlots<T extends AcceptableBooleanValue = AcceptableBooleanValue> =
  MenuRadioOptionsCompactSlots<T> & {
    /**
     * Custom content for the trigger slot.
     */
    trigger: () => any;
  };
