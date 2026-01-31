import type {
  PageTabsRootProps,
  PageTabsRootEmits,
  PageTabsItemProps,
  PageTabsUiSlot,
  ClassValue,
  DefinedValue
} from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';
import type { PageTabsVariant } from '@/variants/page-tabs';
import type { IconValue } from '../icon/types';
import type { MenuOptionData } from '../menu/types';

export interface PageTabsOptionData extends PageTabsItemProps {
  label: string;
  icon?: IconValue;
}

export type PageTabsExtraUiSlot = 'itemText' | 'chromeBgLeft' | 'chromeBgRight' | 'sliderIndicator';

export type PageTabsExtendedUi = Record<PageTabsUiSlot | PageTabsExtraUiSlot, ClassValue>;

export interface PageTabsProps<
  T extends PageTabsOptionData,
  S extends DefinedValue,
  U extends MenuOptionData<S>
> extends PageTabsRootProps {
  /**
   * root element class
   */
  class?: ClassValue;
  size?: ThemeSize;
  variant?: PageTabsVariant;
  ui?: Partial<PageTabsExtendedUi>;
  items: T[];
  contextMenus?: U[];
}

export type PageTabsEmits<T> = PageTabsRootEmits & {
  (e: 'close', value: string): void;
  (e: 'enterItem', value: string): void;
  (e: 'selectContextMenu', menu: T, pageValue: string): void;
};

export type { PageTabsVariant };
