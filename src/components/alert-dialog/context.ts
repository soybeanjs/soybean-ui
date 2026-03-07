import { computed, shallowRef, watch } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import { useContext } from '@soybeanjs/headless/composables';
import type { AlertDialogContext, UseDialogState, UseDialogOptions, UseDialogReturn, AlertDialogType } from './types';

export const [provideAlertDialogContext, useAlertDialogContext] = useContext<AlertDialogContext>('AlertDialog');

export const [provideDialogProviderContext, useDialogProvider] = useContext('UiDialogProvider', useDialogProviderState);

export const useDialog = (): UseDialogReturn => {
  // read from window first to avoid provide/inject limitations when called outside of setup
  if (typeof window !== 'undefined' && window.__SoybeanUI_useDialog) {
    return window.__SoybeanUI_useDialog;
  }

  const context = useDialogProvider('UiDialogConsumer', useDialogProviderState());

  return context.useDialog;
};

function useDialogProviderState() {
  const states = shallowRef<UseDialogState[]>([]);

  const ids = computed(() => states.value.map(state => state.id));

  const debouncedStates = shallowRef<UseDialogState[]>([]);

  const setDebouncedStates = () => {
    debouncedStates.value = states.value;
  };

  const updater = useDebounceFn(setDebouncedStates, 500);

  watch(states, (newValue, oldValue) => {
    if (newValue.length > oldValue.length) {
      setDebouncedStates();
    } else {
      updater();
    }
  });

  const add = (state: UseDialogState) => {
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
    const { showIcon = true, onClose: _onClose, ...rest } = options;

    const id = $id;
    $id++;

    const onClose = (open?: boolean) => {
      if (open) return;
      remove(id);
      _onClose?.();
    };

    const state: UseDialogState = {
      id,
      showIcon,
      onClose,
      ...rest
    };

    return state;
  };

  const create = (options: UseDialogOptions) => {
    const state = factory(options);
    add(state);
  };

  const $useDialog = create as UseDialogReturn;

  $useDialog.clear = clear;

  const types: AlertDialogType[] = ['destructive', 'success', 'warning', 'info'];

  for (const type of types) {
    $useDialog[type] = (options: Omit<UseDialogOptions, 'type'>) => {
      return create({ type, ...options });
    };
  }

  // setup to window for usage outside of setup function
  if (typeof window !== 'undefined') {
    window.__SoybeanUI_useDialog = $useDialog;
  }

  return {
    useDialog: $useDialog,
    clear,
    ids,
    states: computed(() => debouncedStates.value),
    remove
  };
}
