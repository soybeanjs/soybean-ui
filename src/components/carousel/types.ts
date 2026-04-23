import type { ClassValue, CarouselRootEmits, CarouselRootProps, CarouselUi } from '@soybeanjs/headless';

export interface CarouselProps extends CarouselRootProps {
  class?: ClassValue;
  ui?: Partial<CarouselUi>;
}

export type CarouselEmits = CarouselRootEmits;
