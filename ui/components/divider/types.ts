import type { Align, ClassValue, DividerLabelProps, DividerRootProps, DividerSlot } from '@headless';
import type { ThemeSize } from '@theme';
import type { DividerBorder } from '@variants/divider';

export type DividerUi = Partial<Record<DividerSlot, ClassValue>>;

export interface DividerProps extends DividerRootProps {
  size?: ThemeSize;
  ui?: DividerUi;
  align?: Align;
  border?: DividerBorder;
  label?: string;
  labelProps?: DividerLabelProps;
}
