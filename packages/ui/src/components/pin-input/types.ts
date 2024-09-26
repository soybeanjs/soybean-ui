import type { PinInputInputProps as $PinInputItemProps, PinInputRootProps as $PinInputRootProps } from 'radix-vue';
import type { ThemeSize } from '@soybean-ui/variants';
import type { ClassValue } from '../../types';

export type PinInputRootProps = Omit<$PinInputRootProps, 'as' | 'asChild'> & {
  class?: ClassValue;
  separate?: boolean;
};

export type PinInputSeparatorProps = {
  class?: ClassValue;
  size?: ThemeSize;
};

export type PinInputItemProps = Omit<$PinInputItemProps, 'as' | 'asChild'> & {
  class?: ClassValue;
  size?: ThemeSize;
  separate?: boolean;
};

export interface PinInputProps extends PinInputRootProps {
  size?: ThemeSize;
  inputCount?: number;
  separate?: boolean;
  itemClass?: ClassValue;
  separatorClass?: ClassValue;
}
