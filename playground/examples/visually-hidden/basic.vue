<script setup lang="ts">
import { SIcon } from '@soybeanjs/ui';
import { VisuallyHidden } from '@soybeanjs/headless';
</script>

<template>
  <div>
    <h3 class="playground-title">Basic</h3>
    <button type="button" class="inline-flex items-center gap-2 rounded-md border px-3 py-2">
      <SIcon icon="lucide:save" />
      <VisuallyHidden>Save File</VisuallyHidden>
    </button>
  </div>
</template>
