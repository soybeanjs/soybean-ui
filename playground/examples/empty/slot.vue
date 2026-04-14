<script setup lang="ts">
import { SButton, SEmpty, SIcon } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Slot</h3>
    <SEmpty class="min-h-72" title="Nothing matched your filters">
      <template #media>
        <div class="flex size-12 items-center justify-center rounded-full bg-info/10 text-info">
          <SIcon class="size-6" icon="lucide:search-x" />
        </div>
      </template>
      <template #description>Try broadening the criteria or resetting the filters to see more results.</template>
      <SButton variant="outline">Reset filters</SButton>
    </SEmpty>
  </div>
</template>
