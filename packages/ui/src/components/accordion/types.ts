import type {
  AccordionContentProps as $AccordionContentProps,
  AccordionHeaderProps as $AccordionHeaderProps,
  AccordionItemProps as $AccordionItemProps,
  AccordionTriggerProps as $AccordionTriggerProps,
  AccordionRootProps
} from 'radix-vue';
import type { SingleOrMultipleType } from 'radix-vue/dist/shared/types';
import type { ClassNameValue, PropsWithClass } from '../../types';

export type AccordionItemProps = PropsWithClass<$AccordionItemProps>;

export type AccordionContentProps = PropsWithClass<$AccordionContentProps> & {
  bodyClass?: ClassNameValue;
};

export type AccordionHeaderProps = PropsWithClass<$AccordionHeaderProps>;

export type AccordionTriggerProps = PropsWithClass<$AccordionTriggerProps>;

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
