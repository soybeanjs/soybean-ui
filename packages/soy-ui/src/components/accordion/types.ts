import type {
  AccordionContentProps,
  AccordionHeaderProps,
  AccordionItemData,
  AccordionItemProps,
  AccordionRootEmits,
  AccordionRootProps,
  ClassValue,
  ClassValueProp,
  SingleOrMultipleType,
  AccordionTriggerProps as _AccordionTriggerProps
} from '@soybean-ui/primitives';
import type { AccordionSlots } from '@soybean-ui/variants';

export interface AccordionTriggerProps extends _AccordionTriggerProps {
  triggerIconClass?: ClassValue;
}

export interface AccordionContentBodyProps extends ClassValueProp {}

export type AccordionUi = Partial<Record<AccordionSlots, ClassValue>>;

export type AccordionProps<
  T extends AccordionItemData = AccordionItemData,
  V extends string | string[] = string | string[]
> = AccordionRootProps<V> & {
  items: T[];
  ui?: AccordionUi;
};

export type AccordionEmits<E extends SingleOrMultipleType = SingleOrMultipleType> = AccordionRootEmits<E>;

export type {
  AccordionRootProps,
  AccordionRootEmits,
  AccordionItemProps,
  AccordionHeaderProps,
  AccordionContentProps,
  AccordionItemData
};
