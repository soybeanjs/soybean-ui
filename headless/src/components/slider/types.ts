import type { ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type { DataOrientation, Direction, FormFieldCommonProps, PropsToContext, Side, UiClass } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

/**
 * Type information for the slider thumb alignment component.
 */
export type SliderThumbAlignment = 'contain' | 'overflow';

/**
 * Properties for the slider root component.
 */
export interface SliderRootProps extends PrimitiveProps, FormFieldCommonProps, /** @vue-ignore */ HTMLAttributes {
  /** The controlled value of the slider. Can be bind as `v-model`. */
  modelValue?: number[];
  /** The initial value of the slider when uncontrolled. */
  defaultValue?: number[];
  /** Whether the slider is disabled. */
  disabled?: boolean;
  /** The orientation of the slider. */
  orientation?: DataOrientation;
  /** The reading direction of the slider. */
  dir?: Direction;
  /** Whether the slider value direction is inverted. */
  inverted?: boolean;
  /** The minimum value. */
  min?: number;
  /** The maximum value. */
  max?: number;
  /** The stepping interval. */
  step?: number;
  /** The minimum permitted steps between multiple thumbs. */
  minStepsBetweenThumbs?: number;
  /** Whether thumbs stay within the track bounds or may overflow it. */
  thumbAlignment?: SliderThumbAlignment;
}

/**
 * Events for the slider root component.
 */
export type SliderRootEmits = {
  /** Event handler called when the slider value changes. */
  'update:modelValue': [value: number[]];
  /** Event handler called when a slider interaction is committed. */
  valueCommit: [value: number[]];
};

/**
 * Properties for the slider track component.
 */
export interface SliderTrackProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

/**
 * Properties for the slider range component.
 */
export interface SliderRangeProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

/**
 * Properties for the slider thumb component.
 */
export interface SliderThumbProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  /** The thumb index in the current slider value array. */
  index: number;
}

/**
 * Type information for the slider slide direction component.
 */
export type SliderSlideDirection = 'from-left' | 'from-right' | 'from-bottom' | 'from-top';

/**
 * Context for the slider root component.
 */
export interface SliderRootContext extends PropsToContext<
  SliderRootProps,
  'disabled' | 'orientation' | 'dir' | 'inverted' | 'min' | 'max' | 'step' | 'minStepsBetweenThumbs' | 'thumbAlignment'
> {
  /**
   * Current model value.
   */
  modelValue: ShallowRef<number[] | undefined>;
  /**
   * Current model value used by the component context.
   */
  currentModelValue: ComputedRef<number[]>;
  /**
   * Whether the orientation is horizontal.
   */
  isHorizontal: ComputedRef<boolean>;
  /**
   * Start edge used by the component context.
   */
  startEdge: ComputedRef<Side>;
  /**
   * End edge used by the component context.
   */
  endEdge: ComputedRef<Side>;
  /**
   * Slide direction used by the component context.
   */
  slideDirection: ComputedRef<SliderSlideDirection>;
  /**
   * Active thumb index used by the component context.
   */
  activeThumbIndex: ShallowRef<number>;
  /**
   * Track element used by the component context.
   */
  trackElement: ShallowRef<HTMLElement | undefined>;
  /**
   * Thumb elements used by the component context.
   */
  thumbElements: ShallowRef<(HTMLElement | undefined)[]>;
  /**
   * Set track element used by the component context.
   */
  setTrackElement: (el: HTMLElement) => void;
  /**
   * Set thumb element used by the component context.
   */
  setThumbElement: (index: number, el: HTMLElement) => void;
  /**
   * Get percentage used by the component context.
   */
  getPercentage: (value: number) => number;
  /**
   * Get closest value index used by the component context.
   */
  getClosestValueIndex: (value: number) => number;
  /**
   * Get thumb label used by the component context.
   */
  getThumbLabel: (index: number) => string | undefined;
  /**
   * Begin track drag used by the component context.
   */
  beginTrackDrag: (event: PointerEvent) => void;
  /**
   * Begin thumb drag used by the component context.
   */
  beginThumbDrag: (index: number, event: PointerEvent) => void;
  /**
   * Move drag used by the component context.
   */
  moveDrag: (event: PointerEvent) => void;
  /**
   * End drag used by the component context.
   */
  endDrag: (pointerId?: number) => void;
  /**
   * Step value used by the component context.
   */
  stepValue: (index: number, direction: number, multiplier?: number) => void;
  /**
   * Set to limit used by the component context.
   */
  setToLimit: (index: number, limit: 'min' | 'max') => void;
}

/**
 * Available UI slots for the slider component.
 */
export type SliderUiSlot = 'root' | 'track' | 'range' | 'thumb';

/**
 * UI class overrides for the slider component.
 */
export type SliderUi = UiClass<SliderUiSlot>;
