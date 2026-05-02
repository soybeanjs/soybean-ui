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
  CheckboxCardUi
} from '@soybeanjs/headless/checkbox';
import type { ClassValue, DefinedValue } from '@soybeanjs/headless/types';
import type { ThemeColor, ThemeSize } from '@/theme';
import type { CheckboxShape } from './variants';

/**
 * Props for the checkbox component.
 */
export interface CheckboxProps extends CheckboxCompactProps {
  /**
   * the class of root element
   */
  class?: ClassValue;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<CheckboxUi>;
  /**
   * Theme color of the component.
   */
  color?: ThemeColor;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Shape of the component.
   */
  shape?: CheckboxShape;
}

/**
 * Emits for the checkbox component.
 */
export type CheckboxEmits = CheckboxCompactEmits;

/**
 * Props for the checkbox card component.
 */
export interface CheckboxCardProps extends CheckboxCardCompactProps {
  /**
   * the class of root element
   */
  class?: ClassValue;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<CheckboxCardUi>;
  /**
   * Theme color of the component.
   */
  color?: ThemeColor;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Shape of the component.
   */
  shape?: CheckboxShape;
  /**
   * Icon rendered by the component.
   */
  icon?: string;
  /**
   * Description text rendered by the component.
   */
  description?: string;
}

/**
 * Emits for the checkbox card component.
 */
export type CheckboxCardEmits = CheckboxCardCompactEmits;

/**
 * Props for the checkbox group component.
 */
export interface CheckboxGroupProps<
  T extends CheckboxGroupOptionData = CheckboxGroupOptionData
> extends CheckboxGroupCompactProps<T> {
  /**
   * the class of group root element
   */
  class?: ClassValue;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<CheckboxUi>;
  /**
   * Theme color of the component.
   */
  color?: ThemeColor;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Shape of the component.
   */
  shape?: CheckboxShape;
}

/**
 * Emits for the checkbox group component.
 */
export type CheckboxGroupEmits<T extends DefinedValue = DefinedValue> = CheckboxGroupCompactEmits<T>;

/**
 * Props for the checkbox card group component.
 */
export interface CheckboxCardGroupProps<
  T extends CheckboxCardGroupOptionData = CheckboxCardGroupOptionData
> extends CheckboxCardGroupCompactProps<T> {
  /**
   * the class of group root element
   */
  class?: ClassValue;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<CheckboxCardUi>;
  /**
   * Theme color of the component.
   */
  color?: ThemeColor;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Shape of the component.
   */
  shape?: CheckboxShape;
}

/**
 * Emits for the checkbox card group component.
 */
export type CheckboxCardGroupEmits<T extends DefinedValue = DefinedValue> = CheckboxCardGroupCompactEmits<T>;

export type { CheckboxGroupOptionData, CheckboxCardGroupOptionData };
