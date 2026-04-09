import { computed, shallowRef } from 'vue';
import { useContext } from '../../composables';
import { getDisclosureState } from '../../shared';
import type { HoverCardRootContext, HoverCardRootContextParams } from './types';

export const [provideHoverCardRootContext, useHoverCardRootContext] = useContext(
  'HoverCardRoot',
  (params: HoverCardRootContextParams): HoverCardRootContext => {
    const { open, openDelay, closeDelay } = params;

    const dataState = computed(() => getDisclosureState(open.value));

    const triggerElement = shallowRef<HTMLElement>();
    const onTriggerElementChange = (element: HTMLElement) => {
      triggerElement.value = element;
    };

    const popupElement = shallowRef<HTMLElement>();
    const onPopupElementChange = (element: HTMLElement) => {
      popupElement.value = element;
    };

    const hasSelectionRef = shallowRef(false);
    const isPointerDownOnPopupRef = shallowRef(false);
    const isPointerInTransitRef = shallowRef(false);

    let openTimerId: ReturnType<typeof setTimeout> | null = null;
    let closeTimerId: ReturnType<typeof setTimeout> | null = null;

    const clearOpenTimer = () => {
      if (!openTimerId) return;
      clearTimeout(openTimerId);
      openTimerId = null;
    };

    const clearCloseTimer = () => {
      if (!closeTimerId) return;
      clearTimeout(closeTimerId);
      closeTimerId = null;
    };

    const onOpen = () => {
      clearCloseTimer();
      clearOpenTimer();
      openTimerId = setTimeout(() => {
        open.value = true;
      }, openDelay.value);
    };

    const onClose = () => {
      clearOpenTimer();
      clearCloseTimer();
      if (hasSelectionRef.value || isPointerDownOnPopupRef.value) {
        return;
      }
      closeTimerId = setTimeout(() => {
        open.value = false;
      }, closeDelay.value);
    };

    const onDismiss = () => {
      clearOpenTimer();
      clearCloseTimer();
      open.value = false;
    };

    return {
      ...params,
      dataState,
      triggerElement,
      onTriggerElementChange,
      popupElement,
      onPopupElementChange,
      hasSelectionRef,
      isPointerDownOnPopupRef,
      isPointerInTransitRef,
      onOpen,
      onClose,
      onDismiss
    };
  }
);
