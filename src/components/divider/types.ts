import type { Align, DividerLabelProps, DividerRootProps, DividerUi } from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';
import type { DividerBorder } from '@/variants/divider';

export interface DividerProps extends DividerRootProps {
  size?: ThemeSize;
  ui?: Partial<DividerUi>;
  align?: Align;
  border?: DividerBorder;
  label?: string;
  labelProps?: DividerLabelProps;
}
