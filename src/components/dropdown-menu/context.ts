import { computed, shallowRef, useId } from 'vue';
import { useContext, useDirection, useForwardElement } from '../../composables';
import { getDisclosureState } from '../../shared';
import type { DropdownMenuRootContextParams } from './types';

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
