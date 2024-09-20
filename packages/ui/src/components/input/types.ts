import type { InputSize } from '@soybean-ui/variants';
import type { ClassValue } from '../../types';

export type InputProps = {
  class?: ClassValue;
  defaultValue?: string;
  modelValue?: string;
  size?: InputSize;
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
  enterKeyHint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
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
  type?: InputTypeHTMLAttribute;
  value?: any;
  width?: number;
};

export type InputTypeHTMLAttribute =
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

export type { InputSize };
