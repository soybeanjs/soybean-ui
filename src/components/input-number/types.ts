import type {
  ClassValue,
  InputNumberControlProps,
  InputNumberDecrementProps,
  InputNumberIncrementProps,
  InputNumberRootEmits,
  InputNumberRootProps,
  InputNumberUi
} from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

/**
 * Props for the input number component.
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
   * Props forwarded to the control element.
   */
  controlProps?: InputNumberControlProps;
  /**
   * Props forwarded to the increment element.
   */
  incrementProps?: InputNumberIncrementProps;
  /**
   * Props forwarded to the decrement element.
   */
  decrementProps?: InputNumberDecrementProps;
}

/**
 * Emits for the input number component.
 */
export type InputNumberEmits = InputNumberRootEmits;
