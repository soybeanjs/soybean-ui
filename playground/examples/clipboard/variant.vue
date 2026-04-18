<script setup lang="ts">
import { SClipboard, SIcon } from '@soybeanjs/ui';
import type { ClipboardVariant } from '@soybeanjs/ui';

const variants: ClipboardVariant[] = ['solid', 'outline', 'dashed', 'soft', 'ghost', 'link', 'plain', 'pure'];
</script>

<template>
  <h3 class="playground-title">Variant</h3>
  <div class="flex flex-wrap gap-3">
    <SClipboard v-for="variant in variants" :key="variant" :value="`copy-${variant}`" :variant="variant" color="accent">
      <template #leading="{ copied }">
        <SIcon :icon="copied ? 'lucide:check' : 'lucide:copy'" />
      </template>
      <template #default="{ copied }">
        {{ copied ? `${variant} copied` : variant }}
      </template>
    </SClipboard>
  </div>
</template>
