import type {
  AccordionHeaderProps,
  AccordionItemData,
  AccordionItemProps,
  AccordionRootEmits,
  AccordionRootProps,
  ClassValue,
  SingleOrMultipleType,
  AccordionContentProps as _AccordionContentProps,
  AccordionTriggerProps as _AccordionTriggerProps
} from '@soybean-ui/primitives';
import type { AccordionSlots, ThemeSize } from '@soybean-ui/variants';

export interface AccordionContentProps extends _AccordionContentProps {
  size?: ThemeSize;
}

export interface AccordionTriggerProps extends _AccordionTriggerProps {
  size?: ThemeSize;
  iconClass?: ClassValue;
}

export type AccordionUi = Partial<Record<AccordionSlots, ClassValue>>;

export type AccordionProps<
  T extends AccordionItemData = AccordionItemData,
  V extends string | string[] = string | string[]
> = AccordionRootProps<V> & {
  size?: ThemeSize;
  ui?: AccordionUi;
  items: T[];
};

export type AccordionEmits<E extends SingleOrMultipleType = SingleOrMultipleType> = AccordionRootEmits<E>;

export type { AccordionRootProps, AccordionRootEmits, AccordionItemProps, AccordionHeaderProps, AccordionItemData };
