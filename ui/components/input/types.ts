import type { ClassValue, InputControlProps, InputRootEmits, InputRootProps, InputThemeSlot } from '@headless';
import type { ThemeSize } from '@theme';

type InputUi = Partial<Record<InputThemeSlot | 'clearable', ClassValue>>;

export interface InputProps extends InputRootProps {
  size?: ThemeSize;
  ui?: InputUi;
  /**
   * The props of the input extra props.
   */
  controlProps?: InputControlProps;
  /** Whether to show the clear icon */
  clearable?: boolean;
  /**
   * The function to set the input element.
   *
   * @param el - The input element.
   */
  inputRef?: (el: HTMLInputElement) => void;
}

export type InputEmits = InputRootEmits;
