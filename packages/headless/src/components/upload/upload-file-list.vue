<script setup lang="ts">
import { useUploadRootContext, useUploadUi } from './context';
import type { UploadFileListProps } from './types';

defineOptions({
  name: 'UploadFileList'
});

defineProps<UploadFileListProps>();

const cls = useUploadUi('fileList');

const { files } = useUploadRootContext('UploadFileList');
</script>

<template>
  <ul v-if="files?.length" data-soybean-upload-file-list :class="cls">
    <slot :files="files" />
  </ul>
</template>
