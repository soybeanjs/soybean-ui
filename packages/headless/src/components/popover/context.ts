import { computed, shallowRef, useId } from 'vue';
import { getDisclosureState } from '../../shared';
import { providePopperUi } from '../popper/context';
import { useContext, useUiContext } from '../../composables';
import type { DisclosureState } from '../../types';
import type { PopoverRootContextParams, PopoverUiSlot } from './types';

export const [providePopoverRootContext, usePopoverRootContext] = useContext(
  'PopoverRoot',
  (params: PopoverRootContextParams) => {
    const { open } = params;

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
    const generatedTriggerId = `soybean-popover-trigger-${useId()}`;
    const initTriggerId = () => {
      if (triggerId.value) return;
      triggerId.value = generatedTriggerId;
    };

    const popupElement = shallowRef<HTMLElement>();
    const onPopupElementChange = (element: HTMLElement) => {
      popupElement.value = element;
    };

    const popupId = shallowRef('');
    const generatedPopupId = `soybean-popover-popup-${useId()}`;
    const initPopupId = () => {
      if (popupId.value) return;
      popupId.value = generatedPopupId;
    };

    const hasCustomAnchor = shallowRef(false);

    return {
      ...params,
      onOpenChange,
      onOpenToggle,
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

export const [providePopoverUi, usePopoverUi] = useUiContext<PopoverUiSlot>('Popover', ui => {
  providePopperUi(ui);

  return ui;
});
