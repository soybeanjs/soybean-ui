<script setup lang="ts">
import { SCard, SPagination } from '@ui';
</script>

<template>
  <SCard
    title="Show first and last"
    description="When showFirstOrLast is false, the first and last buttons will not be shown"
    :ui="{ content: 'flex-c gap-3' }"
  >
    <SPagination
      show-edges
      :sibling-count="1"
      :items-per-page="10"
      :total="200"
      action-as-selected
      :show-first-or-last="false"
    />
  </SCard>
</template>
