<script setup lang="ts">
import { SCard, SKbd } from '@soybeanjs/ui';
import { themeSizeOptions } from '../../constants/theme';
</script>

<template>
  <SCard title="Size" :ui="{ content: 'flex gap-2' }">
    <SKbd v-for="size in themeSizeOptions" :key="size.value" :size="size.value" value="command" />
  </SCard>
</template>
