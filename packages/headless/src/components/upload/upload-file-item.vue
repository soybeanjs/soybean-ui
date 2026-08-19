<script setup lang="ts">
import { useUploadRootContext, useUploadUi } from './context';
import type { UploadFileItemProps } from './types';

defineOptions({
  name: 'UploadFileItem'
});

const props = defineProps<UploadFileItemProps>();

const cls = useUploadUi('fileItem');

const { onRemove, onRetry } = useUploadRootContext('UploadFileItem');
</script>

<template>
  <li data-soybean-upload-file-item :data-status="file.status" :class="cls">
    <slot :file="file" :remove="onRemove" :retry="onRetry" />
  </li>
</template>
