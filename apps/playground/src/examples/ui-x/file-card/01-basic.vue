<script setup lang="ts">
import type { Attachment } from '@soybeanjs/ui-x/types';
import { SxFileCard } from '@soybeanjs/ui-x';

const file: Attachment = { id: '1', name: 'proposal.pdf', kind: 'file', size: '2.1 MB', mimeType: 'application/pdf' };
const image: Attachment = {
  id: '2',
  name: 'cover.jpg',
  kind: 'image',
  size: '780 KB',
  url: 'https://example.com/cover.jpg'
};
const video: Attachment = {
  id: '3',
  name: 'demo.mp4',
  kind: 'video',
  size: '24 MB',
  url: 'https://example.com/demo.mp4'
};
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <SxFileCard :attachment="file" />
    <SxFileCard :attachment="image" />
    <SxFileCard :attachment="video" />
  </div>
</template>
