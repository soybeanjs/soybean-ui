<script setup lang="ts">
import { SIcon, STag } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Slot</h3>
    <STag variant="ghost">
      <template #leading>
        <SIcon icon="lucide:arrow-left" />
      </template>
      <span>this is content</span>
      <template #trailing>
        <SIcon icon="lucide:arrow-right" />
      </template>
    </STag>
  </div>
</template>
