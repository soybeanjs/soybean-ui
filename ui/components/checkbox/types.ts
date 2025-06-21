import type {
  CheckboxControlProps,
  CheckboxGroupRootEmits,
  CheckboxGroupRootProps,
  CheckboxIndicatorProps,
  CheckboxLabelProps,
  CheckboxRootEmits,
  CheckboxRootProps,
  CheckboxSlot,
  ClassValue,
  DefinedValue
} from '@headless';
import type { ThemeColor, ThemeSize } from '@theme';
import type { CheckboxShape } from '@variants/checkbox';

export type CheckboxUi = Partial<Record<CheckboxSlot, ClassValue>>;

export interface CheckboxProps extends CheckboxRootProps {
  ui?: CheckboxUi;
  color?: ThemeColor;
  size?: ThemeSize;
  shape?: CheckboxShape;
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

export interface CheckboxGroupOptionData<T extends DefinedValue = DefinedValue> {
  value: T;
  label: string;
  disabled?: boolean;
}

export interface CheckboxGroupProps<
  T extends DefinedValue = DefinedValue,
  S extends CheckboxGroupOptionData<T> = CheckboxGroupOptionData<T>
> extends CheckboxGroupRootProps<T> {
  ui?: CheckboxUi;
  color?: ThemeColor;
  size?: ThemeSize;
  shape?: CheckboxShape;
  items: S[];
  rootProps?: CheckboxRootProps;
  controlProps?: CheckboxControlProps;
  indicatorProps?: CheckboxIndicatorProps;
  labelProps?: CheckboxLabelProps;
}

export type CheckboxGroupEmits<T extends DefinedValue = DefinedValue> = CheckboxGroupRootEmits<T>;

export interface CheckboxCardGroupOptionData<T extends DefinedValue = DefinedValue> extends CheckboxGroupOptionData<T> {
  icon?: string;
  description?: string;
}

export type CheckboxCardGroupProps<
  T extends DefinedValue = DefinedValue,
  S extends CheckboxCardGroupOptionData<T> = CheckboxCardGroupOptionData<T>
> = CheckboxGroupProps<T, S> & {
  ui?: CheckboxCardUi;
  items: S[];
};

export type CheckboxCardGroupEmits<T extends DefinedValue = DefinedValue> = CheckboxGroupEmits<T>;

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
