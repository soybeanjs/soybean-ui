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
 * Props for the menubar root component.
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
 * Emits for the menubar root component.
 */
export type MenubarRootEmits<T extends DefinedValue = DefinedValue> = {
  /**
   * Emitted when the model value changes.
   */
  'update:modelValue': [value: T];
};

/**
 * Props for the menubar menu component.
 */
export interface MenubarMenuProps {
  /** A unique value that associates the trigger with the active root value when controlled. */
  value?: DefinedValue;
}

/**
 * Props for the menubar trigger component.
 */
export interface MenubarTriggerProps extends PrimitiveProps, /** @vue-ignore */ ButtonHTMLAttributes {
  /** When `true`, prevents the user from interacting with the trigger. */
  disabled?: boolean;
}

/**
 * Type information for the menubar collection item data component.
 */
export interface MenubarCollectionItemData {
  /**
   * Value associated with the current item.
   */
  value: DefinedValue;
}

/**
 * Emits for the menubar content component.
 */
export type MenubarContentEmits = MenuContentEmits;
/**
 * Props for the menubar content component.
 */
export interface MenubarContentProps extends MenuContentProps {}

/**
 * Props for the menubar sub trigger component.
 */
export interface MenubarSubTriggerProps extends MenuSubTriggerProps {}

/**
 * Props for the menubar sub content component.
 */
export interface MenubarSubContentProps extends MenuSubContentProps {}
/**
 * Emits for the menubar sub content component.
 */
export type MenubarSubContentEmits = MenuSubContentEmits;

/**
 * Props for the menubar compact component.
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
   * Props forwarded to the trigger element.
   */
  triggerProps?: MenubarTriggerProps;
  /**
   * Props forwarded to the portal element.
   */
  portalProps?: MenuPortalProps;
  /**
   * Props forwarded to the content element.
   */
  contentProps?: MenubarContentProps;
  /**
   * Props forwarded to the popup element.
   */
  popupProps?: MenuPopupProps;
  /**
   * Props forwarded to the arrow element.
   */
  arrowProps?: MenuArrowProps;
}
/**
 * Emits for the menubar compact component.
 */
export type MenubarCompactEmits<T extends DefinedValue = DefinedValue> = MenubarRootEmits<T> &
  MenuContentEmits &
  MenuOptionsCompactEmits<T>;
/**
 * Slots for the menubar compact component.
 */
export type MenubarCompactSlots<T extends DefinedValue = DefinedValue> = MenuOptionsCompactSlots<T> & {
  /**
   * Custom content for the trigger slot.
   */
  trigger: (data: { item: MenuOptionData<T> }) => any;
};

/**
 * Parameters used to create the menubar root context.
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
 * Parameters used to create the menubar menu context.
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
 * Available UI slots for the menubar component.
 */
export type MenubarUiSlot = 'root' | 'trigger' | MenuUiSlot;
/**
 * UI class overrides for the menubar component.
 */
export type MenubarUi = UiClass<MenubarUiSlot>;
