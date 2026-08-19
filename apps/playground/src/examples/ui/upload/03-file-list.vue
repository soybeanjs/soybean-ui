<script setup lang="ts">
import { ref } from 'vue';
import { SUpload } from '@soybeanjs/ui';
import type { UploadFile } from '@soybeanjs/ui';

const raw = new File(['report content'], 'report.pdf', { type: 'application/pdf' });

const fileList = ref<UploadFile[]>([
  {
    uid: 'pre-1',
    name: 'report.pdf',
    size: 1024,
    type: 'application/pdf',
    status: 'success',
    percent: 100,
    raw
  },
  {
    uid: 'pre-2',
    name: 'photo.png',
    size: 2048,
    type: 'image/png',
    status: 'error',
    percent: 40,
    raw
  }
]);
</script>

<template>
  <div class="w-96">
    <SUpload v-model:file-list="fileList" multiple>
      <div class="flex items-center justify-center gap-2 text-sm">Upload more files</div>
    </SUpload>
  </div>
</template>
