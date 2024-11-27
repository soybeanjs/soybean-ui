import type {
  AcceptableValue,
  AccordionContentProps,
  AccordionHeaderProps,
  AccordionItemData,
  AccordionItemProps,
  AccordionRootEmits,
  AccordionRootProps,
  ClassValue,
  SingleOrMultipleType,
  AccordionTriggerProps as _AccordionTriggerProps
} from '@soybean-ui/primitive';

export type AccordionTriggerProps = _AccordionTriggerProps & {
  triggerIconClass?: ClassValue;
};

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
};

export type AccordionEmits<E extends SingleOrMultipleType = SingleOrMultipleType> = AccordionRootEmits<E>;

export type { AccordionItemProps, AccordionHeaderProps, AccordionContentProps, AccordionItemData };
