import type {
  CarouselCompactProps,
  CarouselCompactEmits,
  CarouselCompactSlots,
  CarouselUi
} from '@soybeanjs/headless/carousel';
import type { ClassValue, DefinedValue } from '@soybeanjs/headless/types';
import { ThemeSize } from '@/theme';

/**
 * Props for the carousel component.
 */
export interface CarouselProps<T extends DefinedValue = DefinedValue> extends CarouselCompactProps<T> {
  /**
   * Additional class names applied to the root element.
   */
  class?: ClassValue;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<CarouselUi>;
  /**
   * The size of the carousel, which determines the spacing and sizing of its elements.
   */
  size?: ThemeSize;
  /**
   * The orientation of the carousel, which determines the layout and direction of scrolling.
   */
  floatNav?: boolean;
}

/**
 * Emits for the carousel component.
 */
export type CarouselEmits = CarouselCompactEmits;

/**
 * Slots for the carousel component.
 */
export type CarouselSlots<T extends DefinedValue = DefinedValue> = CarouselCompactSlots<T>;
