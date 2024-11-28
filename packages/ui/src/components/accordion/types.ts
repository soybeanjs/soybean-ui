import type {
  AcceptableValue,
  AccordionContentProps,
  AccordionHeaderProps,
  AccordionItemData,
  AccordionItemProps,
  AccordionRootEmits,
  AccordionRootProps,
  ClassValue,
  PrimitivePropsWithClass,
  SingleOrMultipleType,
  AccordionTriggerProps as _AccordionTriggerProps
} from '@soybean-ui/primitive';

export interface AccordionTriggerProps extends _AccordionTriggerProps {
  triggerIconClass?: ClassValue;
}

export interface AccordionContentBodyProps extends PrimitivePropsWithClass {}

export type AccordionProps<
  T extends AccordionItemData = AccordionItemData,
  V = AcceptableValue | AcceptableValue[],
  E = SingleOrMultipleType
> = AccordionRootProps<V, E> & {
  items: T[];
  itemClass?: ClassValue;
  headerClass?: ClassValue;
  triggerClass?: ClassValue;
  triggerIconClass?: ClassValue;
  contentClass?: ClassValue;
  contentBodyClass?: ClassValue;
};

export type AccordionEmits<E extends SingleOrMultipleType = SingleOrMultipleType> = AccordionRootEmits<E>;

export type { AccordionItemProps, AccordionHeaderProps, AccordionContentProps, AccordionItemData };
