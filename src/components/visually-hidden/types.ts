import type { HTMLAttributes, InputHTMLAttributes } from 'vue';
import type { PrimitiveProps } from '../primitive/types';

export type VisuallyHiddenFeature = 'focusable' | 'fully-hidden';

export interface VisuallyHiddenProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  feature?: VisuallyHiddenFeature;
}

export interface VisuallyHiddenInputProps<T> extends /** @vue-ignore */ InputHTMLAttributes {
  name: string;
  value: T;
  checked?: boolean;
  required?: boolean;
  disabled?: boolean;
  feature?: VisuallyHiddenFeature;
}
