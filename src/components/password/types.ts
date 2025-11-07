import type { ClassValue, InputControlProps, InputRootEmits, InputRootProps, InputUi } from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

type PasswordThemeSlot = 'clearable' | 'visible';

type PasswordUi = InputUi & Record<PasswordThemeSlot, ClassValue>;

export interface PasswordProps extends InputRootProps {
  size?: ThemeSize;
  ui?: Partial<PasswordUi>;
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
