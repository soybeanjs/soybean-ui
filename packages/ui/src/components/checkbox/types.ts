import type {
  AcceptableValue,
  CheckboxCheckedState,
  CheckboxGroupRootEmits,
  CheckboxRootProps as _CheckboxControlProps,
  CheckboxGroupRootProps as _CheckboxGroupRootProps,
  CheckboxIndicatorProps as _CheckboxIndicatorProps
} from 'reka-ui';
import type { ThemeColor, ThemeSize } from '@soybean-ui/variants';
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

export type CheckboxGroupItem<T = AcceptableValue> = CheckboxProps & {
  label: string;
  value: T;
};

export type CheckboxGroupRootProps<T = AcceptableValue> = ClassValueProp &
  Omit<_CheckboxGroupRootProps<T>, 'as' | 'asChild'>;

export type CheckboxGroupProps<T = AcceptableValue> = CheckboxGroupRootProps<T> &
  Pick<CheckboxProps, 'color' | 'size'> & {
    items?: CheckboxGroupItem<T>[];
  };

export type CheckboxControlEmits = {
  'update:modelValue': [value: CheckboxCheckedState];
};

export type CheckboxEmits = CheckboxControlEmits;

export type CheckboxGroupEmits<T = AcceptableValue> = CheckboxGroupRootEmits<T>;

export type { CheckboxGroupRootEmits, CheckboxCheckedState };
