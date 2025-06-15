import { computed, shallowRef, toValue } from 'vue';
import type { MaybeRefOrGetter } from 'vue';
import { useContext, useDirection } from '../../composables';
import { isNullish } from '../../shared';
import type { AcceptableValue } from '../../types';
import type { TabsRootContextParams, TabsThemeContextParams } from './types';

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

  const getId = (value: MaybeRefOrGetter<NonNullable<AcceptableValue>>) => {
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

export const [provideTabsThemeContext, useTabsThemeContext] = useContext(
  'TabsTheme',
  (params: TabsThemeContextParams) => params
);
