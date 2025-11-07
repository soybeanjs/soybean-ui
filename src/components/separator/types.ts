import type { Align, SeparatorLabelProps, SeparatorRootProps, SeparatorUi } from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';
import type { SeparatorBorder } from '@/variants/separator';

export interface SeparatorProps extends SeparatorRootProps {
  size?: ThemeSize;
  ui?: Partial<SeparatorUi>;
  align?: Align;
  border?: SeparatorBorder;
  label?: string;
  labelProps?: SeparatorLabelProps;
}
