import { computed, ref } from 'vue';
import { useContext, useId } from '../../composables';
import type { AccordionItemContext, AccordionItemContextParams, AccordionRootContext } from './types';

export const [provideAccordionRootContext, injectAccordionRootContext] = useContext(
  'AccordionRoot',
  (params: AccordionRootContext) => params
);

export const [provideAccordionItemContext, injectAccordionItemContext] = useContext(
  'AccordionItem',
  (params: AccordionItemContextParams) => {
    const context: AccordionItemContext = {
      ...params,
      triggerId: ref(''),
      initTriggerId: () => {
        context.triggerId.value ||= useId(undefined, 'soybean-accordion-trigger');
      },
      dataState: computed(() => (params.open.value ? 'open' : 'closed')),
      dataDisabled: computed(() => (params.disabled.value ? '' : undefined))
    };

    return context;
  }
);
