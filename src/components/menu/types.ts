import type { ButtonHTMLAttributes, ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type {
  AcceptableBooleanValue,
  AcceptableValue,
  CheckedState,
  Direction,
  DismissableLayerEmits,
  DismissableLayerProps,
  FocusScopeEmits,
  ForceMountProps,
  PropsToContext,
  TrapFocusProps
} from '../../types';
import type { PrimitiveProps } from '../primitive/types';
import type {
  DialogRootProps,
  DialogRootEmits as MenuRootEmits,
  DialogRootEmits as MenuSubEmits
} from '../dialog/types';
import type {
  PopperAnchorProps as MenuAnchorProps,
  PopperArrowProps as MenuArrowProps,
  PopperContentProps
} from '../popper/types';
import type { PortalProps as MenuPortalProps } from '../portal/types';
import type { RovingFocusGroupEmits, RovingFocusGroupProps } from '../roving-focus/types';
import type { DividerRootProps as MenuSeparatorProps } from '../divider/types';

// MenuRoot
export interface MenuRootProps extends DialogRootProps {
  /**
   * The reading direction of the combobox when applicable.
   *
   * If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode.
   */
  dir?: Direction;
}

// MenuContentImpl
export interface MenuContentImplProps
  extends PopperContentProps,
    TrapFocusProps,
    DismissableLayerProps,
    Pick<RovingFocusGroupProps, 'loop'> {}
export type MenuContentImplEmits = DismissableLayerEmits & FocusScopeEmits & Pick<RovingFocusGroupEmits, 'entryFocus'>;

// MenuContent
export interface MenuContentProps extends PopperContentProps, ForceMountProps {}
export interface MenuContentPrivateProps extends MenuContentProps {
  /**
   * The function to set the menu content element.
   *
   * @param el - The menu content element.
   */
  elRef?: (el: HTMLElement) => void;
}
export type MenuContentEmits = MenuContentImplEmits;

export interface MenuTriggerProps extends PrimitiveProps, /** @vue-ignore */ ButtonHTMLAttributes {
  /** When `true`, the menu would not open when triggered. */
  disabled?: boolean;
}

// MenuSub
export interface MenuSubProps extends Pick<MenuRootProps, 'open' | 'defaultOpen'> {}

// MenuSubContent
export interface MenuSubContentProps extends Omit<MenuContentProps, 'side' | 'align'> {}
export type MenuSubContentEmits = MenuContentEmits;

// MenuGroup
export interface MenuGroupProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

// MenuItemImpl
export interface MenuItemImplProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  /** When `true`, prevents the user from interacting with the item. */
  disabled?: boolean;
  /**
   * Optional text used for typeahead purposes. By default the typeahead behavior will use the `.textContent` of the
   * item. <br> Use this when the content is complex, or you have non-textual content inside.
   */
  textValue?: string;
}

// MenuItem
export interface MenuItemProps extends MenuItemImplProps {}
export type MenuItemEmits = {
  /**
   * Event handler called when the user selects an item (via mouse or keyboard). <br> Calling `event.preventDefault` in
   * this handler will prevent the menu from closing when selecting that item.
   */
  select: [event: Event];
};

// MenuCheckboxItem
export interface MenuCheckboxItemProps extends MenuItemProps {
  /** The controlled checked state of the item. Can be used as `v-model`. */
  modelValue?: CheckedState;
  /**
   * The value given as data when submitted with a `name`.
   *
   * @defaultValue on
   */
  value?: NonNullable<AcceptableValue>;
}
export type MenuCheckboxItemEmits = MenuItemEmits & {
  /** Event handler called when the checked state of the item changes. */
  'update:modelValue': [value: CheckedState];
};

// MenuCheckboxGroup
export interface MenuCheckboxGroupProps<T = NonNullable<AcceptableValue>> extends MenuGroupProps {
  /** The controlled value of the checkbox. Can be bound with v-model. */
  modelValue?: T[];
  /** The value of the checkbox when it is initially rendered. Use when you do not need to control its value. */
  defaultValue?: T[];
  /**
   * When `true`, prevents the user from interacting with the checkboxes
   *
   * @defaultValue false
   */
  disabled?: boolean;
}
export type MenuCheckboxGroupEmits<T = AcceptableValue> = {
  /** Event handler called when the value of the checkbox group changes. */
  'update:modelValue': [value: NonNullable<T>[]];
};

// MenuRadioItem
export interface MenuRadioItemProps extends MenuItemProps {
  /** The value given as data when submitted with a `name`. */
  value: NonNullable<AcceptableBooleanValue>;
}
export type MenuRadioItemEmits = MenuItemEmits;

// MenuRadioGroup
export interface MenuRadioGroupProps<T = AcceptableBooleanValue> extends MenuGroupProps {
  /** The controlled value of the radio item to check. Can be bound as `v-model`. */
  modelValue?: T;
  /**
   * The value of the radio item that should be checked when initially rendered. Use when you do not need to control the
   * state of the radio items.
   */
  defaultValue?: T;
  /** When `true`, prevents the user from interacting with radio items. */
  disabled?: boolean;
}
export type MenuRadioGroupEmits<T = AcceptableBooleanValue> = {
  /** Event handler called when the radio group value changes */
  'update:modelValue': [payload: NonNullable<T>];
};

// MenuSubTrigger
export interface MenuSubTriggerProps extends MenuItemImplProps {}

// MenuItemIndicator
export interface MenuItemIndicatorProps extends PrimitiveProps, ForceMountProps, /** @vue-ignore */ HTMLAttributes {}

// MenuLabel
export interface MenuLabelProps extends /** @vue-ignore */ HTMLAttributes {}

// Context
export interface MenuRootContextParams extends PropsToContext<MenuRootProps, 'dir' | 'modal'> {
  onClose: () => void;
  isUsingKeyboard: ComputedRef<boolean>;
}
export interface MenuContextParams {
  open: ShallowRef<boolean | undefined>;
}
export interface MenuContentContextParams {
  contentElement: ShallowRef<HTMLElement | undefined>;
}
export interface MenuCheckboxGroupContextParams {
  modelValue: ShallowRef<NonNullable<AcceptableValue>[] | undefined>;
  disabled: ComputedRef<boolean>;
}
export interface MenuRadioGroupContextParams {
  modelValue: ShallowRef<AcceptableBooleanValue>;
  disabled: ComputedRef<boolean>;
}
export interface MenuItemIndicatorContextParams {
  modelValue: ComputedRef<CheckedState | undefined>;
}

// Collection
export type MenuCollectionItemData = Pick<MenuItemImplProps, 'textValue'>;

export type { MenuRootEmits, MenuSubEmits, MenuPortalProps, MenuAnchorProps, MenuArrowProps, MenuSeparatorProps };
