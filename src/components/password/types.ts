import type { InputControlProps, InputRootEmits, InputRootProps, InputUi } from '@soybeanjs/headless/input';
import type { ClassValue } from '@soybeanjs/headless/types';
import type { ThemeSize } from '@/theme';

type PasswordUiSlot = 'clearable' | 'visible';

type PasswordUi = InputUi & Record<PasswordUiSlot, ClassValue>;

/**
 * Props for the password component.
 */
export interface PasswordProps extends InputRootProps {
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

/**
 * Emits for the password component.
 */
export type PasswordEmits = InputRootEmits & {
  /**
   * Emitted when the visible state changes.
   */
  'update:visible': [visible: boolean];
};
