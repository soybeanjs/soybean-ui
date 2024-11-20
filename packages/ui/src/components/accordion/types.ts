import type { AccordionRootEmits, AccordionRootProps, AccordionItemProps as _AccordionItemProps } from '@soybean-ui/primitive';
import type { ClassValue, ClassValueProp, SingleOrMultipleType } from '../../types';

export type AccordionItemProps = ClassValueProp & Pick<_AccordionItemProps, 'disabled' | 'value' | 'unmountOnHide'>;

export type AccordionHeaderProps = ClassValueProp;

export type AccordionTriggerProps = ClassValueProp & {
  triggerIconClass?: ClassValue;
};

export type AccordionContentProps = ClassValueProp;

export type AccordionContentBodyProps = ClassValueProp;

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
  triggerIconClass?: ClassValue;
  contentClass?: ClassValue;
  contentBodyClass?: ClassValue;
};

export type AccordionEmits = AccordionRootEmits;

export type { AccordionRootProps, AccordionRootEmits };
