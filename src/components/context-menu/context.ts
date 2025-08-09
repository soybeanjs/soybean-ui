import { computed } from 'vue';
import { useContext, useDirection, useForwardElement } from '../../composables';
import { getDisclosureState } from '../../shared';
import type { ContextMenuRootContextParams } from './types';

export const [provideContextMenuRootContext, useContextMenuRootContext] = useContext(
  'ContextMenuRoot',
  (params: ContextMenuRootContextParams) => {
    const [triggerElement, setTriggerElement] = useForwardElement();
    const { open } = params;

    const onOpenChange = (v: boolean) => {
      open.value = v;
    };

    const dir = useDirection(params.dir);

    const dataState = computed(() => getDisclosureState(open.value));

    return {
      ...params,
      dir,
      dataState,
      onOpenChange,
      triggerElement,
      setTriggerElement
    };
  }
);
