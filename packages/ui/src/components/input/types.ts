import type { InputHTMLAttributes } from 'vue';
import type { ClassValue, InputSize } from '@soybean-ui/variants';

export type InputProps = {
  class?: ClassValue;
  defaultValue?: string;
  modelValue?: string;
  size?: InputSize;
} & /* @vue-ignore */ InputHTMLAttributes;

export type { InputSize };
