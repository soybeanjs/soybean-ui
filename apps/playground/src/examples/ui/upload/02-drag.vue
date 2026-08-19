<script setup lang="ts">
import { ref } from 'vue';
import { SIcon, SUpload } from '@soybeanjs/ui';
import type { UploadFile, UploadRequestOptions } from '@soybeanjs/ui';

const fileList = ref<UploadFile[]>([]);

function customRequest({ file, onProgress, onSuccess }: UploadRequestOptions) {
  let percent = 0;
  const timer = setInterval(() => {
    percent += 20;
    onProgress(percent);
    if (percent >= 100) {
      clearInterval(timer);
      onSuccess();
    }
  }, 200);
}
</script>

<template>
  <div class="w-96">
    <SUpload v-model:file-list="fileList" multiple :custom-request="customRequest" class="cursor-pointer">
      <div class="flex flex-col items-center gap-1.5">
        <SIcon icon="lucide:cloud-upload" class="size-6" />
        <span>Drag files here or click to upload</span>
        <span class="text-xs text-muted-foreground">Simulated upload progress via custom request</span>
      </div>
    </SUpload>
  </div>
</template>
