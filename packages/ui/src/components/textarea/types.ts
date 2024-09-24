import type { TextareaResize, ThemeSize } from '@soybean-ui/variants';
import type { ClassValue } from '../../types';

export type TextareaRootProps = {
  class?: ClassValue;
};

export type TextareaWordCountProps = {
  value?: string;
  class?: ClassValue;
  size?: ThemeSize;
  maxlength?: number | string;
  countGraphemes?: (input: string) => number;
};

export type TextareaProps = {
  class?: ClassValue;
  modelValue?: string;
  defaultValue?: string;
  size?: ThemeSize;
  resize?: TextareaResize;
  id?: string;
  showCount?: boolean;
  countClass?: ClassValue;
  countGraphemes?: (input: string) => number;
  // from TextareaHTMLAttributes
  autocomplete?: string;
  autofocus?: boolean;
  cols?: number;
  dirname?: string;
  disabled?: boolean;
  form?: string;
  maxlength?: number | string;
  minlength?: number | string;
  name?: string;
  placeholder?: string;
  readonly?: boolean;
  required?: boolean;
  rows?: number;
  value?: string | ReadonlyArray<string> | number | null;
  wrap?: string;
};
