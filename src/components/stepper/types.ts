import type {
  ClassValue,
  StepperDescriptionProps,
  StepperIndicatorProps,
  StepperItemProps,
  StepperRootEmits,
  StepperRootProps,
  StepperSeparatorProps,
  StepperTitleProps,
  StepperTriggerProps,
  StepperUiSlot,
  UiClass
} from '@soybeanjs/headless';
import type { ThemeColor, ThemeSize } from '@/theme';

/**
 * Option data for the stepper component.
 */
export interface StepperOptionData extends Pick<StepperItemProps, 'disabled' | 'completed'> {
  /**
   * Title text rendered by the component.
   */
  title?: string;
  /**
   * Description text rendered by the component.
   */
  description?: string;
}

/**
 * Additional UI slots for the stepper component.
 */
export type StepperExtraUiSlot = 'itemContent' | 'indicatorIcon';

/**
 * Extended UI class overrides for the stepper component.
 */
export type StepperExtendedUi = UiClass<StepperUiSlot | StepperExtraUiSlot>;

/**
 * Props for the stepper component.
 */
export interface StepperProps extends StepperRootProps {
  /**
   * Additional class names applied to the root element.
   */
  class?: ClassValue;
  /**
   * Theme color of the component.
   */
  color?: ThemeColor;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<StepperExtendedUi>;
  /**
   * Items rendered by the component.
   */
  items: StepperOptionData[];
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
 * Emits for the stepper component.
 */
export type StepperEmits = StepperRootEmits;
