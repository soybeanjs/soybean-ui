import { computed, shallowRef, watch } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import { useContext } from '@soybeanjs/headless/composables';
import type { DialogState, UseDialogOptions, UseDialogReturn, UseDialogType } from './types';

export const [provideDialogProviderContext, useDialogProvider] = useContext('UiDialogProvider', () => {
  const states = shallowRef<DialogState[]>([]);

  const ids = computed(() => states.value.map(state => state.id));

  const debouncedStates = shallowRef<DialogState[]>([]);

  const updater = useDebounceFn(() => {
    debouncedStates.value = states.value;
  }, 500);

  watch(states, (newValue, oldValue) => {
    if (newValue.length > oldValue.length) {
      debouncedStates.value = states.value;
    } else {
      updater();
    }
  });

  const add = (state: DialogState) => {
    states.value = [...states.value, state];
  };

  const remove = (id: number) => {
    states.value = states.value.filter(state => state.id !== id);
  };

  const clear = () => {
    states.value = [];
  };

  let $id = 0;

  const factory = (options: UseDialogOptions) => {
    const { showIcon = true, ...rest } = options;

    const id = $id;
    $id++;

    const state: DialogState = {
      id,
      showIcon,
      ...rest
    };

    return state;
  };

  const create = (options: UseDialogOptions) => {
    const state = factory(options);
    add(state);
  };

  const useDialog = create as UseDialogReturn;

  useDialog.clear = clear;

  const types: UseDialogType[] = ['destructive', 'success', 'warning', 'info'];

  for (const type of types) {
    useDialog[type] = (options: Omit<UseDialogOptions, 'type'>) => {
      return create({ type, ...options });
    };
  }

  // setup to window for usage outside of setup function
  if (typeof window !== 'undefined') {
    window.__Soybean__useDialog = useDialog;
  }

  return {
    useDialog,
    clear,
    ids,
    states: computed(() => debouncedStates.value),
    remove
  };
});

export const useDialog = () => {
  // read from window first to avoid provide/inject limitations when called outside of setup
  if (typeof window !== 'undefined' && window.__Soybean__useDialog) {
    return window.__Soybean__useDialog;
  }

  const { useDialog: $useDialog } = useDialogProvider('UiDialogConsumer');

  return $useDialog;
};
