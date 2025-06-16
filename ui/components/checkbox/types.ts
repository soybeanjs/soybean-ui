import type {
  AcceptableValue,
  CheckboxControlProps,
  CheckboxGroupRootEmits,
  CheckboxGroupRootProps,
  CheckboxIndicatorProps,
  CheckboxLabelProps,
  CheckboxRootEmits,
  CheckboxRootProps,
  CheckboxSlot,
  ClassValue
} from '@headless';
import type { ThemeColor, ThemeSize } from '@theme';

export type CheckboxUi = Partial<Record<CheckboxSlot, ClassValue>>;

export interface CheckboxProps extends CheckboxRootProps {
  color?: ThemeColor;
  size?: ThemeSize;
  ui?: CheckboxUi;
  label?: string;
  controlProps?: CheckboxControlProps;
  indicatorProps?: CheckboxIndicatorProps;
  labelProps?: CheckboxLabelProps;
}

export type CheckboxEmits = CheckboxRootEmits;

export type CheckboxCardSlot = CheckboxSlot | 'content' | 'textContent' | 'icon' | 'description';

export type CheckboxCardUi = Partial<Record<CheckboxCardSlot, ClassValue>>;

export interface CheckboxCardProps extends CheckboxProps {
  ui?: CheckboxCardUi;
  icon?: string;
  description?: string;
}

export type CheckboxCardEmits = CheckboxEmits;

export interface CheckboxGroupOptionData<T extends AcceptableValue = AcceptableValue> {
  value: NonNullable<T>;
  label: string;
  disabled?: boolean;
}

export interface CheckboxGroupProps<
  T extends AcceptableValue = AcceptableValue,
  S extends CheckboxGroupOptionData<T> = CheckboxGroupOptionData<T>
> extends CheckboxGroupRootProps<T> {
  color?: ThemeColor;
  size?: ThemeSize;
  ui?: CheckboxUi;
  items: S[];
  rootProps?: CheckboxRootProps;
  controlProps?: CheckboxControlProps;
  indicatorProps?: CheckboxIndicatorProps;
  labelProps?: CheckboxLabelProps;
}

export type CheckboxGroupEmits<T extends AcceptableValue = AcceptableValue> = CheckboxGroupRootEmits<T>;

export interface CheckboxCardGroupOptionData<T extends AcceptableValue = AcceptableValue>
  extends CheckboxGroupOptionData<T> {
  icon?: string;
  description?: string;
}

export type CheckboxCardGroupProps<
  T extends AcceptableValue = AcceptableValue,
  S extends CheckboxCardGroupOptionData<T> = CheckboxCardGroupOptionData<T>
> = CheckboxGroupProps<T, S> & {
  ui?: CheckboxCardUi;
  items: S[];
};

export type CheckboxCardGroupEmits<T extends AcceptableValue = AcceptableValue> = CheckboxGroupEmits<T>;

export type {
  CheckboxRootProps,
  CheckboxRootEmits,
  CheckboxControlProps,
  CheckboxIndicatorProps,
  CheckboxLabelProps,
  CheckboxGroupRootProps,
  CheckboxGroupRootEmits,
  CheckboxSlot
};
