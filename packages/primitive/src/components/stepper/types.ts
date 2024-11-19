import type { Ref } from 'vue';
import type { PrimitiveProps } from '../primitive';
import type { DataOrientation, Direction } from '../../types';
import type { SeparatorProps } from '../separator';

// Root
export interface StepperRootProps extends PrimitiveProps {
  /**
   * The value of the step that should be active when initially rendered. Use when you do not need to control the state
   * of the steps.
   */
  defaultValue?: number;
  /**
   * The orientation the steps are laid out. Mainly so arrow navigation is done accordingly (left & right vs. up &
   * down).
   *
   * @defaultValue horizontal
   */
  orientation?: DataOrientation;
  /**
   * The reading direction of the combobox when applicable. If omitted, inherits globally from `ConfigProvider` or
   * assumes LTR (left-to-right) reading mode.
   */
  dir?: Direction;
  /** The controlled value of the step to activate. Can be bound as `v-model`. */
  modelValue?: number;
  /** Whether or not the steps must be completed in order. */
  linear?: boolean;
}

export type StepperRootPropsWithPrimitive = StepperRootProps & PrimitiveProps;

export type StepperRootEmits = {
  /** Event handler called when the value changes */
  'update:modelValue': [payload: number | undefined];
};

export type StepperRootContext = {
  modelValue: Ref<number | undefined>;
  changeModelValue: (value: number) => void;
  orientation: Ref<DataOrientation>;
  dir: Ref<Direction>;
  linear: Ref<boolean>;
  totalStepperItems: Ref<Set<HTMLElement>>;
};

// Item
export type StepperState = 'completed' | 'active' | 'inactive';

export interface StepperItemProps extends PrimitiveProps {
  /** A unique value that associates the stepper item with an index */
  step: number;
  /** When `true`, prevents the user from interacting with the step. */
  disabled?: boolean;
  /** Shows whether the step is completed. */
  completed?: boolean;
}

export type StepperItemContext = {
  titleId: string;
  descriptionId: string;
  step: Ref<number>;
  state: Ref<StepperState>;
  disabled: Ref<boolean>;
  isFocusable: Ref<boolean>;
};

// Description
export interface StepperDescriptionProps extends PrimitiveProps {}
export type StepperDescriptionPropsWithPrimitive = StepperDescriptionProps & PrimitiveProps;

// Title
export interface StepperTitleProps extends PrimitiveProps {}
export type StepperTitlePropsWithPrimitive = StepperTitleProps & PrimitiveProps;

// Indicator
export interface StepperIndicatorProps extends PrimitiveProps {}
export type StepperIndicatorPropsWithPrimitive = StepperIndicatorProps & PrimitiveProps;

// Trigger
export interface StepperTriggerProps extends PrimitiveProps {}
export type StepperTriggerPropsWithPrimitive = StepperTriggerProps & PrimitiveProps;

// Separator
export interface StepperSeparatorProps extends SeparatorProps {}
export type StepperSeparatorPropsWithPrimitive = StepperSeparatorProps & PrimitiveProps;
