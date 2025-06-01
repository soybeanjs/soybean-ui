import { computed, ref, useId } from 'vue';
import { useContext, useForwardElement } from '../../composables';
import type { TooltipDataState, TooltipProviderContextParams, TooltipRootContextParams } from './types';

export const [provideTooltipProviderContext, useTooltipProviderContext] = useContext(
  'TooltipProvider',
  (params: TooltipProviderContextParams) => {
    const { skipDelayDuration } = params;

    const isOpenDelayed = ref(true);
    // Reset the inTransit state if idle/scrolled.
    const isPointerInTransitRef = ref(false);

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
      ...params,
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
    const [contentElement, setContentElement] = useForwardElement();
    const [triggerElement, setTriggerElement] = useForwardElement();

    const { open, delayDuration, isOpenDelayed, disableHoverableContent } = params;

    const contentId = ref('');
    const initContentId = () => {
      if (contentId.value) return;
      contentId.value = `soybean-tooltip-content-${useId()}`;
    };

    const wasOpenDelayedRef = ref(false);

    const dataState = computed<TooltipDataState>(() => {
      if (!open.value) return 'closed';
      return wasOpenDelayedRef.value ? 'delayed-open' : 'instant-open';
    });

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
      contentId,
      initContentId,
      contentElement,
      setContentElement,
      dataState,
      triggerElement,
      setTriggerElement,
      onTriggerEnter,
      onTriggerLeave,
      onOpen,
      onClose
    };
  }
);
