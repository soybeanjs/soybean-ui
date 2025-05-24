import type { FormFieldProps } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

export type VisuallyHiddenFeature = 'focusable' | 'fully-hidden';

export interface VisuallyHiddenProps extends PrimitiveProps {
  feature?: VisuallyHiddenFeature;
}

export interface VisuallyHiddenInputBubbleProps<T> extends FormFieldProps<T> {
  checked?: boolean;
  disabled?: boolean;
  feature?: VisuallyHiddenFeature;
}

export interface VisuallyHiddenInputProps<T> extends VisuallyHiddenInputBubbleProps<T> {}
