<script setup lang="ts">
import { ref } from 'vue';
import { SIcon, SUpload } from '@soybeanjs/ui';
import type { UploadFile } from '@soybeanjs/ui';

const fileList = ref<UploadFile[]>([]);
</script>

<template>
  <div class="w-96">
    <SUpload v-model:file-list="fileList" accept=".png,.jpg,.pdf" max-size="1048576">
      <div class="flex flex-col items-center gap-1.5">
        <SIcon icon="lucide:upload" class="size-6" />
        <span>Click to upload (PNG, JPG, PDF, max 1 MB)</span>
      </div>
    </SUpload>
  </div>
</template>
