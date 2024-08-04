import type {
  AccordionContentProps as $AccordionContentProps,
  AccordionHeaderProps as $AccordionHeaderProps,
  AccordionItemProps as $AccordionItemProps,
  AccordionTriggerProps as $AccordionTriggerProps,
  AccordionRootProps
} from 'radix-vue';
import type { ClassValue } from '@soybean-unify/ui-variants';

type SingleOrMultipleType = 'single' | 'multiple';

export type AccordionItemProps = $AccordionItemProps & {
  class?: ClassValue;
};

export type AccordionContentProps = $AccordionContentProps & {
  class?: ClassValue;
  bodyClass?: ClassValue;
};

export type AccordionHeaderProps = $AccordionHeaderProps & {
  class?: ClassValue;
};

export type AccordionTriggerProps = $AccordionTriggerProps & {
  class?: ClassValue;
};

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
  headerProps?: AccordionHeaderProps;
  triggerProps?: AccordionTriggerProps;
  contentProps?: AccordionContentProps;
};

export type { AccordionRootProps, SingleOrMultipleType };
