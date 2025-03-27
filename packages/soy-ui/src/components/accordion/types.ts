import type { Component } from 'vue';
import type {
  AccordionHeaderProps,
  AccordionItemProps,
  AccordionRootEmits,
  ClassValue,
  SingleOrMultipleType,
  AccordionContentProps as _AccordionContentProps,
  AccordionRootProps as _AccordionRootProps,
  AccordionTriggerProps as _AccordionTriggerProps
} from '@soybean-ui/primitives';
import type { AccordionSlots, ThemeSize } from '@soybean-ui/variants';

/** The ui of the accordion. */
export type AccordionUi = Partial<Record<AccordionSlots, ClassValue>>;

export interface AccordionRootProps<T extends string | string[]> extends _AccordionRootProps<T> {
  /** The size of the accordion root. */
  size?: ThemeSize;
}

export interface AccordionContentProps extends _AccordionContentProps {
  /** The size of the accordion content. */
  size?: ThemeSize;
  /** The description of the accordion content. */
  content?: string;
}

export interface AccordionTriggerProps extends _AccordionTriggerProps {
  /** The size of the accordion trigger. */
  size?: ThemeSize;
  /** The ui of the accordion trigger. */
  ui?: AccordionUi;
  /** The title of the accordion trigger. */
  title?: string;
  /** The icon in prepended to the title which use the `trigger-leading` slot. */
  icon?: Component;
}

// Accordion
export interface AccordionItemData
  extends Pick<AccordionItemProps, 'value' | 'disabled'>,
    Pick<AccordionTriggerProps, 'title' | 'icon'>,
    Pick<AccordionContentProps, 'content'> {}

export type AccordionProps<
  T extends AccordionItemData = AccordionItemData,
  V extends string | string[] = string | string[]
> = AccordionRootProps<V> & {
  size?: ThemeSize;
  ui?: AccordionUi;
  items: T[];
};

export type AccordionEmits<E extends SingleOrMultipleType = SingleOrMultipleType> = AccordionRootEmits<E>;

export type { AccordionRootEmits, AccordionItemProps, AccordionHeaderProps };
