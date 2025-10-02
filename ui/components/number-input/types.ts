import type {
  ClassValue,
  NumberInputControlProps,
  NumberInputDecrementProps,
  NumberInputIncrementProps,
  NumberInputRootEmits,
  NumberInputRootProps,
  NumberInputThemeSlot
} from '@headless';
import type { ThemeSize } from '@theme';

export type NumberInputUi = Partial<Record<NumberInputThemeSlot, ClassValue>>;

export interface NumberInputProps extends NumberInputRootProps {
  /**
   * The function to set the input element.
   *
   * @param el - The input element.
   */
  inputRef?: (el: HTMLInputElement) => void;
  size?: ThemeSize;
  ui?: NumberInputUi;
  clearable?: boolean;
  /**
   * Whether to center the input.
   *
   * @defaultValue false
   */
  center?: boolean;
  controlProps?: NumberInputControlProps;
  incrementProps?: NumberInputIncrementProps;
  decrementProps?: NumberInputDecrementProps;
}

export type NumberInputEmits = NumberInputRootEmits;
