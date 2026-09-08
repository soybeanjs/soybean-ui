<script setup lang="ts">
import { SxAttachments } from '@soybeanjs/ui-x';
import type { Attachment } from '@soybeanjs/ui-x/types';

const attachments: Attachment[] = [
  { id: '1', name: 'proposal.pdf', kind: 'file', size: '1.2 MB', mimeType: 'application/pdf' },
  { id: '2', name: 'landing.png', kind: 'image', size: '860 KB', url: 'https://example.com/landing.png' }
];
</script>

<template>
  <SxAttachments class="w-80" :attachments="attachments">
    <template #item="{ attachment }">
      <div class="flex w-full items-center justify-between gap-2 rounded-md border border-border bg-card px-3 py-2">
        <span class="truncate text-sm">{{ attachment.name }}</span>
        <span class="shrink-0 text-xs text-muted-foreground">{{ attachment.kind }}</span>
      </div>
    </template>
  </SxAttachments>
</template>
