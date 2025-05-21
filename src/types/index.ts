import type { ComponentPublicInstance, ComputedRef } from 'vue';

export type ClassValue = string | null | undefined | Record<string, boolean> | ClassValue[];
export type ClassValueProp = {
  /** class name */
  class?: ClassValue;
};

export type PropsToContext<T, K extends keyof T> = {
  [P in K]-?: ComputedRef<T[P]>;
};

export type OpenState = 'open' | 'closed';

export type VNodeRef = Element | ComponentPublicInstance | null | undefined;
