import type {
  ButtonColor,
  ButtonGroupOrientation,
  ButtonShadow,
  ButtonShape,
  ButtonSize,
  ButtonVariant
} from '@soybean-ui/variants';
import type { ClassValue } from '../../types';

export type ButtonProps = {
  class?: ClassValue;
  color?: ButtonColor;
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  fitContent?: boolean;
  shadow?: ButtonShadow;
  // from ButtonHTMLAttributes
  autofocus?: boolean;
  disabled?: boolean;
  form?: string;
  formaction?: string;
  formenctype?: string;
  formmethod?: string;
  formnovalidate?: boolean;
  formtarget?: string;
  name?: string;
  type?: 'submit' | 'reset' | 'button';
  value?: string | ReadonlyArray<string> | number;
};

export type LoadingButtonProps = ButtonProps & {
  loading?: boolean;
};

export type ButtonGroupProps = {
  class?: ClassValue;
  orientation?: ButtonGroupOrientation;
};

export type { ButtonColor, ButtonShape, ButtonSize, ButtonVariant, ButtonShadow };
