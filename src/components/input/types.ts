import type { ClassValue, InputControlProps, InputRootEmits, InputRootProps, InputUi } from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

type InputExtraThemeSlot = 'clearable';

type InputExtendedUi = InputUi & Record<InputExtraThemeSlot, ClassValue>;

export interface InputProps extends InputRootProps {
  size?: ThemeSize;
  ui?: Partial<InputExtendedUi>;
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

export type InputEmits = InputRootEmits;
