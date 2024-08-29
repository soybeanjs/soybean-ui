import type {
  CheckboxRootProps as $CheckboxControlProps,
  CheckboxIndicatorProps as $CheckboxIndicatorProps,
  CheckboxCheckedState
} from 'radix-vue';
import type { CheckboxColor, CheckboxOrientation, ClassValue } from '@soybean-ui/variants';
import type { PrimitivePropsWithClass } from '../../types';

export type CheckboxRootProps = PrimitivePropsWithClass;

export type CheckboxControlProps = $CheckboxControlProps & {
  class?: ClassValue;
  color?: CheckboxColor;
};

export type CheckboxIndicatorProps = $CheckboxIndicatorProps & {
  class?: ClassValue;
};

export type CheckboxLabelProps = PrimitivePropsWithClass;

export type CheckboxProps = $CheckboxControlProps & {
  class?: ClassValue;
  controlClass?: ClassValue;
  indicatorClass?: ClassValue;
  forceMountIndicator?: boolean;
  labelClass?: ClassValue;
  label?: string;
  color?: CheckboxColor;
};

export type CheckboxGroupItem = CheckboxProps & {
  label: string;
  value: string;
};

export type CheckboxGroupProps = PrimitivePropsWithClass & {
  defaultValues?: string[];
  values?: string[];
  items?: CheckboxGroupItem[];
  disabled?: boolean;
  color?: CheckboxColor;
  orientation?: CheckboxOrientation;
};

export type { CheckboxCheckedState, CheckboxColor, CheckboxOrientation };
