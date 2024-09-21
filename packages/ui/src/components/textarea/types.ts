import type { TextareaResize, ThemeSize } from '@soybean-ui/variants';
import type { ClassValue } from '../../types';

export type TextareaProps = {
  class?: ClassValue;
  modelValue?: string;
  defaultValue?: string;
  size?: ThemeSize;
  resize?: TextareaResize;
  id?: string;
  // from TextareaHTMLAttributes
  autocomplete?: string;
  autofocus?: boolean;
  cols?: number;
  dirname?: string;
  disabled?: boolean;
  form?: string;
  maxlength?: number;
  minlength?: number;
  name?: string;
  placeholder?: string;
  readonly?: boolean;
  required?: boolean;
  rows?: number;
  value?: string | ReadonlyArray<string> | number | null;
  wrap?: string;
};
