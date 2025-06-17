import type {
  AcceptableBooleanValue,
  ClassValue,
  RadioGroupControlProps,
  RadioGroupIndicatorProps,
  RadioGroupItemProps,
  RadioGroupLabelProps,
  RadioGroupRootEmits,
  RadioGroupRootProps,
  RadioGroupSlot
} from '@headless';
import type { ThemeColor, ThemeSize } from '@theme';
import type { RadioGroupVariant } from '@variants/radio-group';

export type RadioGroupUi = Partial<Record<RadioGroupSlot, ClassValue>>;

export interface RadioProps extends RadioGroupItemProps {
  label?: string;
  controlProps?: RadioGroupControlProps;
  indicatorProps?: RadioGroupIndicatorProps;
  labelProps?: RadioGroupLabelProps;
}

export interface RadioGroupOptionData<T extends AcceptableBooleanValue = AcceptableBooleanValue> {
  value: NonNullable<T>;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps<
  T extends AcceptableBooleanValue = AcceptableBooleanValue,
  S extends RadioGroupOptionData<T> = RadioGroupOptionData<T>
> extends RadioGroupRootProps<T> {
  ui?: RadioGroupUi;
  variant?: RadioGroupVariant;
  color?: ThemeColor;
  size?: ThemeSize;
  items: S[];
  itemProps?: RadioGroupItemProps;
  controlProps?: RadioGroupControlProps;
  indicatorProps?: RadioGroupIndicatorProps;
  labelProps?: RadioGroupLabelProps;
}

export type RadioGroupEmits<T extends AcceptableBooleanValue = AcceptableBooleanValue> = RadioGroupRootEmits<T>;

export type RadioGroupCardSlot = RadioGroupSlot | 'content' | 'textContent' | 'icon' | 'description';

export type RadioGroupCardUi = Partial<Record<RadioGroupCardSlot, ClassValue>>;

export interface RadioCardProps extends RadioProps {
  ui?: RadioGroupCardUi;
  icon?: string;
  description?: string;
}

export interface RadioCardGroupOptionData<T extends AcceptableBooleanValue = AcceptableBooleanValue>
  extends RadioGroupOptionData<T> {
  icon?: string;
  description?: string;
}

export interface RadioCardGroupProps<
  T extends AcceptableBooleanValue = AcceptableBooleanValue,
  S extends RadioCardGroupOptionData<T> = RadioCardGroupOptionData<T>
> extends RadioGroupProps<T, S> {
  ui?: RadioGroupCardUi;
  items: S[];
}

export type RadioGroupCardEmits<T extends AcceptableBooleanValue = AcceptableBooleanValue> = RadioGroupEmits<T>;
