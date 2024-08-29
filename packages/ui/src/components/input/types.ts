import type { ClassValue, InputSize } from '@soybean-ui/variants';

export interface InputProps {
  class?: ClassValue;
  defaultValue?: string;
  size?: InputSize;
  id?: string;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  type?: string;
}

export type { InputSize };
