import type { SeparatorProps as $SeparatorProps } from 'radix-vue';
import type { SeparatorOrientation } from '@soybean-ui/variants';
import type { HTMLAttributes } from 'vue';

export type SeparatorProps = Omit<$SeparatorProps, 'orientation'> & {
  orientationMargin?: number;
  dashed?: boolean;
  plain?: boolean;
  labelStyle?: HTMLAttributes['style'];
  orientation?: SeparatorOrientation;
  type?: $SeparatorProps['orientation'];
  class?: HTMLAttributes['class'];
  label?: string;
  labelClass?: HTMLAttributes['class'];
};

export type { SeparatorOrientation };
