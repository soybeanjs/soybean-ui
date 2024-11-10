import type {
  CheckboxCheckedState,
  CheckboxRootProps as _CheckboxControlProps,
  CheckboxIndicatorProps as _CheckboxIndicatorProps
} from 'radix-vue';
import type { ThemeColor, ThemeOrientation, ThemeSize } from '@soybean-ui/variants';
import type { ClassValue, ClassValueProp } from '../../types';

export type CheckboxRootProps = ClassValueProp;

export type CheckboxControlProps = ClassValueProp &
  Omit<_CheckboxControlProps, 'as' | 'asChild' | 'defaultChecked' | 'checked'> & {
    color?: ThemeColor;
    size?: ThemeSize;
    modelValue?: CheckboxCheckedState;
    defaultValue?: boolean;
  };

export type CheckboxIndicatorProps = ClassValueProp & Pick<_CheckboxIndicatorProps, 'forceMount'>;

export type CheckboxProps = CheckboxControlProps & {
  controlClass?: ClassValue;
  indicatorClass?: ClassValue;
  forceMountIndicator?: boolean;
  labelClass?: ClassValue;
  label?: string;
};

export type CheckboxGroupItem = CheckboxProps & {
  label: string;
  value: string;
};

export type CheckboxGroupProps = ClassValueProp &
  Pick<CheckboxProps, 'color' | 'size' | 'disabled'> & {
    modelValue?: string[];
    defaultValue?: string[];
    items?: CheckboxGroupItem[];
    orientation?: ThemeOrientation;
  };

export type CheckboxGroupEmits = {
  'update:modelValue': [values: string[]];
};

export type CheckboxControlEmits = {
  'update:modelValue': [value: boolean];
};

export type CheckboxEmits = CheckboxControlEmits;

export type { CheckboxCheckedState };
