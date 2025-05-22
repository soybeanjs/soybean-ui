import { inject, provide } from 'vue';

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
  const useInject = (consumerName?: string, defaultValue?: T) => {
    const value = inject(key, defaultValue);

    if (consumerName && !value) {
      throw new Error(`\`${consumerName}\` must be used within \`${contextName}\``);
    }

    return value!;
  };

  const useProvide = (...args: Arguments) => {
    const value = composable(...args);

    provide(key, value);

    return value;
  };

  return [useProvide, useInject] as const;
}
