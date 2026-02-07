import type {
  PageTabsRootProps,
  PageTabsRootEmits,
  PageTabsItemProps,
  PageTabsUiSlot,
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
   * Whether to hide the pinned icon on the tab
   */
  hidePinnedIcon?: boolean;
}

export type PageTabsExtraUiSlot = 'itemText' | 'chromeBgLeft' | 'chromeBgRight' | 'sliderIndicator';

export type PageTabsExtendedUi = Record<PageTabsUiSlot | PageTabsExtraUiSlot, ClassValue>;

export interface PageTabsState {
  pin: () => void;
  unpin: () => void;
  closable: boolean;
  close: () => Promise<void>;
  leftClosable: boolean;
  closeLeft: () => void;
  rightClosable: boolean;
  closeRight: () => void;
  otherClosable: boolean;
  closeOther: () => void;
  allClosable: boolean;
  closeAll: () => void;
}

export interface PageTabsContextMenuOptionData extends MenuOptionData<string> {
  /**
   * Action to perform when the menu item is selected.
   */
  action?: () => MaybePromise<void>;
}

export interface PageTabsProps<T extends PageTabsOptionData> extends PageTabsRootProps {
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
  /**
   * Callback invoked before closing the tab. Return `false` or a promise that resolves to `false` to prevent closing.
   * @param value
   */
  beforeClose?: (value: string) => MaybePromise<boolean | void>;
}

export type PageTabsEmits<T> = PageTabsRootEmits & {
  (e: 'update:items', items: T[]): void;
  (e: 'click', tab: T): void;
  (e: 'close', tab: T): void;
  (e: 'pin', tab: T): void;
  (e: 'contextmenu', tab: T): void;
  (e: 'select-context-menu', menu: PageTabsContextMenuOptionData, tab: T): void;
};

export type { PageTabsVariant };
