import type {
  ClassValue,
  TextareaControlProps,
  TextareaCounterProps,
  TextareaRootEmits,
  TextareaRootProps,
  TextareaUi
} from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';
import type { TextareaResize } from './variants';

/**
 * Additional UI slots for the textarea component.
 */
export type TextareaExtraUiSlot = 'clearable';

type TextareaExtendedUi = TextareaUi & Record<TextareaExtraUiSlot, ClassValue>;

/**
 * Props for the textarea component.
 */
export interface TextareaProps extends TextareaRootProps {
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
  ui?: Partial<TextareaExtendedUi>;
  /**
   * The resize of the textarea
   *
   * if autosize is true, the resize will be ignored
   */
  resize?: TextareaResize;
  /** Whether to show the clear icon */
  clearable?: boolean;
  /** Whether to show the counter */
  showCounter?: boolean;
  /**
   * The function to set the textarea element.
   *
   * @param el - The textarea element.
   */
  textareaRef?: (el: HTMLTextAreaElement) => void;
  /**
   * The props of the textarea extra props.
   */
  controlProps?: TextareaControlProps;
  /**
   * Props forwarded to the counter element.
   */
  counterProps?: TextareaCounterProps;
}

/**
 * Emits for the textarea component.
 */
export type TextareaEmits = TextareaRootEmits;

export type { TextareaResize };
