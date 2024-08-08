import type {
  ButtonColor,
  ButtonGroupDirection,
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
  disabled?: boolean;
  shadow?: ButtonShadow;
};

export type LoadingButtonProps = ButtonProps & {
  loading?: boolean;
};

export type ButtonGroupProps = PrimitivePropsWithClass & {
  direction?: ButtonGroupDirection;
};

export type { ButtonColor, ButtonShape, ButtonSize, ButtonVariant, ButtonShadow };
