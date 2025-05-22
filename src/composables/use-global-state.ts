import { effectScope } from 'vue';

type AnyFn = (...args: any[]) => any;

export type UseGlobalStateReturn<Fn extends AnyFn = AnyFn> = Fn;

/**
 * Keep states in the global scope to be reusable across Vue instances.
 *
 * @param stateFactory A factory function to create the state
 * @see https://vueuse.org/createGlobalState
 */
export function useGlobalState<Fn extends AnyFn>(stateFactory: Fn): UseGlobalStateReturn<Fn> {
  let initialized = false;
  let state: any;
  const scope = effectScope(true);

  return ((...args: any[]) => {
    if (!initialized) {
      state = scope.run(() => stateFactory(...args))!;
      initialized = true;
    }
    return state;
  }) as Fn;
}
