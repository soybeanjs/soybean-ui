import type { ComputedRef, HTMLAttributes, SVGAttributes } from 'vue';
import type { Direction, UiClass } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

export type ProgressState = 'indeterminate' | 'loading' | 'complete';

export interface ProgressOptions {
  minimum?: number;
  maximum?: number;
  easing?: string;
  speed?: number;
  trickle?: boolean;
  trickleSpeed?: number;
  direction?: Direction;
  indeterminate?: boolean;
}

export interface ProgressRootProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  /** The controlled progress value. Can be bind as `v-model`. */
  modelValue?: number | null;
  /** The maximum progress value. */
  max?: number;
  /** The accessible label of the current progress value. */
  getValueLabel?: (value: number | null | undefined, max: number) => string | undefined;
  /** The accessible text of the current progress value. */
  getValueText?: (value: number | null | undefined, max: number) => string | undefined;
}

export type ProgressRootEmits = {
  'update:modelValue': [value: number | null | undefined];
  'update:max': [value: number];
};

export interface ProgressIndicatorProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

export interface ProgressProviderProps extends Omit<ProgressRootProps, 'max' | 'modelValue'>, ProgressOptions {
  indicatorProps?: ProgressIndicatorProps;
}

export interface ProgressCircleProps extends /** @vue-ignore */ SVGAttributes {
  strokeWidth?: number;
}

export interface ProgressRootContext {
  modelValue: ComputedRef<number | null | undefined>;
  max: ComputedRef<number>;
  progressState: ComputedRef<ProgressState>;
  valuePercent: ComputedRef<number | null>;
}

export interface ProgressRenderState {
  visible: boolean;
  value: number | null;
  settings: Required<ProgressOptions>;
}

export type ProgressUiSlot = 'root' | 'indicator' | 'circle' | 'track' | 'label';

export type ProgressUi = UiClass<ProgressUiSlot>;

export type ProgressPromise<Data = unknown> = PromiseLike<Data> | (() => PromiseLike<Data>);

export type ProgressSubscriber = (state: ProgressRenderState) => void;
