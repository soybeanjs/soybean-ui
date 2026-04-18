<script setup lang="ts">
import { SClipboard, SIcon } from '@soybeanjs/ui';

const value = 'pnpm add @soybeanjs/ui';
</script>

<template>
  <h3 class="playground-title">Basic</h3>
  <SClipboard :value="value" color="accent" variant="soft">
    <template #leading="{ copied }">
      <SIcon :icon="copied ? 'lucide:check' : 'lucide:copy'" />
    </template>
    <template #default="{ copied }">
      {{ copied ? 'Copied install command' : 'Copy install command' }}
    </template>
  </SClipboard>
</template>
