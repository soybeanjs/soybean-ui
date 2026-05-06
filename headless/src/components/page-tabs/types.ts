import type { ComputedRef, ShallowRef } from 'vue';
import type { PrimitiveWithBaseProps } from '../primitive/types';
import type { BaseProps, PropsToContext, UiClass } from '../../types';

/**
 * Properties for the PageTabsRoot component.
 */
export interface PageTabsRootProps extends BaseProps {
  /**
   * The active tab value.
   */
  modelValue?: string;
  /**
   * Whether middle-clicking a tab closes it.
   */
  middleClickClose?: boolean;
}

/**
 * Events for the PageTabsRoot component.
 */
export type PageTabsRootEmits = {
  /**
   * Emitted when the active tab change.
   */
  (e: 'update:modelValue', value: string): void;
};

/**
 * Properties for the PageTabsItem component.
 */
export interface PageTabsItemProps extends Omit<BaseProps, 'onClick'> {
  /**
   * The unique value of the tab.
   */
  value: string;
  /**
   * Whether the tab is pinned.
   */
  pinned?: boolean;
}

/**
 * Events for the PageTabsItem component.
 */
export type PageTabsItemEmits = {
  /**
   * Emitted when the tab is clicked.
   */
  (e: 'click'): void;
  /**
   * Emitted when the tab is requested to be closed.
   */
  (e: 'close'): void;
  /**
   * Emitted when the tab is requested to be pinned.
   */
  (e: 'pin', pinned: boolean): void;
};

/**
 * Properties for the PageTabsClose component.
 */
export interface PageTabsCloseProps extends PrimitiveWithBaseProps {}

/**
 * Properties for the PageTabsPin component.
 */
export interface PageTabsPinProps extends PrimitiveWithBaseProps {}

/**
 * Context for the PageTabsRoot component.
 */
export interface PageTabsRootContext extends PropsToContext<PageTabsRootProps, 'middleClickClose'> {
  /**
   * Current model value.
   */
  modelValue: ShallowRef<string>;
}

/**
 * Context for the PageTabsItem component.
 */
export interface PageTabsItemContext extends PropsToContext<PageTabsItemProps, 'pinned'> {
  /**
   * Whether the component can be closed.
   */
  closable: ComputedRef<boolean>;
  /**
   * Callback invoked when the close event fires.
   */
  onClose: () => Promise<void>;
  /**
   * Callback invoked when the pin event fires.
   */
  onPin: () => void;
}

/**
 * Available UI slots for the PageTabs component.
 */
export type PageTabsUiSlot = 'root' | 'item' | 'close' | 'pin';

/**
 * UI class overrides for the PageTabs component.
 */
export type PageTabsUi = UiClass<PageTabsUiSlot>;
