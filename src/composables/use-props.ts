import { computed } from 'vue';
import { omit, pick } from '../shared';

export function usePickProps<T extends object, K extends keyof T>(props: T, keys: K[], extraProps: object = {}) {
  return computed(() => ({ ...pick(props, keys), ...extraProps }));
}

export function useOmitProps<T extends object, K extends keyof T>(props: T, keys: K[], extraProps: object = {}) {
  return computed(() => ({ ...omit(props, keys), ...extraProps }));
}
