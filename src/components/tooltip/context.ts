import { computed, shallowRef, useId } from 'vue';
import { useContext } from '../../composables';
import type { TooltipDataState, TooltipOpenDelayedContextParams, TooltipRootContextParams } from './types';

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

    const contentId = shallowRef('');
    const initContentId = () => {
      if (contentId.value) return;
      contentId.value = `soybean-tooltip-content-${useId()}`;
    };

    const wasOpenDelayedRef = shallowRef(false);

    const dataState = computed<TooltipDataState>(() => {
      if (!open.value) return 'closed';
      return wasOpenDelayedRef.value ? 'delayed-open' : 'instant-open';
    });

    const triggerElement = shallowRef<HTMLElement>();
    const onTriggerElementChange = (element: HTMLElement) => {
      triggerElement.value = element;
    };

    const contentElement = shallowRef<HTMLElement>();
    const onContentElementChange = (element: HTMLElement) => {
      contentElement.value = element;
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
      contentId,
      dataState,
      triggerElement,
      onTriggerElementChange,
      initContentId,
      contentElement,
      onContentElementChange,
      onTriggerEnter,
      onTriggerLeave,
      onOpen,
      onClose
    };
  }
);
