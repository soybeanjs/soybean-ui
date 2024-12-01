import type { ClassValueProp } from '@soybean-ui/primitive';
import type { ThemeSize } from '@soybean-ui/variants';

export interface KeyboardKeyProps extends ClassValueProp {
  size?: ThemeSize;
  keys?: string[];
  separator?: string;
}
