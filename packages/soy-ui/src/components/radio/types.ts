import type {
  ClassValue,
  ClassValueProp,
  LabelProps,
  RadioGroupIndicatorProps,
  RadioGroupRootProps,
  RadioGroupItemProps as _RadioControlProps
} from '@soybean-ui/primitives';
import type { RadioSlots, ThemeColor, ThemeSize } from '@soybean-ui/variants';

export interface RadioIndicatorProps extends RadioGroupIndicatorProps {
  color?: ThemeColor;
}

export interface RadioControlProps extends _RadioControlProps {
  color?: ThemeColor;
  size?: ThemeSize;
}

export interface RadioRootProps extends ClassValueProp {}

export interface RadioLabelProps extends LabelProps {}

export type RadioUi = Partial<Record<RadioSlots, ClassValue>>;

export interface RadioProps extends RadioControlProps {
  ui?: RadioUi;
  forceMountIndicator?: boolean;
  label?: string;
  color?: ThemeColor;
}

export interface RadioGroupItemProps extends RadioProps {
  label: string;
  value: string;
}

export interface RadioGroupProps extends RadioGroupRootProps {
  ui?: RadioUi;
  items?: RadioGroupItemProps[];
  color?: ThemeColor;
  size?: ThemeSize;
}
