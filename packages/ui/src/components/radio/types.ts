import type {
  ClassValue,
  ClassValueProp,
  LabelProps,
  RadioGroupIndicatorProps,
  RadioGroupRootProps,
  RadioGroupItemProps as _RadioControlProps
} from '@soybean-ui/primitive';
import type { ThemeColor, ThemeSize } from '@soybean-ui/variants';

export interface RadioIndicatorProps extends RadioGroupIndicatorProps {
  color?: ThemeColor;
}

export interface RadioControlProps extends _RadioControlProps {
  color?: ThemeColor;
  size?: ThemeSize;
}

export interface RadioRootProps extends ClassValueProp {}

export interface RadioLabelProps extends LabelProps {}

export interface RadioProps extends RadioControlProps {
  controlClass?: ClassValue;
  indicatorClass?: ClassValue;
  forceMountIndicator?: boolean;
  labelClass?: ClassValue;
  label?: string;
  color?: ThemeColor;
}

export interface RadioGroupItemProps extends RadioProps {
  label: string;
  value: string;
}

export interface RadioGroupProps extends RadioGroupRootProps {
  items?: RadioGroupItemProps[];
  color?: ThemeColor;
  size?: ThemeSize;
}
