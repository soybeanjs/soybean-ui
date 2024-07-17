// @vue-ignore
import type { PrimitiveProps } from 'radix-vue';

export type ClassNameValue = string | Record<string, boolean> | ClassNameValue[];

export interface PrimitivePropsWithClass extends PrimitiveProps {
  class?: ClassNameValue;
}
