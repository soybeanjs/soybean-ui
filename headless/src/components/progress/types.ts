import type { ComputedRef, HTMLAttributes } from 'vue';
import type { UiClass } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

export type ProgressState = 'indeterminate' | 'loading' | 'complete';

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

export interface ProgressRootContext {
  modelValue: ComputedRef<number | null | undefined>;
  max: ComputedRef<number>;
  progressState: ComputedRef<ProgressState>;
  valuePercent: ComputedRef<number | null>;
}

export type ProgressUiSlot = 'root' | 'indicator';

export type ProgressUi = UiClass<ProgressUiSlot>;
