<script setup lang="ts">
import { SxActions } from '@soybeanjs/ui-x';

const items = [
  { key: 'copy', label: 'Copy', icon: '📋' },
  { key: 'like', label: 'Like', icon: '👍' },
  { key: 'dislike', label: 'Dislike', icon: '👎' },
  { key: 'share', label: 'Share', icon: '🔗' }
];
</script>

<template>
  <SxActions :items="items" />
</template>
