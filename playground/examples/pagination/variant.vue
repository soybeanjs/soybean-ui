<script setup lang="ts">
import { SCard, SPagination } from '@ui';
</script>

<template>
  <SCard title="Variant" :ui="{ content: 'flex-c gap-3' }">
    <SPagination show-edges :sibling-count="1" :items-per-page="10" :total="200" variant="pure" />
    <SPagination show-edges :sibling-count="1" :items-per-page="10" :total="200" variant="solid" />
    <SPagination show-edges :sibling-count="1" :items-per-page="10" :total="200" variant="outline" />
    <SPagination show-edges :sibling-count="1" :items-per-page="10" :total="200" variant="soft" />
  </SCard>
</template>
