import type {
  PageTabsRootProps,
  PageTabsItemProps,
  PageTabsUiSlot,
  PageTabsOperations,
  ClassValue,
  MaybePromise
} from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';
import type { PageTabsVariant } from '@/variants/page-tabs';
import type { IconValue } from '../icon/types';
import type { MenuOptionData } from '../menu/types';

export interface PageTabsOptionData extends PageTabsItemProps {
  label: string;
  icon?: IconValue;
  /**
   * Whether the tab is pinned or not.
   *
   * @default false
   */
  pinned?: boolean;
  /**
   * Whether to hide the pinned icon on the tab
   */
  hidePinnedIcon?: boolean;
}

export type PageTabsExtraUiSlot = 'itemText' | 'chromeBgLeft' | 'chromeBgRight' | 'sliderIndicator';

export type PageTabsExtendedUi = Record<PageTabsUiSlot | PageTabsExtraUiSlot, ClassValue>;

export interface PageTabsState {
  pinTab: () => void;
  unpinTab: () => void;
  closeTab: () => Promise<void>;
  closeLeftTabs: () => void;
  closeRightTabs: () => void;
  closeOtherTabs: () => void;
  closeAllTabs: () => void;
  canCloseTab: boolean;
  canCloseLeftTabs: boolean;
  canCloseRightTabs: boolean;
  canCloseOtherTabs: boolean;
  canCloseAllTabs: boolean;
}

export interface PageTabsContextMenuOptionData extends MenuOptionData<string> {
  action: () => MaybePromise<void>;
}

export interface PageTabsProps<T extends PageTabsOptionData> extends Omit<
  PageTabsRootProps,
  'values' | 'pins' | 'residents'
> {
  /**
   * root element class
   */
  class?: ClassValue;
  size?: ThemeSize;
  variant?: PageTabsVariant;
  ui?: Partial<PageTabsExtendedUi>;
  items: T[];
  /**
   * A factory function to generate context menu options for each tab.
   * @param tab The tab data
   * @param state The current state and operations for the tab
   */
  menuFactory?: (tab: T, state: PageTabsState) => PageTabsContextMenuOptionData[];
}

export type PageTabsEmits<T> = {
  (e: 'update:modelValue', value: string): void;
  (e: 'update:items', value: T[]): void;
  (e: 'close', tab: T): void;
  (e: 'pin', tab: T): void;
};

export type { PageTabsOperations, PageTabsVariant };
