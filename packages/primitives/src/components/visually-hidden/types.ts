import type { ClassValueProp, PrimitiveProps } from '../../types';

export type VisuallyHiddenFeature = 'focusable' | 'fully-hidden';

export interface VisuallyHiddenProps extends ClassValueProp {
  feature?: VisuallyHiddenFeature;
}
export type VisuallyHiddenPropsWithPrimitive = VisuallyHiddenProps & PrimitiveProps;

export interface VisuallyHiddenInputBubbleProps<T> extends VisuallyHiddenProps {
  name: string;
  value: T;
  checked?: boolean;
  required?: boolean;
  disabled?: boolean;
}
export type VisuallyHiddenInputBubblePropsWithPrimitive<T> = VisuallyHiddenInputBubbleProps<T> & PrimitiveProps;
