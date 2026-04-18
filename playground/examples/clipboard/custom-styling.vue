<script setup lang="ts">
import { SClipboard, SIcon } from '@soybeanjs/ui';

const value = 'custom-styling-example';
</script>

<template>
  <h3 class="playground-title">Custom Styling</h3>
  <SClipboard
    :value="value"
    variant="ghost"
    copy-text="Copy custom style action"
    copied-text="Copied custom style action"
    class="border border-dashed border-info/40 bg-info/8 text-info hover:bg-info/12 active:bg-info/18"
  >
    <template #leading="{ icon }">
      <SIcon :icon="icon" class="text-info" />
    </template>
    <template #default="{ text }">
      {{ text }}
    </template>
  </SClipboard>
</template>
