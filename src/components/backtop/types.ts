import type { ClassValue } from '@soybeanjs/headless/types';
import type { BacktopEmits as _BacktopEmits, BacktopProps as _BacktopProps } from '@soybeanjs/headless/backtop';
import type { ThemeColor, ThemeSize } from '@/theme';
import type { IconProps } from '../icon/types';
import type { ButtonShadow, ButtonShape, ButtonVariant } from '../button/types';

/**
 * Props for the backtop component.
 */
export interface BacktopProps extends _BacktopProps {
  /**
   * Additional class names applied to the root element.
   */
  class?: ClassValue;
  /**
   * Theme color of the component.
   */
  color?: ThemeColor;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Visual variant of the component.
   */
  variant?: ButtonVariant;
  /**
   * Shape of the component.
   */
  shape?: ButtonShape;
  /**
   * Shadow style of the component.
   */
  shadow?: ButtonShadow;
  /**
   * Whether the component should fit its content width.
   */
  fitContent?: boolean;
  /**
   * The icon name of iconify.
   *
   * @default 'lucide:arrow-up'
   */
  icon?: string;
  /**
   * The class of the icon.
   */
  iconClass?: ClassValue;
  /**
   * The props of the icon.
   */
  iconProps?: Partial<IconProps>;
}

/**
 * Emits for the backtop component.
 */
export type BacktopEmits = _BacktopEmits;
