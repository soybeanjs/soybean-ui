<script setup lang="ts">
import { SClipboard, SIcon } from '@soybeanjs/ui';

const value = 'custom-styling-example';
</script>

<template>
  <h3 class="playground-title">Custom Styling</h3>
  <SClipboard
    :value="value"
    variant="ghost"
    class="border border-dashed border-info/40 bg-info/8 text-info hover:bg-info/12 active:bg-info/18"
  >
    <template #leading="{ copied }">
      <SIcon :icon="copied ? 'lucide:check' : 'lucide:copy'" />
    </template>
    <template #default="{ copied }">
      {{ copied ? 'Copied custom style' : 'Custom style copy action' }}
    </template>
  </SClipboard>
</template>
