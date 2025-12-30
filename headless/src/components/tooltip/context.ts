import { computed, shallowRef, useId } from 'vue';
import { useContext } from '../../composables';
import type {
  TooltipDataState,
  TooltipOpenDelayedContextParams,
  TooltipPositionerContextParams,
  TooltipRootContextParams
} from './types';

export const [provideTooltipOpenDelayedContext, useTooltipOpenDelayedContext] = useContext(
  'TooltipOpenDelayed',
  (params: TooltipOpenDelayedContextParams) => {
    const { skipDelayDuration } = params;

    const isOpenDelayed = shallowRef(true);
    // Reset the inTransit state if idle/scrolled.
    const isPointerInTransitRef = shallowRef(false);

    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const clearTimer = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    };

    const startTimer = () => {
      clearTimer();
      timeoutId = setTimeout(() => {
        isOpenDelayed.value = true;
      }, skipDelayDuration.value);
    };
    const onOpen = () => {
      clearTimer();
      isOpenDelayed.value = false;
    };
    const onClose = () => {
      startTimer();
    };

    return {
      skipDelayDuration,
      isOpenDelayed,
      isPointerInTransitRef,
      onOpen,
      onClose
    };
  }
);

export const [provideTooltipRootContext, useTooltipRootContext] = useContext(
  'TooltipRoot',
  (params: TooltipRootContextParams) => {
    const { open, delayDuration, isOpenDelayed, disableHoverableContent } = params;

    const popupId = shallowRef('');
    const initPopupId = () => {
      if (popupId.value) return;
      popupId.value = `soybean-tooltip-popup-${useId()}`;
    };

    const wasOpenDelayedRef = shallowRef(false);

    const dataState = computed<TooltipDataState>(() => {
      if (!open.value) return 'closed';
      return wasOpenDelayedRef.value ? 'delayed-open' : 'instant-open';
    });

    const popupElement = shallowRef<HTMLElement>();
    const onPopupElementChange = (element: HTMLElement) => {
      popupElement.value = element;
    };

    const triggerElement = shallowRef<HTMLElement>();
    const onTriggerElementChange = (element: HTMLElement) => {
      triggerElement.value = element;
    };

    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const clearTimer = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    };

    const startTimer = () => {
      clearTimer();
      timeoutId = setTimeout(() => {
        wasOpenDelayedRef.value = true;
        open.value = true;
      }, delayDuration.value);
    };

    const onOpen = () => {
      clearTimer();
      wasOpenDelayedRef.value = false;
      open.value = true;
    };
    const onClose = () => {
      clearTimer();
      open.value = false;
    };
    const onDelayedOpen = () => {
      startTimer();
    };
    const onTriggerEnter = () => {
      if (isOpenDelayed.value) {
        onDelayedOpen();
      } else {
        onOpen();
      }
    };
    const onTriggerLeave = () => {
      if (disableHoverableContent.value) {
        onClose();
      } else {
        // Clear the timer in case the pointer leaves the trigger before the tooltip is opened.
        clearTimer();
      }
    };

    return {
      ...params,
      dataState,
      popupId,
      initPopupId,
      popupElement,
      onPopupElementChange,
      triggerElement,
      onTriggerElementChange,
      onTriggerEnter,
      onTriggerLeave,
      onOpen,
      onClose
    };
  }
);

export const [provideTooltipPositionerContext, useTooltipPositionerContext] = useContext(
  'TooltipPositioner',
  (params: TooltipPositionerContextParams) => params
);
