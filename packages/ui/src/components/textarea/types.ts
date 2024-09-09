import type { TextareaHTMLAttributes } from 'vue';
import type { ClassValue, TextareaResize, TextareaSize } from '@soybean-ui/variants';

export type TextareaProps = {
  class?: ClassValue;
  modelValue?: string;
  defaultValue?: string;
  size?: TextareaSize;
  resize?: TextareaResize;
} & /* @vue-ignore */ TextareaHTMLAttributes;

export type { TextareaSize };
