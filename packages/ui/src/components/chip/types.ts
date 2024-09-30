import type { ChipPosition, ThemeColor, ThemeSize } from '@soybean-ui/variants';
import type { ClassValue } from '../../types';

export type ChipRootProps = {
  class?: ClassValue;
};

export type ChipProps = {
  text?: string;
  size?: ThemeSize;
  position?: ChipPosition;
  color?: ThemeColor;
  show?: boolean;
  class?: ClassValue;
};

export { ChipPosition };
