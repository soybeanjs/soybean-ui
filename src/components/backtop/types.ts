import type { ClassValue } from '@soybeanjs/headless';
import type { BacktopRootEmits, BacktopRootProps } from '@soybeanjs/headless/backtop';
import type { ThemeColor, ThemeSize } from '@/theme';
import type { IconProps } from '../icon/types';
import type { ButtonShadow, ButtonShape, ButtonVariant } from '../button/types';

export interface BacktopProps extends BacktopRootProps {
  class?: ClassValue;
  color?: ThemeColor;
  size?: ThemeSize;
  variant?: ButtonVariant;
  shape?: ButtonShape;
  shadow?: ButtonShadow;
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

export type BacktopEmits = BacktopRootEmits;
