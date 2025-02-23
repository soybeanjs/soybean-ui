import type { Ref, UnwrapRef } from 'vue';
import type { CarouselSlots, ThemeOrientation } from '@soybean-ui/variants';
import type { ClassValue, ClassValueProp } from '@soybean-ui/primitives';
import type useEmblaCarousel from 'embla-carousel-vue';
import type { EmblaCarouselVueType } from 'embla-carousel-vue';
import type { ButtonProps } from '../button/types';

type CarouselApi = EmblaCarouselVueType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

export type UnwrapRefCarouselApi = UnwrapRef<CarouselApi>;

export interface CarouselContextParams {
  orientation?: ThemeOrientation;
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
}

export interface CarouselContext {
  carouselRef: Ref<HTMLElement | undefined>;
  carouselApi: Ref<UnwrapRefCarouselApi | undefined>;
  canScrollPrev: Ref<boolean>;
  canScrollNext: Ref<boolean>;
  scrollNext: () => void;
  scrollPrev: () => void;
  orientation?: ThemeOrientation;
}

export interface CarouselRootProps extends ClassValueProp, CarouselContextParams {}

export type CarouselRootEmits = {
  (e: 'initApi', payload: UnwrapRefCarouselApi): void;
};

export interface CarouselContentProps extends ClassValueProp {
  wrapperClass?: ClassValue;
}

export interface CarouselItemProps extends ClassValueProp {}

export interface CarouselNextProps extends ButtonProps {}

export interface CarouselPreviousProps extends ButtonProps {}

export type CarouselUi = Partial<Record<CarouselSlots, ClassValue>>;

export interface CarouselProps extends CarouselRootProps {
  counts?: number;
  ui?: CarouselUi;
  nextProps?: Omit<ButtonProps, 'class'>;
  previousProps?: Omit<ButtonProps, 'class'>;
}

export type CarouselEmits = CarouselRootEmits;
