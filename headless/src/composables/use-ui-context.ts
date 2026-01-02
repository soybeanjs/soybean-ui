import { computed } from 'vue';
import type { ComputedRef } from 'vue';
import type { ClassValue, UiClass } from '../types';
import { useContext } from './use-context';

export function useUiContext<UiSlot extends string>(
  contextName: string,
  uiHook: (ui: ComputedRef<Partial<UiClass<UiSlot>>>) => ComputedRef<Partial<UiClass<UiSlot>>> = ui => ui
) {
  const [provideUi, injectUi] = useContext(contextName, uiHook);

  const useUi = <S extends UiSlot | undefined = undefined>(
    slot?: S
  ): S extends UiSlot ? ComputedRef<ClassValue> : ComputedRef<Partial<UiClass<UiSlot>>> => {
    const ui = injectUi();
    if (!slot) {
      return computed(() => ui?.value ?? {});
    }

    // @ts-expect-error - we want to return the class value for the given slot
    return computed(() => ui?.value?.[slot] as ClassValue);
  };

  return [provideUi, useUi] as const;
}
