import type { ThemeSize } from '@soybean-ui/variants';
import type { ClassValueProp } from '../../types';

export type InputProps = ClassValueProp & {
  defaultValue?: string;
  modelValue?: string;
  size?: ThemeSize;
  id?: string;
  // from InputHTMLAttributes
  accept?: string;
  alt?: string;
  autocomplete?: string;
  autofocus?: boolean;
  capture?: boolean | 'user' | 'environment';
  checked?: boolean | any[] | Set<any>;
  crossorigin?: string;
  disabled?: boolean;
  enterKeyHint?: EnterKeyHint;
  form?: string;
  formaction?: string;
  formenctype?: string;
  formmethod?: string;
  formnovalidate?: boolean;
  formtarget?: string;
  height?: number;
  indeterminate?: boolean;
  list?: string;
  max?: number;
  maxlength?: number;
  min?: number;
  minlength?: number;
  multiple?: boolean;
  name?: string;
  pattern?: string;
  placeholder?: string;
  readonly?: boolean;
  required?: boolean;
  src?: string;
  step?: number;
  type?: InputType;
  value?: any;
  width?: number;
};

export type InputEmits = {
  'update:modelValue': [value: string];
};

export type InputType =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week'
  | (string & {});

export type EnterKeyHint = 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
