import type { ClassValue, CarouselRootEmits, CarouselRootProps, CarouselUi } from '@soybeanjs/headless';

/**
 * Props for the carousel component.
 */
export interface CarouselProps extends CarouselRootProps {
  /**
   * Additional class names applied to the root element.
   */
  class?: ClassValue;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<CarouselUi>;
}

/**
 * Emits for the carousel component.
 */
export type CarouselEmits = CarouselRootEmits;
