import { inject, provide } from 'vue';
import { isNullish } from '../shared';

type ContextValue<T> = T extends (...args: any[]) => any ? ReturnType<T> : T;

type ContextProvider<T> = T extends (...args: any[]) => any ? T : (arg: T) => T;

type ContextConsumer<Context> = <N extends string | null | undefined = undefined>(
  consumerName?: N,
  defaultValue?: Context
) => N extends null | undefined ? Context | null : Context;

export function useContext<T>(contextName: string, composable?: T extends (...args: any[]) => any ? T : never) {
  type Context = ContextValue<T>;

  const key = Symbol(contextName);

  /**
   * Injects the context value.
   *
   * @param consumerName - The name of the component that is consuming the context. If provided, the component must be
   *   used within the context provider.
   * @param defaultValue - The default value to return if the context is not provided.
   * @returns The context value.
   */
  const useInject = (consumerName?: string | null, defaultValue?: any) => {
    const value = inject(key, defaultValue) ?? null;

    if (!isNullish(consumerName) && value === null) {
      throw new Error(`\`${consumerName}\` must be used within \`${contextName}\``);
    }

    return value;
  };

  const useProvide = (...args: any[]) => {
    const value = composable?.(...args) ?? args[0];

    provide(key, value);

    return value;
  };

  return [useProvide, useInject] as [ContextProvider<T>, ContextConsumer<Context>];
}
