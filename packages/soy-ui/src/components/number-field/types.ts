import type {
  ClassValue,
  NumberFieldRootEmits,
  NumberFieldDecrementProps as _NumberFieldDecrementProps,
  NumberFieldIncrementProps as _NumberFieldIncrementProps,
  NumberFieldInputProps as _NumberFieldInputProps,
  NumberFieldRootProps as _NumberFieldRootProps
} from '@soybean-ui/primitives';
import type { NumberFieldSlots, ThemeSize } from '@soybean-ui/variants';

export interface NumberFieldRootProps extends _NumberFieldRootProps {
  size?: ThemeSize;
}

export interface NumberFieldInputProps extends _NumberFieldInputProps {
  size?: ThemeSize;
  center?: boolean;
}

export interface NumberFieldDecrementProps extends _NumberFieldDecrementProps {
  size?: ThemeSize;
  center?: boolean;
  iconClass?: ClassValue;
}

export interface NumberFieldIncrementProps extends _NumberFieldIncrementProps {
  size?: ThemeSize;
  center?: boolean;
  iconClass?: ClassValue;
}

export type NumberFieldUi = Partial<Record<NumberFieldSlots, ClassValue>>;

export interface NumberFieldProps extends NumberFieldRootProps {
  center?: boolean;
  disabledDecrement?: boolean;
  disabledIncrement?: boolean;
  ui?: NumberFieldUi;
}

export type NumberFieldEmits = NumberFieldRootEmits;

export type { NumberFieldRootEmits };
