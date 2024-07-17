import type { PrimitiveProps } from 'radix-vue';

export type ClassNameValue = string | Record<string, boolean> | ClassNameValue[];

export interface PrimitivePropsWithClass extends PrimitiveProps {
  class?: ClassNameValue;
}

export type PropsWithClass<T> = T & {
  class?: ClassNameValue;
};
