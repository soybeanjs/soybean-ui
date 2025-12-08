<script setup lang="ts">
import { SAlert, SCard, SIcon } from '@soybeanjs/ui';
</script>

<template>
  <SCard title="Slot" split>
    <SAlert color="success" variant="outline" title="Flighting !!!">
      <template #leading>
        <SIcon icon="lucide:arrow-left" />
      </template>
      <template #trailing>
        <SIcon icon="lucide:arrow-right" />
      </template>
    </SAlert>
  </SCard>
</template>
