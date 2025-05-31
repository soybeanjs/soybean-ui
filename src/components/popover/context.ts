import { computed, ref, useId } from 'vue';
import { useContext, useForwardElement } from '../../composables';
import { getDisclosureState } from '../../shared';
import type { DisclosureState } from '../../types';
import type { PopoverRootContextParams } from './types';

export const [providePopoverRootContext, usePopoverRootContext] = useContext(
  'PopoverRoot',
  (params: PopoverRootContextParams) => {
    const [contentElement, setContentElement] = useForwardElement();
    const [triggerElement, setTriggerElement] = useForwardElement();
    const { open, modal } = params;

    const onOpenChange = (value: boolean) => {
      open.value = value;
    };

    const onOpenToggle = () => {
      open.value = !open.value;
    };

    const dataState = computed<DisclosureState>(() => getDisclosureState(open.value));

    const triggerId = ref('');
    const initTriggerId = () => {
      if (triggerId.value) return;
      triggerId.value = `soybean-popover-trigger-${useId()}`;
    };

    const contentId = ref('');
    const initContentId = () => {
      if (contentId.value) return;
      contentId.value = `soybean-popover-content-${useId()}`;
    };

    const hasCustomAnchor = ref(false);

    return {
      open,
      onOpenChange,
      onOpenToggle,
      modal,
      dataState,
      triggerElement,
      setTriggerElement,
      triggerId,
      initTriggerId,
      contentElement,
      setContentElement,
      contentId,
      initContentId,
      hasCustomAnchor
    };
  }
);
