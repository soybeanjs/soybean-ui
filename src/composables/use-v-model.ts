import { computed, nextTick, ref, watch } from 'vue';
import type { Ref } from 'vue';
import { cloneValue } from '../shared';

interface UseVModelOptions<T> {
  /**
   * When passive is set to `true`, it will use `watch` to sync with props and ref. Instead of relying on the `v-model`
   * or `.sync` to work.
   *
   * @default false
   */
  passive?: boolean;
  /**
   * When eventName is set, it's value will be used to overwrite the emit event name.
   *
   * @default undefined
   */
  eventName?: string;
  /**
   * Attempting to check for changes of properties in a deeply nested object or array. Apply only when `passive` option
   * is set to `true`
   *
   * @default false
   */
  deep?: boolean;
  /**
   * Defining default value for return ref when no value is passed.
   *
   * @default undefined
   */
  defaultValue?: T;
  /**
   * Clone the props.
   *
   * @default false
   */
  clone?: boolean;
  /**
   * The hook before triggering the emit event can be used for form validation. if false is returned, the emit event
   * will not be triggered.
   *
   * @default undefined
   */
  shouldEmit?: (v: T) => boolean;
}

/**
 * Shorthand for v-model binding, props + emit -> ref
 *
 * @param props
 * @param key
 * @param onChange
 * @param defaultValue
 * @see https://vueuse.org/useVModel
 */
export function useVModel<P extends object, K extends keyof P, Name extends string>(
  props: P,
  key: K,
  emit: (name: Name, ...args: any[]) => void,
  options: UseVModelOptions<P[K]> = {}
) {
  const { clone = false, passive = false, eventName, deep = false, defaultValue, shouldEmit } = options;

  const event = (eventName ?? `update:${key.toString()}`) as Name;

  const cloneFn = (val: P[K]) => (!clone ? val : cloneValue(val));

  const getValue = () => (props[key] !== undefined ? cloneFn(props[key]) : defaultValue!);

  const triggerEmit = (value: P[K]) => {
    if (shouldEmit) {
      if (shouldEmit(value)) {
        emit(event, value);
      }
    } else {
      emit(event, value);
    }
  };

  if (!passive) {
    return computed<P[K]>({
      get() {
        return getValue();
      },
      set(value) {
        triggerEmit(value);
      }
    });
  }

  const initialValue = getValue();
  const proxy = ref(initialValue) as Ref<P[K]>;
  let isUpdating = false;

  watch(
    () => props[key!],
    v => {
      if (!isUpdating) {
        isUpdating = true;
        proxy.value = cloneFn(v);
        nextTick(() => {
          isUpdating = false;
        });
      }
    }
  );

  watch(
    proxy,
    v => {
      if (!isUpdating && (v !== props[key!] || deep)) {
        triggerEmit(v);
      }
    },
    { deep }
  );

  return proxy;
}
