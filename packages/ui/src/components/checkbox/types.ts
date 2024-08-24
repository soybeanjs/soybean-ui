import type {
  CheckboxRootProps as $CheckboxControlProps,
  CheckboxIndicatorProps as $CheckboxIndicatorProps,
  CheckboxCheckedState
} from 'radix-vue';
import type { CheckboxOrientation, ClassValue } from '@soybean-unify/ui-variants';
import type { PrimitivePropsWithClass } from '../../types';

export type CheckboxRootProps = PrimitivePropsWithClass;

export type CheckboxControlProps = $CheckboxControlProps & {
  class?: ClassValue;
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
};

export { CheckboxCheckedState };

export type CheckboxGroupItem = CheckboxProps & {
  label: string;
  value: string;
};

export type CheckboxGroupProps = PrimitivePropsWithClass & {
  defaultValues?: string[];
  values?: string[];
  items?: CheckboxGroupItem[];
  disabled?: boolean;
  orientation?: CheckboxOrientation;
};
