import type { ClassValue, InputControlEmits, InputControlProps, InputRootProps, InputThemeSlot } from '@headless';
import type { ThemeSize } from '@theme';

type InputUi = Partial<Record<InputThemeSlot | 'clearable', ClassValue>>;

export interface InputProps extends InputControlProps {
  /**
   * The function to set the input element.
   *
   * @param el - The input element.
   */
  inputRef?: (el: HTMLInputElement) => void;
  size?: ThemeSize;
  ui?: InputUi;
  rootProps?: InputRootProps;
  clearable?: boolean;
}

export type InputEmits = InputControlEmits;
