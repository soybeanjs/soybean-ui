import type emblaCarouselVue from 'embla-carousel-vue';
import type { EmblaCarouselVueType } from 'embla-carousel-vue';
import type { MaybeRef } from 'vue';
import type { ButtonProps } from '../button/types';
import type { ComputedRef, HTMLAttributes, Ref, ShallowRef } from 'vue';
import type { DataOrientation, Direction, UiClass } from '../../types';

export type CarouselApi = NonNullable<EmblaCarouselVueType[1]['value']>;
export type CarouselOptions =
  NonNullable<Parameters<typeof emblaCarouselVue>[0]> extends MaybeRef<infer Value> ? Value : never;
export type CarouselPlugins =
  NonNullable<Parameters<typeof emblaCarouselVue>[1]> extends MaybeRef<infer Value> ? Value : never;

export interface CarouselRootProps extends /** @vue-ignore */ Omit<HTMLAttributes, 'onSelect'> {
  opts?: CarouselOptions;
  plugins?: CarouselPlugins;
  orientation?: DataOrientation;
  dir?: Direction;
}

export type CarouselRootEmits = {
  initApi: [api: CarouselApi];
};

export interface CarouselContentProps extends /** @vue-ignore */ HTMLAttributes {}

export interface CarouselItemProps extends /** @vue-ignore */ HTMLAttributes {}

export interface CarouselPreviousProps extends ButtonProps {}

export interface CarouselNextProps extends ButtonProps {}

export interface CarouselRootContext {
  dir: ComputedRef<Direction>;
  orientation: ComputedRef<DataOrientation>;
  carouselRef: Ref<HTMLElement | undefined>;
  carouselApi: Ref<CarouselApi | undefined>;
  contentId: ShallowRef<string>;
  canScrollNext: ShallowRef<boolean>;
  canScrollPrev: ShallowRef<boolean>;
  selectedIndex: ShallowRef<number>;
  scrollSnaps: ShallowRef<number[]>;
  scrollNext: () => void;
  scrollPrev: () => void;
  scrollTo: (index: number, jump?: boolean) => void;
  setContentId: (id: string) => void;
}

export type CarouselUiSlot = 'root' | 'content' | 'container' | 'item' | 'previous' | 'next';

export type CarouselUi = UiClass<CarouselUiSlot>;
