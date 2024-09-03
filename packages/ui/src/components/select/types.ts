import type {
  SelectContentProps as $SelectContentProps,
  SelectItemProps as $SelectItemProps,
  SelectTriggerProps as $SelectTriggerProps,
  SelectViewportProps as $SelectViewportProps
} from 'radix-vue';
import type { ClassValue, SelectPosition, SelectSize } from '@soybean-ui/variants';
import type { PrimitivePropsWithClass } from '../../types';

export type SelectContentProps = $SelectContentProps & {
  class?: ClassValue;
};

export type SelectTriggerProps = $SelectTriggerProps & {
  class?: ClassValue;
  size?: SelectSize;
};

export type SelectViewportProps = $SelectViewportProps & {
  class?: ClassValue;
  position?: SelectPosition;
};

export type SelectItemProps = $SelectItemProps & {
  class?: ClassValue;
};

export type SelectIconProps = PrimitivePropsWithClass & {
  size?: SelectSize;
};

export type SelectSeparatorProps = PrimitivePropsWithClass;
