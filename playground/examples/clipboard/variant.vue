<script setup lang="ts">
import { SClipboard } from '@soybeanjs/ui';
import type { ClipboardVariant } from '@soybeanjs/ui';

const variants: ClipboardVariant[] = ['solid', 'outline', 'dashed', 'soft', 'ghost', 'link', 'plain', 'pure'];
</script>

<template>
  <h3 class="playground-title">Variant</h3>
  <div class="flex flex-wrap gap-3">
    <SClipboard
      v-for="variant in variants"
      :key="variant"
      :value="`copy-${variant}`"
      :variant="variant"
      color="accent"
      :copy-text="variant"
      :copied-text="`${variant} copied`"
    />
  </div>
</template>
