<script setup lang="ts">
import { SCard, SIcon, SPagination } from '@soybeanjs/ui';
</script>

<template>
  <SCard
    title="Slot"
    description="You can use the slot to customize the first, prev, next, and last buttons"
    :ui="{ content: 'flex-c gap-3' }"
  >
    <SPagination show-edges :sibling-count="1" :items-per-page="10" :total="200">
      <template #first>
        <SIcon icon="lucide:chevrons-left" />
        <span>First</span>
      </template>
      <template #prev>
        <SIcon icon="lucide:chevron-left" />
      </template>
      <template #next>
        <SIcon icon="lucide:chevron-right" />
      </template>
      <template #last>
        <span>Last</span>
        <SIcon icon="lucide:chevrons-right" />
      </template>
    </SPagination>
  </SCard>
</template>
