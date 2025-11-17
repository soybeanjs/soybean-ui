import { computed, shallowRef, watch } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import { useContext } from '@soybeanjs/headless/composables';
import type {
  ConfigProviderContextParams,
  DialogInfo,
  UseDialogOptions,
  UseDialogReturn,
  UseDialogType
} from './types';

export const [provideConfigProviderContext, useConfigProvider] = useContext(
  'UIConfigProvider',
  (params: ConfigProviderContextParams) => params
);

export const [provideDialogProviderContext, useDialogProvider] = useContext('UIDialogProvider', () => {
  const dialogInfos = shallowRef<DialogInfo[]>([]);

  const dialogIds = computed(() => dialogInfos.value.map(info => info.id));

  const debouncedDialogInfos = shallowRef<DialogInfo[]>([]);

  const updater = useDebounceFn(() => {
    debouncedDialogInfos.value = dialogInfos.value;
  }, 500);

  watch(dialogInfos, (newValue, oldValue) => {
    if (newValue.length > oldValue.length) {
      debouncedDialogInfos.value = dialogInfos.value;
    } else {
      updater();
    }
  });

  const addDialog = (info: DialogInfo) => {
    dialogInfos.value = [...dialogInfos.value, info];
  };

  const removeDialog = (id: number) => {
    dialogInfos.value = dialogInfos.value.filter(info => info.id !== id);
  };

  const destroyAll = () => {
    dialogInfos.value = [];
  };

  let $id = 0;

  const factory = (options: UseDialogOptions & { type: UseDialogType }) => {
    const { type, showIcon = true, ...rest } = options;

    const id = $id;
    $id++;

    const info: DialogInfo = {
      id,
      type,
      options: {
        ...rest,
        showIcon
      }
    };

    return info;
  };

  const create = (options: UseDialogOptions & { type: UseDialogType }) => {
    const info = factory(options);
    addDialog(info);
  };

  const useDialog = {
    create,
    destroyAll
  } as UseDialogReturn;

  const types: UseDialogType[] = ['destructive', 'success', 'warning', 'info'];

  for (const type of types) {
    useDialog[type] = (options: UseDialogOptions) => {
      return create({ ...options, type });
    };
  }

  return {
    useDialog,
    destroyAll,
    dialogInfos,
    dialogIds,
    debouncedDialogInfos,
    removeDialog
  };
});

export const useDialog = () => {
  const { useDialog: $useDialog } = useDialogProvider('UIDialogConsumer');

  return $useDialog;
};
