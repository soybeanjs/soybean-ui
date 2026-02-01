import type { ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type { PrimitiveProps } from '../primitive/types';
import type { MaybePromise, PropsToContext, UiClass } from '../../types';

export interface PageTabsRootProps extends /** @vue-ignore */ HTMLAttributes {
  /**
   * The active tab value.
   */
  modelValue?: string;
  /**
   * The tab values.
   */
  values?: string[];
  /**
   * The pinned tab values.
   */
  pins?: string[];
  /**
   * Callback invoked before closing the tab. Return `false` or a promise that resolves to `false` to prevent closing.
   */
  beforeClose?: (value: string) => MaybePromise<boolean | void>;
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
  /**
   * Emitted when the tab values change.
   */
  (e: 'update:values', values: string[]): void;
  /**
   * Emitted when the pinned tabs change.
   */
  (e: 'update:pins', value: string[]): void;
};

export interface PageTabsItemProps extends /** @vue-ignore */ HTMLAttributes {
  /**
   * The unique value of the tab.
   */
  value: string;
}

export type PageTabsItemEmits = {
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
  values: ShallowRef<string[]>;
  pins: ShallowRef<string[]>;
  beforeClose: (value: string) => MaybePromise<boolean | void>;
}

export interface PageTabsItemContextParams {
  pinned: ShallowRef<boolean>;
  closable: ComputedRef<boolean>;
  onClose: () => Promise<void>;
  onPin: () => void;
}

export type UsePageTabsOperationOptions = Omit<PageTabsRootContextParams, 'middleClickClose'>;

export type PageTabsUiSlot = 'root' | 'item' | 'close' | 'pin';

export type PageTabsUi = UiClass<PageTabsUiSlot>;

export interface PageTabsOperations {
  isActiveTab: (value: string) => boolean;
  setActiveTab: (value: string) => void;
  addTab: (value: string) => void;
  removeTab: (value: string) => void;
  isTabPinned: (value: string) => boolean;
  pinTab: (value: string) => void;
  unpinTab: (value: string) => void;
  togglePinTab: (value: string) => void;
  closeTab: (value: string, onClose?: (() => void) | undefined) => Promise<void>;
  closeLeftTabs: (value: string) => void;
  closeRightTabs: (value: string) => void;
  closeOtherTabs: (value: string) => void;
  closeAllTabs: () => void;
  canCloseTab: (value: string) => boolean;
  canCloseLeftTabs: (value: string) => boolean;
  canCloseRightTabs: (value: string) => boolean;
  canCloseOtherTabs: (value: string) => boolean;
  canCloseAllTabs: () => boolean;
}
