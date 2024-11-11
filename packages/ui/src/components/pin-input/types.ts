import type {
  PinInputRootEmits,
  PinInputInputProps as _PinInputItemProps,
  PinInputRootProps as _PinInputRootProps
} from 'reka-ui';
import type { ThemeSize } from '@soybean-ui/variants';
import type { ClassValue, ClassValueProp } from '../../types';

export type PinInputRootProps = ClassValueProp &
  Omit<_PinInputRootProps, 'as' | 'asChild'> & {
    separate?: boolean;
  };

export type PinInputSeparatorProps = ClassValueProp & {
  size?: ThemeSize;
};

export type PinInputItemProps = ClassValueProp &
  Pick<_PinInputItemProps, 'disabled' | 'index'> & {
    size?: ThemeSize;
    separate?: boolean;
  };

export type PinInputProps = PinInputRootProps & {
  size?: ThemeSize;
  inputCount?: number;
  separate?: boolean;
  itemClass?: ClassValue;
  separatorClass?: ClassValue;
};

export type PinInputEmits = PinInputRootEmits;

export type { PinInputRootEmits };
