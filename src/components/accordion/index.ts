import AccordionRoot from './accordion-root.vue';
import AccordionItem from './accordion-item.vue';
import AccordionTrigger from './accordion-trigger.vue';
import AccordionHeader from './accordion-header.vue';
import AccordionContent from './accordion-content.vue';

export { AccordionRoot, AccordionItem, AccordionTrigger, AccordionHeader, AccordionContent };

export { provideAccordionThemeContext } from './context';

export type {
  AccordionRootProps,
  AccordionRootEmits,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionHeaderProps,
  AccordionContentProps,
  AccordionSlot
} from './types';
