import { isNullish } from '../../shared';
import type { DefinedValue, MaybeArray } from '../../types';

export const selectCssVars = {
  popupTransformOrigin: '--soybean-select-popup-transform-origin',
  popupAvailableWidth: '--soybean-select-popup-available-width',
  popupAvailableHeight: '--soybean-select-popup-available-height',
  triggerWidth: '--soybean-select-trigger-width',
  triggerHeight: '--soybean-select-trigger-height'
};

export const OPEN_KEYS = [' ', 'Enter', 'ArrowUp', 'ArrowDown'];
export const SELECTION_KEYS = [' ', 'Enter'];
export const CONTENT_MARGIN = 10;

export const SELECT_EVENT = 'select.select';

export function shouldShowPlaceholder(value?: MaybeArray<DefinedValue> | undefined): boolean {
  return isNullish(value) || value === '' || (Array.isArray(value) && value.length === 0);
}
