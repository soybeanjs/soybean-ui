import { computed, shallowRef, useId } from 'vue';
import { useContext, useDirection, useForwardElement, useUiContext } from '../../composables';
import { getDisclosureState } from '../../shared';
import type { DisclosureState } from '../../types';
import { provideCollapsibleUi } from '../collapsible/context';
import type { AccordionItemContextParams, AccordionRootContextParams, AccordionUiSlot } from './types';

export const [provideAccordionRootContext, useAccordionRootContext] = useContext(
  'AccordionRoot',
  (params: AccordionRootContextParams) => {
    const dir = useDirection(() => params.dir.value);

    return {
      ...params,
      dir
    };
  }
);

export const [provideAccordionItemContext, useAccordionItemContext] = useContext(
  'AccordionItem',
  (params: AccordionItemContextParams) => {
    const { open, disabled } = params;

    const [triggerElement, setTriggerElement] = useForwardElement();

    const triggerId = shallowRef('');
    const initTriggerId = () => {
      if (triggerId.value) return;
      triggerId.value = `soybean-accordion-trigger-${useId()}`;
    };

    const dataDisabled = computed(() => (disabled.value ? '' : undefined));
    const dataState = computed<DisclosureState>(() => getDisclosureState(open.value));

    return {
      ...params,
      triggerElement,
      setTriggerElement,
      triggerId,
      initTriggerId,
      dataDisabled,
      dataState
    };
  }
);

export const [provideAccordionUi, useAccordionUi] = useUiContext<AccordionUiSlot>('AccordionUi', ui => {
  const collapsibleUi = computed(() => ({
    root: ui.value?.item,
    trigger: ui.value?.trigger,
    content: ui.value?.content
  }));

  provideCollapsibleUi(collapsibleUi);

  return ui;
});
