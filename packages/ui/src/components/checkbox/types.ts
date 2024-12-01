import type {
  AcceptableValue,
  CheckboxGroupRootEmits,
  CheckboxGroupRootProps,
  CheckboxIndicatorProps,
  CheckedState,
  ClassValue,
  ClassValueProp,
  CheckboxRootProps as _CheckboxControlProps
} from '@soybean-ui/primitive';
import type { ThemeColor, ThemeSize } from '@soybean-ui/variants';

export interface CheckboxRootProps extends ClassValueProp {}

export interface CheckboxControlProps extends _CheckboxControlProps {
  color?: ThemeColor;
  size?: ThemeSize;
}

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

export type CheckboxGroupProps<T = AcceptableValue> = CheckboxGroupRootProps<T> &
  Pick<CheckboxProps, 'color' | 'size'> & {
    items?: CheckboxGroupItem<T>[];
  };

export type CheckboxControlEmits = {
  'update:modelValue': [value: CheckedState];
};

export type CheckboxEmits = CheckboxControlEmits;

export type CheckboxGroupEmits<T = AcceptableValue> = CheckboxGroupRootEmits<T>;

export type { CheckboxGroupRootEmits, CheckedState, CheckboxIndicatorProps, CheckboxGroupRootProps };
