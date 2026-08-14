<script setup lang="ts">
import { SIcon, STag } from '@soybeanjs/ui';
</script>

<template>
  <STag variant="ghost">
    <template #leading>
      <SIcon icon="lucide:arrow-left" />
    </template>
    <span>this is content</span>
    <template #trailing>
      <SIcon icon="lucide:arrow-right" />
    </template>
  </STag>
</template>
