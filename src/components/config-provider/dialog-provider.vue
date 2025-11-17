<script setup lang="ts">
import { onBeforeUnmount } from 'vue';
import AlertDialog from '../alert-dialog/alert-dialog.vue';
import AlertDialogCancel from '../alert-dialog/alert-dialog-cancel.vue';
import AlertDialogAction from '../alert-dialog/alert-dialog-action.vue';
import { provideDialogProviderContext } from './context';

defineOptions({
  name: 'SDialogProvider'
});

const { debouncedDialogInfos, dialogIds, removeDialog, destroyAll } = provideDialogProviderContext();

onBeforeUnmount(() => {
  destroyAll();
});
</script>

<template>
  <AlertDialog
    v-for="info in debouncedDialogInfos"
    :key="info.id"
    :type="info.type"
    :open="dialogIds.includes(info.id)"
    :size="info.options.size"
    :ui="info.options.ui"
    :show-icon="info.options.showIcon"
    @update:open="removeDialog(info.id)"
  >
    <template v-if="info.options.title" #title>
      <template v-if="typeof info.options.title === 'string'">
        {{ info.options.title }}
      </template>
      <component :is="info.options.title" v-else />
    </template>
    <template #description>
      <template v-if="typeof info.options.description === 'string'">
        {{ info.options.description }}
      </template>
      <component :is="info.options.description" v-else />
    </template>
    <component :is="info.options.content" v-if="info.options.content" />
    <template #footer>
      <component :is="info.options.footer" v-if="info.options.footer" />
      <template v-else>
        <AlertDialogCancel
          v-if="info.type === 'warning'"
          :text="info.options.cancelText"
          :before-close="info.options.onCancel"
        />
        <AlertDialogAction :text="info.options.confirmText" :before-close="info.options.onConfirm" />
      </template>
    </template>
  </AlertDialog>
  <slot />
</template>
