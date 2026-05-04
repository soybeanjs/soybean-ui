import type { HTMLAttributes } from 'vue';
import type { PrimitiveProps } from '../primitive/types';

/**
 * Type information for the visually hidden feature component.
 */
export type VisuallyHiddenFeature = 'focusable' | 'fully-hidden';

/**
 * Properties for the visually hidden component.
 */
export interface VisuallyHiddenProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  /**
   * Feature.
   */
  feature?: VisuallyHiddenFeature;
}

/**
 * Properties for the visually hidden input component.
 */
export interface VisuallyHiddenInputProps {
  /**
   * Name.
   */
  name: string;
  /**
   * Value associated with the current item.
   */
  value: any;
  /**
   * Whether the item is checked.
   */
  checked?: boolean;
  /**
   * Whether the value is required.
   */
  required?: boolean;
  /**
   * Whether the component is disabled.
   */
  disabled?: boolean;
  /**
   * Feature.
   */
  feature?: VisuallyHiddenFeature;
}
