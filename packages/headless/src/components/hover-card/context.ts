import { shallowRef } from 'vue';
import { providePopperV2Ui } from '../popper-v2/context';
import { useContext, useUiContext } from '../../composables';
import type { PopperV2UiSlot } from '../popper-v2/types';
import type { HoverCardRootContext, HoverCardRootContextParams } from './types';

export const [provideHoverCardRootContext, useHoverCardRootContext] = useContext(
  'HoverCardRoot',
  (params: HoverCardRootContextParams): HoverCardRootContext => {
    const hasSelectionRef = shallowRef(false);
    const isPointerDownOnPopupRef = shallowRef(false);

    return {
      ...params,
      hasSelectionRef,
      isPointerDownOnPopupRef
    };
  }
);

export const [provideHoverCardUi, useHoverCardUi] = useUiContext<PopperV2UiSlot>('HoverCard', ui => {
  providePopperV2Ui(ui);

  return ui;
});
