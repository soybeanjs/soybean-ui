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

export interface ContextMenuRootProps extends Omit<MenuRootProps, 'open' | 'defaultOpen'> {
  /**
   * The duration from when the trigger is pressed until the menu opens.
   *
   * @defaultValue 700
   */
  pressOpenDelay?: number;
}
export type ContextMenuRootEmits = MenuRootEmits;

export type ContextMenuContentProps = Omit<
  MenuContentProps,
  'side' | 'sideOffset' | 'align' | 'arrowPadding' | 'updatePositionStrategy'
>;
export type ContextMenuContentEmits = MenuContentEmits;

export interface ContextMenuRootContextParams extends PropsToContext<
  ContextMenuRootProps,
  'dir' | 'modal' | 'pressOpenDelay'
> {
  open: ShallowRef<boolean | undefined>;
}
export interface ContextMenuTriggerProps extends MenuTriggerProps {
  /**
   * The reference element for the context menu trigger.
   */
  reference?: HTMLElement | null;
}

export interface ContextMenuWrapperCompactProps extends ContextMenuRootProps {
  disabled?: boolean;
  showArrow?: boolean;
  triggerProps?: ContextMenuTriggerProps;
  portalProps?: MenuPortalProps;
  contentProps?: ContextMenuContentProps;
  popupProps?: MenuPopupProps;
  arrowProps?: MenuArrowProps;
}

export type ContextMenuWrapperCompactEmits = MenuRootEmits & MenuContentEmits;

export interface ContextMenuCompactProps<T extends DefinedValue = DefinedValue>
  extends ContextMenuWrapperCompactProps, MenuOptionsCompactProps<T> {}

export type ContextMenuCompactEmits<T extends DefinedValue = DefinedValue> = ContextMenuWrapperCompactEmits &
  MenuOptionsCompactEmits<T>;

export type ContextMenuCompactSlots<T extends DefinedValue = DefinedValue> = MenuOptionsCompactSlots<T> & {
  trigger: () => any;
};

// Menu Checkbox
export interface ContextMenuCheckboxCompactProps<T extends DefinedValue = DefinedValue>
  extends ContextMenuWrapperCompactProps, MenuCheckboxOptionsCompactProps<T> {}

export type ContextMenuCheckboxCompactEmits<T extends DefinedValue = DefinedValue> = ContextMenuWrapperCompactEmits &
  MenuCheckboxOptionsCompactEmits<T>;

export type ContextMenuCheckboxCompactSlots<T extends DefinedValue = DefinedValue> =
  MenuCheckboxOptionsCompactSlots<T> & {
    trigger: () => any;
  };

// Menu Radio
export interface ContextMenuRadioCompactProps<T extends AcceptableBooleanValue = AcceptableBooleanValue>
  extends ContextMenuWrapperCompactProps, MenuRadioOptionsCompactProps<T> {}

export type ContextMenuRadioCompactEmits<T extends AcceptableBooleanValue = AcceptableBooleanValue> =
  ContextMenuWrapperCompactEmits & MenuRadioOptionsCompactEmits<T>;

export type ContextMenuRadioCompactSlots<T extends AcceptableBooleanValue = AcceptableBooleanValue> =
  MenuRadioOptionsCompactSlots<T> & {
    trigger: () => any;
  };
