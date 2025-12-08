<script setup lang="ts">
import { SCard, SPagination } from '@soybeanjs/ui';
</script>

<template>
  <SCard title="Shape" description="You can change the shape of the pagination" :ui="{ content: 'flex-c gap-3' }">
    <SPagination show-edges :sibling-count="1" :items-per-page="10" :total="200" shape="rounded" />
    <SPagination show-edges :sibling-count="1" :items-per-page="10" :total="200" shape="square" />
  </SCard>
</template>
