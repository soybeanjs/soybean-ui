import type {
  RadioGroupItemProps as $RadioControlProps,
  RadioGroupIndicatorProps,
  RadioGroupRootProps
} from 'radix-vue';
import type { RadioColor, RadioOrientation } from '@soybean-ui/variants';
import type { ClassValue } from '../../types';

export type RadioIndicatorProps = RadioGroupIndicatorProps & {
  class?: ClassValue;
  color?: RadioColor;
};

export type RadioControlProps = $RadioControlProps & {
  class?: ClassValue;
  color?: RadioColor;
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
  color?: RadioColor;
};

export type RadioGroupItemProps = RadioProps & {
  label: string;
  value: string;
};

export type RadioGroupProps = RadioGroupRootProps & {
  class?: ClassValue;
  items?: RadioGroupItemProps[];
  color?: RadioColor;
};

export type { RadioColor, RadioOrientation };
