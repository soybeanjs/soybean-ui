import type { ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type { DataOrientation, Direction, UiClass } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

export interface SliderRootProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
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
}

export type SliderRootEmits = {
  /** Event handler called when the slider value changes. */
  'update:modelValue': [value: number[]];
  /** Event handler called when a slider interaction is committed. */
  valueCommit: [value: number[]];
};

export interface SliderTrackProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

export interface SliderRangeProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

export interface SliderThumbProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  /** The thumb index in the current slider value array. */
  index: number;
}

export type SliderSide = 'top' | 'right' | 'bottom' | 'left';

export type SliderSlideDirection = 'from-left' | 'from-right' | 'from-bottom' | 'from-top';

export interface SliderRootContext {
  modelValue: ShallowRef<number[] | undefined>;
  currentModelValue: ComputedRef<number[]>;
  disabled: ComputedRef<boolean>;
  orientation: ComputedRef<DataOrientation>;
  dir: ComputedRef<Direction>;
  inverted: ComputedRef<boolean>;
  min: ComputedRef<number>;
  max: ComputedRef<number>;
  step: ComputedRef<number>;
  minStepsBetweenThumbs: ComputedRef<number>;
  isHorizontal: ComputedRef<boolean>;
  startEdge: ComputedRef<SliderSide>;
  endEdge: ComputedRef<SliderSide>;
  slideDirection: ComputedRef<SliderSlideDirection>;
  activeThumbIndex: ShallowRef<number>;
  trackElement: ShallowRef<HTMLElement | undefined>;
  thumbElements: ShallowRef<(HTMLElement | undefined)[]>;
  setTrackElement: (el: HTMLElement) => void;
  setThumbElement: (index: number, el: HTMLElement) => void;
  getPercentage: (value: number) => number;
  getClosestValueIndex: (value: number) => number;
  getThumbLabel: (index: number) => string | undefined;
  beginTrackDrag: (event: PointerEvent) => void;
  beginThumbDrag: (index: number, event: PointerEvent) => void;
  moveDrag: (event: PointerEvent) => void;
  endDrag: (pointerId?: number) => void;
  stepValue: (index: number, direction: number, multiplier?: number) => void;
  setToLimit: (index: number, limit: 'min' | 'max') => void;
}

export type SliderUiSlot = 'root' | 'track' | 'range' | 'thumb';

export type SliderUi = UiClass<SliderUiSlot>;
