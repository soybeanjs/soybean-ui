import type {
  ButtonColor,
  ButtonGroupOrientation,
  ButtonShadow,
  ButtonShape,
  ButtonSize,
  ButtonVariant
} from '@soybean-unify/ui-variants';
import type { PrimitivePropsWithClass } from '../../types';

export type ButtonProps = PrimitivePropsWithClass & {
  color?: ButtonColor;
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  fitContent?: boolean;
  disabled?: boolean;
  shadow?: ButtonShadow;
};

export type LoadingButtonProps = ButtonProps & {
  loading?: boolean;
};

export type ButtonGroupProps = PrimitivePropsWithClass & {
  orientation?: ButtonGroupOrientation;
};

export type { ButtonColor, ButtonShape, ButtonSize, ButtonVariant, ButtonShadow };
