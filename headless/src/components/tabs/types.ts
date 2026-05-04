import type { HTMLAttributes, ShallowRef } from 'vue';
import type { AcceptableValue, DefinedValue, ForceMountProps, PropsToContext, UiClass } from '../../types';
import type { PrimitiveProps } from '../primitive/types';
import type { RovingFocusGroupProps } from '../roving-focus/types';

/**
 * Type information for TabsActivationMode.
 */
export type TabsActivationMode = 'automatic' | 'manual';

/**
 * Properties for the TabsRoot component.
 */
export interface TabsRootProps<T extends AcceptableValue = AcceptableValue> extends Omit<
  RovingFocusGroupProps,
  'as' | 'asChild' | 'currentTabStopId' | 'defaultCurrentTabStopId' | 'preventScrollOnEntryFocus'
> {
  /** The controlled value of the tab to activate. Can be bind as `v-model`. */
  modelValue?: T;
  /**
   * The value of the tab that should be active when initially rendered. Use when you do not need to control the state
   * of the tabs
   */
  defaultValue?: T;
  /**
   * Whether a tab is activated automatically (on focus) or manually (on click).
   *
   * @defaultValue automatic
   */
  activationMode?: TabsActivationMode;
  /**
   * When `true`, the element will be unmounted on closed state.
   *
   * @defaultValue `true`
   */
  unmountOnHide?: boolean;
}

/**
 * Events for the TabsRoot component.
 */
export type TabsRootEmits<T = AcceptableValue> = {
  /** Event handler called when the value changes */
  'update:modelValue': [payload: NonNullable<T>];
};

/**
 * Properties for the TabsList component.
 */
export interface TabsListProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Properties for the TabsContent component.
 */
export interface TabsContentProps extends ForceMountProps, /** @vue-ignore */ HTMLAttributes {
  /** A unique value that associates the content with a trigger. */
  value: DefinedValue;
}

/**
 * Properties for the TabsTrigger component.
 */
export interface TabsTriggerProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  /** A unique value that associates the trigger with a content. */
  value: DefinedValue;
  /** When `true`, prevents the user from interacting with the tab. */
  disabled?: boolean;
}

/**
 * Properties for the TabsIndicator component.
 */
export interface TabsIndicatorProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

/**
 * Option data for the Tabs component.
 */
export interface TabsOptionData<T extends DefinedValue = DefinedValue> {
  /**
   * Value associated with the current item.
   */
  value: T;
  /**
   * Label text rendered by the component.
   */
  label: string;
  /**
   * Whether the component is disabled.
   */
  disabled?: boolean;
}

/**
 * Properties for the TabsCompact component.
 */
export interface TabsCompactProps<T extends TabsOptionData = TabsOptionData> extends TabsRootProps<T['value'] | null> {
  /**
   * Items rendered by the component.
   */
  items: T[];
  /**
   * Whether to enable indicator.
   */
  enableIndicator?: boolean;
  /**
   * Properties forwarded to the list element.
   */
  listProps?: TabsListProps;
  /**
   * Properties forwarded to the trigger element.
   */
  triggerProps?: TabsTriggerProps;
  /**
   * Properties forwarded to the content element.
   */
  contentProps?: TabsContentProps;
  /**
   * Properties forwarded to the indicator element.
   */
  indicatorProps?: TabsIndicatorProps;
}

/**
 * Events for the TabsCompact component.
 */
export type TabsCompactEmits<T extends AcceptableValue = AcceptableValue> = TabsRootEmits<T>;

/**
 * Slots for the TabsCompact component.
 */
export type TabsCompactSlots<T extends TabsOptionData = TabsOptionData> = {
  /**
   * Custom content for the trigger slot.
   */
  trigger?: (props: T & { active: boolean }) => any;
  /**
   * Custom content for the content slot.
   */
  content?: (props: T & { active: boolean }) => any;
  /**
   * Custom content for the indicator slot.
   */
  indicator?: () => any;
};

/**
 * Parameters used to create the TabsRoot context.
 */
export interface TabsRootContextParams extends PropsToContext<
  TabsRootProps,
  'orientation' | 'dir' | 'loop' | 'unmountOnHide' | 'activationMode'
> {
  /**
   * Current model value.
   */
  modelValue: ShallowRef<AcceptableValue>;
}

/**
 * Available UI slots for the Tabs component.
 */
export type TabsUiSlot = 'root' | 'list' | 'trigger' | 'content' | 'indicator' | 'indicatorContent';

/**
 * UI class overrides for the Tabs component.
 */
export type TabsUi = UiClass<TabsUiSlot>;
