<script setup lang="ts">
import { ref } from 'vue';
import { SxFileCard } from '@soybeanjs/ui-x';
import type { Attachment } from '@soybeanjs/ui-x/types';

const file: Attachment = { id: '1', name: 'proposal.pdf', kind: 'file', size: '2.1 MB', mimeType: 'application/pdf' };

const opened = ref(false);
</script>

<template>
  <div class="flex w-80 flex-col gap-3">
    <SxFileCard :attachment="file" :on-click="() => (opened = true)" />
    <p v-if="opened" class="text-sm text-muted-foreground">Opening proposal.pdf…</p>
  </div>
</template>
