import type { ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type { DataOrientation, Direction, PropsToContext, UiClass } from '../../types';
import type { PrimitiveProps } from '../primitive/types';
import type { SeparatorRootProps } from '../separator/types';

/**
 * State values for the stepper component.
 */
export type StepperState = 'completed' | 'active' | 'inactive';

/**
 * Props for the stepper root component.
 */
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

/**
 * Emits for the stepper root component.
 */
export type StepperRootEmits = {
  /**
   * Emitted when the model value changes.
   */
  'update:modelValue': [payload: number];
};

/**
 * Props for the stepper item component.
 */
export interface StepperItemProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  /** The step index, starting from `1`. */
  step: number;
  /** When `true`, prevents the user from interacting with the step. */
  disabled?: boolean;
  /** Shows whether the step is completed. */
  completed?: boolean;
}

/**
 * Props for the stepper trigger component.
 */
export interface StepperTriggerProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the stepper indicator component.
 */
export interface StepperIndicatorProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the stepper title component.
 */
export interface StepperTitleProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the stepper description component.
 */
export interface StepperDescriptionProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

/**
 * Context for the stepper root component.
 */
export interface StepperRootContext extends PropsToContext<StepperRootProps, 'orientation' | 'dir' | 'linear'> {
  /**
   * Current model value.
   */
  modelValue: ShallowRef<number | undefined>;
  /**
   * Stepper items used by the component context.
   */
  stepperItems: ComputedRef<HTMLElement[]>;
  /**
   * Total steps used by the component context.
   */
  totalSteps: ComputedRef<number>;
  /**
   * Change model value used by the component context.
   */
  changeModelValue: (value: number) => void;
  /**
   * Register stepper item used by the component context.
   */
  registerStepperItem: (element: HTMLElement) => void;
  /**
   * Unregister stepper item used by the component context.
   */
  unregisterStepperItem: (element: HTMLElement | undefined) => void;
}

/**
 * Parameters used to create the stepper item context.
 */
export interface StepperItemContextParams extends PropsToContext<StepperItemProps, 'step' | 'disabled' | 'completed'> {
  /**
   * State used by the component context.
   */
  state: ComputedRef<StepperState>;
  /**
   * Whether a focusable.
   */
  isFocusable: ComputedRef<boolean>;
  /**
   * Data disabled used by the component context.
   */
  dataDisabled: ComputedRef<string | undefined>;
}

/**
 * Context for the stepper item component.
 */
export interface StepperItemContext extends StepperItemContextParams {
  /**
   * Title id used by the component context.
   */
  titleId: ShallowRef<string>;
  /**
   * Description id used by the component context.
   */
  descriptionId: ShallowRef<string>;
}

/**
 * Available UI slots for the stepper component.
 */
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

/**
 * UI class overrides for the stepper component.
 */
export type StepperUi = UiClass<StepperUiSlot>;

/**
 * Props for the stepper separator component.
 */
export type StepperSeparatorProps = SeparatorRootProps;

/**
 * Type information for the stepper item data component.
 */
export interface StepperItemData {
  /**
   * Title text rendered by the component.
   */
  title?: string;
  /**
   * Description text rendered by the component.
   */
  description?: string;
  /**
   * Whether the component is disabled.
   */
  disabled?: boolean;
  /**
   * Whether completed.
   */
  completed?: boolean;
}

/**
 * Props for the stepper compact component.
 */
export interface StepperCompactProps extends StepperRootProps {
  /**
   * Items rendered by the component.
   */
  items: StepperItemData[];
  /**
   * Props forwarded to the item element.
   */
  itemProps?: StepperItemProps;
  /**
   * Props forwarded to the trigger element.
   */
  triggerProps?: StepperTriggerProps;
  /**
   * Props forwarded to the indicator element.
   */
  indicatorProps?: StepperIndicatorProps;
  /**
   * Props forwarded to the separator element.
   */
  separatorProps?: StepperSeparatorProps;
  /**
   * Props forwarded to the title element.
   */
  titleProps?: StepperTitleProps;
  /**
   * Props forwarded to the description element.
   */
  descriptionProps?: StepperDescriptionProps;
}

/**
 * Emits for the stepper compact component.
 */
export type StepperCompactEmits = StepperRootEmits;

/**
 * Slots for the stepper compact component.
 */
export interface StepperCompactSlots {
  /**
   * Custom content for the item slot.
   */
  item?: (props: StepperItemData & { step: number; state: StepperState }) => any;
  /**
   * Custom content for the indicator slot.
   */
  indicator?: (props: StepperItemData & { step: number; state: StepperState }) => any;
  /**
   * Custom content for the title slot.
   */
  title?: (props: StepperItemData & { step: number; state: StepperState }) => any;
  /**
   * Custom content for the description slot.
   */
  description?: (props: StepperItemData & { step: number; state: StepperState }) => any;
  /**
   * Custom content for the separator slot.
   */
  separator?: (props: StepperItemData & { step: number; state: StepperState }) => any;
}
