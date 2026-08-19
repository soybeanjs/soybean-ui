<script setup lang="ts">
import { ref } from 'vue';
import { SIcon, SUpload } from '@soybeanjs/ui';
import type { UploadFile } from '@soybeanjs/ui';

const fileList = ref<UploadFile[]>([]);
</script>

<template>
  <div class="w-96">
    <SUpload v-model:file-list="fileList" multiple>
      <div class="flex items-center justify-center gap-2 text-sm">Upload attachments</div>
      <template #item="{ file }">
        <SIcon
          :icon="file.type.startsWith('image/') ? 'lucide:image' : 'lucide:file-text'"
          class="size-4 shrink-0 text-muted-foreground"
        />
        <span class="min-w-0 flex-1 truncate">{{ file.name }}</span>
        <span class="text-xs text-muted-foreground">{{ file.percent }}%</span>
      </template>
    </SUpload>
  </div>
</template>
