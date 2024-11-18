import type { PrimitiveProps } from '../primitive/types';

export type VisuallyHiddenFeature = 'focusable' | 'fully-hidden';

export interface VisuallyHiddenProps {
  feature?: VisuallyHiddenFeature;
}

export type VisuallyHiddenPropsWithPrimitive = VisuallyHiddenProps & PrimitiveProps;

export interface VisuallyHiddenInputBubbleProps<T> extends VisuallyHiddenPropsWithPrimitive {
  name: string;
  value: T;
  checked?: boolean;
  required?: boolean;
  disabled?: boolean;
}
