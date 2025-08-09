import { SELECTION_KEYS } from '../../constants';
import type { Direction, NavigationKey } from '../../types';

export const menuContentCssVars = {
  transformOrigin: '--soybean-menu-content-transform-origin',
  availableWidth: '--soybean-menu-content-available-width',
  availableHeight: '--soybean-menu-content-available-height',
  triggerWidth: '--soybean-menu-content-trigger-width',
  triggerHeight: '--soybean-menu-content-trigger-height'
};

export const subMenuCssVars = {
  transformOrigin: '--soybean-sub-menu-content-transform-origin',
  availableWidth: '--soybean-sub-menu-content-available-width',
  availableHeight: '--soybean-sub-menu-content-available-height',
  triggerWidth: '--soybean-sub-menu-trigger-width',
  triggerHeight: '--soybean-sub-menu-trigger-height'
};

export const MENU_CONTENT_DATA_ATTRIBUTE = 'data-soybean-menu-content';

export const ITEM_NAME = 'MenuItem';
export const ITEM_SELECT = 'menu.itemSelect';
export const FIRST_KEYS: string[] = ['ArrowDown', 'PageUp', 'Home'] satisfies NavigationKey[];
export const LAST_KEYS: string[] = ['ArrowUp', 'PageDown', 'End'] satisfies NavigationKey[];
export const FIRST_LAST_KEYS: string[] = [...FIRST_KEYS, ...LAST_KEYS];
export const SUB_OPEN_KEYS: Record<Direction, string[]> = {
  ltr: [...SELECTION_KEYS, 'ArrowRight'],
  rtl: [...SELECTION_KEYS, 'ArrowLeft']
};
export const SUB_CLOSE_KEYS: Record<Direction, string[]> = {
  ltr: ['ArrowLeft'],
  rtl: ['ArrowRight']
};
