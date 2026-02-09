import type {
  CheckboxControlProps,
  CheckboxGroupRootEmits,
  CheckboxGroupRootProps,
  CheckboxIndicatorProps,
  CheckboxLabelProps,
  CheckboxRootEmits,
  CheckboxRootProps,
  CheckboxUi,
  CheckboxUiSlot,
  ClassValue,
  DefinedValue,
  UiClass
} from '@soybeanjs/headless';
import type { ThemeColor, ThemeSize } from '@/theme';
import type { CheckboxShape } from './variants';

export interface CheckboxProps extends CheckboxRootProps {
  ui?: Partial<CheckboxUi>;
  color?: ThemeColor;
  size?: ThemeSize;
  shape?: CheckboxShape;
  label?: string;
  controlProps?: CheckboxControlProps;
  indicatorProps?: CheckboxIndicatorProps;
  labelProps?: CheckboxLabelProps;
}

export type CheckboxEmits = CheckboxRootEmits;

export type CheckboxCardUiSlot = CheckboxUiSlot | 'content' | 'textContent' | 'icon' | 'description';

export type CheckboxCardUi = UiClass<CheckboxCardUiSlot>;

export interface CheckboxCardProps extends CheckboxProps {
  ui?: Partial<CheckboxCardUi>;
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
  ui?: Partial<CheckboxUi>;
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

export interface CheckboxCardGroupProps<
  T extends DefinedValue = DefinedValue,
  S extends CheckboxCardGroupOptionData<T> = CheckboxCardGroupOptionData<T>
> extends CheckboxGroupProps<T, S> {
  class?: ClassValue;
  ui?: Partial<CheckboxCardUi>;
  items: S[];
}

export type CheckboxCardGroupEmits<T extends DefinedValue = DefinedValue> = CheckboxGroupEmits<T>;
