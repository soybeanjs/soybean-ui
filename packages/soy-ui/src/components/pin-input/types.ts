import type {
  ClassValue,
  ClassValueProp,
  PinInputRootEmits,
  PinInputRootProps,
  PinInputInputProps as _PinInputInputProps
} from '@soybean-ui/primitives';
import type { ThemeSize } from '@soybean-ui/variants';

export interface PinInputInputRootProps extends ClassValueProp {
  separate?: boolean;
}

export interface PinInputSeparatorProps extends ClassValueProp {
  size?: ThemeSize;
}

export interface PinInputInputProps extends _PinInputInputProps {
  size?: ThemeSize;
  separate?: boolean;
}

export interface PinInputProps extends PinInputRootProps, PinInputInputRootProps, PinInputSeparatorProps {
  inputRootClass?: ClassValue;
  size?: ThemeSize;
  inputCount?: number;
  itemClass?: ClassValue;
  separatorClass?: ClassValue;
}

export type PinInputEmits = PinInputRootEmits;

export type { PinInputRootProps, PinInputRootEmits };
