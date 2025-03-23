import type {
  AcceptableValue,
  CheckboxGroupRootEmits,
  CheckboxGroupRootProps,
  CheckboxIndicatorProps,
  CheckedState,
  ClassValue,
  ClassValueProp,
  CheckboxRootProps as _CheckboxControlProps
} from '@soybean-ui/primitives';
import type { CheckboxSlots, ThemeColor, ThemeSize } from '@soybean-ui/variants';

export interface CheckboxRootProps extends ClassValueProp {}

export interface CheckboxControlProps extends _CheckboxControlProps {
  color?: ThemeColor;
  size?: ThemeSize;
}

export type CheckboxUi = Partial<Record<CheckboxSlots, ClassValue>>;

export type CheckboxProps = CheckboxControlProps & {
  ui?: CheckboxUi;
  forceMountIndicator?: boolean;
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
