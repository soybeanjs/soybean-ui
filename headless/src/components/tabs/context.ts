import { computed, shallowRef, toValue } from 'vue';
import type { MaybeRefOrGetter } from 'vue';
import { useContext, useDirection, useUiContext } from '../../composables';
import { isNullish } from '../../shared';
import type { AcceptableValue, DefinedValue } from '../../types';
import type { TabsRootContextParams, TabsUiSlot } from './types';

export const [provideTabsRootContext, useTabsRootContext] = useContext('TabsRoot', (params: TabsRootContextParams) => {
  const dir = useDirection(params.dir);

  const listElement = shallowRef<HTMLElement>();

  const onListElementChange = (el: HTMLElement) => {
    listElement.value = el;
  };

  const changeModelValue = (v: AcceptableValue) => {
    if (isNullish(v)) return;
    params.modelValue.value = v;
  };

  const getId = (value: MaybeRefOrGetter<DefinedValue>) => {
    const id = toValue(value);

    return {
      contentId: computed(() => `soybean-tabs-content-${id}`),
      triggerId: computed(() => `soybean-tabs-trigger-${id}`)
    };
  };

  return {
    ...params,
    dir,
    changeModelValue,
    listElement,
    onListElementChange,
    getId
  };
});

export const [provideTabsUi, useTabsUi] = useUiContext<TabsUiSlot>('TabsUi');
