import { computed, nextTick, shallowRef, watch } from 'vue';
import type { ShallowRef } from 'vue';

export function useControllableState<T>(
  prop: () => T,
  onChange: ((value: T) => void) | undefined,
  defaultValue: T
): ShallowRef<T> {
  const initial = prop();

  if (initial !== undefined) {
    return computed({
      get: () => prop(),
      set: v => {
        onChange?.(v);
      }
    });
  }

  const proxy = shallowRef((initial ?? defaultValue) as T);

  let skip = false;

  watch(prop, value => {
    if (skip || value === undefined) return;
    skip = true;

    proxy.value = value;
    nextTick(() => {
      skip = false;
    });
  });

  watch(proxy, value => {
    if (!skip && value !== undefined) {
      onChange?.(value);
    }
  });

  return proxy;
}
