<script setup lang="ts">
import { SAlert, SIcon } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Slot</h3>
    <SAlert color="success" variant="outline" title="Flighting !!!">
      <template #leading>
        <SIcon icon="lucide:arrow-left" />
      </template>
      <template #trailing>
        <SIcon icon="lucide:arrow-right" />
      </template>
    </SAlert>
  </div>
</template>
