import type { ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type { PrimitiveProps } from '../primitive/types';
import type { PropsToContext, UiClass } from '../../types';

/**
 * Props for the page tabs root component.
 */
export interface PageTabsRootProps extends /** @vue-ignore */ HTMLAttributes {
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
 * Emits for the page tabs root component.
 */
export type PageTabsRootEmits = {
  /**
   * Emitted when the active tab change.
   */
  (e: 'update:modelValue', value: string): void;
};

/**
 * Props for the page tabs item component.
 */
export interface PageTabsItemProps extends /** @vue-ignore */ Omit<HTMLAttributes, 'onClick'> {
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
 * Emits for the page tabs item component.
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
 * Props for the page tabs close component.
 */
export interface PageTabsCloseProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the page tabs pin component.
 */
export interface PageTabsPinProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

/**
 * Context for the page tabs root component.
 */
export interface PageTabsRootContext extends PropsToContext<PageTabsRootProps, 'middleClickClose'> {
  /**
   * Current model value.
   */
  modelValue: ShallowRef<string>;
}

/**
 * Context for the page tabs item component.
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
 * Available UI slots for the page tabs component.
 */
export type PageTabsUiSlot = 'root' | 'item' | 'close' | 'pin';

/**
 * UI class overrides for the page tabs component.
 */
export type PageTabsUi = UiClass<PageTabsUiSlot>;
