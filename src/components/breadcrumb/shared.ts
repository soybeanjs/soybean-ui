import type { BreadcrumbOptionData, BreadcrumbProps } from './types';

export function getEllipsisRange(items: BreadcrumbOptionData[], ellipsis?: BreadcrumbProps['ellipsis']) {
  /** when the item count is greater than 4, we will show ellipsis */
  const MIN_ITEM_COUNT_WITH_ELLIPSIS = 5;

  if (!ellipsis || items.length < MIN_ITEM_COUNT_WITH_ELLIPSIS) return null;

  if (ellipsis === true) {
    return [1, items.length - 2];
  }

  let [start, end] = ellipsis;

  if (start === 0) {
    start = 1;
  }

  if (end === items.length) {
    end = items.length - 1;
  }

  return [start, end];
}
