<script setup lang="ts">
import { onBeforeUnmount } from 'vue';
import AlertDialog from '../alert-dialog/alert-dialog.vue';
import AlertDialogCancel from '../alert-dialog/alert-dialog-cancel.vue';
import AlertDialogAction from '../alert-dialog/alert-dialog-action.vue';
import { provideDialogProviderContext } from './context';

defineOptions({
  name: 'SDialogProvider'
});

const { states, ids, remove, clear } = provideDialogProviderContext();

onBeforeUnmount(() => {
  clear();
});
</script>

<template>
  <AlertDialog
    v-for="state in states"
    :key="state.id"
    :type="state.type"
    :open="ids.includes(state.id)"
    :size="state.size"
    :ui="state.ui"
    :show-icon="state.showIcon"
    @update:open="remove(state.id)"
  >
    <template v-if="state.title" #title>
      <template v-if="typeof state.title === 'string'">
        {{ state.title }}
      </template>
      <component :is="state.title" v-else />
    </template>
    <template #description>
      <template v-if="typeof state.description === 'string'">
        {{ state.description }}
      </template>
      <component :is="state.description" v-else />
    </template>
    <component :is="state.popup" v-if="state.popup" />
    <template #footer>
      <component :is="state.footer" v-if="state.footer" />
      <template v-else>
        <AlertDialogCancel v-if="state.type === 'warning'" :text="state.cancelText" :before-close="state.onCancel" />
        <AlertDialogAction :text="state.confirmText" :before-close="state.onConfirm" />
      </template>
    </template>
  </AlertDialog>
  <slot />
</template>
