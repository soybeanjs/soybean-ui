import { effectScope } from 'vue';
import type { EffectScope } from 'vue';
import type { AnyFn } from '../types';
import { tryOnScopeDispose } from '../shared';

export type SharedComposableReturn<T extends AnyFn = AnyFn> = T;

/**
 * Make a composable function usable with multiple Vue instances.
 *
 * @see https://vueuse.org/createSharedComposable
 */
export function useSharedComposable<T extends AnyFn>(composable: T): SharedComposableReturn<T> {
  let subscribers = 0;
  let state: ReturnType<T> | undefined;
  let scope: EffectScope | undefined;

  const dispose = () => {
    subscribers -= 1;
    if (scope && subscribers <= 0) {
      scope.stop();
      state = undefined;
      scope = undefined;
    }
  };

  return <T>((...args) => {
    subscribers += 1;
    if (!scope) {
      scope = effectScope(true);
      state = scope.run(() => composable(...args));
    }
    tryOnScopeDispose(dispose);
    return state;
  });
}
