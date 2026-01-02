import type { ClassValue, LabelProps as _LabelProps } from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

export interface LabelProps extends _LabelProps {
  class?: ClassValue;
  size?: ThemeSize;
}
