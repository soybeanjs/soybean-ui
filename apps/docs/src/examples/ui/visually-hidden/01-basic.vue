<script setup lang="ts">
import { VisuallyHidden } from '@vean/aria';
import { SIcon } from '@vean/ui';
</script>

<template>
  <button type="button" class="inline-flex items-center gap-2 rounded-md border px-3 py-2">
    <SIcon icon="lucide:save" />
    <VisuallyHidden>Save File</VisuallyHidden>
  </button>
</template>
