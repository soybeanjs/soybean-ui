import { computed, shallowRef, useId, watchEffect } from 'vue';
import { useContext, useDirection, useForwardElement } from '../../composables';
import { getDisclosureState } from '../../shared';
import { provideMenuThemeContext } from '../menu';
import { DROPDOWN_MENU_HOVER_OPEN } from './shared';
import type {
  DropdownMenuHoverContextParams,
  DropdownMenuRootContextParams,
  DropdownMenuThemeContextParams
} from './types';

export const [provideDropdownMenuRootContext, useDropdownMenuRootContext] = useContext(
  'DropdownMenuRoot',
  (params: DropdownMenuRootContextParams) => {
    const [triggerElement, setTriggerElement] = useForwardElement();

    const { open } = params;

    const onOpenChange = (v: boolean) => {
      open.value = v;
    };

    const onOpenToggle = () => {
      open.value = !open.value;
    };

    const dir = useDirection(params.dir);

    const dataState = computed(() => getDisclosureState(open.value));

    const triggerId = shallowRef('');
    const initTriggerId = () => {
      if (triggerId.value) return;
      triggerId.value = `soybean-dropdown-menu-trigger-${useId()}`;
    };

    const contentId = shallowRef('');
    const initContentId = () => {
      if (contentId.value) return;
      contentId.value = `soybean-dropdown-menu-content-${useId()}`;
    };

    return {
      ...params,
      dir,
      dataState,
      onOpenChange,
      onOpenToggle,
      triggerElement,
      setTriggerElement,
      triggerId,
      initTriggerId,
      contentId,
      initContentId
    };
  }
);

export const [provideDropdownMenuHoverContext, useDropdownMenuHoverContext] = useContext(
  'DropdownMenuHover',
  (params: DropdownMenuHoverContextParams) => {
    const { open, hoverable, delayDuration, skipDelayDuration } = params;

    const isOpenDelayed = shallowRef(true);

    let openDelayedTimer: ReturnType<typeof setTimeout> | null = null;

    const clearOpenDelayedTimer = () => {
      if (openDelayedTimer) {
        clearTimeout(openDelayedTimer);
        openDelayedTimer = null;
      }
    };

    const startOpenDelayedTimer = () => {
      clearOpenDelayedTimer();
      openDelayedTimer = setTimeout(() => {
        isOpenDelayed.value = true;
      }, skipDelayDuration.value);
    };

    const resetOpenDelayed = () => {
      clearOpenDelayedTimer();
      isOpenDelayed.value = false;
    };

    // Reset the inTransit state if idle/scrolled.
    const isPointerInTransitRef = shallowRef(false);

    const wasOpenDelayedRef = shallowRef(false);

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
      // Clear the timer in case the pointer leaves the trigger before the tooltip is opened.
      clearTimer();
    };

    watchEffect(() => {
      if (!hoverable.value) return;

      if (open.value) {
        resetOpenDelayed();

        document.dispatchEvent(new CustomEvent(DROPDOWN_MENU_HOVER_OPEN));
      } else {
        startOpenDelayedTimer();
      }
    });

    return {
      ...params,
      isOpenDelayed,
      isPointerInTransitRef,
      onOpen,
      onClose,
      onTriggerEnter,
      onTriggerLeave
    };
  }
);

export const [provideDropdownMenuThemeContext, useDropdownMenuThemeContext] = useContext(
  'DropdownMenuTheme',
  (params: DropdownMenuThemeContextParams): DropdownMenuThemeContextParams => {
    const menuThemeContext = provideMenuThemeContext(params);

    const context: DropdownMenuThemeContextParams = {
      ui: computed(() => ({
        ...menuThemeContext.ui.value,
        trigger: params.ui.value.trigger
      }))
    };

    return context;
  }
);
