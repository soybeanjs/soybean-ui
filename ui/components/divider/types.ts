import type { Align, ClassValue, DividerLabelProps, DividerRootProps, DividerThemeSlot } from '@headless';
import type { ThemeSize } from '@theme';
import type { DividerBorder } from '@variants/divider';

export type DividerUi = Partial<Record<DividerThemeSlot, ClassValue>>;

export interface DividerProps extends DividerRootProps {
  size?: ThemeSize;
  ui?: DividerUi;
  align?: Align;
  border?: DividerBorder;
  label?: string;
  labelProps?: DividerLabelProps;
}
