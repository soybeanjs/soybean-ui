import type { ComputedRef, Ref } from 'vue';
import type { ClassValueProp, DataOrientation, Direction, FormFieldProps, PrimitiveProps, Side } from '../../types';

export type ThumbAlignment = 'contain' | 'overflow';

// Root
export interface SliderRootProps extends ClassValueProp, FormFieldProps {
  /** The value of the slider when initially rendered. Use when you do not need to control the state of the slider. */
  defaultValue?: number[];
  /** The controlled value of the slider. Can be bind as `v-model`. */
  modelValue?: number[] | null;
  /** When `true`, prevents the user from interacting with the slider. */
  disabled?: boolean;
  /** The orientation of the slider. */
  orientation?: DataOrientation;
  /**
   * The reading direction of the combobox when applicable. If omitted, inherits globally from `ConfigProvider` or
   * assumes LTR (left-to-right) reading mode.
   */
  dir?: Direction;
  /** Whether the slider is visually inverted. */
  inverted?: boolean;
  /** The minimum value for the range. */
  min?: number;
  /** The maximum value for the range. */
  max?: number;
  /** The stepping interval. */
  step?: number;
  /** The minimum permitted steps between multiple thumbs. */
  minStepsBetweenThumbs?: number;
  /**
   * The alignment of the slider thumb.
   *
   * - `contain`: thumbs will be contained within the bounds of the track.
   * - `overflow`: thumbs will not be bound by the track. No extra offset will be added.
   *
   * @defaultValue 'contain'
   */
  thumbAlignment?: ThumbAlignment;
}
export type SliderRootPropsWithPrimitive = SliderRootProps & PrimitiveProps;

export type SliderRootEmits = {
  /** Event handler called when the slider value changes */
  'update:modelValue': [payload: number[] | undefined];
  /**
   * Event handler called when the value changes at the end of an interaction. Useful when you only need to capture a
   * final value e.g. to update a backend service.
   */
  valueCommit: [payload: number[]];
};

export type SliderRootContext = {
  orientation: Ref<DataOrientation>;
  disabled: Ref<boolean>;
  min: Ref<number>;
  max: Ref<number>;
  modelValue?: Readonly<Ref<number[] | null | undefined>>;
  currentModelValue: ComputedRef<number[]>;
  valueIndexToChangeRef: Ref<number>;
  thumbElements: Ref<HTMLElement[]>;
  thumbAlignment: Ref<ThumbAlignment>;
};

// Thumb
export interface SliderThumbProps extends ClassValueProp {}
export type SliderThumbPropsWithPrimitive = SliderThumbProps & PrimitiveProps;

// ThumbImpl
export interface SliderThumbImplProps extends ClassValueProp {
  index: number;
}
export type SliderThumbImplPropsWithPrimitive = SliderThumbImplProps & PrimitiveProps;

// Track
export interface SliderTrackProps extends ClassValueProp {}
export type SliderTrackPropsWithPrimitive = SliderTrackProps & PrimitiveProps;

// Range
export interface SliderRangeProps extends ClassValueProp {}
export type SliderRangePropsWithPrimitive = SliderRangeProps & PrimitiveProps;

// Impl
export interface SliderImplProps extends ClassValueProp {}
export type SliderImplPropsWithPrimitive = SliderImplProps & PrimitiveProps;

export type SliderImplEmits = {
  slideStart: [event: PointerEvent];
  slideMove: [event: PointerEvent];
  slideEnd: [event: PointerEvent];
  homeKeyDown: [event: KeyboardEvent];
  endKeyDown: [event: KeyboardEvent];
  stepKeyDown: [event: KeyboardEvent];
};

// Orientation
export interface SliderOrientationPrivateProps {
  min: number;
  max: number;
  inverted: boolean;
}

export interface SliderHorizontalProps extends SliderOrientationPrivateProps {
  dir?: Direction;
}

export interface SliderVerticalProps extends SliderOrientationPrivateProps {}

export type SliderOrientationPrivateEmits = {
  slideEnd: [];
  slideStart: [value: number];
  slideMove: [value: number];
  homeKeyDown: [event: KeyboardEvent];
  endKeyDown: [event: KeyboardEvent];
  stepKeyDown: [event: KeyboardEvent, direction: number];
};

export interface SliderOrientation {
  startEdge: ComputedRef<Side>;
  endEdge: ComputedRef<Side>;
  size: 'width' | 'height';
  direction: ComputedRef<1 | -1>;
}
