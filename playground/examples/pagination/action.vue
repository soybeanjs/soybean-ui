<script setup lang="ts">
import { SCard, SPagination } from '@soybeanjs/ui';
</script>

<template>
  <SCard
    title="Action as selected"
    description="When actionAsSelected is true, the action button will be styled as selected"
    :ui="{ content: 'flex-c gap-3' }"
  >
    <SPagination show-edges :sibling-count="1" :items-per-page="10" :total="200" action-as-selected>
      <template #prev>Prev</template>
      <template #next>Next</template>
    </SPagination>
  </SCard>
</template>
