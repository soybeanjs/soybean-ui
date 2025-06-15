import type {
  AcceptableBooleanValue,
  ClassValue,
  RadioGroupControlProps,
  RadioGroupIndicatorProps,
  RadioGroupItemProps,
  RadioGroupLabelProps,
  RadioGroupRootProps,
  RadioGroupSlot
} from '@headless';
import type { ThemeColor, ThemeSize } from '@theme';

export type RadioGroupUi = Partial<Record<RadioGroupSlot, ClassValue>>;

export interface RadioProps extends RadioGroupItemProps {
  color?: ThemeColor;
  size?: ThemeSize;
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
  color?: ThemeColor;
  size?: ThemeSize;
  ui?: RadioGroupUi;
  items: S[];
  itemProps?: RadioGroupItemProps;
  controlProps?: RadioGroupControlProps;
  indicatorProps?: RadioGroupIndicatorProps;
  labelProps?: RadioGroupLabelProps;
}
