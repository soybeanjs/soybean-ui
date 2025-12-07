import type { ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type { AcceptableValue, ClassValue, DefinedValue, ForceMountProps, PropsToContext } from '../../types';
import type { PrimitiveProps } from '../primitive/types';
import type { RovingFocusGroupProps } from '../roving-focus/types';

export type TabsActivationMode = 'automatic' | 'manual';

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

export type TabsRootEmits<T = AcceptableValue> = {
  /** Event handler called when the value changes */
  'update:modelValue': [payload: NonNullable<T>];
};

export interface TabsListProps extends /** @vue-ignore */ HTMLAttributes {}

export interface TabsContentProps extends ForceMountProps, /** @vue-ignore */ HTMLAttributes {
  /** A unique value that associates the content with a trigger. */
  value: DefinedValue;
}

export interface TabsTriggerProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  /** A unique value that associates the trigger with a content. */
  value: DefinedValue;
  /** When `true`, prevents the user from interacting with the tab. */
  disabled?: boolean;
}

export interface TabsIndicatorProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

export interface TabsRootContextParams extends PropsToContext<
  TabsRootProps,
  'orientation' | 'dir' | 'loop' | 'unmountOnHide' | 'activationMode'
> {
  modelValue: ShallowRef<AcceptableValue>;
}

export type TabsThemeSlot = 'root' | 'list' | 'trigger' | 'content' | 'indicator';

export type TabsUi = Record<TabsThemeSlot, ClassValue>;

export interface TabsThemeContextParams {
  ui: ComputedRef<TabsUi>;
}
