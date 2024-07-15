import type { SlotsType } from 'vue';

export type DefaultSlots = SlotsType<{
  default: () => any;
}>;

export type ShortEmitsToObject<E> =
  E extends Record<string, any[]>
    ? {
        [K in keyof E]: (...args: E[K]) => any;
      }
    : E;
