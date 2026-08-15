<script setup lang="ts">
import { SxAttachments } from '@soybeanjs/ui-x';
import type { Attachment } from '@soybeanjs/ui-x/types';

const attachments: Attachment[] = [
  { id: '1', name: 'document.pdf', kind: 'file', size: '1.2 MB', mimeType: 'application/pdf' },
  { id: '2', name: 'photo.png', kind: 'image', size: '860 KB', url: 'https://example.com/photo.png' },
  { id: '3', name: 'Reference Docs', kind: 'link', url: 'https://example.com/docs' },
  { id: '4', name: 'recording.mp3', kind: 'audio', size: '4.5 MB', mimeType: 'audio/mpeg' }
];
</script>

<template>
  <SxAttachments :attachments="attachments" />
</template>
