import type { AlertUi } from '@soybeanjs/headless/alert';
import type { AlertCompactEmits, AlertCompactProps } from '@soybeanjs/headless/alert';
import type { ClassValue } from '@soybeanjs/headless';
import type { ThemeColor, ThemeSize } from '@/theme';
import type { AlertVariant } from './variants';

export type AlertExtendedUi = AlertUi;

export interface AlertProps extends AlertCompactProps {
  /**
   * root class
   */
  class?: ClassValue;
  size?: ThemeSize;
  color?: ThemeColor;
  variant?: AlertVariant;
  ui?: Partial<AlertExtendedUi>;
}

export type AlertEmits = AlertCompactEmits;

export type { AlertVariant };
