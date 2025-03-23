import type { ClassValue, ClassValueProp } from '@soybean-ui/primitives';
import type { TextareaResize, TextareaSlots, ThemeSize } from '@soybean-ui/variants';

export interface TextareaRootProps extends ClassValueProp {}

export interface TextareaContentProps extends ClassValueProp {
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
}

export type TextareaContentEmits = {
  'update:modelValue': [value: string];
};

export interface TextareaCountProps extends Pick<TextareaContentProps, 'class' | 'size' | 'maxlength'> {
  value?: string;
  countGraphemes?: (input: string) => number;
}

export type TextareaUi = Partial<Record<TextareaSlots, ClassValue>>;

export interface TextareaProps
  extends TextareaRootProps,
    TextareaContentProps,
    Pick<TextareaCountProps, 'countGraphemes'> {
  ui?: TextareaUi;
  showCount?: boolean;
}
