import { computed } from 'vue';

const COMMON_SLOTS = ['item', 'item-leading', 'item-trailing'];

export function useCommonSlotKeys<T extends Record<string, any>>(slots: T) {
  return computed(() => Object.keys(slots).filter(key => COMMON_SLOTS.includes(key)) as (keyof T)[]);
}
