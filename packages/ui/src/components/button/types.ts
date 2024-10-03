import type {
  ButtonShadow,
  ButtonShape,
  ButtonVariant,
  ThemeColor,
  ThemeOrientation,
  ThemeSize
} from '@soybean-ui/variants';
import type { ClassValueProp } from '../../types';

export type ButtonProps = ClassValueProp & {
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
};

export type ButtonType = 'submit' | 'reset' | 'button';

export type LoadingButtonProps = ButtonProps & {
  loading?: boolean;
};

export type ButtonGroupProps = ClassValueProp & {
  orientation?: ThemeOrientation;
};

export type { ButtonShape, ButtonVariant, ButtonShadow };
