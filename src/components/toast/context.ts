import { computed, nextTick, shallowRef, watch } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import { useContext } from '@soybeanjs/headless/composables';
import { mergeUi } from '@/theme';
import { toastTypes } from './shared';
import type { ToastPosition, ToastProviderContextParams, ToastState, UseToastOptions, UseToastReturn } from './types';

export const [provideToastProviderContext, useToastProvider] = useContext(
  'UiToastProvider',
  (params: ToastProviderContextParams) => {
    const { size: providerSize, ui: providerUi, limits, removeDelay } = params;

    const position = shallowRef<ToastPosition>(params.position.value);

    const states = shallowRef<ToastState[]>([]);

    const ids = computed(() => states.value.map(state => state.id));

    const debouncedStates = shallowRef<ToastState[]>([]);

    const updater = useDebounceFn(() => {
      debouncedStates.value = states.value;
    }, removeDelay.value);

    watch(states, (newValue, oldValue) => {
      if (newValue.length >= oldValue.length) {
        debouncedStates.value = states.value;
      } else {
        updater();
      }
    });

    const add = (state: ToastState) => {
      const updated = [state, ...states.value].slice(0, limits.value);
      states.value = updated;
    };

    const remove = (id: number) => {
      states.value = states.value.filter(state => state.id !== id);
    };

    const clear = () => {
      states.value = [];
    };

    let $id = 0;

    const factory = (options: UseToastOptions) => {
      const { showIcon = true, size = providerSize.value, ui: $ui, ...rest } = options;

      const id = $id;
      $id++;

      const ui = mergeUi(providerUi.value, $ui);

      return { id, size, showIcon, ui, ...rest };
    };

    const create = (options: UseToastOptions) => {
      const state = factory(options);

      const updatedPosition = options.position ?? params.position.value;

      if (position.value !== updatedPosition) {
        position.value = updatedPosition;
        clear();
      }

      nextTick(() => {
        add(state);
      });
    };

    const useToast = create as UseToastReturn;

    useToast.clear = clear;

    for (const type of toastTypes) {
      useToast[type] = (options: Omit<UseToastOptions, 'type'>) => {
        return create({ type, ...options });
      };
    }

    return {
      useToast,
      clear,
      ids,
      states: computed(() => debouncedStates.value),
      remove,
      position
    };
  }
);

export const useToast = () => {
  const { useToast: $useToast } = useToastProvider('UiToastConsumer');

  return $useToast;
};
