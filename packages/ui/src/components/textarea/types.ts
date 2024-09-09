import type { TextareaHTMLAttributes } from 'vue';
import type { ClassValue, TextareaSize } from '@soybean-ui/variants';

export type TextareaProps = {
  class?: ClassValue;
  modelValue?: string;
  defaultValue?: string;
  size?: TextareaSize;
} & /* @vue-ignore */ TextareaHTMLAttributes;

export type { TextareaSize };
