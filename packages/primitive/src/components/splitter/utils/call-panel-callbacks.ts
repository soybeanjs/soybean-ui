import { isNullish } from '../../../shared';
import type { PanelData } from '../types';
import { assert } from './assert';

// Layout should be pre-converted into percentages
export function callPanelCallbacks(
  panelsArray: PanelData[],
  layout: number[],
  panelIdToLastNotifiedSizeMap: Record<string, number>
) {
  layout.forEach((size, index) => {
    const panelData = panelsArray[index];
    assert(panelData);

    const { callbacks, constraints, id: panelId } = panelData;
    const { collapsedSize = 0, collapsible } = constraints;

    const lastNotifiedSize = panelIdToLastNotifiedSizeMap[panelId];
    if (isNullish(lastNotifiedSize) || size !== lastNotifiedSize) {
      panelIdToLastNotifiedSizeMap[panelId] = size;

      const { onCollapse, onExpand, onResize } = callbacks;

      if (onResize) onResize(size, lastNotifiedSize);

      if (collapsible && (onCollapse || onExpand)) {
        if (onExpand && (isNullish(lastNotifiedSize) || lastNotifiedSize === collapsedSize) && size !== collapsedSize) {
          onExpand();
        }

        if (
          onCollapse &&
          (isNullish(lastNotifiedSize) || lastNotifiedSize !== collapsedSize) &&
          size === collapsedSize
        ) {
          onCollapse();
        }
      }
    }
  });
}
