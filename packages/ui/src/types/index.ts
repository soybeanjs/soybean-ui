// @vue-ignore
import type { PrimitiveProps } from 'radix-vue';
import type { ClassValue } from '@soybean-unify/ui-variants';

export interface PrimitivePropsWithClass extends PrimitiveProps {
  class?: ClassValue;
}
