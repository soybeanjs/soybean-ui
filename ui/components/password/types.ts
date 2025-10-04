import type { ClassValue, InputControlProps, InputRootEmits, InputRootProps, InputThemeSlot } from '@headless';
import type { ThemeSize } from '@theme';

type PasswordUi = Partial<Record<InputThemeSlot | 'clearable' | 'visible', ClassValue>>;

export interface PasswordProps extends InputRootProps {
  size?: ThemeSize;
  ui?: PasswordUi;
  /** Whether to show the password */
  visible?: boolean;
  /** Whether to show the clear icon */
  clearable?: boolean;
  /**
   * The function to set the input element.
   *
   * @param el - The input element.
   */
  inputRef?: (el: HTMLInputElement) => void;
  /**
   * The props of the input extra props.
   */
  controlProps?: InputControlProps;
}

export type PasswordEmits = InputRootEmits & {
  'update:visible': [visible: boolean];
};
