import { computed, shallowRef, useId } from 'vue';
import { useContext, useForwardElement } from '../../composables';
import { getDisclosureState } from '../../shared';
import type { DisclosureState } from '../../types';
import type { AccordionItemContextParams, AccordionRootContextParams, AccordionThemeContextParams } from './types';

export const [provideAccordionRootContext, useAccordionRootContext] = useContext(
  'AccordionRoot',
  (params: AccordionRootContextParams) => params
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

export const [provideAccordionThemeContext, useAccordionThemeContext] = useContext(
  'AccordionTheme',
  (params: AccordionThemeContextParams) => params
);
