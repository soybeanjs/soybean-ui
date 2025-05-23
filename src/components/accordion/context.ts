import { computed, ref, useId } from 'vue';
import { useContext, useForwardElement } from '../../composables';
import type { OpenState } from '../../types';
import type { AccordionItemContextParams, AccordionRootContextParams } from './types';

export const [provideAccordionRootContext, useAccordionRootContext] = useContext(
  'AccordionRoot',
  (params: AccordionRootContextParams) => params
);

export const [provideAccordionItemContext, useAccordionItemContext] = useContext(
  'AccordionItem',
  (params: AccordionItemContextParams) => {
    const { open, disabled } = params;

    const { elementRef: triggerElement, setElementRef: setTriggerElement } = useForwardElement();

    const triggerId = ref('');
    const initTriggerId = () => {
      if (triggerId.value) return;
      triggerId.value = `soybean-accordion-trigger-${useId()}`;
    };

    const dataDisabled = computed(() => (disabled.value ? '' : undefined));
    const dataState = computed<OpenState>(() => (open.value ? 'open' : 'closed'));

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
