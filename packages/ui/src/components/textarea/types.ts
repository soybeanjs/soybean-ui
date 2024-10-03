import type { TextareaResize, ThemeSize } from '@soybean-ui/variants';
import type { ClassValue, ClassValueProp } from '../../types';

export type TextareaRootProps = ClassValueProp;

export type TextareaContentProps = ClassValueProp & {
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

export type TextareaCountProps = Pick<TextareaContentProps, 'class' | 'size' | 'maxlength'> & {
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
