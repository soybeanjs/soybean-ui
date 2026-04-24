import type { ButtonHTMLAttributes, ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type {
  AcceptableBooleanValue,
  CheckedState,
  DefinedValue,
  Direction,
  DismissableLayerEmits,
  DismissableLayerProps,
  FocusScopeEmits,
  ForceMountProps,
  PropsToContext,
  TrapFocusProps,
  UiClass
} from '../../types';
import type { IconValue } from '../_icon/types';
import type { KbdProps, KbdValue } from '../kbd/types';
import type { LinkBaseProps, LinkProps } from '../link/types';
import type { PortalProps as MenuPortalProps } from '../portal/types';
import type { PrimitiveProps } from '../primitive/types';
import type { DialogRootEmits, DialogRootProps } from '../dialog/types';
import type { PopperPopupProps, PopperPositionerProps } from '../popper/types';
import type { RovingFocusGroupEmits, RovingFocusGroupProps } from '../roving-focus/types';
import type { SeparatorRootProps as MenuSeparatorProps } from '../separator/types';

// MenuRoot
export interface MenuRootProps extends DialogRootProps {
  /**
   * The reading direction of the combobox when applicable.
   *
   * If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode.
   */
  dir?: Direction;
}
export type MenuRootEmits = DialogRootEmits;

export interface MenuPopupProps extends PopperPopupProps {}

// MenuContentImpl
export interface MenuContentImplProps
  extends PopperPositionerProps, TrapFocusProps, DismissableLayerProps, Pick<RovingFocusGroupProps, 'loop'> {
  popupProps?: MenuPopupProps;
}
export type MenuContentImplEmits = DismissableLayerEmits & FocusScopeEmits & Pick<RovingFocusGroupEmits, 'entryFocus'>;

// MenuContent
export interface MenuContentProps extends PopperPositionerProps, ForceMountProps, Pick<RovingFocusGroupProps, 'loop'> {
  popupProps?: MenuPopupProps;
}
export type MenuContentEmits = MenuContentImplEmits;

export interface MenuTriggerProps extends PrimitiveProps, /** @vue-ignore */ ButtonHTMLAttributes {
  /** When `true`, the menu would not open when triggered. */
  disabled?: boolean;
}

// MenuSub
export interface MenuSubProps extends Pick<MenuRootProps, 'open' | 'defaultOpen'> {}
export type MenuSubEmits = MenuRootEmits;

// MenuSubContent
export interface MenuSubContentProps extends Omit<MenuContentProps, 'side' | 'align'> {}
export type MenuSubContentEmits = MenuContentEmits;

// MenuGroup
export interface MenuGroupProps extends PrimitiveProps, /** @vue-ignore */ Omit<HTMLAttributes, 'dir' | 'onSelect'> {}

// MenuGroupLabel
export interface MenuGroupLabelProps extends /** @vue-ignore */ HTMLAttributes {}

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
export interface MenuCheckboxItemProps extends MenuItemImplProps {
  /** The controlled checked state of the item. Can be used as `v-model`. */
  modelValue?: CheckedState;
  /**
   * The value given as data when submitted with a `name`.
   *
   * @defaultValue on
   */
  value?: DefinedValue;
}
export type MenuCheckboxItemEmits = MenuItemEmits & {
  /** Event handler called when the checked state of the item changes. */
  'update:modelValue': [value: CheckedState];
};

// MenuCheckboxGroup
export interface MenuCheckboxGroupProps<T extends DefinedValue = DefinedValue> extends MenuGroupProps {
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
export type MenuCheckboxGroupEmits<T extends DefinedValue = DefinedValue> = {
  /** Event handler called when the value of the checkbox group changes. */
  'update:modelValue': [value: T[]];
};

// MenuRadioItem
export interface MenuRadioItemProps extends MenuItemImplProps {
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

export type MenuCollectionItemData = Pick<MenuItemImplProps, 'textValue'>;

export interface MenuOptionData<T extends DefinedValue = DefinedValue>
  extends Pick<MenuItemProps, 'disabled' | 'textValue'>, LinkBaseProps {
  /** The label to display in the menu. */
  label: string;
  /** The value of the option. */
  value: T;
  /** Whether the option should render as a group label. */
  isGroupLabel?: boolean;
  /** The icon rendered before the label. */
  icon?: IconValue;
  /** Whether to show a separator after this option. */
  separator?: boolean;
  /** The shortcut rendered at the end of the option. */
  shortcut?: KbdValue | KbdValue[];
  /** The children of the option. */
  children?: MenuOptionData<T>[];
}

export interface MenuShortcutProps extends Omit<KbdProps, 'value'> {}

export interface MenuOptionCompactProps<T extends DefinedValue = DefinedValue> {
  item: MenuOptionData<T>;
  itemProps?: MenuItemProps;
  linkProps?: LinkProps;
  groupProps?: MenuGroupProps;
  groupLabelProps?: MenuGroupLabelProps;
  subProps?: MenuSubProps;
  subTriggerProps?: MenuSubTriggerProps;
  portalProps?: MenuPortalProps;
  subContentProps?: MenuSubContentProps;
  separatorProps?: MenuSeparatorProps;
  shortcutProps?: MenuShortcutProps;
}

export type MenuOptionCompactSelectEmits<T extends DefinedValue = DefinedValue> = {
  select: [item: MenuOptionData<T>, event: Event];
};

export type MenuOptionCompactEmits<T extends DefinedValue = DefinedValue> = MenuSubEmits &
  MenuSubContentEmits &
  MenuOptionCompactSelectEmits<T>;

export type MenuOptionCompactSlots<T extends DefinedValue = DefinedValue> = {
  item?: (props: { item: MenuOptionData<T>; isTrigger?: boolean }) => any;
  'item-leading'?: (props: { item: MenuOptionData<T> }) => any;
  'item-trailing'?: (props: { item: MenuOptionData<T> }) => any;
  'item-trigger-icon'?: (props: { item: MenuOptionData<T> }) => any;
  'item-link-icon'?: (props: { item: MenuOptionData<T> }) => any;
};

export interface MenuOptionsCompactProps<T extends DefinedValue = DefinedValue> extends Omit<
  MenuOptionCompactProps<T>,
  'item'
> {
  items: MenuOptionData<T>[];
  /** The active value of the menu. */
  activeValue?: T;
}

export type MenuOptionsCompactEmits<T extends DefinedValue = DefinedValue> = MenuOptionCompactEmits<T>;

export type MenuOptionsCompactSlots<T extends DefinedValue = DefinedValue> = MenuOptionCompactSlots<T>;

export interface MenuCheckboxOptionData<T extends DefinedValue = DefinedValue> extends Omit<
  MenuOptionData<T>,
  'children'
> {}

export interface MenuCheckboxOptionsCompactProps<
  T extends DefinedValue = DefinedValue
> extends MenuCheckboxGroupProps<T> {
  items: MenuCheckboxOptionData<T>[];
  groupLabelProps?: MenuGroupLabelProps;
  checkboxItemProps?: MenuCheckboxItemProps;
  indicatorProps?: MenuItemIndicatorProps;
  shortcutProps?: MenuShortcutProps;
  separatorProps?: MenuSeparatorProps;
}

export type MenuCheckboxOptionsCompactSelectEmits<T extends DefinedValue = DefinedValue> = {
  select: [item: MenuCheckboxOptionData<T>, event: Event];
};

export type MenuCheckboxOptionsCompactEmits<T extends DefinedValue = DefinedValue> = MenuCheckboxGroupEmits<T> &
  MenuCheckboxOptionsCompactSelectEmits<T>;

export type MenuCheckboxOptionsCompactSlots<T extends DefinedValue = DefinedValue> = {
  item?: (props: MenuCheckboxOptionData<T>) => any;
  'item-leading'?: (props: MenuCheckboxOptionData<T>) => any;
  'item-trailing'?: (props: MenuCheckboxOptionData<T>) => any;
  'item-indicator-icon'?: (props: MenuCheckboxOptionData<T>) => any;
};

export interface MenuRadioOptionData<T extends AcceptableBooleanValue = AcceptableBooleanValue>
  extends Pick<MenuItemProps, 'disabled' | 'textValue'>, LinkBaseProps {
  /** The label to display in the menu. */
  label: string;
  /** The value of the option. */
  value: NonNullable<T>;
  /** Whether the option should render as a group label. */
  isGroupLabel?: boolean;
  /** The icon rendered before the label. */
  icon?: IconValue;
  /** Whether to show a separator after this option. */
  separator?: boolean;
  /** The shortcut rendered at the end of the option. */
  shortcut?: KbdValue | KbdValue[];
}

export interface MenuRadioOptionsCompactProps<
  T extends AcceptableBooleanValue = AcceptableBooleanValue
> extends MenuRadioGroupProps<T> {
  items: MenuRadioOptionData<T>[];
  groupLabelProps?: MenuGroupLabelProps;
  radioItemProps?: MenuRadioItemProps;
  indicatorProps?: MenuItemIndicatorProps;
  shortcutProps?: MenuShortcutProps;
  separatorProps?: MenuSeparatorProps;
}

export type MenuRadioOptionsCompactSelectEmits<T extends AcceptableBooleanValue = AcceptableBooleanValue> = {
  select: [item: MenuRadioOptionData<T>, event: Event];
};

export type MenuRadioOptionsCompactEmits<T extends AcceptableBooleanValue = AcceptableBooleanValue> =
  MenuRadioGroupEmits<T> & MenuRadioOptionsCompactSelectEmits<T>;

export type MenuRadioOptionsCompactSlots<T extends AcceptableBooleanValue = AcceptableBooleanValue> = {
  item?: (props: MenuRadioOptionData<T>) => any;
  'item-leading'?: (props: MenuRadioOptionData<T>) => any;
  'item-trailing'?: (props: MenuRadioOptionData<T>) => any;
  'item-indicator-icon'?: (props: MenuRadioOptionData<T>) => any;
};

// Context
export interface MenuRootContext extends PropsToContext<MenuRootProps, 'modal'> {
  dir: ComputedRef<Direction>;
  isUsingKeyboard: ComputedRef<boolean>;
  onClose: () => void;
}
export interface MenuContextParams {
  isRoot?: boolean;
  open: ShallowRef<boolean | undefined>;
}
export interface MenuContentContextParams {
  popupElement: ShallowRef<HTMLElement | undefined>;
}

export interface MenuCheckboxGroupContextParams {
  modelValue: ShallowRef<DefinedValue[] | undefined>;
  disabled: ComputedRef<boolean>;
}
export interface MenuRadioGroupContextParams {
  modelValue: ShallowRef<AcceptableBooleanValue>;
  disabled: ComputedRef<boolean>;
}
export interface MenuItemIndicatorContext {
  modelValue: ComputedRef<CheckedState | undefined>;
}

export interface MenuSubAttributeContext {
  subTrigger: ComputedRef<Record<string, any>>;
  subContent: ComputedRef<Record<string, any>>;
}

export interface MenuOptionsCompactContext<T extends DefinedValue = DefinedValue> {
  activeValue: ComputedRef<T | undefined>;
  activePaths: ComputedRef<T[]>;
}

export type MenuUiSlot =
  | 'positioner'
  | 'popup'
  | 'arrow'
  | 'subPositioner'
  | 'subPopup'
  | 'subTrigger'
  | 'group'
  | 'groupLabel'
  | 'item'
  | 'itemIcon'
  | 'itemLink'
  | 'itemLinkIcon'
  | 'checkboxGroup'
  | 'checkboxItem'
  | 'radioGroup'
  | 'radioItem'
  | 'itemIndicator'
  | 'subTriggerIcon'
  | 'shortcut'
  | 'separator';

export type MenuUi = UiClass<MenuUiSlot>;
