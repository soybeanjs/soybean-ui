import { useContext } from '../../composables';
import type { RovingFocusGroupContext, RovingFocusGroupContextParams } from './types';

export const [provideRovingFocusGroupContext, injectRovingFocusGroupContext] = useContext(
  'RovingFocusGroup',
  (params: RovingFocusGroupContextParams): RovingFocusGroupContext => ({
    ...params,
    onItemFocus(tabStopId) {
      params.currentTabStopId.value = tabStopId;
    },
    onItemShiftTab() {
      params.isTabbingBackOut.value = true;
    },
    onFocusableItemAdd() {
      params.focusableItemsCount.value++;
    },
    onFocusableItemRemove() {
      params.focusableItemsCount.value--;
    }
  })
);
