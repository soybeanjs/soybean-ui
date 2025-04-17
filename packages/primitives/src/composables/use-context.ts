import { inject, provide } from 'vue';
import type { InjectionKey } from 'vue';

/**
 * Use context
 *
 * @param contextName Context name
 * @param fn Context function
 */
export function useContext<T extends (...args: any[]) => any>(contextName: string, fn: T) {
  type Context = ReturnType<T>;

  const [useProvide, injectContext] = createContext<Context>(contextName);

  function provideContext(...args: Parameters<T>) {
    const context: Context = fn(...args);
    return useProvide(context);
  }

  return [
    /** Provide context in the parent component */
    provideContext,
    /** Inject context in the child component */
    injectContext
  ] as const;
}

/**
 * Create context
 *
 * @param contextName Context name
 * @param requiredProvide Whether the context is required to be provided
 */
export function createContext<T>(contextName: string, requiredProvide = true) {
  const injectKey: InjectionKey<T | null> = Symbol(contextName);

  function useProvide(context: T) {
    provide(injectKey, context);

    return context;
  }

  function useInject<S extends T | null | undefined = T>(defaultValue?: S): S extends null ? T | null : T {
    const context = inject(injectKey, defaultValue);

    if (context === null) {
      return context as any;
    }

    if (requiredProvide && !context) {
      throw new Error(`${contextName} is not provided`);
    }

    return context as T;
  }

  return [useProvide, useInject] as const;
}
