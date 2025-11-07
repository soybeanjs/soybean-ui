import type {
  ClassValue,
  TextareaControlProps,
  TextareaCounterProps,
  TextareaRootEmits,
  TextareaRootProps,
  TextareaUi
} from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';
import type { TextareaResize } from '@/variants/textarea';

export type TextareaExtraThemeSlot = 'clearable';

type TextareaExtendedUi = TextareaUi & Record<TextareaExtraThemeSlot, ClassValue>;

export interface TextareaProps extends TextareaRootProps {
  size?: ThemeSize;
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
  counterProps?: TextareaCounterProps;
}

export type TextareaEmits = TextareaRootEmits;

export type { TextareaResize };
