import { camelize, computed, toHandlerKey } from 'vue';

export function pick<T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;

  for (const key of keys) {
    result[key] = obj[key];
  }

  return result;
}

export function omit<T extends Record<string, any>, K extends keyof T>(props: T, keys: K[]) {
  const res = {} as Omit<T, K>;

  // eslint-disable-next-line guard-for-in
  for (const key in props) {
    const k = key as unknown as K;

    if (!keys.includes(k)) {
      (res as T)[k] = props[k];
    }
  }

  return res;
}

export function computedPick<T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]) {
  return computed(() => pick(obj, keys));
}

export function computedOmit<T extends Record<string, any>, K extends keyof T>(props: T, keys: K[]) {
  return computed(() => omit(props, keys));
}

export function isBlankString(value: unknown | undefined) {
  return typeof value === 'string' && value === '';
}

export function computedPickEmits<T extends Record<string, any>, K extends keyof T>(emits: T, keys: K[]) {
  const formattedKeys = keys.map(key => toHandlerKey(camelize(key as string)));

  return computedPick(emits, formattedKeys);
}

export function computedOmitEmits<T extends Record<string, any>, K extends keyof T>(emits: T, keys: K[]) {
  const formattedKeys = keys.map(key => toHandlerKey(camelize(key as string)));

  return computedOmit(emits, formattedKeys);
}
