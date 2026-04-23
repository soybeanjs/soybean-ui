import type {
  CheckboxCompactProps,
  CheckboxCompactEmits,
  CheckboxCardCompactProps,
  CheckboxCardCompactEmits,
  CheckboxGroupCompactProps,
  CheckboxGroupCompactEmits,
  CheckboxCardGroupCompactProps,
  CheckboxCardGroupCompactEmits,
  CheckboxGroupOptionData,
  CheckboxCardGroupOptionData,
  CheckboxUi,
  CheckboxCardUi,
  ClassValue,
  DefinedValue
} from '@soybeanjs/headless';
import type { ThemeColor, ThemeSize } from '@/theme';
import type { CheckboxShape } from './variants';

export interface CheckboxProps extends CheckboxCompactProps {
  /**
   * the class of root element
   */
  class?: ClassValue;
  ui?: Partial<CheckboxUi>;
  color?: ThemeColor;
  size?: ThemeSize;
  shape?: CheckboxShape;
}

export type CheckboxEmits = CheckboxCompactEmits;

export interface CheckboxCardProps extends CheckboxCardCompactProps {
  /**
   * the class of root element
   */
  class?: ClassValue;
  ui?: Partial<CheckboxCardUi>;
  color?: ThemeColor;
  size?: ThemeSize;
  shape?: CheckboxShape;
  icon?: string;
  description?: string;
}

export type CheckboxCardEmits = CheckboxCardCompactEmits;

export interface CheckboxGroupProps<
  T extends CheckboxGroupOptionData = CheckboxGroupOptionData
> extends CheckboxGroupCompactProps<T> {
  /**
   * the class of group root element
   */
  class?: ClassValue;
  ui?: Partial<CheckboxUi>;
  color?: ThemeColor;
  size?: ThemeSize;
  shape?: CheckboxShape;
}

export type CheckboxGroupEmits<T extends DefinedValue = DefinedValue> = CheckboxGroupCompactEmits<T>;

export interface CheckboxCardGroupProps<
  T extends CheckboxCardGroupOptionData = CheckboxCardGroupOptionData
> extends CheckboxCardGroupCompactProps<T> {
  /**
   * the class of group root element
   */
  class?: ClassValue;
  ui?: Partial<CheckboxCardUi>;
  color?: ThemeColor;
  size?: ThemeSize;
  shape?: CheckboxShape;
}

export type CheckboxCardGroupEmits<T extends DefinedValue = DefinedValue> = CheckboxCardGroupCompactEmits<T>;

export type { CheckboxGroupOptionData, CheckboxCardGroupOptionData };
