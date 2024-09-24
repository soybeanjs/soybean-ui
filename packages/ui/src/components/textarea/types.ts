import type { TextareaResize, ThemeSize } from '@soybean-ui/variants';
import type { ClassValue } from '../../types';

export type TextareaRootProps = {
  class?: ClassValue;
};

export type TextareaContentProps = {
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

export type TextareaContentEmits = {
  'update:modelValue': [value: string];
};

export type TextareaCountProps = {
  class?: ClassValue;
  size?: ThemeSize;
  maxlength?: number | string;
  value?: string;
  countGraphemes?: (input: string) => number;
};

export type TextareaProps = TextareaRootProps &
  TextareaContentProps &
  Pick<TextareaCountProps, 'countGraphemes'> & {
    showCount?: boolean;
    contentClass?: ClassValue;
    countClass?: ClassValue;
  };
