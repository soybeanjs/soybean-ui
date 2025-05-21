import { inject, provide } from 'vue';
import type { InjectionKey } from 'vue';

export type UseContextOptions<T> = {
  injectionKey?: string | InjectionKey<T>;
  defaultValue?: T;
  required?: boolean;
  requiredMessage?: string;
};

export function useContext<Arguments extends Array<any>, T>(
  composable: (...args: Arguments) => T,
  options?: UseContextOptions<T>
) {
  const key = options?.injectionKey || Symbol(composable.name || 'InjectionState');

  const useInject = () => {
    const value = inject(key, options?.defaultValue);

    if (options?.required && !value) {
      throw new Error(options?.requiredMessage || 'Provide a value for the context');
    }

    return value || null;
  };

  const useProvide = (...args: Arguments) => {
    const value = composable(...args);

    provide(key, value);

    return value;
  };

  return [useProvide, useInject] as const;
}
