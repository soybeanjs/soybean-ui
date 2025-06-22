import { isNullish } from '../../shared';
import type { SingleOrMultipleValue } from '../../types';

export const selectCssVars = {
  contentTransformOrigin: '--soybean-select-content-transform-origin',
  contentAvailableWidth: '--soybean-select-content-available-width',
  contentAvailableHeight: '--soybean-select-content-available-height',
  triggerWidth: '--soybean-select-trigger-width',
  triggerHeight: '--soybean-select-trigger-height'
};

export const OPEN_KEYS = [' ', 'Enter', 'ArrowUp', 'ArrowDown'];
export const SELECTION_KEYS = [' ', 'Enter'];
export const CONTENT_MARGIN = 10;

export const SELECT_EVENT = 'select.select';

export function shouldShowPlaceholder(value?: SingleOrMultipleValue): boolean {
  return isNullish(value) || value === '' || (Array.isArray(value) && value.length === 0);
}
