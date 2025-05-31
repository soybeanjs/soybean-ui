import type { ComponentPublicInstance, ComputedRef } from 'vue';

export type VNodeRef = Element | ComponentPublicInstance | null | undefined;

export type PropsToContext<T, K extends keyof T = keyof T> = {
  [P in K]-?: ComputedRef<T[P]>;
};

/** Convert emits to hook props */
export type EmitsToHookProps<T extends Record<string, any[]>> = {
  [K in keyof T as K extends `update:${infer Rest}` ? `onUpdate${Capitalize<Rest>}` : `on${Capitalize<string & K>}`]?: (
    ...args: T[K]
  ) => void;
};

export type InferDefaults<T> = {
  [K in keyof T]?: InferDefault<T, T[K]>;
};
type NativeType = null | number | string | boolean | symbol | ((...args: any[]) => any);
type InferDefault<P, T> = ((props: P) => T & {}) | (T extends NativeType ? T : never);
