import type { ChipPosition, ChipSlots, ThemeColor, ThemeSize } from '@soybean-ui/variants';
import type { ClassValue, ClassValueProp } from '@soybean-ui/primitives';

export interface ChipRootProps extends ClassValueProp {}

export interface ChipContentProps extends ClassValueProp {
  color?: ThemeColor;
  size?: ThemeSize;
  position?: ChipPosition;
}

export type ChipUi = Partial<Record<ChipSlots, ClassValue>>;

export interface ChipProps extends ChipContentProps {
  ui?: ChipUi;
  content?: string;
  open?: boolean;
}

export { ChipPosition };
