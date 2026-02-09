import type { Align, ClassValue, SeparatorLabelProps, SeparatorRootProps, SeparatorUi } from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';
import type { SeparatorBorder } from './variants';

export interface SeparatorProps extends SeparatorRootProps {
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<SeparatorUi>;
  align?: Align;
  border?: SeparatorBorder;
  label?: string;
  labelProps?: SeparatorLabelProps;
}
