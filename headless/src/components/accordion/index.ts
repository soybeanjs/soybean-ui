export { default as AccordionRoot } from './accordion-root.vue';
export { default as AccordionItem } from './accordion-item.vue';
export { default as AccordionTrigger } from './accordion-trigger.vue';
export { default as AccordionHeader } from './accordion-header.vue';
export { default as AccordionContent } from './accordion-content.vue';

export { provideAccordionThemeContext } from './context';

export type {
  AccordionRootProps,
  AccordionRootEmits,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionHeaderProps,
  AccordionContentProps,
  AccordionThemeSlot,
  AccordionUi
} from './types';
