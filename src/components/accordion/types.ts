import type {
  AccordionCompactProps,
  AccordionCompactEmits,
  AccordionCompactSlots,
  AccordionOptionData,
  AccordionUi,
  ClassValue
} from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

/**
 * Props for the accordion component.
 */
export interface AccordionProps<
  T extends AccordionOptionData = AccordionOptionData,
  M extends boolean = false
> extends AccordionCompactProps<T, M> {
  /**
   * root class
   */
  class?: ClassValue;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<AccordionUi>;
}

/**
 * Emits for the accordion component.
 */
export type AccordionEmits<M extends boolean = false> = AccordionCompactEmits<M>;

/**
 * Slots for the accordion component.
 */
export type AccordionSlots<
  T extends AccordionOptionData = AccordionOptionData,
  M extends boolean = false
> = AccordionCompactSlots<T, M>;
