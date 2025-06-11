import type { ComputedRef, Ref } from 'vue';
import type { ClassValueProp, PrimitiveProps } from '../../types';

// Root
export interface ProgressRootProps extends ClassValueProp {
  /** The progress value. Can be bind as `v-model`. */
  modelValue?: number | null;
  /** The maximum progress value. */
  max?: number;
  /**
   * A function to get the accessible label text in a human-readable format.
   *
   * If not provided, the value label will be read as the numeric value as a percentage of the max value.
   */
  getValueLabel?: (value: number | null | undefined, max: number) => string | undefined;
  /** A function to get the accessible value text representing the current value in a human-readable format. */
  getValueText?: (value: number | null | undefined, max: number) => string | undefined;
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
export interface ProgressIndicatorProps extends ClassValueProp {}
export type ProgressIndicatorPropsWithPrimitive = ProgressIndicatorProps & PrimitiveProps;
