import type { ButtonHTMLAttributes } from 'vue';
import type { PrimitiveProps } from '../primitive/types';

export interface ButtonProps extends PrimitiveProps, /** @vue-ignore */ Omit<ButtonHTMLAttributes, 'onClick'> {
  disabled?: boolean;
}

export type ButtonEmits = {
  click: [event: MouseEvent];
};
