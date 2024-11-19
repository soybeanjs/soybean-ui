import type { ComputedRef, Ref } from 'vue';
import type { PrimitiveProps } from '../primitive';

// Root
export interface ProgressRootProps {
  /** The progress value. Can be bind as `v-model`. */
  modelValue?: number | null;
  /** The maximum progress value. */
  max?: number;
  /**
   * A function to get the accessible label text representing the current value in a human-readable format.
   *
   * If not provided, the value label will be read as the numeric value as a percentage of the max value.
   */
  getValueLabel?: (value: number, max: number) => string;
}

export type ProgressRootPropsWithPrimitive = ProgressRootProps & PrimitiveProps;

export type ProgressRootEmits = {
  /** Event handler called when the progress value changes */
  'update:modelValue': [value: string[] | undefined];
  /** Event handler called when the max value changes */
  'update:max': [value: number];
};

export type ProgressState = 'indeterminate' | 'loading' | 'complete';

export type ProgressRootContext = {
  modelValue?: Readonly<Ref<ProgressRootProps['modelValue']>>;
  max: Readonly<Ref<number>>;
  progressState: ComputedRef<ProgressState>;
};

// Indicator
export interface ProgressIndicatorProps {}
export type ProgressIndicatorPropsWithPrimitive = ProgressIndicatorProps & PrimitiveProps;
