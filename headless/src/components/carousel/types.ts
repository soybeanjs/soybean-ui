import type { EmblaOptionsType as CarouselOptions, EmblaPluginType as CarouselPlugin } from 'embla-carousel';
import type { EmblaCarouselVueType } from 'embla-carousel-vue';
import type { ButtonProps } from '../button/types';
import type { ComputedRef, HTMLAttributes, Ref, ShallowRef } from 'vue';
import type { DataOrientation, Direction, UiClass } from '../../types';

/**
 * Props for the carousel root component.
 */
export interface CarouselRootProps extends /** @vue-ignore */ Omit<HTMLAttributes, 'onSelect'> {
  /**
   * Opts.
   */
  opts?: CarouselOptions;
  /**
   * Plugins.
   */
  plugins?: CarouselPlugin[];
  /**
   * Orientation of the component.
   */
  orientation?: DataOrientation;
  /**
   * Reading direction of the component.
   */
  dir?: Direction;
}

/**
 * Type information for the carousel api component.
 */
export type CarouselApi = NonNullable<EmblaCarouselVueType[1]['value']>;

/**
 * Emits for the carousel root component.
 */
export type CarouselRootEmits = {
  /**
   * Emitted when init api occurs.
   */
  initApi: [api: CarouselApi];
};

/**
 * Props for the carousel content component.
 */
export interface CarouselContentProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the carousel item component.
 */
export interface CarouselItemProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the carousel previous component.
 */
export interface CarouselPreviousProps extends ButtonProps {}

/**
 * Props for the carousel next component.
 */
export interface CarouselNextProps extends ButtonProps {}

/**
 * Context for the carousel root component.
 */
export interface CarouselRootContext {
  /**
   * Reading direction of the component.
   */
  dir: ComputedRef<Direction>;
  /**
   * Orientation of the component.
   */
  orientation: ComputedRef<DataOrientation>;
  /**
   * Carousel ref used by the component context.
   */
  carouselRef: Ref<HTMLElement | undefined>;
  /**
   * Carousel api used by the component context.
   */
  carouselApi: Ref<CarouselApi | undefined>;
  /**
   * Content id used by the component context.
   */
  contentId: ShallowRef<string>;
  /**
   * Whether the component can scroll next.
   */
  canScrollNext: ShallowRef<boolean>;
  /**
   * Whether the component can scroll prev.
   */
  canScrollPrev: ShallowRef<boolean>;
  /**
   * Selected index used by the component context.
   */
  selectedIndex: ShallowRef<number>;
  /**
   * Scroll snaps used by the component context.
   */
  scrollSnaps: ShallowRef<number[]>;
  /**
   * Scroll next used by the component context.
   */
  scrollNext: () => void;
  /**
   * Scroll prev used by the component context.
   */
  scrollPrev: () => void;
  /**
   * Scroll to used by the component context.
   */
  scrollTo: (index: number, jump?: boolean) => void;
  /**
   * Set content id used by the component context.
   */
  setContentId: (id: string) => void;
}

/**
 * Available UI slots for the carousel component.
 */
export type CarouselUiSlot = 'root' | 'content' | 'container' | 'item' | 'previous' | 'next';

/**
 * UI class overrides for the carousel component.
 */
export type CarouselUi = UiClass<CarouselUiSlot>;

export type { CarouselOptions, CarouselPlugin };
