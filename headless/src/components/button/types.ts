import type { ButtonHTMLAttributes } from 'vue';
import type { PrimitiveProps } from '../primitive/types';

export type ButtonType = 'button' | 'submit' | 'reset';

export interface ButtonProps extends PrimitiveProps, /** @vue-ignore */ Omit<ButtonHTMLAttributes, 'onClick'> {
  /**
   * The type of the button element. Can be one of 'button', 'submit', or 'reset'. [按钮元素的类型。可以是 'button'、'submit' 或 'reset' 之一。]
   * @default 'button'
   */
  type?: ButtonType;
  disabled?: boolean;
}

export type ButtonEmits = {
  click: [event: MouseEvent];
};
