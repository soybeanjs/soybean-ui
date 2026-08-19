<script setup lang="ts">
import { useUploadRootContext, useUploadUi } from './context';
import type { UploadTriggerProps } from './types';

defineOptions({
  name: 'UploadTrigger'
});

defineProps<UploadTriggerProps>();

const cls = useUploadUi('trigger');

const { onOpenFileDialog, disabled, dragOver } = useUploadRootContext('UploadTrigger');
</script>

<template>
  <div
    data-soybean-upload-trigger
    :class="cls"
    :data-disabled="disabled ? '' : undefined"
    :data-drag-over="dragOver ? '' : undefined"
    role="button"
    :tabindex="disabled ? -1 : 0"
    @click="onOpenFileDialog"
    @keydown.enter.space.prevent="onOpenFileDialog"
  >
    <slot />
  </div>
</template>
