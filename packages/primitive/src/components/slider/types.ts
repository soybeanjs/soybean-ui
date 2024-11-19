import type { Ref } from 'vue';
import type { PrimitiveProps } from '../primitive';
import type { DataOrientation, Direction, FormFieldProps, Side } from '../../types';

// Root
export interface SliderRootProps extends FormFieldProps {
  /** The value of the slider when initially rendered. Use when you do not need to control the state of the slider. */
  defaultValue?: number[];
  /** The controlled value of the slider. Can be bind as `v-model`. */
  modelValue?: number[];
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
  modelValue?: Readonly<Ref<number[] | undefined>>;
  valueIndexToChangeRef: Ref<number>;
  thumbElements: Ref<HTMLElement[]>;
};

// Thumb
export interface SliderThumbProps {}
export type SliderThumbPropsWithPrimitive = SliderThumbProps & PrimitiveProps;

// ThumbImpl
export interface SliderThumbImplProps {
  index: number;
}
export type SliderThumbImplPropsWithPrimitive = SliderThumbImplProps & PrimitiveProps;

// Track
export interface SliderTrackProps {}
export type SliderTrackPropsWithPrimitive = SliderTrackProps & PrimitiveProps;

// Range
export interface SliderRangeProps {}
export type SliderRangePropsWithPrimitive = SliderRangeProps & PrimitiveProps;

// Impl
export interface SliderImplProps {}
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
  startEdge: Side;
  endEdge: Side;
  size: 'width' | 'height';
  direction: number;
}
