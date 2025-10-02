import type { ClassValue, InputControlProps, InputRootEmits, InputRootProps, InputThemeSlot } from '@headless';
import type { ThemeSize } from '@theme';

type InputUi = Partial<Record<InputThemeSlot | 'clearable', ClassValue>>;

export interface InputProps extends InputRootProps {
  /**
   * The function to set the input element.
   *
   * @param el - The input element.
   */
  inputRef?: (el: HTMLInputElement) => void;
  size?: ThemeSize;
  ui?: InputUi;
  controlProps?: InputControlProps;
  clearable?: boolean;
}

export type InputEmits = InputRootEmits;
