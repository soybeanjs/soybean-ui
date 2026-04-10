import type { ClassValue } from '@soybeanjs/headless';
import type { ThemeColor, ThemeSize } from '@/theme';
import type { IconProps } from '../icon/types';

export type SpinnerIcon = `svg-spinners:${string}`;

export interface SpinnerProps extends Omit<IconProps, 'icon' | 'color'> {
  class?: ClassValue;
  color?: ThemeColor;
  /**
   * The spinner icon name from the Iconify svg-spinners collection.
   *
   * @default 'svg-spinners:270-ring'
   */
  icon?: SpinnerIcon;
  size?: ThemeSize;
}
