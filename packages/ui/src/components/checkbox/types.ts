import type {
  CheckboxCheckedState,
  CheckboxRootEmits as CheckboxControlEmits,
  CheckboxRootProps as _CheckboxControlProps,
  CheckboxIndicatorProps as _CheckboxIndicatorProps
} from 'radix-vue';
import type { ThemeColor, ThemeOrientation, ThemeSize } from '@soybean-ui/variants';
import type { ClassValue, ClassValueProp } from '../../types';

export type CheckboxRootProps = ClassValueProp;

export type CheckboxControlProps = ClassValueProp &
  Omit<_CheckboxControlProps, 'as' | 'asChild'> & {
    color?: ThemeColor;
    size?: ThemeSize;
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
    defaultValues?: string[];
    values?: string[];
    items?: CheckboxGroupItem[];
    orientation?: ThemeOrientation;
  };

export type CheckboxGroupEmits = {
  'update:values': [values: string[]];
};

export type CheckboxEmits = CheckboxControlEmits;

export type { CheckboxControlEmits, CheckboxCheckedState };
