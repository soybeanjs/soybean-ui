import type {
  CheckboxIndicatorProps as $CheckboxIndicatorProps,
  CheckboxRootProps as $CheckboxRootProps,
  CheckboxCheckedState
} from 'radix-vue';
import type { ClassValue } from '@soybean-unify/ui-variants';
import type { PrimitivePropsWithClass } from '../../types';

export type CheckboxWrapperProps = PrimitivePropsWithClass;

export type CheckboxRootProps = $CheckboxRootProps & {
  class?: ClassValue;
};

export type CheckboxIndicatorProps = $CheckboxIndicatorProps & {
  class?: ClassValue;
};

export type CheckboxLabelProps = PrimitivePropsWithClass;

export type CheckboxProps = CheckboxRootProps & {
  rootClass?: ClassValue;
  label?: string;
  labelClass?: ClassValue;
  indicatorProps?: CheckboxIndicatorProps;
};

export { CheckboxCheckedState };

export type CheckboxOption = {
  label: string;
  value: string | number;
};

export type CheckboxGroupItemProps = CheckboxOption & {
  itemProps?: CheckboxProps;
};
