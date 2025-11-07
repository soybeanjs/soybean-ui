<script setup lang="ts">
import { SCard, SPagination } from '@ui';
import { themeSizeOptions } from '../../constants/theme';
</script>

<template>
  <SCard title="Size" :ui="{ content: 'flex-c gap-3' }">
    <SPagination
      v-for="size in themeSizeOptions"
      :key="size.value"
      show-edges
      :sibling-count="1"
      :items-per-page="10"
      :total="200"
      :size="size.value"
    />
  </SCard>
</template>
