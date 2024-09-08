import type { ClassValue, TextareaSize } from '@soybean-ui/variants';
import type { PrimitivePropsWithClass } from '../../types';

export type TextareaProps = PrimitivePropsWithClass & {
  class?: ClassValue;
  defaultValue?: string;
  modelValue?: string;
  size?: TextareaSize;
  id?: string;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  type?: string;
};

export type { TextareaSize };
