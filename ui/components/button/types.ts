import type { Align, DataOrientation, Direction, PropsToContext, ButtonProps as _ButtonProps } from '@headless';
import type { ThemeColor, ThemeSize } from '@theme';
import type { ButtonShadow, ButtonShape, ButtonVariant } from '@variants/button';
import type { IconProps } from '../icon/types';
import type { LinkProps } from '../link/types';

export interface ButtonProps extends _ButtonProps {
  color?: ThemeColor;
  size?: ThemeSize;
  variant?: ButtonVariant;
  shape?: ButtonShape;
  shadow?: ButtonShadow;
}

export interface ButtonIconProps extends ButtonProps {
  /** The icon name of iconify. */
  icon: string;
  /** The props of the icon. */
  iconProps?: Partial<IconProps>;
}

export interface ButtonLoadingProps extends ButtonProps {
  /**
   * Whether the button is loading.
   *
   * @default false
   */
  loading?: boolean;
  /**
   * The text to display when the button is loading.
   *
   * It will be displayed when the loading position is center.
   */
  loadingText?: string;
  /**
   * The duration of the loading state in milliseconds.
   *
   * @default 150 ms
   */
  loadingDuration?: number;
  /**
   * Whether to automatically handle loading state during click event. When true, the button will show loading state
   * during click event execution. When false, you need to manually control the loading state.
   *
   * @default false
   */
  autoLoading?: boolean;
  /**
   * The icon name of iconify to display when the button is loading.
   *
   * @default 'svg-spinners:270-ring'
   */
  loadingIcon?: string;
  /** The props of the loading icon. */
  loadingIconProps?: Partial<IconProps>;
  /**
   * The position of the loading icon.
   *
   * @default 'start'
   */
  loadingPosition?: Align;
}

export type ButtonLinkProps = ButtonProps & LinkProps;

export interface ButtonGroupProps extends ButtonProps {
  /**
   * The orientation of the button group.
   *
   * @default 'horizontal'
   */
  orientation?: DataOrientation;
  /**
   * The direction of the button group.
   *
   * @default 'ltr'
   */
  dir?: Direction;
}

export interface ButtonGroupContextParams
  extends PropsToContext<ButtonGroupProps, 'color' | 'size' | 'variant' | 'shape' | 'shadow' | 'disabled'> {}

export type { ButtonVariant, ButtonShape, ButtonShadow };
