import type {
  CheckboxRootEmits,
  CheckboxRootProps,
  CheckboxUi,
  CheckboxUiSlot,
  ClassValue,
  DefinedValue,
  UiClass
} from '@soybeanjs/headless';
import type {
  CheckboxCardGroupCompactEmits,
  CheckboxCardGroupCompactProps,
  CheckboxCardGroupOptionData,
  CheckboxControlProps,
  CheckboxGroupCompactEmits,
  CheckboxGroupCompactProps,
  CheckboxGroupOptionData,
  CheckboxIndicatorProps,
  CheckboxLabelProps
} from '@soybeanjs/headless/checkbox';
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

export interface CheckboxGroupProps<
  T extends DefinedValue = DefinedValue,
  S extends CheckboxGroupOptionData<T> = CheckboxGroupOptionData<T>
> extends CheckboxGroupCompactProps<T, S> {
  class?: ClassValue;
  ui?: Partial<CheckboxUi>;
  color?: ThemeColor;
  size?: ThemeSize;
  shape?: CheckboxShape;
}

export type CheckboxGroupEmits<T extends DefinedValue = DefinedValue> = CheckboxGroupCompactEmits<T>;

export interface CheckboxCardGroupProps<
  T extends DefinedValue = DefinedValue,
  S extends CheckboxCardGroupOptionData<T> = CheckboxCardGroupOptionData<T>
> extends Omit<
    CheckboxCardGroupCompactProps<T, S>,
    'contentClass' | 'textContentClass' | 'iconClass' | 'descriptionClass'
  > {
  class?: ClassValue;
  ui?: Partial<CheckboxCardUi>;
  color?: ThemeColor;
  size?: ThemeSize;
  shape?: CheckboxShape;
}

export type CheckboxCardGroupEmits<T extends DefinedValue = DefinedValue> = CheckboxCardGroupCompactEmits<T>;

export type { CheckboxCardGroupOptionData, CheckboxGroupOptionData } from '@soybeanjs/headless/checkbox';
