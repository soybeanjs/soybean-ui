import { inject, provide } from 'vue';

export function useContext<Arguments extends Array<any>, T>(
  contextName: string,
  composable: (...args: Arguments) => T
) {
  const key = Symbol(contextName);

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
