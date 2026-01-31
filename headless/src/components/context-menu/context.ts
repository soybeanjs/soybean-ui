import { computed, shallowRef } from 'vue';
import { useContext } from '../../composables';
import { getDisclosureState } from '../../shared';
import { useDirection } from '../config-provider/context';
import type { ContextMenuRootContextParams } from './types';

export const [provideContextMenuRootContext, useContextMenuRootContext] = useContext(
  'ContextMenuRoot',
  (params: ContextMenuRootContextParams) => {
    const { open } = params;

    const onOpenChange = (v: boolean) => {
      open.value = v;
    };

    const dir = useDirection(params.dir);

    const dataState = computed(() => getDisclosureState(open.value));

    const triggerElement = shallowRef<HTMLElement | null>(null);

    const onTriggerElementChange = (el: HTMLElement | null) => {
      triggerElement.value = el;
    };

    return {
      ...params,
      dir,
      dataState,
      onOpenChange,
      triggerElement,
      onTriggerElementChange
    };
  }
);
