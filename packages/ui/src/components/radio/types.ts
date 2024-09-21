import type {
  RadioGroupItemProps as $RadioControlProps,
  RadioGroupIndicatorProps,
  RadioGroupRootProps
} from 'radix-vue';
import type { ThemeColor, ThemeSize } from '@soybean-ui/variants';
import type { ClassValue } from '../../types';

export type RadioIndicatorProps = RadioGroupIndicatorProps & {
  class?: ClassValue;
  color?: ThemeColor;
};

export type RadioControlProps = $RadioControlProps & {
  class?: ClassValue;
  color?: ThemeColor;
  size?: ThemeSize;
};

export type RadioRootProps = {
  class?: ClassValue;
};

export type RadioLabelProps = {
  class?: ClassValue;
};

export type RadioProps = $RadioControlProps & {
  class?: ClassValue;
  controlClass?: ClassValue;
  indicatorClass?: ClassValue;
  forceMountIndicator?: boolean;
  labelClass?: ClassValue;
  label?: string;
  color?: ThemeColor;
  size?: ThemeSize;
};

export type RadioGroupItemProps = RadioProps & {
  label: string;
  value: string;
};

export type RadioGroupProps = RadioGroupRootProps & {
  class?: ClassValue;
  items?: RadioGroupItemProps[];
  color?: ThemeColor;
  size?: ThemeSize;
};
