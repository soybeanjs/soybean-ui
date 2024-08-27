import type {
  RadioGroupItemProps as $RadioControlProps,
  RadioGroupIndicatorProps,
  RadioGroupRootProps
} from 'radix-vue';
import type { ClassValue, RadioColor, RadioOrientation } from '@soybean-unify/ui-variants';
import type { PrimitivePropsWithClass } from '../../types';

export type RadioIndicatorProps = RadioGroupIndicatorProps & {
  class?: ClassValue;
};

export type RadioControlProps = $RadioControlProps & {
  class?: ClassValue;
  color?: RadioColor;
};

export type RadioRootProps = PrimitivePropsWithClass;

export type RadioLabelProps = PrimitivePropsWithClass;

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
