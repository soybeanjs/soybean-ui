import type { ButtonColor, ButtonShape, ButtonSize, ButtonVariant } from '@soybean-unify/ui-variants';
import type { PrimitivePropsWithClass } from '../../types';

export type ButtonProps = PrimitivePropsWithClass & {
  color?: ButtonColor;
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  disabled?: boolean;
};

export type { ButtonColor, ButtonShape, ButtonSize, ButtonVariant };

export type LoadingButtonProps = ButtonProps & {
  loading?: boolean;
};

export type ButtonGroupProps = PrimitivePropsWithClass;
