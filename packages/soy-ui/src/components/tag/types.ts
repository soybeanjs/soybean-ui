import type { ClassValueProp } from '@soybean-ui/primitives';
import type { TagShape, TagVariant, ThemeColor, ThemeSize } from '@soybean-ui/variants';

export interface TagProps extends ClassValueProp {
  color?: ThemeColor;
  variant?: TagVariant;
  size?: ThemeSize;
  shape?: TagShape;
}

export type { TagVariant, TagShape };
