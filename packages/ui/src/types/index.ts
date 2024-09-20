// @vue-ignore
import type { PrimitiveProps } from 'radix-vue';

export interface PrimitivePropsWithClass extends PrimitiveProps {
  class?: ClassValue;
}

export type ClassValue = string | null | undefined | Record<string, boolean> | ClassValue[];
