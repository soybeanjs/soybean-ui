<script setup lang="ts">
import { SClipboard, SIcon } from '@soybeanjs/ui';

const value = 'custom-styling-example';
</script>

<template>
  <h3 class="playground-title">Custom Styling</h3>
  <div>
    <SClipboard
      :value="value"
      variant="outline"
      color="info"
      copy-text="Copy custom style action"
      copied-text="Copied custom style action"
      class="border-dashed"
    >
      <template #leading="{ icon }">
        <SIcon :icon="icon" class="text-info" />
      </template>
      <template #default="{ text }">
        {{ text }}
      </template>
    </SClipboard>
  </div>
</template>
