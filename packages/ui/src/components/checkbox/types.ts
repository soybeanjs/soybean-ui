import type {
  CheckboxRootProps as $CheckboxControlProps,
  CheckboxIndicatorProps as $CheckboxIndicatorProps,
  CheckboxCheckedState
} from 'radix-vue';
import type { CheckboxColor, CheckboxOrientation, CheckboxSize } from '@soybean-ui/variants';
import type { ClassValue } from '../../types';

export type CheckboxRootProps = {
  class?: ClassValue;
};

export type CheckboxControlProps = $CheckboxControlProps & {
  class?: ClassValue;
  color?: CheckboxColor;
  size?: CheckboxSize;
};

export type CheckboxIndicatorProps = $CheckboxIndicatorProps & {
  class?: ClassValue;
};

export type CheckboxProps = $CheckboxControlProps & {
  class?: ClassValue;
  controlClass?: ClassValue;
  indicatorClass?: ClassValue;
  forceMountIndicator?: boolean;
  labelClass?: ClassValue;
  label?: string;
  color?: CheckboxColor;
  size?: CheckboxSize;
};

export type CheckboxGroupItem = CheckboxProps & {
  label: string;
  value: string;
};

export type CheckboxGroupProps = {
  class?: ClassValue;
  defaultValues?: string[];
  values?: string[];
  items?: CheckboxGroupItem[];
  disabled?: boolean;
  color?: CheckboxColor;
  orientation?: CheckboxOrientation;
};

export type { CheckboxCheckedState, CheckboxColor, CheckboxSize, CheckboxOrientation };
