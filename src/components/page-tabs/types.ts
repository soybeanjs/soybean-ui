import type {
  PageTabsRootProps,
  PageTabsRootEmits,
  PageTabsItemProps,
  PageTabsUiSlot
} from '@soybeanjs/headless/page-tabs';
import type { ClassValue, MaybePromise } from '@soybeanjs/headless/types';
import type { ThemeSize } from '@/theme';
import type { IconValue } from '../icon/types';
import type { MenuOptionData } from '../menu';
import type { PageTabsVariant } from './variants';

/**
 * Option data for the PageTabs component.
 */
export interface PageTabsOptionData extends PageTabsItemProps {
  /**
   * Label text rendered by the component.
   */
  label: string;
  /**
   * Icon rendered by the component.
   */
  icon?: IconValue;
  /**
   * Whether to hide the pinned icon on the tab
   */
  hidePinnedIcon?: boolean;
}

/**
 * Additional UI slots for the page tabs component.
 */
export type PageTabsExtraUiSlot = 'itemText' | 'chromeBgLeft' | 'chromeBgRight' | 'sliderIndicator';

/**
 * Extended UI class overrides for the PageTabs component.
 */
export type PageTabsExtendedUi = Record<PageTabsUiSlot | PageTabsExtraUiSlot, ClassValue>;

/**
 * State values for PageTabsState.
 */
export interface PageTabsState {
  /**
   * Pin.
   */
  pin: () => void;
  /**
   * Unpin.
   */
  unpin: () => void;
  /**
   * Whether the component can be closed.
   */
  closable: boolean;
  /**
   * Close.
   */
  close: () => Promise<void>;
  /**
   * Whether left closable.
   */
  leftClosable: boolean;
  /**
   * Close left.
   */
  closeLeft: () => void;
  /**
   * Whether right closable.
   */
  rightClosable: boolean;
  /**
   * Close right.
   */
  closeRight: () => void;
  /**
   * Whether other closable.
   */
  otherClosable: boolean;
  /**
   * Close other.
   */
  closeOther: () => void;
  /**
   * Whether all closable.
   */
  allClosable: boolean;
  /**
   * Close all.
   */
  closeAll: () => void;
}

/**
 * Option data for the PageTabsContextMenu component.
 */
export interface PageTabsContextMenuOptionData extends MenuOptionData<string> {
  /**
   * Action to perform when the menu item is selected.
   */
  action?: () => MaybePromise<void>;
}

/**
 * Properties for the PageTabs component.
 */
export interface PageTabsProps<T extends PageTabsOptionData> extends PageTabsRootProps {
  /**
   * root element class
   */
  class?: ClassValue;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Visual variant of the component.
   */
  variant?: PageTabsVariant;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<PageTabsExtendedUi>;
  /**
   * Items rendered by the component.
   */
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

/**
 * Events for the PageTabs component.
 */
export type PageTabsEmits<T> = PageTabsRootEmits & {
  (e: 'update:items', items: T[]): void;
  (e: 'click', tab: T): void;
  (e: 'close', tab: T): void;
  (e: 'pin', tab: T): void;
  (e: 'contextmenu', tab: T): void;
  (e: 'selectContextMenu', menu: PageTabsContextMenuOptionData, tab: T): void;
};

export type { PageTabsVariant };
