import { SELECTION_KEYS } from '../../constants';
import type { Direction, NavigationKey } from '../../types';

export const menuCssVars = {
  popupTransformOrigin: '--soybean-menu-popup-transform-origin',
  popupAvailableWidth: '--soybean-menu-popup-available-width',
  popupAvailableHeight: '--soybean-menu-popup-available-height',
  triggerWidth: '--soybean-menu-trigger-width',
  triggerHeight: '--soybean-menu-trigger-height'
};

export const subMenuCssVars = {
  popupTransformOrigin: '--soybean-sub-menu-popup-transform-origin',
  popupAvailableWidth: '--soybean-sub-menu-popup-available-width',
  popupAvailableHeight: '--soybean-sub-menu-popup-available-height',
  triggerWidth: '--soybean-sub-menu-trigger-width',
  triggerHeight: '--soybean-sub-menu-trigger-height'
};

export const MENU_POPUP_DATA_ATTRIBUTE = 'data-soybean-menu-popup';

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
