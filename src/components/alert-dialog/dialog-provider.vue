<script setup lang="ts">
import { onBeforeUnmount } from 'vue';
import AlertDialog from './alert-dialog.vue';
import { provideDialogProviderContext } from './context';

defineOptions({
  name: 'SDialogProvider'
});

const { states, ids, clear } = provideDialogProviderContext();

onBeforeUnmount(() => {
  clear();
});
</script>

<template>
  <AlertDialog
    v-for="state in states"
    :key="state.id"
    :class="state.class"
    :size="state.size"
    :ui="state.ui"
    :open="ids.includes(state.id)"
    :type="state.type"
    :show-icon="state.showIcon"
    :confirm-text="state.confirmText"
    :cancel-text="state.cancelText"
    :show-cancel="state.showCancel"
    :before-confirm="state.beforeConfirm"
    :before-cancel="state.beforeCancel"
    :confirm-props="state.confirmProps"
    :cancel-props="state.cancelProps"
    @update:open="state.onClose"
  >
    <template v-if="state.title" #title>
      <template v-if="typeof state.title === 'string'">
        {{ state.title }}
      </template>
      <component :is="state.title" v-else />
    </template>
    <template v-if="state.description" #description>
      <template v-if="typeof state.description === 'string'">
        {{ state.description }}
      </template>
      <component :is="state.description" v-else />
    </template>
    <component :is="state.content" v-if="state.content" />
    <template v-if="state.footer" #footer>
      <component :is="state.footer" />
    </template>
  </AlertDialog>
  <slot />
</template>
