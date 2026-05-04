import type { ButtonHTMLAttributes } from 'vue';
import type { PrimitiveProps } from '../primitive/types';

/**
 * Supported button values.
 */
export type ButtonType = 'button' | 'submit' | 'reset';

/**
 * Properties for the button component.
 */
export interface ButtonProps extends PrimitiveProps, /** @vue-ignore */ ButtonHTMLAttributes {
  /**
   * The type of the button element. Can be one of 'button', 'submit', or 'reset'.
   * @default 'button'
   */
  type?: ButtonType;
  /**
   * Whether the component is disabled.
   */
  disabled?: boolean;
}

/**
 * Events for the button component.
 */
export type ButtonEmits = {
  /**
   * Emitted when click occurs.
   */
  click: [event: PointerEvent];
};
