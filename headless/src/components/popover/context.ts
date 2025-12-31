import { computed, shallowRef, useId } from 'vue';
import { useContext } from '../../composables';
import { getDisclosureState } from '../../shared';
import type { DisclosureState } from '../../types';
import type { PopoverRootContextParams } from './types';

export const [providePopoverRootContext, usePopoverRootContext] = useContext(
  'PopoverRoot',
  (params: PopoverRootContextParams) => {
    const { open, modal } = params;

    const onOpenChange = (value: boolean) => {
      open.value = value;
    };

    const onOpenToggle = () => {
      open.value = !open.value;
    };

    const dataState = computed<DisclosureState>(() => getDisclosureState(open.value));

    const triggerElement = shallowRef<HTMLElement>();
    const onTriggerElementChange = (element: HTMLElement) => {
      triggerElement.value = element;
    };

    const triggerId = shallowRef('');
    const initTriggerId = () => {
      if (triggerId.value) return;
      triggerId.value = `soybean-popover-trigger-${useId()}`;
    };

    const popupElement = shallowRef<HTMLElement>();
    const onPopupElementChange = (element: HTMLElement) => {
      popupElement.value = element;
    };

    const popupId = shallowRef('');
    const initPopupId = () => {
      if (popupId.value) return;
      popupId.value = `soybean-popover-popup-${useId()}`;
    };

    const hasCustomAnchor = shallowRef(false);

    return {
      open,
      onOpenChange,
      onOpenToggle,
      modal,
      dataState,
      triggerElement,
      onTriggerElementChange,
      triggerId,
      initTriggerId,
      popupElement,
      onPopupElementChange,
      popupId,
      initPopupId,
      hasCustomAnchor
    };
  }
);
