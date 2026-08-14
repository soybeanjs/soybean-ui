<script setup lang="ts">
import { SButton, SEmpty, SIcon } from '@soybeanjs/ui';
</script>

<template>
  <SEmpty class="min-h-72" title="Nothing matched your filters">
    <template #media>
      <SIcon class="text-destructive" icon="lucide:search-x" />
    </template>
    <template #description>Try broadening the criteria or resetting the filters to see more results.</template>
    <SButton variant="outline">Reset filters</SButton>
  </SEmpty>
</template>
