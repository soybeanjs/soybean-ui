import type { ChipPosition } from '@soybean-ui/variants';
import type { ClassValue, ClassValueProp, ThemeColor, ThemeSize } from '../../types';

export type ChipRootProps = ClassValueProp;

export type ChipContentProps = ClassValueProp & {
  color?: ThemeColor;
  size?: ThemeSize;
  position?: ChipPosition;
};

export type ChipProps = ChipContentProps & {
  contentCls?: ClassValue;
  text?: string;
  show?: boolean;
};

export { ChipPosition };
