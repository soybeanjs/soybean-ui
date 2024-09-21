import type {
  ButtonShadow,
  ButtonShape,
  ButtonVariant,
  ThemeColor,
  ThemeOrientation,
  ThemeSize
} from '@soybean-ui/variants';
import type { ClassValue } from '../../types';

export type ButtonProps = {
  class?: ClassValue;
  color?: ThemeColor;
  variant?: ButtonVariant;
  size?: ThemeSize;
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
  orientation?: ThemeOrientation;
};

export type { ButtonShape, ButtonVariant, ButtonShadow };
