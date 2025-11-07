import type {
  NumberInputControlProps,
  NumberInputDecrementProps,
  NumberInputIncrementProps,
  NumberInputRootEmits,
  NumberInputRootProps,
  NumberInputUi
} from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

export interface NumberInputProps extends NumberInputRootProps {
  size?: ThemeSize;
  ui?: Partial<NumberInputUi>;
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
  controlProps?: NumberInputControlProps;
  incrementProps?: NumberInputIncrementProps;
  decrementProps?: NumberInputDecrementProps;
}

export type NumberInputEmits = NumberInputRootEmits;
