import type { ButtonHTMLAttributes, ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type { DefinedValue, Direction, Placement, PropsToContext, UiClass } from '../../types';
import type {
  MenuPopupProps,
  MenuPortalProps,
  MenuArrowProps,
  MenuContentEmits,
  MenuContentProps,
  MenuSubContentEmits,
  MenuSubContentProps,
  MenuSubTriggerProps,
  MenuOptionsCompactProps,
  MenuOptionsCompactEmits,
  MenuOptionsCompactSlots,
  MenuOptionData,
  MenuUiSlot
} from '../menu';
import type { PrimitiveProps } from '../primitive/types';

/**
 * Properties for the MenubarRoot component.
 */
export interface MenubarRootProps<T extends DefinedValue = DefinedValue>
  extends PrimitiveProps, /** @vue-ignore */ Omit<HTMLAttributes, 'onSelect'> {
  /** The controlled value of the menu to open. Can be used as `v-model`. */
  modelValue?: T;
  /** The value of the menu that should be open when initially rendered. */
  defaultValue?: T;
  /** The reading direction of the menubar when applicable. */
  dir?: Direction;
  /** When `true`, keyboard navigation loops from last trigger to first and vice versa. */
  loop?: boolean;
}

/**
 * Events for the MenubarRoot component.
 */
export type MenubarRootEmits<T extends DefinedValue = DefinedValue> = {
  /**
   * Emitted when the model value changes.
   */
  'update:modelValue': [value: T];
};

/**
 * Properties for the MenubarMenu component.
 */
export interface MenubarMenuProps {
  /** A unique value that associates the trigger with the active root value when controlled. */
  value?: DefinedValue;
}

/**
 * Properties for the MenubarTrigger component.
 */
export interface MenubarTriggerProps extends PrimitiveProps, /** @vue-ignore */ ButtonHTMLAttributes {
  /** When `true`, prevents the user from interacting with the trigger. */
  disabled?: boolean;
}

/**
 * Type information for MenubarCollectionItemData.
 */
export interface MenubarCollectionItemData {
  /**
   * Value associated with the current item.
   */
  value: DefinedValue;
}

/**
 * Events for the MenubarContent component.
 */
export type MenubarContentEmits = MenuContentEmits;
/**
 * Properties for the MenubarContent component.
 */
export interface MenubarContentProps extends MenuContentProps {}

/**
 * Properties for the MenubarSubTrigger component.
 */
export interface MenubarSubTriggerProps extends MenuSubTriggerProps {}

/**
 * Properties for the MenubarSubContent component.
 */
export interface MenubarSubContentProps extends MenuSubContentProps {}
/**
 * Events for the MenubarSubContent component.
 */
export type MenubarSubContentEmits = MenuSubContentEmits;

/**
 * Properties for the MenubarCompact component.
 */
export interface MenubarCompactProps<T extends DefinedValue = DefinedValue>
  extends MenubarRootProps<T>, MenuOptionsCompactProps<T> {
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
  triggerProps?: MenubarTriggerProps;
  /**
   * Properties forwarded to the portal element.
   */
  portalProps?: MenuPortalProps;
  /**
   * Properties forwarded to the content element.
   */
  contentProps?: MenubarContentProps;
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
 * Events for the MenubarCompact component.
 */
export type MenubarCompactEmits<T extends DefinedValue = DefinedValue> = MenubarRootEmits<T> &
  MenuContentEmits &
  MenuOptionsCompactEmits<T>;
/**
 * Slots for the MenubarCompact component.
 */
export type MenubarCompactSlots<T extends DefinedValue = DefinedValue> = MenuOptionsCompactSlots<T> & {
  /**
   * Custom content for the trigger slot.
   */
  trigger: (data: { item: MenuOptionData<T> }) => any;
};

/**
 * Parameters used to create the MenubarRoot context.
 */
export interface MenubarRootContextParams extends PropsToContext<MenubarRootProps, 'dir' | 'loop'> {
  /**
   * Current model value.
   */
  modelValue: ShallowRef<DefinedValue>;
  /**
   * Current tab stop id used by the component context.
   */
  currentTabStopId: ShallowRef<string | null>;
}

/**
 * Parameters used to create the MenubarMenu context.
 */
export interface MenubarMenuContextParams {
  /**
   * Value associated with the current item.
   */
  value: ComputedRef<DefinedValue>;
  /**
   * Trigger id used by the component context.
   */
  triggerId: string;
  /**
   * Content id used by the component context.
   */
  contentId: ShallowRef<string>;
  /**
   * Trigger element used by the component context.
   */
  triggerElement: ShallowRef<HTMLElement | undefined>;
  /**
   * Whether was keyboard trigger open.
   */
  wasKeyboardTriggerOpen: ShallowRef<boolean>;
  /**
   * Whether the component is open.
   */
  open: ComputedRef<boolean>;
}

/**
 * Available UI slots for the Menubar component.
 */
export type MenubarUiSlot = 'root' | 'trigger' | MenuUiSlot;
/**
 * UI class overrides for the Menubar component.
 */
export type MenubarUi = UiClass<MenubarUiSlot>;
