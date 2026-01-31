import type { HTMLAttributes, ShallowRef, Ref } from 'vue';
import type { PrimitiveProps } from '../primitive/types';
import type { MaybePromise, PropsToContext, UiClass } from '../../types';

export interface PageTabsRootProps extends /** @vue-ignore */ HTMLAttributes {
  /**
   * The v-model value of the active tab.
   */
  modelValue?: string;
  /**
   * The default active tab value (uncontrolled).
   */
  defaultValue?: string;
  /**
   * Array of pinned tab values.
   */
  pins?: string[];
  /**
   * Default array of pinned tab values (uncontrolled).
   */
  defaultPins?: string[];
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
   * Emitted when the active tab changes.
   */
  (e: 'update:modelValue', value: string | undefined): void;
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
  /**
   * Whether the tab is closable.
   */
  closable?: boolean;
}

export type PageTabsItemEmits = {
  /**
   * Emitted when the tab is requested to be closed.
   */
  (e: 'close'): void;
};

export interface PageTabsCloseProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

export interface PageTabsPinProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

export interface PageTabsRootContextParams extends PropsToContext<PageTabsRootProps, 'middleClickClose'> {
  modelValue: ShallowRef<string | undefined>;
  pins: ShallowRef<string[]>;
  values: Ref<string[]>;
  beforeClose: (value: string) => MaybePromise<boolean | void>;
}

export interface PageTabsItemContextParams extends PropsToContext<PageTabsItemProps, 'closable'> {
  pinned: ShallowRef<boolean>;
  onClose: () => Promise<void>;
  onPin: () => void;
}

export type PageTabsUiSlot = 'root' | 'item' | 'close' | 'pin';

export type PageTabsUi = UiClass<PageTabsUiSlot>;
