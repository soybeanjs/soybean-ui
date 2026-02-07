import type { ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type { PrimitiveProps } from '../primitive/types';
import type { PropsToContext, UiClass } from '../../types';

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

export type PageTabsRootEmits = {
  /**
   * Emitted when the active tab change.
   */
  (e: 'update:modelValue', value: string): void;
};

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

export interface PageTabsCloseProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

export interface PageTabsPinProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

export interface PageTabsRootContextParams extends PropsToContext<PageTabsRootProps, 'middleClickClose'> {
  modelValue: ShallowRef<string>;
}

export interface PageTabsItemContextParams extends PropsToContext<PageTabsItemProps, 'pinned'> {
  closable: ComputedRef<boolean>;
  onClose: () => Promise<void>;
  onPin: () => void;
}

export type PageTabsUiSlot = 'root' | 'item' | 'close' | 'pin';

export type PageTabsUi = UiClass<PageTabsUiSlot>;
