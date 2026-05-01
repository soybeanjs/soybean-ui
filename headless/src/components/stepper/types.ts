import type { ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type { DataOrientation, Direction, PropsToContext, UiClass } from '../../types';
import type { PrimitiveProps } from '../primitive/types';
import type { SeparatorRootProps } from '../separator/types';

export type StepperState = 'completed' | 'active' | 'inactive';

export interface StepperRootProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  /**
   * The value of the step that should be active when initially rendered.
   *
   * @defaultValue 1
   */
  defaultValue?: number;
  /**
   * The controlled value of the step to activate. Can be bind as `v-model`.
   */
  modelValue?: number;
  /**
   * The orientation of the stepper.
   *
   * @defaultValue 'horizontal'
   */
  orientation?: DataOrientation;
  /**
   * The reading direction of the stepper.
   */
  dir?: Direction;
  /**
   * Whether the steps must be completed in order.
   *
   * @defaultValue true
   */
  linear?: boolean;
}

export type StepperRootEmits = {
  'update:modelValue': [payload: number];
};

export interface StepperItemProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  /** The step index, starting from `1`. */
  step: number;
  /** When `true`, prevents the user from interacting with the step. */
  disabled?: boolean;
  /** Shows whether the step is completed. */
  completed?: boolean;
}

export interface StepperTriggerProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

export interface StepperIndicatorProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

export interface StepperTitleProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

export interface StepperDescriptionProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

export interface StepperRootContext extends PropsToContext<StepperRootProps, 'orientation' | 'dir' | 'linear'> {
  modelValue: ShallowRef<number | undefined>;
  stepperItems: ComputedRef<HTMLElement[]>;
  totalSteps: ComputedRef<number>;
  changeModelValue: (value: number) => void;
  registerStepperItem: (element: HTMLElement) => void;
  unregisterStepperItem: (element: HTMLElement | undefined) => void;
}

export interface StepperItemContextParams extends PropsToContext<StepperItemProps, 'step' | 'disabled' | 'completed'> {
  state: ComputedRef<StepperState>;
  isFocusable: ComputedRef<boolean>;
  dataDisabled: ComputedRef<string | undefined>;
}

export interface StepperItemContext extends StepperItemContextParams {
  titleId: ShallowRef<string>;
  descriptionId: ShallowRef<string>;
}

export type StepperUiSlot =
  | 'root'
  | 'item'
  | 'trigger'
  | 'indicator'
  | 'indicatorIcon'
  | 'itemContent'
  | 'separator'
  | 'title'
  | 'description';

export type StepperUi = UiClass<StepperUiSlot>;

export type StepperSeparatorProps = SeparatorRootProps;

export interface StepperItemData {
  title?: string;
  description?: string;
  disabled?: boolean;
  completed?: boolean;
}

export interface StepperCompactProps extends StepperRootProps {
  items: StepperItemData[];
  itemProps?: StepperItemProps;
  triggerProps?: StepperTriggerProps;
  indicatorProps?: StepperIndicatorProps;
  separatorProps?: StepperSeparatorProps;
  titleProps?: StepperTitleProps;
  descriptionProps?: StepperDescriptionProps;
}

export type StepperCompactEmits = StepperRootEmits;

export interface StepperCompactSlots {
  item?: (props: StepperItemData & { step: number; state: StepperState }) => any;
  indicator?: (props: StepperItemData & { step: number; state: StepperState }) => any;
  title?: (props: StepperItemData & { step: number; state: StepperState }) => any;
  description?: (props: StepperItemData & { step: number; state: StepperState }) => any;
  separator?: (props: StepperItemData & { step: number; state: StepperState }) => any;
}
