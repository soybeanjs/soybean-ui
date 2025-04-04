import type {
  ClassValue,
  ClassValueProp,
  PinInputRootEmits,
  PinInputRootProps,
  PinInputInputProps as _PinInputInputProps
} from '@soybean-ui/primitives';
import type { PinInputSlots, ThemeSize } from '@soybean-ui/variants';

export interface PinInputInputRootProps extends ClassValueProp {
  size?: ThemeSize;
  separate?: boolean;
}

export interface PinInputSeparatorProps extends ClassValueProp {
  size?: ThemeSize;
}

export interface PinInputInputProps extends _PinInputInputProps {
  size?: ThemeSize;
  separate?: boolean;
}

export type PinInputUi = Partial<Record<PinInputSlots, ClassValue>>;

export interface PinInputProps extends PinInputRootProps, PinInputInputRootProps, PinInputSeparatorProps {
  size?: ThemeSize;
  ui?: PinInputUi;
  inputCount?: number;
}

export type PinInputEmits = PinInputRootEmits;

export type { PinInputRootProps, PinInputRootEmits };
