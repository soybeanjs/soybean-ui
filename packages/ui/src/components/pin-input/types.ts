import type {
  PinInputRootEmits,
  PinInputInputProps as _PinInputInputProps,
  PinInputRootProps as _PinInputRootProps
} from '@soybean-ui/primitive';
import type { ThemeSize } from '@soybean-ui/variants';
import type { ClassValue, ClassValueProp } from '../../types';

export type PinInputRootProps = ClassValueProp & Omit<_PinInputRootProps, 'as' | 'asChild'>;

export type PinInputInputRootProps = ClassValueProp & {
  separate?: boolean;
};

export type PinInputSeparatorProps = ClassValueProp & {
  size?: ThemeSize;
};

export type PinInputInputProps = ClassValueProp &
  Pick<_PinInputInputProps, 'disabled' | 'index'> & {
    size?: ThemeSize;
    separate?: boolean;
  };

export type PinInputProps = PinInputRootProps &
  PinInputInputRootProps & {
    inputRootClass?: ClassValue;
    size?: ThemeSize;
    inputCount?: number;
    itemClass?: ClassValue;
    separatorClass?: ClassValue;
  };

export type PinInputEmits = PinInputRootEmits;

export type { PinInputRootEmits };
