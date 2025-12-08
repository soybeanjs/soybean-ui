<script setup lang="ts">
import { SCard, SIcon, STag } from '@soybeanjs/ui';
</script>

<template>
  <SCard title="Slot" split>
    <STag variant="ghost">
      <template #leading>
        <SIcon icon="lucide:arrow-left" />
      </template>
      <span>this is content</span>
      <template #trailing>
        <SIcon icon="lucide:arrow-right" />
      </template>
    </STag>
  </SCard>
</template>
