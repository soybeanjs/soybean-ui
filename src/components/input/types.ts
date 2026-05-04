import type { InputControlProps, InputRootEmits, InputRootProps, InputUi } from '@soybeanjs/headless/input';
import type { ClassValue } from '@soybeanjs/headless/types';
import type { ThemeSize } from '@/theme';

type InputExtraUiSlot = 'clearable';

type InputExtendedUi = InputUi & Record<InputExtraUiSlot, ClassValue>;

/**
 * Properties for the input component.
 */
export interface InputProps extends InputRootProps {
  /**
   * root class
   */
  class?: ClassValue;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Per-slot class overrides for the component.
   */
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

/**
 * Events for the input component.
 */
export type InputEmits = InputRootEmits;
