import type { MaybeRef, Ref, UnwrapRef } from 'vue';
import type { CarouselSlots, ThemeOrientation, ThemeSize } from '@soybean-ui/variants';
import type { ClassValue, ClassValueProp } from '@soybean-ui/primitives';
import type { EmblaCarouselType, EmblaOptionsType, EmblaPluginType } from 'embla-carousel';
import type { ButtonProps } from '../button/types';

type CarouselApi = Ref<EmblaCarouselType | undefined>;
type CarouselOptions = MaybeRef<Partial<EmblaOptionsType>>;
type CarouselPlugin = MaybeRef<EmblaPluginType[]>;

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

export type CarouselUi = Partial<Record<CarouselSlots, ClassValue>>;

export interface CarouselRootProps extends ClassValueProp, CarouselContextParams {
  size?: ThemeSize;
}

export type CarouselRootEmits = {
  (e: 'initApi', payload: UnwrapRefCarouselApi): void;
};

export interface CarouselContentProps extends ClassValueProp {
  size?: ThemeSize;
  ui?: Pick<CarouselUi, 'content' | 'contentWrapper'>;
}

export interface CarouselItemProps extends ClassValueProp {
  size?: ThemeSize;
}

export interface CarouselNextProps extends ButtonProps {
  size?: ThemeSize;
}

export interface CarouselPreviousProps extends ButtonProps {
  size?: ThemeSize;
}

export interface CarouselProps extends CarouselRootProps {
  counts?: number;
  ui?: CarouselUi;
  nextProps?: Omit<ButtonProps, 'class'>;
  previousProps?: Omit<ButtonProps, 'class'>;
}

export type CarouselEmits = CarouselRootEmits;
