<script setup lang="ts">
import { SxSender } from '@soybeanjs/ui-x';
import type { Attachment } from '@soybeanjs/ui-x/types';

const attachments: Attachment[] = [
  { id: '1', name: 'report.pdf', kind: 'file', size: '1.2 MB', mimeType: 'application/pdf' },
  { id: '2', name: 'screenshot.png', kind: 'image', size: '340 KB', url: 'https://example.com/screenshot.png' }
];
</script>

<template>
  <SxSender placeholder="Type a message..." :attachments="attachments" class="w-full" />
</template>
