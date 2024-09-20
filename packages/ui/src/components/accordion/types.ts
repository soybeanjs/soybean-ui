import type { AccordionItemProps as $AccordionItemProps, AccordionRootProps } from 'radix-vue';
import type { ClassValue } from '../../types';

export type SingleOrMultipleType = 'single' | 'multiple';

export type AccordionItemProps = $AccordionItemProps & {
  class?: ClassValue;
};

export type AccordionContentProps = {
  class?: ClassValue;
};

export type AccordionContentBodyProps = {
  class?: ClassValue;
};

export type AccordionHeaderProps = {
  class?: ClassValue;
};

export type AccordionTriggerProps = {
  class?: ClassValue;
};

export type AccordionItemData = Pick<AccordionItemProps, 'value' | 'disabled'> & {
  title?: string;
  content?: string;
};

export type AccordionProps<
  T extends AccordionItemData = AccordionItemData,
  ValidValue = string | string[],
  ExplicitType = SingleOrMultipleType
> = AccordionRootProps<ValidValue, ExplicitType> & {
  items: T[];
  itemClass?: ClassValue;
  headerClass?: ClassValue;
  triggerClass?: ClassValue;
  contentClass?: ClassValue;
  contentBodyClass?: ClassValue;
};

export type { AccordionRootProps };
