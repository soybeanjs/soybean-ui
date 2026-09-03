import { inject, provide } from 'vue';

type ContextName = string | { name: string; key: string | symbol };

type AnyComposable = (...args: never[]) => unknown;

export type ContextValue<T> = T extends AnyComposable ? ReturnType<T> : T;

export type ContextProvider<T> = T extends AnyComposable ? (...args: Parameters<T>) => ReturnType<T> : (value: T) => T;

export interface ContextConsumerFn<T> {
  /** Required consumption: throws when the context is missing. */
  (consumerName: string, defaultValue?: T): T;
  /** Optional consumption: returns `null` when the context is missing. */
  (consumerName?: string | null, defaultValue?: T): T | null;
}

export type ContextConsumer<T> = T extends AnyComposable ? ContextConsumerFn<ReturnType<T>> : ContextConsumerFn<T>;

/**
 * Creates a context provider and consumer pair.
 *
 * @param contextName - The name of the context. This can be a string or an object with a `name` and `key` property.
 * @param composable - An optional composable that computes the context value from the provider arguments. When
 * omitted, the context value is the first argument passed to the provider.
 */
export function useContext<T>(contextName: ContextName): [ContextProvider<T>, ContextConsumer<T>];
export function useContext<T extends AnyComposable>(
  contextName: ContextName,
  composable: T
): [ContextProvider<T>, ContextConsumer<ReturnType<T>>];
export function useContext(contextName: ContextName, composable?: (...args: never[]) => unknown) {
  const name = typeof contextName === 'string' ? contextName : contextName.name;
  const key = typeof contextName === 'string' ? Symbol(contextName) : contextName.key;

  const provideContext = (...args: never[]) => {
    const value = composable?.(...args) ?? args[0];
    provide(key, value);
    return value;
  };

  const useConsumer = (consumerName?: string | null, defaultValue?: unknown) => {
    const value = inject(key, defaultValue) ?? null;
    if (consumerName != null && value === null) {
      throw new Error(`\`${consumerName}\` must be used within \`${name}\``);
    }
    return value;
  };

  return [provideContext, useConsumer] as const;
}
