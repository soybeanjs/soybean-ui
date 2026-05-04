import type {
  InputNumberControlProps,
  InputNumberDecrementProps,
  InputNumberIncrementProps,
  InputNumberRootEmits,
  InputNumberRootProps,
  InputNumberUi
} from '@soybeanjs/headless/input-number';
import type { ClassValue } from '@soybeanjs/headless/types';
import type { ThemeSize } from '@/theme';

/**
 * Properties for the InputNumber component.
 */
export interface InputNumberProps extends InputNumberRootProps {
  /**
   * Additional class names applied to the root element.
   */
  class?: ClassValue;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<InputNumberUi>;
  /**
   * Whether to center the input.
   *
   * @defaultValue false
   */
  center?: boolean;
  /** Whether to show the clear icon */
  clearable?: boolean;
  /**
   * The function to set the input element.
   *
   * @param el - The input element.
   */
  inputRef?: (el: HTMLInputElement) => void;
  /**
   * Properties forwarded to the control element.
   */
  controlProps?: InputNumberControlProps;
  /**
   * Properties forwarded to the increment element.
   */
  incrementProps?: InputNumberIncrementProps;
  /**
   * Properties forwarded to the decrement element.
   */
  decrementProps?: InputNumberDecrementProps;
}

/**
 * Events for the InputNumber component.
 */
export type InputNumberEmits = InputNumberRootEmits;
