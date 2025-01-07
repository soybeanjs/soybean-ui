import type { ChipPosition } from '@soybean-ui/variants';
import type { ClassValue, ClassValueProp } from '@soybean-ui/primitives';
import type { ThemeColor, ThemeSize } from '../../types';

export interface ChipRootProps extends ClassValueProp {}

export interface ChipContentProps extends ClassValueProp {
  color?: ThemeColor;
  size?: ThemeSize;
  position?: ChipPosition;
}

export interface ChipProps extends ChipContentProps {
  contentCls?: ClassValue;
  text?: string;
  show?: boolean;
}

export { ChipPosition };
