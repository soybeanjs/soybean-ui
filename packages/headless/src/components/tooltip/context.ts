import { shallowRef } from 'vue';
import { providePopperV2Ui } from '../popper-v2/context';
import { useContext, useUiContext } from '../../composables';
import type { PopperV2UiSlot } from '../popper-v2/types';
import type { TooltipProviderContext, TooltipRootContextParams } from './types';

export const [provideTooltipProviderContext, useTooltipProviderContext] = useContext(
  'TooltipProvider',
  (params: Omit<TooltipProviderContext, 'isOpenDelayed' | 'rootOpened' | 'rootClosed'>) => {
    const { skipDelayDuration } = params;

    const isOpenDelayed = shallowRef(true);

    let skipDelayTimer: ReturnType<typeof setTimeout> | undefined;

    function clearTimer() {
      if (skipDelayTimer === undefined) return;
      clearTimeout(skipDelayTimer);
      skipDelayTimer = undefined;
    }

    function onOpen() {
      clearTimer();
      isOpenDelayed.value = false;
    }

    // The skip-delay window only starts once the last open tooltip inside the provider closes;
    // while any tooltip stays open the next sibling open must stay instant.
    function onClose() {
      clearTimer();
      skipDelayTimer = setTimeout(() => {
        isOpenDelayed.value = true;
        skipDelayTimer = undefined;
      }, skipDelayDuration.value);
    }

    const openRootClosers = new Map<string, () => void>();

    function rootOpened(id: string, close: () => void) {
      onOpen();

      openRootClosers.forEach((closer, rootId) => {
        if (rootId !== id) closer();
      });
      openRootClosers.set(id, close);
    }

    function rootClosed(id: string) {
      openRootClosers.delete(id);

      if (openRootClosers.size === 0) {
        onClose();
      }
    }

    return {
      ...params,
      isOpenDelayed,
      rootOpened,
      rootClosed
    };
  }
);

export const [provideTooltipRootContext, useTooltipRootContext] = useContext(
  'TooltipRoot',
  (params: TooltipRootContextParams) => params
);

export const [provideTooltipUi, useTooltipUi] = useUiContext<PopperV2UiSlot>('Tooltip', ui => {
  providePopperV2Ui(ui);

  return ui;
});
