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

export interface RadioProps extends RadioGroupItemProps {
  label?: string;
  controlProps?: RadioGroupControlProps;
  indicatorProps?: RadioGroupIndicatorProps;
  labelProps?: RadioGroupLabelProps;
}

export interface RadioGroupProps<
  T extends AcceptableBooleanValue = AcceptableBooleanValue,
  S extends RadioGroupOptionData<T> = RadioGroupOptionData<T>
> extends RadioGroupCompactProps<T, S> {
  class?: ClassValue;
  ui?: Partial<RadioGroupUi>;
  variant?: RadioGroupVariant;
  color?: ThemeColor;
  size?: ThemeSize;
}

export type RadioGroupEmits<T extends AcceptableBooleanValue = AcceptableBooleanValue> = RadioGroupCompactEmits<T>;

export type RadioGroupCardUiSlot = 'content' | 'textContent' | 'icon' | 'description';

export type RadioGroupCardUi = RadioGroupUi & Record<RadioGroupCardUiSlot, ClassValue>;

export interface RadioCardProps extends RadioProps {
  ui?: Partial<RadioGroupCardUi>;
  icon?: string;
  description?: string;
}

export interface RadioCardGroupOptionData<
  T extends AcceptableBooleanValue = AcceptableBooleanValue
> extends RadioGroupOptionData<T> {
  icon?: string;
  description?: string;
}

export interface RadioCardGroupProps<
  T extends AcceptableBooleanValue = AcceptableBooleanValue,
  S extends RadioCardGroupOptionData<T> = RadioCardGroupOptionData<T>
> extends RadioGroupProps<T, S> {
  ui?: Partial<RadioGroupCardUi>;
  items: S[];
}

export type RadioGroupCardEmits<T extends AcceptableBooleanValue = AcceptableBooleanValue> = RadioGroupEmits<T>;

export type { RadioGroupOptionData } from '@soybeanjs/headless/radio-group';
