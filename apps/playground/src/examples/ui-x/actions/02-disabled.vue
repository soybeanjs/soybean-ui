<script setup lang="ts">
import { SxActions } from '@soybeanjs/ui-x';

const items = [
  { key: 'copy', label: 'Copy', icon: '📋' },
  { key: 'like', label: 'Like', icon: '👍' },
  { key: 'share', label: 'Share', icon: '🔗', disabled: true }
];
</script>

<template>
  <SxActions :items="items" />
</template>
