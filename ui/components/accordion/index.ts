import {
  AccordionContent as SAccordionContent,
  AccordionHeader as SAccordionHeader,
  AccordionItem as SAccordionItem,
  AccordionRoot as SAccordionRoot,
  AccordionTrigger as SAccordionTrigger
} from '@headless';
import SAccordion from './accordion.vue';

export { SAccordion, SAccordionRoot, SAccordionItem, SAccordionTrigger, SAccordionHeader, SAccordionContent };

export type {
  AccordionProps,
  AccordionEmits,
  AccordionItemData,
  AccordionRootProps,
  AccordionRootEmits,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionHeaderProps,
  AccordionContentProps
} from './types';
