import type { AccordionItemProps as $AccordionItemProps, AccordionRootProps } from 'radix-vue';
import type { ClassValue } from '@soybean-ui/variants';
import type { PrimitivePropsWithClass } from '../../types';

export type SingleOrMultipleType = 'single' | 'multiple';

export type AccordionItemProps = $AccordionItemProps & {
  class?: ClassValue;
};

export type AccordionContentProps = PrimitivePropsWithClass & {
  bodyClass?: ClassValue;
};

export type AccordionHeaderProps = PrimitivePropsWithClass;

export type AccordionTriggerProps = PrimitivePropsWithClass;

export type AccordionItemData = Pick<AccordionItemProps, 'disabled' | 'value'> & {
  title?: string;
  content?: string;
};

export type AccordionProps<
  T extends AccordionItemData = AccordionItemData,
  ValidValue = string | string[],
  ExplicitType = SingleOrMultipleType
> = AccordionRootProps<ValidValue, ExplicitType> & {
  items: T[];
  itemProps?: Omit<AccordionItemProps, 'disabled' | 'value'>;
  headerClass?: ClassValue;
  triggerClass?: ClassValue;
  contentClass?: ClassValue;
  contentBodyClass?: ClassValue;
};

export type { AccordionRootProps };
