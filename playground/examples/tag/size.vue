<script setup lang="ts">
import { SCard, STag } from '@soybeanjs/ui';
import { themeSizeOptions } from '../../constants/theme';
</script>

<template>
  <SCard title="Size" split :ui="{ content: 'flex gap-3' }">
    <STag v-for="size in themeSizeOptions" :key="size.value" :size="size.value" variant="ghost">
      {{ size.label }}
    </STag>
  </SCard>
</template>
