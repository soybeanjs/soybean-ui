import type { TagEmits, TagProps as _TagProps } from '@soybeanjs/headless';
import type { ThemeColor, ThemeSize } from '@/theme';
import type { TagShape, TagVariant } from '@/variants/tag';

export interface TagProps extends _TagProps {
  color?: ThemeColor;
  size?: ThemeSize;
  variant?: TagVariant;
  shape?: TagShape;
  content?: string;
  closable?: boolean;
}

export type { TagEmits, TagVariant, TagShape };
