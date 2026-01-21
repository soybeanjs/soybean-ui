import type { HTMLAttributes } from 'vue';
import type { PrimitiveProps } from '../primitive/types';

export type VisuallyHiddenFeature = 'focusable' | 'fully-hidden';

export interface VisuallyHiddenProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  feature?: VisuallyHiddenFeature;
}

export interface VisuallyHiddenInputProps {
  name: string;
  value: any;
  checked?: boolean;
  required?: boolean;
  disabled?: boolean;
  feature?: VisuallyHiddenFeature;
}
