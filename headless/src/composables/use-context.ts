import { inject, provide } from 'vue';
import { isNullish } from '../shared';

export function useContext<Arguments extends Array<any>, T>(
  contextName: string,
  composable: (...args: Arguments) => T
) {
  const key = Symbol(contextName);

  /**
   * Injects the context value.
   *
   * @param consumerName - The name of the component that is consuming the context. If provided, the component must be
   *   used within the context provider.
   * @param defaultValue - The default value to return if the context is not provided.
   * @returns The context value.
   */
  const useInject = <N extends string | null | undefined = undefined>(
    consumerName?: N,
    defaultValue?: T
  ): N extends null | undefined ? T | null : T => {
    const value = inject(key, defaultValue);

    if (!isNullish(consumerName) && !value) {
      throw new Error(`\`${consumerName}\` must be used within \`${contextName}\``);
    }

    // @ts-expect-error - we want to return null if the value is undefined or null
    return value || null;
  };

  const useProvide = (...args: Arguments) => {
    const value = composable(...args);

    provide(key, value);

    return value;
  };

  return [useProvide, useInject] as const;
}
