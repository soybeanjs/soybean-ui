import type { AcceptableBooleanValue, ClassValue } from '@soybeanjs/headless';
import type {
  RadioGroupCompactEmits,
  RadioGroupCompactProps,
  RadioGroupControlProps,
  RadioGroupIndicatorProps,
  RadioGroupItemProps,
  RadioGroupLabelProps,
  RadioGroupOptionData,
  RadioGroupUi
} from '@soybeanjs/headless/radio-group';
import type { ThemeColor, ThemeSize } from '@/theme';
import type { RadioGroupVariant } from './variants';

/**
 * Props for the radio component.
 */
export interface RadioProps extends RadioGroupItemProps {
  /**
   * Label text rendered by the component.
   */
  label?: string;
  /**
   * Props forwarded to the control element.
   */
  controlProps?: RadioGroupControlProps;
  /**
   * Props forwarded to the indicator element.
   */
  indicatorProps?: RadioGroupIndicatorProps;
  /**
   * Props forwarded to the label element.
   */
  labelProps?: RadioGroupLabelProps;
}

/**
 * Props for the radio group component.
 */
export interface RadioGroupProps<
  T extends AcceptableBooleanValue = AcceptableBooleanValue,
  S extends RadioGroupOptionData<T> = RadioGroupOptionData<T>
> extends RadioGroupCompactProps<T, S> {
  /**
   * Additional class names applied to the root element.
   */
  class?: ClassValue;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<RadioGroupUi>;
  /**
   * Visual variant of the component.
   */
  variant?: RadioGroupVariant;
  /**
   * Theme color of the component.
   */
  color?: ThemeColor;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
}

/**
 * Emits for the radio group component.
 */
export type RadioGroupEmits<T extends AcceptableBooleanValue = AcceptableBooleanValue> = RadioGroupCompactEmits<T>;

/**
 * Available UI slots for the radio group component.
 */
export type RadioGroupCardUiSlot = 'content' | 'textContent' | 'icon' | 'description';

/**
 * UI class overrides for the radio group component.
 */
export type RadioGroupCardUi = RadioGroupUi & Record<RadioGroupCardUiSlot, ClassValue>;

/**
 * Props for the radio card component.
 */
export interface RadioCardProps extends RadioProps {
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<RadioGroupCardUi>;
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
 * Option data for the radio card group component.
 */
export interface RadioCardGroupOptionData<
  T extends AcceptableBooleanValue = AcceptableBooleanValue
> extends RadioGroupOptionData<T> {
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
 * Props for the radio card group component.
 */
export interface RadioCardGroupProps<
  T extends AcceptableBooleanValue = AcceptableBooleanValue,
  S extends RadioCardGroupOptionData<T> = RadioCardGroupOptionData<T>
> extends RadioGroupProps<T, S> {
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<RadioGroupCardUi>;
  /**
   * Items rendered by the component.
   */
  items: S[];
}

/**
 * Emits for the radio group card component.
 */
export type RadioGroupCardEmits<T extends AcceptableBooleanValue = AcceptableBooleanValue> = RadioGroupEmits<T>;

export type { RadioGroupOptionData } from '@soybeanjs/headless/radio-group';
