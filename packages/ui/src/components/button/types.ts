import type { ButtonHTMLAttributes } from 'vue';
import type {
  ButtonColor,
  ButtonGroupOrientation,
  ButtonShadow,
  ButtonShape,
  ButtonSize,
  ButtonVariant,
  ClassValue
} from '@soybean-ui/variants';
import type { PrimitivePropsWithClass } from '../../types';

export type ButtonProps = {
  class?: ClassValue;
  color?: ButtonColor;
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  fitContent?: boolean;
  shadow?: ButtonShadow;
  disabled?: boolean;
} & /* @vue-ignore */ ButtonHTMLAttributes;

export type LoadingButtonProps = ButtonProps & {
  loading?: boolean;
};

export type ButtonGroupProps = PrimitivePropsWithClass & {
  orientation?: ButtonGroupOrientation;
};

export type { ButtonColor, ButtonShape, ButtonSize, ButtonVariant, ButtonShadow };
