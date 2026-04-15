import type {
  AccordionCompactProps,
  AccordionCompactEmits,
  AccordionCompactSlots,
  AccordionOptionData,
  AccordionUi,
  ClassValue
} from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

export interface AccordionProps<
  T extends AccordionOptionData = AccordionOptionData,
  M extends boolean = false
> extends AccordionCompactProps<T, M> {
  /**
   * root class
   */
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<AccordionUi>;
}

export type AccordionEmits<M extends boolean = false> = AccordionCompactEmits<M>;

export type AccordionSlots<
  T extends AccordionOptionData = AccordionOptionData,
  M extends boolean = false
> = AccordionCompactSlots<T, M>;
