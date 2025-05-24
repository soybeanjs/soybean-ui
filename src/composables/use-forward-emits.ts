import { getCurrentInstance } from 'vue';

export function useForwardEmits<T extends string>(emit: (...args: any[]) => void) {
  const vm = getCurrentInstance();

  const names: T[] = vm?.type?.emits || [];
  const events = {} as Record<T, (...args: any[]) => void>;

  names.forEach(name => {
    events[name] = (...args: any[]) => {
      emit(name, ...args);
    };
  });

  return events;
}
