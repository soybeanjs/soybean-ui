<script setup lang="ts">
import { SAlert, SIcon } from '@vean/ui';
</script>

<template>
  <SAlert color="success" variant="outline" title="Flighting !!!">
    <template #leading>
      <SIcon icon="lucide:arrow-left" />
    </template>
    <template #trailing>
      <SIcon icon="lucide:arrow-right" />
    </template>
  </SAlert>
</template>
