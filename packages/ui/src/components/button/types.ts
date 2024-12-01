import type {
  ButtonShadow,
  ButtonShape,
  ButtonVariant,
  ThemeColor,
  ThemeOrientation,
  ThemeSize
} from '@soybean-ui/variants';
import type { ClassValueProp } from '@soybean-ui/primitive';

export interface ButtonProps extends ClassValueProp {
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
  type?: ButtonType;
  value?: string | ReadonlyArray<string> | number;
}

export type ButtonType = 'submit' | 'reset' | 'button';

export interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
}

export interface ButtonGroupProps extends ClassValueProp {
  orientation?: ThemeOrientation;
}

export type { ButtonShape, ButtonVariant, ButtonShadow };
