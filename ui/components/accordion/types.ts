import type { Component, VNode } from 'vue';
import type {
  AcceptableValue,
  AccordionContentProps,
  AccordionHeaderProps,
  AccordionItemProps,
  AccordionRootEmits,
  AccordionRootProps,
  AccordionSlot,
  AccordionTriggerProps,
  ClassValue,
  SingleOrMultipleType
} from '@headless';
import type { ThemeSize } from '@theme';

export interface AccordionItemData extends Pick<AccordionItemProps, 'value' | 'disabled'> {
  /** The title of the accordion item. */
  title?: string;
  /** The description of the accordion content. */
  description?: string;
  /**
   * The icon of the accordion item.
   *
   * if it is a string, it will be used as the icon name of the iconify.
   */
  icon?: VNode | Component | string;
}

export type AccordionUi = Partial<Record<AccordionSlot | 'triggerLeadingIcon' | 'triggerIcon', ClassValue>>;

export type AccordionProps<
  T extends AccordionItemData = AccordionItemData,
  V extends AcceptableValue | NonNullable<AcceptableValue>[] = AcceptableValue | NonNullable<AcceptableValue>[],
  S = SingleOrMultipleType
> = AccordionRootProps<V, S> & {
  size?: ThemeSize;
  ui?: AccordionUi;
  items: T[];
  itemProps?: AccordionItemProps;
  headerProps?: AccordionHeaderProps;
  triggerProps?: AccordionTriggerProps;
  contentProps?: AccordionContentProps;
};

export type AccordionEmits<T = AcceptableValue | NonNullable<AcceptableValue>[]> = AccordionRootEmits<T>;
