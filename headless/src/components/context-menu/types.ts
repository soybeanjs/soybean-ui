import type { ShallowRef } from 'vue';
import type { AcceptableBooleanValue, DefinedValue, PropsToContext } from '../../types';
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
 * Props for the context menu root component.
 */
export interface ContextMenuRootProps extends Omit<MenuRootProps, 'open' | 'defaultOpen'> {
  /**
   * The duration from when the trigger is pressed until the menu opens.
   *
   * @defaultValue 700
   */
  pressOpenDelay?: number;
}
/**
 * Emits for the context menu root component.
 */
export type ContextMenuRootEmits = MenuRootEmits;

/**
 * Props for the context menu content component.
 */
export type ContextMenuContentProps = Omit<
  MenuContentProps,
  'side' | 'sideOffset' | 'align' | 'arrowPadding' | 'updatePositionStrategy'
>;
/**
 * Emits for the context menu content component.
 */
export type ContextMenuContentEmits = MenuContentEmits;

/**
 * Parameters used to create the context menu root context.
 */
export interface ContextMenuRootContextParams extends PropsToContext<
  ContextMenuRootProps,
  'dir' | 'modal' | 'pressOpenDelay'
> {
  /**
   * Whether the component is open.
   */
  open: ShallowRef<boolean | undefined>;
}
/**
 * Props for the context menu trigger component.
 */
export interface ContextMenuTriggerProps extends MenuTriggerProps {
  /**
   * The reference element for the context menu trigger.
   */
  reference?: HTMLElement | null;
}

/**
 * Props for the context menu wrapper compact component.
 */
export interface ContextMenuWrapperCompactProps extends ContextMenuRootProps {
  /**
   * Whether the component is disabled.
   */
  disabled?: boolean;
  /**
   * Whether to show an arrow.
   */
  showArrow?: boolean;
  /**
   * Props forwarded to the trigger element.
   */
  triggerProps?: ContextMenuTriggerProps;
  /**
   * Props forwarded to the portal element.
   */
  portalProps?: MenuPortalProps;
  /**
   * Props forwarded to the content element.
   */
  contentProps?: ContextMenuContentProps;
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
 * Emits for the context menu wrapper compact component.
 */
export type ContextMenuWrapperCompactEmits = MenuRootEmits & MenuContentEmits;

/**
 * Props for the context menu compact component.
 */
export interface ContextMenuCompactProps<T extends DefinedValue = DefinedValue>
  extends ContextMenuWrapperCompactProps, MenuOptionsCompactProps<T> {}

/**
 * Emits for the context menu compact component.
 */
export type ContextMenuCompactEmits<T extends DefinedValue = DefinedValue> = ContextMenuWrapperCompactEmits &
  MenuOptionsCompactEmits<T>;

/**
 * Slots for the context menu compact component.
 */
export type ContextMenuCompactSlots<T extends DefinedValue = DefinedValue> = MenuOptionsCompactSlots<T> & {
  /**
   * Custom content for the trigger slot.
   */
  trigger: () => any;
};

// Menu Checkbox
/**
 * Props for the context menu checkbox compact component.
 */
export interface ContextMenuCheckboxCompactProps<T extends DefinedValue = DefinedValue>
  extends ContextMenuWrapperCompactProps, MenuCheckboxOptionsCompactProps<T> {}

/**
 * Emits for the context menu checkbox compact component.
 */
export type ContextMenuCheckboxCompactEmits<T extends DefinedValue = DefinedValue> = ContextMenuWrapperCompactEmits &
  MenuCheckboxOptionsCompactEmits<T>;

/**
 * Slots for the context menu checkbox compact component.
 */
export type ContextMenuCheckboxCompactSlots<T extends DefinedValue = DefinedValue> =
  MenuCheckboxOptionsCompactSlots<T> & {
    /**
     * Custom content for the trigger slot.
     */
    trigger: () => any;
  };

// Menu Radio
/**
 * Props for the context menu radio compact component.
 */
export interface ContextMenuRadioCompactProps<T extends AcceptableBooleanValue = AcceptableBooleanValue>
  extends ContextMenuWrapperCompactProps, MenuRadioOptionsCompactProps<T> {}

/**
 * Emits for the context menu radio compact component.
 */
export type ContextMenuRadioCompactEmits<T extends AcceptableBooleanValue = AcceptableBooleanValue> =
  ContextMenuWrapperCompactEmits & MenuRadioOptionsCompactEmits<T>;

/**
 * Slots for the context menu radio compact component.
 */
export type ContextMenuRadioCompactSlots<T extends AcceptableBooleanValue = AcceptableBooleanValue> =
  MenuRadioOptionsCompactSlots<T> & {
    /**
     * Custom content for the trigger slot.
     */
    trigger: () => any;
  };
