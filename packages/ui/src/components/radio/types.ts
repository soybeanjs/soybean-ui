import type { RadioGroupIndicatorProps, RadioGroupRootProps, RadioGroupItemProps as _RadioControlProps } from '@soybean-ui/primitive';
import type { ThemeColor, ThemeSize } from '@soybean-ui/variants';
import type { ClassValue, ClassValueProp } from '../../types';

export type RadioIndicatorProps = ClassValueProp &
  Pick<RadioGroupIndicatorProps, 'forceMount'> & {
    color?: ThemeColor;
  };

export type RadioControlProps = ClassValueProp &
  Omit<_RadioControlProps, 'as' | 'asChild'> & {
    color?: ThemeColor;
    size?: ThemeSize;
  };

export type RadioRootProps = ClassValueProp;

export type RadioLabelProps = ClassValueProp;

export type RadioProps = RadioControlProps & {
  controlClass?: ClassValue;
  indicatorClass?: ClassValue;
  forceMountIndicator?: boolean;
  labelClass?: ClassValue;
  label?: string;
  color?: ThemeColor;
};

export type RadioGroupItemProps = RadioProps & {
  label: string;
  value: string;
};

export type RadioGroupProps = Omit<RadioGroupRootProps, 'as' | 'asChild'> & {
  class?: ClassValue;
  items?: RadioGroupItemProps[];
  color?: ThemeColor;
  size?: ThemeSize;
};
