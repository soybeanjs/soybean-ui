import type { SeparatorProps as $SeparatorProps } from 'radix-vue';
import type { ThemeAlign } from '@soybean-ui/variants';
import type { ClassValue } from '../../types';

export type SeparatorProps = $SeparatorProps & {
  dashed?: boolean;
  plain?: boolean;
  align?: ThemeAlign;
  class?: ClassValue;
  label?: string;
  labelClass?: ClassValue;
};

export type SeparatorLabelProps = Pick<SeparatorProps, 'align' | 'plain' | 'orientation'> & {
  class?: ClassValue;
};
