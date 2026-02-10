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

export interface InputNumberProps extends InputNumberRootProps {
  class?: ClassValue;
  size?: ThemeSize;
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
  controlProps?: InputNumberControlProps;
  incrementProps?: InputNumberIncrementProps;
  decrementProps?: InputNumberDecrementProps;
}

export type InputNumberEmits = InputNumberRootEmits;
