import type {
  AccordionContentProps,
  AccordionHeaderProps,
  AccordionItemProps,
  AccordionRootEmits,
  AccordionRootProps,
  AccordionThemeSlot,
  AccordionTriggerProps,
  ClassValue,
  SingleOrMultipleValue
} from '@headless';
import type { ThemeSize } from '@theme';
import type { IconValue } from '../icon/types';

export interface AccordionOptionData extends Pick<AccordionItemProps, 'value' | 'disabled'> {
  /** The title of the accordion item. */
  title?: string;
  /** The description of the accordion content. */
  description?: string;
  /**
   * The icon of the accordion item.
   *
   * if it is a string, it will be used as the icon name of the iconify.
   */
  icon?: IconValue;
}

export type AccordionUi = Partial<Record<AccordionThemeSlot | 'triggerLeadingIcon' | 'triggerIcon', ClassValue>>;

export type AccordionProps<
  T extends AccordionOptionData = AccordionOptionData,
  M extends boolean = false
> = AccordionRootProps<V, M> & {
  size?: ThemeSize;
  ui?: AccordionUi;
  items: T[];
  itemProps?: AccordionItemProps;
  headerProps?: AccordionHeaderProps;
  triggerProps?: AccordionTriggerProps;
  contentProps?: AccordionContentProps;
};

export type AccordionEmits<T extends SingleOrMultipleValue = SingleOrMultipleValue> = AccordionRootEmits<T>;
