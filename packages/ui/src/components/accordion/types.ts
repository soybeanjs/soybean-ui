import type { AccordionItemProps } from 'radix-vue';

export interface AccordionItemData extends AccordionItemProps {
  title?: string;
  content?: string;
  [key: string]: unknown;
}
