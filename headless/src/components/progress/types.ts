import type { ComputedRef, HTMLAttributes, SVGAttributes } from 'vue';
import type { Direction, UiClass } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

/**
 * State values for the progress component.
 */
export type ProgressState = 'indeterminate' | 'loading' | 'complete';

/**
 * Properties for the progress root component.
 */
export interface ProgressRootProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  /**
   * Reading direction of the component.
   */
  dir?: Direction;
  /** The controlled progress value. Can be bind as `v-model`. */
  modelValue?: number | null;
  /** The maximum progress value. */
  max?: number;
  /** The accessible label of the current progress value. */
  getValueLabel?: (value: number | null | undefined, max: number) => string | undefined;
  /** The accessible text of the current progress value. */
  getValueText?: (value: number | null | undefined, max: number) => string | undefined;
}

/**
 * Events for the progress root component.
 */
export type ProgressRootEmits = {
  /**
   * Emitted when the model value changes.
   */
  'update:modelValue': [value: number | null | undefined];
  /**
   * Emitted when the max value changes.
   */
  'update:max': [value: number];
};

/**
 * Properties for the progress indicator component.
 */
export interface ProgressIndicatorProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

/**
 * Properties for the progress circle component.
 */
export interface ProgressCircleProps extends /** @vue-ignore */ SVGAttributes {
  /**
   * Stroke width.
   */
  strokeWidth?: number;
}

/**
 * Properties for the progress provider component.
 */
export interface ProgressProviderProps extends ProgressOptions {}

/**
 * Context for the progress root component.
 */
export interface ProgressRootContext {
  /**
   * Reading direction of the component.
   */
  dir: ComputedRef<Direction>;
  /**
   * Current model value.
   */
  modelValue: ComputedRef<number | null | undefined>;
  /**
   * Max used by the component context.
   */
  max: ComputedRef<number>;
  /**
   * Progress state used by the component context.
   */
  progressState: ComputedRef<ProgressState>;
  /**
   * Value percent used by the component context.
   */
  valuePercent: ComputedRef<number | null>;
}

/**
 * Available UI slots for the progress component.
 */
export type ProgressUiSlot = 'root' | 'indicator' | 'circle' | 'track' | 'label';

/**
 * UI class overrides for the progress component.
 */
export type ProgressUi = UiClass<ProgressUiSlot>;

/**
 * Available UI slots for the progress component.
 */
export type ProgressProviderUiSlot = 'root' | 'indicator';

/**
 * UI class overrides for the progress component.
 */
export type ProgressProviderUi = UiClass<ProgressProviderUiSlot>;

/**
 * Type information for the progress options component.
 */
export interface ProgressOptions {
  /**
   * Direction.
   */
  direction?: Direction;
  /**
   * Minimum.
   */
  minimum?: number;
  /**
   * Maximum.
   */
  maximum?: number;
  /**
   * Easing.
   */
  easing?: string;
  /**
   * Speed.
   */
  speed?: number;
  /**
   * Whether trickle.
   */
  trickle?: boolean;
  /**
   * Trickle speed.
   */
  trickleSpeed?: number;
}
